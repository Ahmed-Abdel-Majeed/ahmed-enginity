'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export default function Cursor() {
  const [isHovered, setIsHovered] = useState(false)
  const [isTouch, setIsTouch] = useState(false)
  
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  
  const springConfig = { stiffness: 500, damping: 28, mass: 0.5 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) {
      setIsTouch(true)
      return
    }

    const mouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const mouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive = target.closest('a') || target.closest('button') || target.closest('.glass-card') || target.closest('[role="button"]')
      setIsHovered(!!isInteractive)
    }

    document.addEventListener('mousemove', mouseMove)
    document.addEventListener('mouseover', mouseOver)

    return () => {
      document.removeEventListener('mousemove', mouseMove)
      document.removeEventListener('mouseover', mouseOver)
    }
  }, [mouseX, mouseY])

  if (isTouch) return null;

  return (
    <>
      <motion.div 
        className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9999]" 
        style={{ 
          background: 'var(--accent)', 
          x: useSpring(mouseX, { stiffness: 1000, damping: 40 }), 
          y: useSpring(mouseY, { stiffness: 1000, damping: 40 }),
          translateX: '-50%',
          translateY: '-50%',
          scale: isHovered ? 0 : 1,
          opacity: 0.8
        }} 
      />
      <motion.div 
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] border border-[var(--accent)] bg-[var(--accent)]/10 backdrop-blur-[2px]" 
        style={{ 
          width: 32,
          height: 32,
          x, 
          y,
          translateX: '-50%',
          translateY: '-50%',
        }}
        initial={false}
        animate={{
          scale: isHovered ? 2.5 : 1,
          opacity: isHovered ? 0.4 : 0.8,
          borderWidth: isHovered ? '2px' : '1px'
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      />
    </>
  )
}
