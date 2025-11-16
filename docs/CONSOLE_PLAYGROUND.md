# Console Playground Methods

This document describes the console playground methods available for testing AI models directly from the browser console.

## Overview

The playground methods provide a convenient way to test and interact with AI models without using the UI. These methods are automatically loaded when the application starts and are available globally via the `window.playground` object.

## Getting Started

Open your browser's developer console (F12 or Cmd+Option+I on Mac) and type:

```javascript
playground.help()
```

This will display all available methods and usage examples.

## Available Methods

### 1. `playground.chat(message, options)`

Send a simple chat completion request (non-streaming).

**Parameters:**
- `message` (string): The message to send
- `options` (object, optional): Configuration options

**Options:**
- `model` (string): Model name (default: "gpt-4o")
- `group` (string): User group (default: "")
- `temperature` (number): Temperature 0-2 (default: 0.7)
- `max_tokens` (number): Maximum tokens (default: 4096)
- `top_p` (number): Top P sampling (default: 1)
- `frequency_penalty` (number): Frequency penalty (default: 0)
- `presence_penalty` (number): Presence penalty (default: 0)
- `systemPrompt` (string): System prompt (default: null)

**Returns:** Promise<Object> with:
- `success` (boolean): Whether the request succeeded
- `content` (string): The response content
- `reasoning` (string): Reasoning content if available
- `usage` (object): Token usage information
- `model` (string): Model used
- `raw` (object): Raw API response

**Examples:**

```javascript
// Simple usage
await playground.chat("Hello, how are you?")

// With specific model
await playground.chat("Explain quantum computing", { 
  model: "gpt-4" 
})

// With custom parameters
await playground.chat("Write a poem about the ocean", {
  model: "gpt-4o",
  temperature: 0.9,
  max_tokens: 500,
  systemPrompt: "You are a creative poet"
})

// Store response
const response = await playground.chat("What is 2+2?")
console.log(response.content)
```

---

### 2. `playground.chatStream(message, options)`

Send a streaming chat completion request with real-time output.

**Parameters:**
- `message` (string): The message to send
- `options` (object, optional): Configuration options

**Additional Options:**
- `onChunk` (function): Callback for each content chunk (default: console.log)
- `onReasoning` (function): Callback for reasoning chunks (default: console.log)

**Returns:** Promise<Object> with:
- `success` (boolean): Whether the request succeeded
- `content` (string): Complete response content
- `reasoning` (string): Complete reasoning content

**Examples:**

```javascript
// Basic streaming
await playground.chatStream("Tell me a story")

// Custom chunk handler
await playground.chatStream("Count to 10", {
  onChunk: (text) => console.log("Received:", text),
  onReasoning: (text) => console.log("Thinking:", text)
})

// With model options
await playground.chatStream("Explain AI", {
  model: "gpt-4",
  temperature: 0.8,
  onChunk: (text) => document.body.innerHTML += text
})
```

---

### 3. `playground.chatWithImage(message, imageUrls, options)`

Send a chat request with image(s) for vision models.

**Parameters:**
- `message` (string): The message/question about the image
- `imageUrls` (string|string[]): Single URL or array of image URLs
- `options` (object, optional): Configuration options

**Examples:**

```javascript
// Single image
await playground.chatWithImage(
  "What's in this image?",
  "https://example.com/image.jpg"
)

// Multiple images
await playground.chatWithImage(
  "Compare these images",
  [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg"
  ],
  { model: "gpt-4o" }
)

// With system prompt
await playground.chatWithImage(
  "Describe this artwork",
  "https://example.com/art.jpg",
  {
    model: "gpt-4o",
    systemPrompt: "You are an art critic"
  }
)
```

---

### 4. `playground.conversation(messages, options)`

Send a multi-turn conversation with full message history.

**Parameters:**
- `messages` (array): Array of message objects with `role` and `content`
- `options` (object, optional): Configuration options

**Message Roles:**
- `system`: System instructions
- `user`: User messages
- `assistant`: Assistant responses

**Examples:**

```javascript
// Multi-turn conversation
await playground.conversation([
  { role: "system", content: "You are a helpful math tutor" },
  { role: "user", content: "What is calculus?" },
  { role: "assistant", content: "Calculus is..." },
  { role: "user", content: "Can you give an example?" }
])

// Continuing a conversation
const messages = [
  { role: "user", content: "Tell me a joke" },
  { role: "assistant", content: "Why did the chicken..." },
  { role: "user", content: "Tell me another one" }
]
await playground.conversation(messages, { model: "gpt-4" })
```

---

### 5. `playground.customRequest(payload)`

Send a completely custom request payload.

**Parameters:**
- `payload` (object): Custom request payload following OpenAI API format

**Examples:**

```javascript
// Custom payload
await playground.customRequest({
  model: "gpt-4",
  messages: [
    { role: "system", content: "You are a pirate" },
    { role: "user", content: "Hello!" }
  ],
  temperature: 1.0,
  max_tokens: 100,
  stream: false
})

// With function calling
await playground.customRequest({
  model: "gpt-4",
  messages: [{ role: "user", content: "What's the weather?" }],
  functions: [{
    name: "get_weather",
    description: "Get weather information",
    parameters: {
      type: "object",
      properties: {
        location: { type: "string" }
      }
    }
  }]
})
```

