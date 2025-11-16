import { Sidebar } from './Sidebar'
import { Outlet } from 'react-router-dom'

export function ConsoleLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto ml-64">
          <Outlet />
        </main>
      </div>
    </div>
  )
}