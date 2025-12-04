import { Sidebar } from './Sidebar'
import { Outlet } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'

export function ConsoleLayout() {
  const location = useLocation()
  
  return (
    <div className="flex min-h-screen flex-col bg-black relative overflow-hidden">
      {/* Background gradients matching landing page */}
      <div className="absolute inset-0 z-0">
        {/* Top gradient - Pearl mist */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 50% 35% at 50% 0%, rgba(226, 232, 240, 0.08), transparent 60%)",
          }}
        />

        {/* Middle gradient - Blue to purple transition */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 60% 40% at 50% 45%, rgba(59, 130, 246, 0.05), transparent 70%)",
          }}
        />

        {/* Bottom gradient - Purple to cyan */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 55% 35% at 50% 85%, rgba(168, 85, 247, 0.04), transparent 65%)",
          }}
        />

        {/* Ambient glow effects */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-20 w-96 h-96 bg-purple-500/3 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-cyan-500/3 rounded-full blur-3xl" />
      </div>
      
      <div className="flex flex-1 overflow-hidden relative z-10">
        <Sidebar />
        <main className="flex-1 overflow-y-auto ml-64">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="min-h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}