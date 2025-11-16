/**
 * Console Playground Methods for Testing Models
 * 
 * This module provides utility functions to test AI models directly from the browser console.
 * 
 * Usage Examples:
 * 
 * 1. Simple text completion:
 *    await playground.chat("Hello, how are you?")
 * 
 * 2. With specific model:
 *    await playground.chat("Explain quantum computing", { model: "gpt-4" })
 * 
 * 3. Streaming response:
 *    await playground.chatStream("Tell me a story", { 
 *      onChunk: (text) => console.log(text),
 *      model: "gpt-4o"
 *    })
 * 
 * 4. With images:
 *    await playground.chatWithImage("What's in this image?", "https://example.com/image.jpg")
 * 
 * 5. Custom parameters:
 *    await playground.chat("Write a poem", {
 *      model: "gpt-4",
 *      temperature: 0.9,
 *      max_tokens: 500
 *    })
 * 
 * 6. List available models:
 *    await playground.listModels()
 * 
 * 7. Get user groups:
 *    await playground.listGroups()
 * 
 * 8. Test with custom payload:
 *    await playground.customRequest({
 *      model: "gpt-4",
 *      messages: [{ role: "user", content: "Hello" }],
 *      temperature: 0.7
 *    })
 */

import { getUserIdFromLocalStorage } from './utils';
import { API_ENDPOINTS } from '../constants/playground.constants';

// Helper to get auth headers
const getHeaders = () => ({
  'Content-Type': 'application/json',
  'New-Api-User': getUserIdFromLocalStorage(),
});

// Helper to build message array
const buildMessages = (content, systemPrompt = null) => {
  const messages = [];
  if (systemPrompt) {
    messages.push({ role: 'system', content: systemPrompt });
  }
  messages.push({ role: 'user', content });
  return messages;
};

// Helper to build message content with images
const buildMessageWithImages = (text, imageUrls) => {
  if (!imageUrls || imageUrls.length === 0) {
    return text;
  }

  const content = [{ type: 'text', text }];
  imageUrls.forEach(url => {
    content.push({
      type: 'image_url',
      image_url: { url }
    });
  });
  return content;
};

/**
 * Simple chat completion (non-streaming)
 * @param {string} message - The message to send
 * @param {Object} options - Optional parameters
 * @returns {Promise<Object>} Response object
 */
