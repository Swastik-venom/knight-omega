"use client"

import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"

interface MarqueeProps {
  className?: string
  reverse?: boolean
  pauseOnHover?: boolean
  children?: React.ReactNode
  vertical?: boolean
  repeat?: number
  [key: string]: any
}

export function Marquee({
  className,
  reverse,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  const [duration, setDuration] = useState(50) // 50 seconds default
  const [startX, setStartX] = useState(0)
  const [startY, setStartY] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const resize = () => {
      if (vertical) {
        setStartY(-containerRef.current!.offsetHeight)
        const duration = Math.round((containerRef.current!.offsetHeight * repeat) / 100)
        setDuration(duration)
      } else {
        setStartX(-containerRef.current!.offsetWidth)
        const duration = Math.round((containerRef.current!.offsetWidth * repeat) / 100)
        setDuration(duration)
      }
    }

    resize()
    window.addEventListener("resize", resize)
    return () => window.removeEventListener("resize", resize)
  }, [repeat, vertical])

  return (
    <div
      ref={containerRef}
      className={cn(
        "group flex overflow-hidden p-2",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className
      )}
      {...props}
    >
      <div
        className={cn("flex shrink-0 justify-around", {
          "flex-row": !vertical,
          "flex-col": vertical,
        })}
        onMouseEnter={() => pauseOnHover && setIsHovered(true)}
        onMouseLeave={() => pauseOnHover && setIsHovered(false)}
      >
        {[...Array(repeat)].map((_, i) => (
          <div
            key={i}
            className={cn("flex shrink-0 justify-around", {
              "flex-row": !vertical,
              "flex-col": vertical,
            })}
            style={{
              animation: vertical
                ? `marquee-vertical ${duration}s linear infinite ${reverse ? "reverse" : "normal"} ${isHovered ? "paused" : "running"}`
                : `marquee-horizontal ${duration}s linear infinite ${reverse ? "reverse" : "normal"} ${isHovered ? "paused" : "running"}`,
            }}
          >
            {children}
          </div>
        ))}
      </div>
    </div>
  )
}


