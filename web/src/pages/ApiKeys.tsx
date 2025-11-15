import { useAuth } from "@/lib/auth"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Copy, Trash2, RefreshCw, Eye, EyeOff, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { api } from "@/lib/api"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Token {
  id: number
  name: string
  key: string
  status: number
  created_time: number
  accessed_time: number
  expired_time: number
  remain_quota: number
  unlimited_quota: boolean
}

export default function ApiKeysPage() {
  const { user, isAuthenticated } = useAuth()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [tokens, setTokens] = useState<Token[]>([])
  const [selectedTokens, setSelectedTokens] = useState<number[]>([])
  const [showKeys, setShowKeys] = useState<{ [key: number]: boolean }>({})
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [newTokenName, setNewTokenName] = useState("")
  const [newTokenExpire, setNewTokenExpire] = useState("0")

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchTokens()
    }
  }, [isAuthenticated, user])

  const fetchTokens = async () => {
    try {
      setLoading(true)
      const res = await api.get<any>("/api/token")
      if (res.success && res.data) {
        setTokens(Array.isArray(res.data) ? res.data : [])
      }
    } catch (error) {
      console.error("Failed to fetch tokens:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load API keys."
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCreateToken = async () => {
    if (!newTokenName.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a token name."
      })
      return
    }

    try {
      const res = await api.post<any>("/api/token", {
        name: newTokenName,
        expired_time: parseInt(newTokenExpire) || 0,
        remain_quota: 0,
        unlimited_quota: true
      })
      
      if (res.success) {
        toast({
          title: "Success",
          description: "API key created successfully!"
        })
        setShowCreateDialog(false)
        setNewTokenName("")
        setNewTokenExpire("0")
        fetchTokens()
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to create API key."
      })
    }
  }

  const handleDeleteToken = async (id: number) => {
    try {
      const res = await api.delete<any>(`/api/token/${id}`)
      if (res.success) {
        toast({
          title: "Success",
          description: "API key deleted successfully."
        })
        fetchTokens()
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete API key."
      })
    }
  }

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(`sk-${key}`)
    toast({
      title: "Copied!",
      description: "API key copied to clipboard."
    })
  }

  const toggleKeyVisibility = (id: number) => {
    setShowKeys(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const formatDate = (timestamp: number) => {
    if (!timestamp) return 'Never'
    return new Date(timestamp * 1000).toLocaleDateString()
  }

  if (!isAuthenticated) {
    return <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg text-muted-foreground">Please log in to access API keys</p>
    </div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">API Keys</h1>
          <p className="text-muted-foreground">Manage your API keys for accessing the service.</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={fetchTokens} variant="outline" disabled={loading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
          </Button>
          <Button onClick={() => setShowCreateDialog(true)}>
            <Plus className="mr-2 h-4 w-4" /> Create New Key
          </Button>
        </div>
      </div>

      {/* Tokens Table */}
      <Card>
        <CardHeader>
          <CardTitle>Your API Keys ({tokens.length})</CardTitle>
          <CardDescription>These keys allow you to access the API programmatically.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-4 p-4">
                  <Skeleton className="h-12 w-12 rounded" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              ))}
            </div>
          ) : tokens.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">
                      <Checkbox
                        checked={selectedTokens.length === tokens.length}
                        onCheckedChange={(checked) => {
                          setSelectedTokens(checked ? tokens.map(t => t.id) : [])
                        }}
                      />
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Key</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Last Used</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tokens.map((token) => (
                    <TableRow key={token.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedTokens.includes(token.id)}
                          onCheckedChange={(checked) => {
                            setSelectedTokens(checked 
                              ? [...selectedTokens, token.id] 
                              : selectedTokens.filter(id => id !== token.id)
                            )
                          }}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{token.name}</TableCell>
                      <TableCell className="font-mono text-sm">
                        <div className="flex items-center gap-2">
                          {showKeys[token.id] ? `sk-${token.key}` : 'sk-••••••••••••••••'}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleKeyVisibility(token.id)}
                          >
                            {showKeys[token.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={token.status === 1 ? "default" : "secondary"}>
                          {token.status === 1 ? "Active" : "Disabled"}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(token.created_time)}</TableCell>
                      <TableCell>{formatDate(token.accessed_time)}</TableCell>
                      <TableCell className="space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopyKey(token.key)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteToken(token.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <Plus className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No API Keys</h3>
              <p className="text-muted-foreground mb-4">Create your first API key to get started.</p>
              <Button onClick={() => setShowCreateDialog(true)}>
                <Plus className="mr-2 h-4 w-4" /> Create API Key
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create Token Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New API Key</DialogTitle>
            <DialogDescription>
              Create a new API key to access the service programmatically.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Key Name</Label>
              <Input
                id="name"
                placeholder="My API Key"
                value={newTokenName}
                onChange={(e) => setNewTokenName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expire">Expiration</Label>
              <Select value={newTokenExpire} onValueChange={setNewTokenExpire}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Never</SelectItem>
                  <SelectItem value="86400">1 Day</SelectItem>
                  <SelectItem value="604800">7 Days</SelectItem>
                  <SelectItem value="2592000">30 Days</SelectItem>
                  <SelectItem value="7776000">90 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateToken}>
              Create Key
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}