export async function chat(message, options = {}) {
  const {
    model = 'gpt-4o',
    group = '',
    temperature = 0.7,
    max_tokens = 4096,
    top_p = 1,
    frequency_penalty = 0,
    presence_penalty = 0,
    systemPrompt = null,
  } = options;

  const payload = {
    model,
    group,
    messages: buildMessages(message, systemPrompt),
    stream: false,
    temperature,
    max_tokens,
    top_p,
    frequency_penalty,
    presence_penalty,
  };

  console.log('🚀 Sending request:', payload);

  try {
    const response = await fetch(API_ENDPOINTS.CHAT_COMPLETIONS, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ Response received:', data);

    const content = data.choices?.[0]?.message?.content || '';
    const reasoning = data.choices?.[0]?.message?.reasoning_content || '';

    return {
      success: true,
      content,
      reasoning,
      usage: data.usage,
      model: data.model,
      raw: data,
    };
  } catch (error) {
    console.error('❌ Error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Streaming chat completion
 * @param {string} message - The message to send
 * @param {Object} options - Optional parameters including onChunk callback
 * @returns {Promise<Object>} Complete response object
 */
export async function chatStream(message, options = {}) {
  const {
    model = 'gpt-4o',
    group = '',
    temperature = 0.7,
    max_tokens = 4096,
    top_p = 1,
    frequency_penalty = 0,
    presence_penalty = 0,
    systemPrompt = null,
    onChunk = (text) => console.log(text),
    onReasoning = (text) => console.log('💭 Reasoning:', text),
  } = options;

  const payload = {
    model,
    group,
    messages: buildMessages(message, systemPrompt),
    stream: true,
    temperature,
    max_tokens,
    top_p,
    frequency_penalty,
    presence_penalty,
  };

  console.log('🚀 Sending streaming request:', payload);

  let fullContent = '';
  let fullReasoning = '';

  try {
    const response = await fetch(API_ENDPOINTS.CHAT_COMPLETIONS, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n').filter(line => line.trim() !== '');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') {
            console.log('\n✅ Stream completed');
            continue;
          }

          try {
            const parsed = JSON.parse(data);
            const delta = parsed.choices?.[0]?.delta;

            if (delta?.content) {
              fullContent += delta.content;
              onChunk(delta.content);
            }

            if (delta?.reasoning_content || delta?.reasoning) {
              const reasoning = delta.reasoning_content || delta.reasoning;
              fullReasoning += reasoning;
              onReasoning(reasoning);
            }
          } catch (e) {
            console.warn('Failed to parse chunk:', e);
          }
        }
      }
    }

    return {
      success: true,
      content: fullContent,
      reasoning: fullReasoning,
    };
  } catch (error) {
    console.error('❌ Error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Chat with image support
 * @param {string} message - The message to send
 * @param {string|string[]} imageUrls - Single URL or array of image URLs
 * @param {Object} options - Optional parameters
 * @returns {Promise<Object>} Response object
 */
export async function chatWithImage(message, imageUrls, options = {}) {
  const {
    model = 'gpt-4o',
    group = '',
    temperature = 0.7,
    max_tokens = 4096,
    systemPrompt = null,
  } = options;

  const urls = Array.isArray(imageUrls) ? imageUrls : [imageUrls];
  const content = buildMessageWithImages(message, urls);

  const messages = [];
  if (systemPrompt) {
    messages.push({ role: 'system', content: systemPrompt });
  }
  messages.push({ role: 'user', content });

  const payload = {
    model,
    group,
    messages,
    stream: false,
    temperature,
    max_tokens,
  };

  console.log('🚀 Sending request with images:', payload);

  try {
    const response = await fetch(API_ENDPOINTS.CHAT_COMPLETIONS, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ Response received:', data);

    const responseContent = data.choices?.[0]?.message?.content || '';

    return {
      success: true,
      content: responseContent,
      usage: data.usage,
      model: data.model,
      raw: data,
    };
  } catch (error) {
    console.error('❌ Error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Send custom request payload
 * @param {Object} payload - Custom request payload
 * @returns {Promise<Object>} Response object
 */
export async function customRequest(payload) {
  console.log('🚀 Sending custom request:', payload);

  try {
    const response = await fetch(API_ENDPOINTS.CHAT_COMPLETIONS, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ Response received:', data);

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('❌ Error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * List available models
 * @returns {Promise<Array>} Array of model names
 */
export async function listModels() {
  console.log('📋 Fetching available models...');

  try {
    const response = await fetch(API_ENDPOINTS.USER_MODELS, {
      method: 'GET',
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    const models = data.data || [];
    
    console.log('✅ Available models:', models);
    return {
      success: true,
      models,
      count: models.length,
    };
  } catch (error) {
    console.error('❌ Error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * List user groups
 * @returns {Promise<Object>} Groups object
 */
export async function listGroups() {
  console.log('📋 Fetching user groups...');

  try {
    const response = await fetch(API_ENDPOINTS.USER_GROUPS, {
      method: 'GET',
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    const groups = data.data || {};
    
    console.log('✅ Available groups:', groups);
    return {
      success: true,
      groups,
    };
  } catch (error) {
    console.error('❌ Error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Multi-turn conversation
 * @param {Array} messages - Array of message objects with role and content
 * @param {Object} options - Optional parameters
 * @returns {Promise<Object>} Response object
 */
export async function conversation(messages, options = {}) {
  const {
    model = 'gpt-4o',
    group = '',
    temperature = 0.7,
    max_tokens = 4096,
    stream = false,
  } = options;

  const payload = {
    model,
    group,
    messages,
    stream,
    temperature,
    max_tokens,
  };

  console.log('🚀 Sending conversation:', payload);

  try {
    const response = await fetch(API_ENDPOINTS.CHAT_COMPLETIONS, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ Response received:', data);

    const content = data.choices?.[0]?.message?.content || '';

    return {
      success: true,
      content,
      usage: data.usage,
      model: data.model,
      raw: data,
    };
  } catch (error) {
    console.error('❌ Error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Display help information
 */
export function help() {
  console.log(`
%c🎮 Playground Console Methods

%cBasic Usage:
%c  playground.chat("Hello!")
  playground.chatStream("Tell me a story", { onChunk: console.log })
  playground.chatWithImage("What's this?", "https://example.com/image.jpg")

%cWith Options:
%c  playground.chat("Explain AI", {
    model: "gpt-4",
    temperature: 0.9,
    max_tokens: 500,
    systemPrompt: "You are a helpful assistant"
  })

%cUtility Methods:
%c  playground.listModels()        // List available models
  playground.listGroups()        // List user groups
  playground.customRequest({})   // Send custom payload
  playground.conversation([])    // Multi-turn chat

%cMulti-turn Example:
%c  playground.conversation([
    { role: "system", content: "You are a poet" },
    { role: "user", content: "Write a haiku" },
    { role: "assistant", content: "Cherry blossoms fall..." },
    { role: "user", content: "Write another one" }
  ])

%cStreaming Example:
%c  playground.chatStream("Count to 10", {
    onChunk: (text) => process.stdout.write(text),
    onReasoning: (text) => console.log("Thinking:", text)
  })

%cFor more help, visit the documentation or type: playground.help()
`, 
    'color: #4CAF50; font-size: 16px; font-weight: bold',
    'color: #2196F3; font-weight: bold', 'color: #666',
    'color: #2196F3; font-weight: bold', 'color: #666',
    'color: #2196F3; font-weight: bold', 'color: #666',
    'color: #2196F3; font-weight: bold', 'color: #666',
    'color: #2196F3; font-weight: bold', 'color: #666',
    'color: #FF9800; font-weight: bold'
  );
}

// Export all methods as a playground object
export const playground = {
  chat,
  chatStream,
  chatWithImage,
  customRequest,
  listModels,
  listGroups,
  conversation,
  help,
};

// Make it available globally in development
if (typeof window !== 'undefined') {
  window.playground = playground;
  console.log('%c🎮 Playground methods loaded! Type "playground.help()" for usage.', 
    'color: #4CAF50; font-size: 14px; font-weight: bold');
}