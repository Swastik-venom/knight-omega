import { Sidebar } from './Sidebar'
import { Outlet } from 'react-router-dom'

export function ConsoleLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <main className="flex-1 overflow-y-auto ml-64">
        <div className="container mx-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}