import React, { useState, useMemo } from 'react'
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
import { useModelsData } from '../../hooks/models/useModelsData'

// Icon mapping
const iconMap: { [key: string]: any } = {
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

function getIconComponent(iconName: string) {
  const IconComponent = iconMap[iconName] || Brain
  return <IconComponent className="w-5 h-5" />
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
  return <IconComponent className="w-4 h-4" />
}

// Enhanced model data structure
interface AIModel {
  id: string
  name: string
  provider: string
  description: string
  category: string
  icon: string
  pricing: { input: number; output: number }
  context: number
  features: string[]
  popularity: number
  isNew: boolean
  tier: string
  capabilities: string[]
  speed: string
  accuracy: number
}

const categories = ['All', 'Text', 'Code', 'Vision', 'Image', 'Embeddings']
const tiers = ['All', 'starter', 'pro', 'premium']
const speeds = ['All', 'very-fast', 'fast', 'medium', 'slow']

export default function ModelsShowcase() {
  const modelsData = useModelsData()
  const { models, vendors, loading, t } = modelsData

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedProvider, setSelectedProvider] = useState('All')
  const [selectedTier, setSelectedTier] = useState('All')
  const [selectedSpeed, setSelectedSpeed] = useState('All')
  const [sortBy, setSortBy] = useState('popularity')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Transform backend models to showcase format
  const aiModels: AIModel[] = useMemo(() => {
    return models.map(model => ({
      id: model.id || model.model_name,
      name: model.model_name || model.name || 'Unknown Model',
      provider: model.vendor_id ? (vendors.find(v => v.id === model.vendor_id)?.name || 'Unknown') : 'Unknown',
      description: model.description || 'No description available',
      category: model.model_type || 'Text',
      icon: model.model_type === 'image' ? 'Image' : model.model_type === 'embedding' ? 'Database' : 'Brain',
      pricing: { 
        input: model.input_price || 0, 
        output: model.output_price || 0 
      },
      context: model.context_length || 4096,
      features: model.capabilities || ['Text Generation'],
      popularity: 75,
      isNew: model.created_time ? (Date.now() - new Date(model.created_time * 1000).getTime()) < 30 * 24 * 60 * 60 * 1000 : false,
      tier: model.input_price > 0.01 ? 'premium' : model.input_price > 0.001 ? 'pro' : 'starter',
      capabilities: model.capabilities || ['chat'],
      speed: model.input_price < 0.001 ? 'very-fast' : model.input_price < 0.005 ? 'fast' : 'medium',
      accuracy: 85
    }))
  }, [models, vendors])

  // Get unique providers from models
  const providers = useMemo(() => {
    const uniqueProviders = ['All', ...new Set(aiModels.map(m => m.provider))]
    return uniqueProviders
  }, [aiModels])

  const filteredModels = useMemo(() => {
    return aiModels.filter(model => {
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
  }, [aiModels, searchTerm, selectedCategory, selectedProvider, selectedTier, selectedSpeed])

  const sortedModels = useMemo(() => {
    return [...filteredModels].sort((a, b) => {
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
  }, [filteredModels, sortBy])

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading models...</div>
      </div>
    )
  }

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
            Explore our comprehensive collection of {aiModels.length}+ AI models from leading providers. 
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
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
              <input
                type="text"
                placeholder="Search models, providers, or capabilities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 text-white placeholder:text-white/40 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>

            {/* Sort and View Controls */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="text-white/60 w-4 h-4" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white/5 border border-white/10 text-white rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
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
                  className={`px-3 py-2 text-sm transition-colors ${viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white'}`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-2 text-sm transition-colors ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white'}`}
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
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                      selectedCategory === category
                        ? 'bg-blue-500 text-white'
                        : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {category !== 'All' && getCategoryIcon(category)}
                    <span>{category}</span>
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
                  {providers.slice(0, 8).map(provider => (
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
                      <p className="text-white/80 text-sm line-clamp-2">
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
                            ${model.pricing.input.toFixed(4)}/${model.pricing.output.toFixed(4)}
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
                        <button className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-md font-medium transition-all duration-200 flex items-center justify-center gap-2">
                          Use Model
                          <ExternalLink className="w-3 h-3" />
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
                          <p className="text-white font-medium">${model.pricing.input.toFixed(4)}</p>
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
            <button className="px-4 py-2 border border-white/20 text-white hover:bg-white/10 rounded-md transition-colors flex items-center gap-2 mx-auto">
              Load More Models
              <ChevronDown className="w-4 h-4" />
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
              <button className="px-6 py-3 border border-white/20 text-white hover:bg-white/10 rounded-md font-medium flex items-center gap-2 justify-center">
                View Documentation
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}