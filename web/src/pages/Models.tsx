import { useAuth } from "@/lib/auth"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Brain, RefreshCw, Plus, Edit, Eye, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { api } from "@/lib/api"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"

interface Model {
  id: string
  name: string
  description?: string
  category?: string
  provider?: string
  maxTokens?: number
  latency?: number
  status?: "active" | "inactive"
  tags?: string[]
  vendorId?: string
  type?: number
  enabled?: boolean
}

export default function ModelsPage() {
  const { user, isAuthenticated } = useAuth()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [models, setModels] = useState<Model[]>([])
  const [filteredModels, setFilteredModels] = useState<Model[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [selectedModels, setSelectedModels] = useState<string[]>([])

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchModels()
    }
  }, [isAuthenticated, user])

  const fetchModels = async () => {
    try {
      setLoading(true)
      const res = await api.get<any>("/api/model")
      if (res.success && res.data) {
        // Transform the data to match our interface
        const modelData = Array.isArray(res.data) ? res.data : []
        const transformedModels = modelData.map((model: any) => ({
          id: model.id || model.name,
          name: model.name || model.id,
          description: model.description || '',
          category: model.type === 1 ? 'chat' : model.type === 2 ? 'embedding' : 'other',
          provider: model.vendor || 'Unknown',
          maxTokens: model.max_tokens || 0,
          latency: 0,
          status: model.enabled ? 'active' : 'inactive',
          tags: model.tags || [],
          vendorId: model.vendor_id,
          type: model.type,
          enabled: model.enabled
        }))
        setModels(transformedModels)
        setFilteredModels(transformedModels)
      }
    } catch (error) {
      console.error("Failed to fetch models:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load models."
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let filtered = models
    if (searchTerm) {
      filtered = filtered.filter(model => 
        model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (model.description && model.description.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }
    if (filterCategory !== "all") {
      filtered = filtered.filter(model => model.category === filterCategory)
    }
    setFilteredModels(filtered)
  }, [searchTerm, filterCategory, models])

  const categories = ["all", "chat", "embedding", "other"]

  if (!isAuthenticated) {
    return <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg text-muted-foreground">Please log in to access models</p>
    </div>
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Models</h1>
          <p className="text-muted-foreground">Browse and manage available AI models.</p>
        </div>
        <Button onClick={fetchModels} variant="outline" disabled={loading}>
          <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-2 flex-1 max-w-md w-full">
              <Search className="h-4 w-4" />
              <Input
                placeholder="Search models by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Models Table */}
      <Card>
        <CardHeader>
          <CardTitle>Model List ({filteredModels.length})</CardTitle>
          <CardDescription>Manage your AI models with full control.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-4 p-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredModels.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">
                      <Checkbox
                        checked={selectedModels.length === filteredModels.length}
                        onCheckedChange={(checked) => {
                          setSelectedModels(checked ? filteredModels.map(m => m.id) : [])
                        }}
                      />
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredModels.map((model) => (
                    <TableRow key={model.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedModels.includes(model.id)}
                          onCheckedChange={(checked) => {
                            setSelectedModels(checked 
                              ? [...selectedModels, model.id] 
                              : selectedModels.filter(id => id !== model.id)
                            )
                          }}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{model.name}</TableCell>
                      <TableCell className="max-w-xs truncate">{model.description || '-'}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{model.category}</Badge>
                      </TableCell>
                      <TableCell>{model.provider}</TableCell>
                      <TableCell>
                        <Badge variant={model.status === "active" ? "default" : "secondary"}>
                          {model.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <Brain className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Models Found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search or filters to find models.</p>
              <Button onClick={fetchModels} variant="outline">
                Refresh Models
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}