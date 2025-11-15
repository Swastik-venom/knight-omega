import { useAuth } from "@/lib/auth"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, Server, HelpCircle, Gauge, TrendingUp, DollarSign, Users, Activity, RefreshCw, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { api } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"

export default function DashboardPage() {
  const { user, isAuthenticated, systemStatus } = useAuth()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    balance: 0,
    quota: 0,
    requests: 0,
    models: 0,
    usage: 0,
  })
  const [announcements, setAnnouncements] = useState<any[]>([])
  const [apiInfo, setApiInfo] = useState<any[]>([])
  const [faq, setFaq] = useState<any[]>([])
  const [uptime, setUptime] = useState({
    status: 'Operational',
    percentage: '99.9%',
    message: 'All services operational'
  })

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchDashboardData()
    }
  }, [isAuthenticated, user])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)

      // Fetch user stats
      const statsRes = await api.get<any>("/api/user/self")
      if (statsRes.success) {
        const userData = statsRes.data
        setStats({
          balance: userData.used_quota || 0,
          quota: userData.quota || 0,
          requests: userData.request_count || 0,
          models: userData.available_models ? userData.available_models.length : 0,
          usage: userData.used_quota && userData.quota ? Math.min(100, Math.round((userData.used_quota / userData.quota) * 100)) : 0
        })
      }

      // Fetch announcements from system status
      if (systemStatus?.announcements) {
        setAnnouncements(Array.isArray(systemStatus.announcements) ? systemStatus.announcements : [])
      }

      // Fetch API info
      if (systemStatus?.api_info) {
        setApiInfo(systemStatus.api_info || [])
      }

      // Fetch FAQ
      if (systemStatus?.faq) {
        setFaq(systemStatus.faq || [])
      }

      // Mock uptime data
      setUptime({
        status: 'Operational',
        percentage: '99.9%',
        message: 'All services operational'
      })
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error)
      toast({
        title: "Error",
        description: "Failed to load dashboard data. Please try again later.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good Morning'
    if (hour < 18) return 'Good Afternoon'
    return 'Good Evening'
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">Please log in to access the dashboard</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{getGreeting()}, {user?.Username || user?.username}!</h1>
          <p className="text-muted-foreground">Welcome to your dashboard</p>
        </div>
        <Button onClick={fetchDashboardData} variant="outline" disabled={loading}>
          <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? <Skeleton className="h-8 w-20" /> : `$${((stats.quota - stats.balance) / 500000).toFixed(2)}`}
            </div>
            <p className="text-xs text-muted-foreground">Available balance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Spent</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? <Skeleton className="h-8 w-20" /> : `$${(stats.balance / 500000).toFixed(2)}`}
            </div>
            <p className="text-xs text-muted-foreground">Total spent</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Requests</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? <Skeleton className="h-8 w-20" /> : stats.requests.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">API requests made</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Models</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? <Skeleton className="h-8 w-20" /> : stats.models}
            </div>
            <p className="text-xs text-muted-foreground">Available models</p>
          </CardContent>
        </Card>
      </div>

      {/* Panels Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Announcements Panel */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center">
              <Bell className="h-4 w-4 mr-2" />
              <CardTitle>Announcements</CardTitle>
              <Badge className="ml-2">Latest</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 max-h-96 overflow-y-auto">
            {loading ? (
              <Skeleton className="h-32 w-full" />
            ) : announcements.length > 0 ? (
              announcements.slice(0, 5).map((ann, idx) => (
                <div key={idx} className="space-y-1 pb-3 border-b last:border-0">
                  <p className="text-sm font-medium">{ann.title || `Announcement #${idx + 1}`}</p>
                  <p className="text-xs text-muted-foreground">{ann.content || 'No content available'}</p>
                  <p className="text-xs text-muted-foreground">
                    {ann.publishDate ? new Date(ann.publishDate).toLocaleDateString() : 'Date unknown'}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground">No announcements available.</p>
            )}
          </CardContent>
        </Card>

        {/* API Info Panel */}
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <Server className="h-4 w-4 mr-2" />
              <CardTitle>API Information</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 max-h-96 overflow-y-auto">
            {loading ? (
              <Skeleton className="h-32 w-full" />
            ) : apiInfo.length > 0 ? (
              apiInfo.map((api, idx) => (
                <div key={idx} className="space-y-1 pb-2 border-b last:border-0">
                  <p className="text-sm font-medium">{api.route || `API #${idx + 1}`}</p>
                  <p className="text-xs break-all text-blue-500">{api.url || 'No URL provided'}</p>
                  <p className="text-xs text-muted-foreground">{api.description || 'No description'}</p>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground">No API info available.</p>
            )}
          </CardContent>
        </Card>

        {/* FAQ Panel */}
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <HelpCircle className="h-4 w-4 mr-2" />
              <CardTitle>FAQ</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 max-h-96 overflow-y-auto">
            {loading ? (
              <Skeleton className="h-32 w-full" />
            ) : faq.length > 0 ? (
              faq.slice(0, 3).map((item, idx) => (
                <div key={idx} className="pb-2 border-b last:border-0">
                  <p className="text-sm font-medium">{item.question || `Q${idx + 1}`}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.answer || 'No answer provided'}</p>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground">No FAQ available.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Service Status */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Gauge className="h-4 w-4 mr-2" />
              <CardTitle>Service Status</CardTitle>
            </div>
            <Button variant="ghost" size="sm" onClick={fetchDashboardData}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-32 w-full" />
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Overall Status</span>
                <Badge variant={uptime.status === 'Operational' ? 'default' : 'destructive'}>
                  {uptime.status}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Uptime</span>
                <span className="text-sm font-medium">{uptime.percentage}</span>
              </div>
              <div className="text-xs text-muted-foreground">{uptime.message}</div>

              {/* Status indicators per service */}
              <div className="pt-2 space-y-2 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-xs">Core API</span>
                  <Badge variant="default" className="text-xs">Operational</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs">Authentication</span>
                  <Badge variant="default" className="text-xs">Operational</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs">Dashboard</span>
                  <Badge variant="default" className="text-xs">Operational</Badge>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}