"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Filter, 
  Star, 
  Zap, 
  Brain, 
  MessageCircle, 
  Code, 
  Image, 
  ChevronDown,
  ExternalLink,
  Sparkles,
  Globe,
  Shield,
  Gauge,
  Cpu,
  Layers,
  Eye,
  Database
} from 'lucide-react'

// Enhanced model data based on the available providers and web/src patterns
const aiModels = [
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'OpenAI',
    description: 'The most advanced OpenAI model with multimodal capabilities and enhanced reasoning',
    category: 'Text',
    icon: 'Brain',
    pricing: { input: 0.005, output: 0.015 },
    context: 128000,
    features: ['Text Generation', 'Code Generation', 'Multimodal', 'Function Calling', 'Vision'],
    popularity: 95,
    isNew: false,
    tier: 'premium',
    capabilities: ['chat', 'completions', 'vision', 'functions'],
    speed: 'fast',
    accuracy: 95
  },
  {
    id: 'gpt-4o-mini',
    name: 'GPT-4o Mini',
    provider: 'OpenAI',
    description: 'Fast and cost-effective model optimized for efficiency and speed',
    category: 'Text',
    icon: 'Zap',
    pricing: { input: 0.00015, output: 0.0006 },
    context: 128000,
    features: ['Text Generation', 'Code Generation', 'Fast Response', 'Cost Effective'],
    popularity: 88,
    isNew: true,
    tier: 'pro',
    capabilities: ['chat', 'completions'],
    speed: 'very-fast',
    accuracy: 85
  },
  {
    id: 'gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    provider: 'OpenAI',
    description: 'Reliable and efficient model for general purpose tasks and chat applications',
    category: 'Text',
    icon: 'MessageCircle',
    pricing: { input: 0.0005, output: 0.0015 },
    context: 16385,
    features: ['Text Generation', 'Code Generation', 'Chat', 'Fast'],
    popularity: 82,
    isNew: false,
    tier: 'starter',
    capabilities: ['chat', 'completions'],
    speed: 'very-fast',
    accuracy: 80
  },
  {
    id: 'claude-3-5-sonnet',
    name: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    description: 'Most intelligent model for complex reasoning, analysis, and content creation',
    category: 'Text',
    icon: 'Brain',
    pricing: { input: 0.003, output: 0.015 },
    context: 200000,
    features: ['Text Generation', 'Analysis', 'Code', 'Long Context', 'Safety'],
    popularity: 92,
    isNew: true,
    tier: 'premium',
    capabilities: ['chat', 'completions', 'analysis'],
    speed: 'fast',
    accuracy: 94
  },
  {
    id: 'claude-3-haiku',
    name: 'Claude 3 Haiku',
    provider: 'Anthropic',
    description: 'Fast and efficient model for quick tasks and high-volume applications',
    category: 'Text',
    icon: 'Zap',
    pricing: { input: 0.00025, output: 0.00125 },
    context: 200000,
    features: ['Text Generation', 'Fast Response', 'Efficient', 'High Volume'],
    popularity: 75,
    isNew: false,
    tier: 'pro',
    capabilities: ['chat', 'completions'],
    speed: 'very-fast',
    accuracy: 82
  },
  {
    id: 'claude-3-opus',
    name: 'Claude 3 Opus',
    provider: 'Anthropic',
    description: 'Most powerful Claude model for complex tasks and sophisticated reasoning',
    category: 'Text',
    icon: 'Sparkles',
    pricing: { input: 0.015, output: 0.075 },
    context: 200000,
    features: ['Text Generation', 'Advanced Reasoning', 'Analysis', 'Creation'],
    popularity: 78,
    isNew: false,
    tier: 'premium',
    capabilities: ['chat', 'completions', 'analysis', 'reasoning'],
    speed: 'medium',
    accuracy: 96
  },
  {
    id: 'gemini-pro',
    name: 'Gemini Pro',
    provider: 'Google',
    description: 'Google most capable model for various tasks with strong reasoning abilities',
    category: 'Text',
    icon: 'Brain',
    pricing: { input: 0.0005, output: 0.0015 },
    context: 32000,
    features: ['Text Generation', 'Code Generation', 'Multimodal', 'Reasoning'],
    popularity: 85,
    isNew: false,
    tier: 'pro',
    capabilities: ['chat', 'completions', 'multimodal'],
    speed: 'fast',
    accuracy: 88
  },
  {
    id: 'gemini-pro-vision',
    name: 'Gemini Pro Vision',
    provider: 'Google',
    description: 'Multimodal model for image and text analysis with visual understanding',
    category: 'Vision',
    icon: 'Image',
    pricing: { input: 0.0025, output: 0.0075 },
    context: 16384,
    features: ['Image Analysis', 'Text Generation', 'Multimodal', 'Visual Understanding'],
    popularity: 78,
    isNew: false,
    tier: 'pro',
    capabilities: ['chat', 'vision', 'multimodal'],
    speed: 'fast',
    accuracy: 87
  },
  {
    id: 'llama-3.1-70b',
    name: 'Llama 3.1 70B',
    provider: 'Meta',
    description: 'Powerful open-source model for various tasks with excellent performance',
    category: 'Text',
    icon: 'Brain',
    pricing: { input: 0.0009, output: 0.0009 },
    context: 131072,
    features: ['Text Generation', 'Code Generation', 'Open Source', 'High Performance'],
    popularity: 80,
    isNew: true,
    tier: 'pro',
    capabilities: ['chat', 'completions', 'code'],
    speed: 'medium',
    accuracy: 86
  },
  {
    id: 'llama-3.1-8b',
    name: 'Llama 3.1 8B',
    provider: 'Meta',
    description: 'Efficient open-source model optimized for smaller tasks and deployments',
    category: 'Text',
    icon: 'Zap',
    pricing: { input: 0.0001, output: 0.0001 },
    context: 131072,
    features: ['Text Generation', 'Fast', 'Open Source', 'Efficient'],
    popularity: 70,
    isNew: true,
    tier: 'starter',
    capabilities: ['chat', 'completions'],
    speed: 'very-fast',
    accuracy: 75
  },
  {
    id: 'mistral-large',
    name: 'Mistral Large',
    provider: 'Mistral AI',
    description: 'European AI model with strong performance and multilingual capabilities',
    category: 'Text',
    icon: 'Brain',
    pricing: { input: 0.008, output: 0.024 },
    context: 32000,
    features: ['Text Generation', 'Code Generation', 'Analysis', 'Multilingual'],
    popularity: 76,
    isNew: false,
    tier: 'premium',
    capabilities: ['chat', 'completions', 'multilingual'],
    speed: 'fast',
    accuracy: 89
  },
  {
    id: 'mistral-small',
    name: 'Mistral Small',
    provider: 'Mistral AI',
    description: 'Fast and efficient model for everyday tasks and applications',
    category: 'Text',
    icon: 'Zap',
    pricing: { input: 0.0002, output: 0.0006 },
    context: 32000,
    features: ['Text Generation', 'Fast Response', 'Efficient', 'Multilingual'],
    popularity: 72,
    isNew: true,
    tier: 'pro',
    capabilities: ['chat', 'completions'],
    speed: 'very-fast',
    accuracy: 80
  },
  {
    id: 'moonshot-v1-8k',
    name: 'Moonshot v1 8K',
    provider: 'Moonshot',
    description: 'Chinese AI model with strong Chinese language support and context',
    category: 'Text',
    icon: 'MessageCircle',
    pricing: { input: 0.012, output: 0.012 },
    context: 8000,
    features: ['Text Generation', 'Chinese Support', 'Long Context', 'Local'],
    popularity: 65,
    isNew: false,
    tier: 'pro',
    capabilities: ['chat', 'completions', 'chinese'],
    speed: 'fast',
    accuracy: 84
  },
  {
    id: 'moonshot-v1-32k',
    name: 'Moonshot v1 32K',
    provider: 'Moonshot',
    description: 'Extended context version with 32K tokens for longer conversations',
    category: 'Text',
    icon: 'Layers',
    pricing: { input: 0.024, output: 0.024 },
    context: 32000,
    features: ['Text Generation', 'Long Context', 'Chinese Support', 'Extended'],
    popularity: 68,
    isNew: true,
    tier: 'pro',
    capabilities: ['chat', 'completions', 'long-context'],
    speed: 'medium',
    accuracy: 85
  },
  {
    id: 'deepseek-coder',
    name: 'DeepSeek Coder',
    provider: 'DeepSeek',
    description: 'Specialized model for code generation, analysis, and programming tasks',
    category: 'Code',
    icon: 'Code',
    pricing: { input: 0.0014, output: 0.0014 },
    context: 16000,
    features: ['Code Generation', 'Code Analysis', 'Programming', 'Technical'],
    popularity: 72,
    isNew: true,
    tier: 'pro',
    capabilities: ['chat', 'completions', 'code', 'analysis'],
    speed: 'fast',
    accuracy: 87
  },
  {
    id: 'minimax-abab6',
    name: 'Abab6',
    provider: 'MiniMax',
    description: 'Chinese AI model with strong reasoning capabilities and performance',
    category: 'Text',
    icon: 'Brain',
    pricing: { input: 0.01, output: 0.01 },
    context: 24576,
    features: ['Text Generation', 'Reasoning', 'Chinese Support', 'Analysis'],
    popularity: 68,
    isNew: false,
    tier: 'pro',
    capabilities: ['chat', 'completions', 'reasoning'],
    speed: 'fast',
    accuracy: 86
  },
  {
    id: 'jina-embeddings',
    name: 'Jina Embeddings',
    provider: 'Jina AI',
    description: 'High-quality embeddings for semantic search and vector databases',
    category: 'Embeddings',
    icon: 'Search',
    pricing: { input: 0.001, output: 0.001 },
    context: 8192,
    features: ['Embeddings', 'Search', 'Semantic', 'Vector'],
    popularity: 60,
    isNew: false,
    tier: 'starter',
    capabilities: ['embeddings', 'search'],
    speed: 'fast',
    accuracy: 82
  },
  {
    id: 'qwen-72b',
    name: 'Qwen 72B',
    provider: 'Alibaba',
    description: 'Powerful Chinese-language model with multilingual capabilities',
    category: 'Text',
    icon: 'Globe',
    pricing: { input: 0.004, output: 0.004 },
    context: 32768,
    features: ['Text Generation', 'Chinese Support', 'Multilingual', 'Large Scale'],
    popularity: 74,
    isNew: true,
    tier: 'premium',
    capabilities: ['chat', 'completions', 'multilingual'],
    speed: 'medium',
    accuracy: 88
  },
  {
    id: 'yi-34b',
    name: 'Yi 34B',
    provider: '01.AI',
    description: 'Advanced bilingual model with strong English and Chinese capabilities',
    category: 'Text',
    icon: 'MessageCircle',
    pricing: { input: 0.003, output: 0.003 },
    context: 32000,
    features: ['Text Generation', 'Bilingual', 'Long Context', 'Reasoning'],
    popularity: 71,
    isNew: true,
    tier: 'pro',
    capabilities: ['chat', 'completions', 'bilingual'],
    speed: 'fast',
    accuracy: 87
  },
  {
    id: 'codellama-70b',
    name: 'Code Llama 70B',
    provider: 'Meta',
    description: 'Specialized code generation model based on Llama architecture',
    category: 'Code',
    icon: 'Code',
    pricing: { input: 0.0009, output: 0.0009 },
    context: 16384,
    features: ['Code Generation', 'Programming', 'Multiple Languages', 'Open Source'],
    popularity: 69,
    isNew: false,
    tier: 'pro',
    capabilities: ['chat', 'completions', 'code'],
    speed: 'medium',
    accuracy: 84
  },
  {
    id: 'dall-e-3',
    name: 'DALL-E 3',
    provider: 'OpenAI',
    description: 'Advanced AI image generation model with high quality outputs',
    category: 'Image',
    icon: 'Image',
    pricing: { input: 0.04, output: 0.04 },
    context: 4000,
    features: ['Image Generation', 'High Quality', 'Creative', 'Text-to-Image'],
    popularity: 85,
    isNew: true,
    tier: 'premium',
    capabilities: ['image-generation', 'creative'],
    speed: 'slow',
    accuracy: 92
  }
]

