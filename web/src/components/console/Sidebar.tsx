import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '@/lib/auth'
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
  ChevronRight
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface NavItem {
  title: string
  href: string
  icon: any
  adminOnly?: boolean
}

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/console/dashboard',
    icon: LayoutDashboard,
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
  {
    title: 'Models',
    href: '/console/models',
    icon: Brain,
    adminOnly: true,
  },
  {
    title: 'Channels',
    href: '/console/channels',
    icon: Server,
    adminOnly: true,
  },
  {
    title: 'Users',
    href: '/console/users',
    icon: Users,
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
  
  const isAdmin = user?.Role && user.Role >= 10

  // Filter items based on admin status
  const filteredItems = navItems.filter(item => !item.adminOnly || isAdmin)

  return (
    <div
      className={cn(
        'fixed left-0 top-0 z-40 h-screen border-r border-border/40 bg-card/95 backdrop-blur-xl transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center border-b border-border/40 px-4">
          {!collapsed && (
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg overflow-hidden bg-primary/10">
                {logo ? (
                  <img src={logo} alt={systemName} className="h-full w-full object-cover" />
                ) : (
                  <span className="text-sm font-bold text-primary">KΩ</span>
                )}
              </div>
              <span className="font-semibold">{systemName}</span>
            </Link>
          )}
          {collapsed && (
            <div className="flex h-8 w-8 items-center justify-center rounded-lg overflow-hidden bg-primary/10 mx-auto">
              {logo ? (
                <img src={logo} alt={systemName} className="h-full w-full object-cover" />
              ) : (
                <span className="text-sm font-bold text-primary">KΩ</span>
              )}
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-2">
          {filteredItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + '/')
            
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                )}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span>{item.title}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Collapse Button */}
        <div className="border-t border-border/40 p-2">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-center"
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
        </div>
      </div>
    </div>
  )
}