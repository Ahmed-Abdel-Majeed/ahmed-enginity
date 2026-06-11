'use client'
import { useEffect, useRef } from 'react'

export default function Cursor() {
  const curRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0
    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      if (curRef.current) { curRef.current.style.left = (mx - 4) + 'px'; curRef.current.style.top = (my - 4) + 'px' }
    }
    document.addEventListener('mousemove', onMove)
    let raf: number
    function animRing() {
      rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12
      if (ringRef.current) { ringRef.current.style.left = (rx - 16) + 'px'; ringRef.current.style.top = (ry - 16) + 'px' }
      raf = requestAnimationFrame(animRing)
    }
    animRing()
    const els = document.querySelectorAll('a,button')
    const enter = () => { if (ringRef.current) { ringRef.current.style.transform = 'scale(2)'; ringRef.current.style.borderColor = 'rgba(0,212,255,.6)' } }
    const leave = () => { if (ringRef.current) { ringRef.current.style.transform = 'scale(1)'; ringRef.current.style.borderColor = 'rgba(0,212,255,.4)' } }
    els.forEach(el => { el.addEventListener('mouseenter', enter); el.addEventListener('mouseleave', leave) })
    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      els.forEach(el => { el.removeEventListener('mouseenter', enter); el.removeEventListener('mouseleave', leave) })
    }
  }, [])

  return (
    <>
      <div ref={curRef} className="fixed w-2 h-2 rounded-full pointer-events-none z-[9999]" style={{ background: 'var(--accent)', mixBlendMode: 'screen', top: 0, left: 0 }} />
      <div ref={ringRef} className="fixed w-8 h-8 rounded-full pointer-events-none z-[9998] transition-transform duration-150" style={{ border: '1px solid rgba(0,212,255,.4)', mixBlendMode: 'screen', top: 0, left: 0 }} />
    </>
  )
}