const categories = ['All', 'Text', 'Code', 'Vision', 'Image', 'Embeddings']
const providers = ['All', 'OpenAI', 'Anthropic', 'Google', 'Meta', 'Mistral AI', 'DeepSeek', 'Moonshot', 'MiniMax', 'Jina AI', 'Alibaba', '01.AI']
const tiers = ['All', 'starter', 'pro', 'premium']
const speeds = ['All', 'very-fast', 'fast', 'medium', 'slow']

function getIconComponent(iconName: string) {
  const icons: { [key: string]: any } = {
    'Brain': Brain,
    'Zap': Zap,
    'MessageCircle': MessageCircle,
    'Image': Image,
    'Code': Code,
    'Search': Search,
    'Sparkles': Sparkles,
    'Globe': Globe,
    'Layers': Layers,
    'Gauge': Gauge,
    'Cpu': Cpu,
    'Shield': Shield,
    'Eye': Eye,
    'Database': Database
  }
  const IconComponent = icons[iconName] || Brain
  return IconComponent({ className: "w-5 h-5" })
}

function getTierColor(tier: string) {
  switch (tier) {
    case 'starter': return 'bg-green-500/10 text-green-400 border-green-500/20'
    case 'pro': return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
    case 'premium': return 'bg-purple-500/10 text-purple-400 border-purple-500/20'
    default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20'
  }
}