---

### 6. `playground.listModels()`

List all available models for your account.

**Returns:** Promise<Object> with:
- `success` (boolean): Whether the request succeeded
- `models` (array): Array of model names
- `count` (number): Number of models

**Examples:**

```javascript
// List models
const result = await playground.listModels()
console.log(result.models)
console.log(`Total models: ${result.count}`)

// Check if specific model exists
const result = await playground.listModels()
const hasGPT4 = result.models.includes("gpt-4")
console.log(`GPT-4 available: ${hasGPT4}`)
```

---

### 7. `playground.listGroups()`

List all user groups and their configurations.

**Returns:** Promise<Object> with:
- `success` (boolean): Whether the request succeeded
- `groups` (object): Groups object with group info

**Examples:**

```javascript
// List groups
const result = await playground.listGroups()
console.log(result.groups)

// Check group ratios
const result = await playground.listGroups()
Object.entries(result.groups).forEach(([name, info]) => {
  console.log(`${name}: ratio ${info.ratio}`)
})
```

---

### 8. `playground.help()`

Display help information with usage examples in the console.

**Examples:**

```javascript
playground.help()
```

---

## Advanced Usage Examples

### Testing Different Models

```javascript
const models = ["gpt-3.5-turbo", "gpt-4", "gpt-4o"]
const prompt = "Explain AI in one sentence"

for (const model of models) {
  console.log(`\n=== Testing ${model} ===`)
  const result = await playground.chat(prompt, { model })
  console.log(result.content)
}
```

### Comparing Temperatures

```javascript
const temperatures = [0, 0.5, 1.0, 1.5]
const prompt = "Write a creative story opening"

for (const temp of temperatures) {
  console.log(`\n=== Temperature: ${temp} ===`)
  const result = await playground.chat(prompt, { 
    temperature: temp,
    model: "gpt-4"
  })
  console.log(result.content)
}
```

### Building a Conversation

```javascript
const messages = [
  { role: "system", content: "You are a helpful coding assistant" }
]

// First question
messages.push({ role: "user", content: "How do I sort an array in JavaScript?" })
let result = await playground.conversation(messages)
messages.push({ role: "assistant", content: result.content })

// Follow-up question
messages.push({ role: "user", content: "Can you show me an example?" })
result = await playground.conversation(messages)
console.log(result.content)
```

### Streaming with Custom Display

```javascript
let output = ""
await playground.chatStream("Write a short poem", {
  onChunk: (text) => {
    output += text
    // Update a DOM element in real-time
    document.getElementById("output").textContent = output
  },
  model: "gpt-4"
})
```

### Error Handling

```javascript
try {
  const result = await playground.chat("Hello", { 
    model: "invalid-model" 
  })
  if (!result.success) {
    console.error("Request failed:", result.error)
  }
} catch (error) {
  console.error("Exception:", error)
}
```

### Batch Testing

```javascript
const testCases = [
  "What is 2+2?",
  "Explain gravity",
  "Write a haiku"
]

const results = await Promise.all(
  testCases.map(prompt => playground.chat(prompt))
)

results.forEach((result, i) => {
  console.log(`\nTest ${i + 1}: ${testCases[i]}`)
  console.log(`Response: ${result.content}`)
  console.log(`Tokens: ${result.usage?.total_tokens}`)
})
```

## Tips and Best Practices

1. **Check Available Models First**
   ```javascript
   await playground.listModels()
   ```

2. **Use Appropriate Temperature**
   - 0-0.3: Factual, deterministic responses
   - 0.4-0.7: Balanced creativity and consistency
   - 0.8-1.5: Creative, varied responses

3. **Monitor Token Usage**
   ```javascript
   const result = await playground.chat("Hello")
   console.log(`Tokens used: ${result.usage?.total_tokens}`)
   ```

4. **Handle Errors Gracefully**
   Always check the `success` property in responses

5. **Use System Prompts**
   Set the behavior and context for better results

6. **Test Streaming for Long Responses**
   Use `chatStream` for better UX with lengthy outputs

## Troubleshooting

### "playground is not defined"
- Refresh the page to ensure the module is loaded
- Check browser console for any loading errors

### "401 Unauthorized"
- Ensure you're logged in
- Check if your session is still valid

### "Model not found"
- Use `playground.listModels()` to see available models
- Verify the model name spelling

### No response or timeout
- Check your network connection
- Verify the API endpoint is accessible
- Try with a smaller `max_tokens` value

## API Endpoints Used

The playground methods use these endpoints:
- `/pg/chat/completions` - Chat completions
- `/api/user/models` - List models
- `/api/user/self/groups` - List groups

## Security Notes

- All requests include authentication headers automatically
- User ID is retrieved from localStorage
- Requests respect rate limits and permissions
- No sensitive data is logged to console by default

## Support

For issues or questions:
1. Check the browser console for error messages
2. Verify your authentication status
3. Ensure you have the necessary permissions
4. Contact your system administrator if problems persist

---

**Last Updated:** 2025-11-15
**Version:** 1.0.0