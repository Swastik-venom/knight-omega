# Console Playground - Quick Reference

Quick reference guide for testing AI models via browser console.

## Quick Start

```javascript
// Show help
playground.help()

// Simple chat
await playground.chat("Hello!")

// List available models
await playground.listModels()
```

## Common Commands

### Basic Chat
```javascript
// Simple message
await playground.chat("What is AI?")

// With model selection
await playground.chat("Explain quantum physics", { model: "gpt-4" })

// With temperature
await playground.chat("Write a poem", { temperature: 0.9 })
```

### Streaming
```javascript
// Basic streaming
await playground.chatStream("Tell me a story")

// Custom handler
await playground.chatStream("Count to 10", {
  onChunk: (text) => console.log(text)
})
```

### Vision (Images)
```javascript
// Single image
await playground.chatWithImage(
  "What's in this image?",
  "https://example.com/image.jpg"
)

// Multiple images
await playground.chatWithImage(
  "Compare these",
  ["url1.jpg", "url2.jpg"]
)
```

### Multi-turn Conversation
```javascript
await playground.conversation([
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "Hello" },
  { role: "assistant", content: "Hi! How can I help?" },
  { role: "user", content: "Tell me a joke" }
])
```

### Custom Request
```javascript
await playground.customRequest({
  model: "gpt-4",
  messages: [{ role: "user", content: "Hello" }],
  temperature: 0.7,
  max_tokens: 100
})
```

### Utilities
```javascript
// List models
await playground.listModels()

// List groups
await playground.listGroups()

// Show help
playground.help()
```

## Common Options

```javascript
{
  model: "gpt-4o",              // Model name
  group: "",                     // User group
  temperature: 0.7,              // 0-2, creativity
  max_tokens: 4096,              // Max response length
  top_p: 1,                      // Nucleus sampling
  frequency_penalty: 0,          // -2 to 2
  presence_penalty: 0,           // -2 to 2
  systemPrompt: "You are..."     // System instructions
}
```

## Response Format

```javascript
{
  success: true,
  content: "Response text...",
  reasoning: "Thinking process...",
  usage: {
    prompt_tokens: 10,
    completion_tokens: 20,
    total_tokens: 30
  },
  model: "gpt-4o",
  raw: { /* full API response */ }
}
```

## Examples by Use Case

### Testing a Model
```javascript
const result = await playground.chat("Test message", { 
  model: "gpt-4" 
})
console.log(result.content)
```

### Comparing Models
```javascript
for (const model of ["gpt-3.5-turbo", "gpt-4"]) {
  const result = await playground.chat("Explain AI", { model })
  console.log(`${model}: ${result.content}`)
}
```

### Testing Temperature
```javascript
for (const temp of [0, 0.5, 1.0]) {
  const result = await playground.chat("Be creative", { 
    temperature: temp 
  })
  console.log(`Temp ${temp}: ${result.content}`)
}
```

### Building Conversations
```javascript
const msgs = []
msgs.push({ role: "user", content: "Hi" })
let r = await playground.conversation(msgs)
msgs.push({ role: "assistant", content: r.content })
msgs.push({ role: "user", content: "Tell me more" })
r = await playground.conversation(msgs)
```

### Error Handling
```javascript
const result = await playground.chat("Hello")
if (!result.success) {
  console.error("Error:", result.error)
} else {
  console.log(result.content)
}
```

## Tips

1. **Always check available models first:**
   ```javascript
   await playground.listModels()
   ```

2. **Use appropriate temperature:**
   - 0-0.3: Factual
   - 0.4-0.7: Balanced
   - 0.8-1.5: Creative

3. **Monitor token usage:**
   ```javascript
   const r = await playground.chat("Hello")
   console.log(r.usage.total_tokens)
   ```

4. **Use streaming for long responses:**
   ```javascript
   await playground.chatStream("Long story...")
   ```

5. **Set system prompts for context:**
   ```javascript
   await playground.chat("Question", {
     systemPrompt: "You are an expert in..."
   })
   ```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `playground is not defined` | Refresh the page |
| `401 Unauthorized` | Check if logged in |
| `Model not found` | Use `listModels()` to check available models |
| No response | Check network, try smaller `max_tokens` |

## Keyboard Shortcuts

In browser console:
- `Ctrl/Cmd + L` - Clear console
- `↑/↓` - Navigate command history
- `Tab` - Autocomplete
- `Shift + Enter` - New line without executing

## Advanced Patterns

### Batch Testing
```javascript
const tests = ["Q1", "Q2", "Q3"]
const results = await Promise.all(
  tests.map(q => playground.chat(q))
)
```

### Retry Logic
```javascript
async function chatWithRetry(msg, retries = 3) {
  for (let i = 0; i < retries; i++) {
    const r = await playground.chat(msg)
    if (r.success) return r
    await new Promise(resolve => setTimeout(resolve, 1000))
  }
  throw new Error("Max retries exceeded")
}
```

### Token Counter
```javascript
let totalTokens = 0
const result = await playground.chat("Hello")
totalTokens += result.usage?.total_tokens || 0
console.log(`Total tokens used: ${totalTokens}`)
```

---

**For detailed documentation, see:** [`CONSOLE_PLAYGROUND.md`](./CONSOLE_PLAYGROUND.md)