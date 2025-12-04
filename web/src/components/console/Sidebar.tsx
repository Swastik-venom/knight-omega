import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '@/lib/auth'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Key,
  CreditCard,
  Settings,
  Users,
  Server,
  FileText,
  Image,
  ListChecks,
  Brain,
  ChevronLeft,
  ChevronRight,
  Ticket,
  ShieldCheck,
  MessageSquare
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface NavItem {
  title: string
  href: string
  icon: any
  adminOnly?: boolean
}

interface NavSection {
  title?: string
  items: NavItem[]
}

// User navigation items
const userNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/console/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Playground',
    href: '/console/playground',
    icon: MessageSquare,
  },
  {
    title: 'API Keys',
    href: '/console/api-keys',
    icon: Key,
  },
  {
    title: 'Usage Logs',
    href: '/console/logs',
    icon: FileText,
  },
  {
    title: 'Wallet',
    href: '/console/topup',
    icon: CreditCard,
  },
  {
    title: 'Settings',
    href: '/console/settings',
    icon: Settings,
  },
]

// Admin navigation items
const adminNavItems: NavItem[] = [
  {
    title: 'Channel',
    href: '/console/channel',
    icon: Server,
    adminOnly: true,
  },
  {
    title: 'Models',
    href: '/console/models',
    icon: Brain,
    adminOnly: true,
  },
  {
    title: 'Redemption',
    href: '/console/redemption',
    icon: Ticket,
    adminOnly: true,
  },
  {
    title: 'User',
    href: '/console/user',
    icon: Users,
    adminOnly: true,
  },
  {
    title: 'Setting',
    href: '/console/settings',
    icon: Settings,
    adminOnly: true,
  },
]

export function Sidebar() {
  const location = useLocation()
  const { user, systemStatus } = useAuth()
  const [collapsed, setCollapsed] = useState(false)
  
  // Get logo and system name
  const logo = systemStatus?.logo || localStorage.getItem('logo') || '/logo.png'
  const systemName = systemStatus?.system_name || localStorage.getItem('system_name') || 'Knight-Omega'
  
  // Check if user is admin - check both Role (capital) and role (lowercase) for compatibility
  const isAdmin = (() => {
    if (!user) return false;
    // Try capital R first (Knight Omega format)
    if (user.Role !== undefined) return user.Role >= 10;
    // Try lowercase r (old format)
    if (user.role !== undefined) return user.role >= 10;
    // Fallback: check localStorage directly
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        return (parsed.role >= 10) || (parsed.Role >= 10);
      }
    } catch (e) {
      console.error('Failed to parse user from localStorage:', e);
    }
    return false;
  })();

  const renderNavItem = (item: NavItem) => {
    const Icon = item.icon
    const isActive = location.pathname === item.href ||
                     (item.href.includes('?')
                       ? location.pathname + location.search === item.href
                       : location.pathname.startsWith(item.href + '/'))
    
    return (
      <motion.div
        key={item.href}
        whileHover={{ x: 4 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <Link
          to={item.href}
          className={cn(
            'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
            isActive
              ? 'bg-white/10 text-white border border-white/15 shadow-[0_4px_12px_rgba(0,0,0,0.3)]'
              : 'text-white/60 hover:bg-white/5 hover:text-white/90'
          )}
        >
          <Icon className="h-5 w-5 flex-shrink-0" />
          {!collapsed && <span>{item.title}</span>}
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.div
      className={cn(
        'fixed left-0 top-0 z-40 h-screen border-r border-white/10 bg-black/95 backdrop-blur-2xl transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center border-b border-white/10 px-4">
          {!collapsed && (
            <Link to="/" className="flex items-center gap-2 group">
              <motion.div
                className="flex h-8 w-8 items-center justify-center rounded-xl overflow-hidden bg-white/10 border border-white/20"
                whileHover={{ rotate: 4, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                {logo ? (
                  <img src={logo} alt={systemName} className="h-full w-full object-cover" />
                ) : (
                  <span className="text-sm font-bold text-white">KΩ</span>
                )}
              </motion.div>
              <span className="font-semibold text-white group-hover:text-white/90 transition-colors">{systemName}</span>
            </Link>
          )}
          {collapsed && (
            <motion.div
              className="flex h-8 w-8 items-center justify-center rounded-xl overflow-hidden bg-white/10 border border-white/20 mx-auto"
              whileHover={{ rotate: 4, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              {logo ? (
                <img src={logo} alt={systemName} className="h-full w-full object-cover" />
              ) : (
                <span className="text-sm font-bold text-white">KΩ</span>
              )}
            </motion.div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {/* User Section */}
          {userNavItems.map(renderNavItem)}
          
          {/* Admin Section */}
          {isAdmin && (
            <>
              {!collapsed && (
                <div className="px-3 py-2 mt-6 mb-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-white/40 uppercase tracking-wider">
                    <ShieldCheck className="h-3 w-3" />
                    <span>Admin</span>
                  </div>
                </div>
              )}
              {collapsed && (
                <div className="border-t border-white/10 my-4" />
              )}
              {adminNavItems.map(renderNavItem)}
            </>
          )}
        </nav>

        {/* Collapse Button */}
        <div className="border-t border-white/10 p-3">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-center text-white/60 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/10 transition-all duration-200"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <>
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  <span>Collapse</span>
                </>
              )}
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}