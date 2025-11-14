"use client"

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Plus,
  Key,
  Activity,
  TrendingUp,
  DollarSign,
  Clock,
  Zap,
  Brain,
  BarChart3,
  Settings,
  LogOut,
  User,
  TrendingDown,
  Eye,
  Code,
  Globe,
  Database
} from 'lucide-react'

// Mock data for demonstration
const mockStats = {
  totalRequests: 12543,
  tokensUsed: 987654,
  costThisMonth: 124.50,
  activeModels: 8
}

const mockRecentActivity = [
  {
    id: 1,
    type: 'text_generation',
    model: 'GPT-4o',
    tokens: 1250,
    cost: 0.15,
    timestamp: '2 minutes ago'
  },
  {
    id: 2,
    type: 'image_analysis',
    model: 'Gemini Pro Vision',
    tokens: 890,
    cost: 0.08,
    timestamp: '5 minutes ago'
  },
  {
    id: 3,
    type: 'code_generation',
    model: 'Claude 3.5 Sonnet',
    tokens: 2100,
    cost: 0.32,
    timestamp: '12 minutes ago'
  }
]

const mockApiKeys = [
  {
    id: 1,
    name: 'Production API',
    key: 'sk-omega-****************************1234',
    status: 'active',
    requests: 8432,
    lastUsed: '2 minutes ago'
  },
  {
    id: 2,
    name: 'Development API',
    key: 'sk-omega-****************************5678',
    status: 'active',
    requests: 2341,
    lastUsed: '1 hour ago'
  }
]

const mockPopularModels = [
  { name: 'GPT-4o', usage: 45, requests: 5670 },
  { name: 'Claude 3.5 Sonnet', usage: 32, requests: 4011 },
  { name: 'Gemini Pro', usage: 23, requests: 2885 }
]

export default function Dashboard() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('overview')

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2)}`
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'text_generation':
        return <Brain className="w-4 h-4 text-blue-400" />
      case 'image_analysis':
        return <Eye className="w-4 h-4 text-green-400" />
      case 'code_generation':
        return <Code className="w-4 h-4 text-purple-400" />
      default:
        return <Activity className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'text-green-400' : 'text-red-400'
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome back, {user?.Username || 'User'}!
              </h1>
              <p className="text-white/60">
                Here's what's happening with your AI models today.
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 text-white placeholder:text-white/40 rounded-md w-64"
                />
              </div>
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2 rounded-md font-medium transition-all">
                <Plus className="w-4 h-4 mr-2 inline" />
                Knight Omega Key
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {[
            {
              title: 'Total Requests',
              value: formatNumber(mockStats.totalRequests),
              change: '+12.5%',
              trend: 'up',
              icon: <BarChart3 className="w-6 h-6" />,
              color: 'blue'
            },
            {
              title: 'Tokens Used',
              value: formatNumber(mockStats.tokensUsed),
              change: '+8.2%',
              trend: 'up',
              icon: <Zap className="w-6 h-6" />,
              color: 'yellow'
            },
            {
              title: 'Cost This Month',
              value: formatCurrency(mockStats.costThisMonth),
              change: '-2.1%',
              trend: 'down',
              icon: <DollarSign className="w-6 h-6" />,
              color: 'green'
            },
            {
              title: 'Active Models',
              value: mockStats.activeModels.toString(),
              change: '+1',
              trend: 'up',
              icon: <Database className="w-6 h-6" />,
              color: 'purple'
            }
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-lg p-6 hover:border-white/20 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-${stat.color}-500/20 flex items-center justify-center`}>
                  <div className={`text-${stat.color}-400`}>
                    {stat.icon}
                  </div>
                </div>
                <div className={`flex items-center space-x-1 text-sm ${
                  stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {stat.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span>{stat.change}</span>
                </div>
              </div>
              <h3 className="text-white/60 text-sm font-medium mb-1">{stat.title}</h3>
              <p className="text-white text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 border border-white/10 rounded-lg p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
                <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {mockRecentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      {getActivityIcon(activity.type)}
                      <div>
                        <p className="text-white font-medium">{activity.model}</p>
                        <p className="text-white/60 text-sm">
                          {activity.tokens.toLocaleString()} tokens • {activity.cost > 0 ? `$${activity.cost.toFixed(2)}` : 'Free'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white/60 text-sm">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Popular Models */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/5 border border-white/10 rounded-lg p-6"
            >
              <h2 className="text-xl font-semibold text-white mb-6">Popular Models</h2>
              <div className="space-y-4">
                {mockPopularModels.map((model, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-600/20 flex items-center justify-center">
                        <Brain className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{model.name}</p>
                        <p className="text-white/60 text-sm">
                          {model.requests.toLocaleString()} requests
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-medium">{model.usage}%</p>
                      <div className="w-16 h-2 bg-white/10 rounded-full mt-1">
                        <div
                          className="h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                          style={{ width: `${model.usage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* API Keys */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/5 border border-white/10 rounded-lg p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">API Keys</h2>
                <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                  Manage
                </button>
              </div>
              <div className="space-y-4">
                {mockApiKeys.map((apiKey) => (
                  <div
                    key={apiKey.id}
                    className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-white font-medium">{apiKey.name}</h3>
                      <span className={`text-sm ${getStatusColor(apiKey.status)}`}>
                        {apiKey.status}
                      </span>
                    </div>
                    <p className="text-white/60 text-sm font-mono mb-2">{apiKey.key}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/60">{apiKey.requests.toLocaleString()} requests</span>
                      <span className="text-white/60">{apiKey.lastUsed}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white/5 border border-white/10 rounded-lg p-6"
            >
              <h2 className="text-xl font-semibold text-white mb-6">Quick Actions</h2>
              <div className="space-y-3">
                {[
                  { icon: <Key className="w-4 h-4" />, label: 'Create API Key', color: 'blue' },
                  { icon: <Settings className="w-4 h-4" />, label: 'View Settings', color: 'gray' },
                  { icon: <Globe className="w-4 h-4" />, label: 'Documentation', color: 'green' },
                  { icon: <BarChart3 className="w-4 h-4" />, label: 'Usage Analytics', color: 'purple' }
                ].map((action, index) => (
                  <button
                    key={index}
                    className="flex items-center space-x-3 w-full p-3 text-left bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <div className={`w-8 h-8 rounded-lg bg-${action.color}-500/20 flex items-center justify-center`}>
                      <div className={`text-${action.color}-400`}>
                        {action.icon}
                      </div>
                    </div>
                    <span className="text-white font-medium">{action.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}