function getSpeedColor(speed: string) {
  switch (speed) {
    case 'very-fast': return 'text-green-400'
    case 'fast': return 'text-blue-400'
    case 'medium': return 'text-yellow-400'
    case 'slow': return 'text-red-400'
    default: return 'text-gray-400'
  }
}

function getCategoryIcon(category: string) {
  const icons: { [key: string]: any } = {
    'Text': MessageCircle,
    'Code': Code,
    'Vision': Eye,
    'Image': Image,
    'Embeddings': Database
  }
  const IconComponent = icons[category] || Brain
  return IconComponent({ className: "w-4 h-4" })
}

export default function ModelsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedProvider, setSelectedProvider] = useState('All')
  const [selectedTier, setSelectedTier] = useState('All')
  const [selectedSpeed, setSelectedSpeed] = useState('All')
  const [sortBy, setSortBy] = useState('popularity')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const filteredModels = aiModels.filter(model => {
    const matchesSearch = model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         model.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         model.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         model.features.some(feature => feature.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'All' || model.category === selectedCategory
    const matchesProvider = selectedProvider === 'All' || model.provider === selectedProvider
    const matchesTier = selectedTier === 'All' || model.tier === selectedTier
    const matchesSpeed = selectedSpeed === 'All' || model.speed === selectedSpeed
    
    return matchesSearch && matchesCategory && matchesProvider && matchesTier && matchesSpeed
  })

  const sortedModels = [...filteredModels].sort((a, b) => {
    switch (sortBy) {
      case 'popularity':
        return b.popularity - a.popularity
      case 'name':
        return a.name.localeCompare(b.name)
      case 'provider':
        return a.provider.localeCompare(b.provider)
      case 'price':
        return a.pricing.input - b.pricing.input
      case 'accuracy':
        return b.accuracy - a.accuracy
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent mb-4">
            AI Models
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Explore our comprehensive collection of 50+ AI models from leading providers. 
            Each model optimized for different use cases and performance requirements.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center mb-6">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
              <input
                type="text"
                placeholder="Search models, providers, or capabilities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 text-white placeholder:text-white/40 rounded-md"
              />
            </div>

            {/* Sort and View Controls */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="text-white/60 w-4 h-4" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white/5 border border-white/10 text-white rounded-md px-3 py-2 text-sm"
                >
                  <option value="popularity">Most Popular</option>
                  <option value="name">Name</option>
                  <option value="provider">Provider</option>
                  <option value="price">Price</option>
                  <option value="accuracy">Accuracy</option>
                </select>
              </div>
              
              <div className="flex border border-white/10 rounded-md">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 text-sm ${viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white'}`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-2 text-sm ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white'}`}
                >
                  List
                </button>
              </div>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="space-y-4">
            {/* Categories */}
            <div>
              <h3 className="text-sm font-medium text-white/60 mb-2">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedCategory === category
                        ? 'bg-blue-500 text-white'
                        : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {getCategoryIcon(category)}
                    <span className="ml-2">{category}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Providers and Tiers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Providers */}
              <div>
                <h3 className="text-sm font-medium text-white/60 mb-2">Providers</h3>
                <div className="flex flex-wrap gap-2">
                  {providers.map(provider => (
                    <button
                      key={provider}
                      onClick={() => setSelectedProvider(provider)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                        selectedProvider === provider
                          ? 'bg-purple-500 text-white'
                          : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {provider}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tiers and Speed */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-white/60 mb-2">Tiers</h3>
                  <div className="flex flex-wrap gap-2">
                    {tiers.map(tier => (
                      <button
                        key={tier}
                        onClick={() => setSelectedTier(tier)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                          selectedTier === tier
                            ? 'bg-green-500 text-white'
                            : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        {tier.charAt(0).toUpperCase() + tier.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-white/60 mb-2">Speed</h3>
                  <div className="flex flex-wrap gap-2">
                    {speeds.map(speed => (
                      <button
                        key={speed}
                        onClick={() => setSelectedSpeed(speed)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                          selectedSpeed === speed
                            ? 'bg-orange-500 text-white'
                            : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        {speed === 'All' ? 'All' : speed.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Models Display */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
          }
        >
          <AnimatePresence>
            {sortedModels.map((model, index) => (
              <motion.div
                key={model.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                {viewMode === 'grid' ? (
                  /* Grid View */
                  <div className="bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 rounded-lg p-6 h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-600/20 flex items-center justify-center text-blue-400">
                          {getIconComponent(model.icon)}
                        </div>
                        <div>
                          <h3 className="text-white text-lg font-semibold">{model.name}</h3>
                          <p className="text-white/60 text-sm">{model.provider}</p>
                        </div>
                      </div>
                      {model.isNew && (
                        <span className="bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-1 rounded-full text-xs">
                          New
                        </span>
                      )}
                    </div>
                    
                    <div className="space-y-4">
                      <p className="text-white/80 text-sm">
                        {model.description}
                      </p>

                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-2 py-1 rounded-full text-xs border ${getTierColor(model.tier)}`}>
                          {model.tier.charAt(0).toUpperCase() + model.tier.slice(1)}
                        </span>
                        <div className="flex items-center gap-1 text-yellow-400">
                          <Star className="w-3 h-3 fill-current" />
                          <span className="text-xs">{model.popularity}</span>
                        </div>
                        <div className={`flex items-center gap-1 ${getSpeedColor(model.speed)}`}>
                          <Gauge className="w-3 h-3" />
                          <span className="text-xs">{model.speed.replace('-', ' ')}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-white/40">Context</p>
                          <p className="text-white font-medium">{model.context.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-white/40">Input/Output</p>
                          <p className="text-white font-medium">
                            ${model.pricing.input}/{model.pricing.output}
                          </p>
                        </div>
                        <div>
                          <p className="text-white/40">Accuracy</p>
                          <p className="text-white font-medium">{model.accuracy}%</p>
                        </div>
                        <div>
                          <p className="text-white/40">Capabilities</p>
                          <p className="text-white font-medium">{model.capabilities.length}</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-white/60 text-sm">Features</p>
                        <div className="flex flex-wrap gap-1">
                          {model.features.slice(0, 3).map(feature => (
                            <span key={feature} className="text-xs border border-white/20 text-white/60 px-2 py-1 rounded">
                              {feature}
                            </span>
                          ))}
                          {model.features.length > 3 && (
                            <span className="text-xs border border-white/20 text-white/60 px-2 py-1 rounded">
                              +{model.features.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-white/10">
                        <button className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-md font-medium transition-all duration-200">
                          Use Model
                          <ExternalLink className="w-3 h-3 ml-2 inline" />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* List View */
                  <div className="bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-600/20 flex items-center justify-center text-blue-400">
                          {getIconComponent(model.icon)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-white text-lg font-semibold">{model.name}</h3>
                            {model.isNew && (
                              <span className="bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-1 rounded-full text-xs">
                                New
                              </span>
                            )}
                          </div>
                          <p className="text-white/60 text-sm mb-2">{model.provider}</p>
                          <p className="text-white/80 text-sm">{model.description}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6 text-sm">
                        <div className="text-center">
                          <p className="text-white/40">Context</p>
                          <p className="text-white font-medium">{model.context.toLocaleString()}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-white/40">Price</p>
                          <p className="text-white font-medium">${model.pricing.input}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-white/40">Accuracy</p>
                          <p className="text-white font-medium">{model.accuracy}%</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs border ${getTierColor(model.tier)}`}>
                            {model.tier.charAt(0).toUpperCase() + model.tier.slice(1)}
                          </span>
                          <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-md font-medium transition-all duration-200">
                            Use Model
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Load More / Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-white/60 mb-4">
            Showing {sortedModels.length} of {aiModels.length} models
          </p>
          {sortedModels.length < aiModels.length && (
            <button className="px-4 py-2 border border-white/20 text-white hover:bg-white/10 rounded-md transition-colors">
              Load More Models
              <ChevronDown className="w-4 h-4 ml-2 inline" />
            </button>
          )}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-blue-500/20 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              Ready to build with AI?
            </h2>
            <p className="text-white/60 mb-6 max-w-2xl mx-auto">
              Get started with Knight-Omega today and access all these models through our unified API. 
              No setup required, just one integration for all AI needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-md font-medium">
                Start Free Trial
              </button>
              <button className="px-6 py-3 border border-white/20 text-white hover:bg-white/10 rounded-md font-medium">
                View Documentation
                <ExternalLink className="w-4 h-4 ml-2 inline" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}