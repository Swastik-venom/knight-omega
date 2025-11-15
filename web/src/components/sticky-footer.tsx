
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

export function StickyFooter() {
  const [isAtBottom, setIsAtBottom] = useState(false)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY
          const windowHeight = window.innerHeight
          const documentHeight = document.documentElement.scrollHeight
          const isNearBottom = scrollTop + windowHeight >= documentHeight - 100

          setIsAtBottom(isNearBottom)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Check initial state
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {isAtBottom && (
        <div className="fixed z-40 bottom-0 left-0 w-full h-16 flex items-center justify-between px-6 bg-gradient-to-r from-orange-500 via-violet-500 to-blue-500 shadow-lg border-t border-white/20">
          <div className="flex items-center space-x-8 text-white text-sm font-medium">
            <h2 className="text-lg font-bold bg-gradient-to-r from-yellow-300 to-white bg-clip-text text-transparent">
              Knight-Omega
            </h2>
            <ul className="flex space-x-6">
              <li className="hover:text-yellow-200 transition-colors cursor-pointer">Home</li>
              <li className="hover:text-yellow-200 transition-colors cursor-pointer">Docs</li>
              <li className="hover:text-yellow-200 transition-colors cursor-pointer">Components</li>
            </ul>
            <ul className="flex space-x-6">
              <li className="hover:text-yellow-200 transition-colors cursor-pointer">Github</li>
              <li className="hover:text-yellow-200 transition-colors cursor-pointer">Twitter</li>
              <li className="hover:text-yellow-200 transition-colors cursor-pointer">Discord</li>
            </ul>
          </div>
        </div>
      )}
    </>
  )
}
