'use client';
import { useRef, ReactNode, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
  style?: React.CSSProperties;
}

export function TiltCard({ children, className = '', intensity = 10, style }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [intensity, -intensity]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-intensity, intensity]);

  useEffect(() => {
    setIsTouch(window.matchMedia('(hover: none)').matches);
  }, []);

  useEffect(() => {
    if (shouldReduceMotion || isTouch) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovered || !ref.current) return;
      
      // Request animation frame for performance
      requestAnimationFrame(() => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        
        x.set(xPct);
        y.set(yPct);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isHovered, x, y, shouldReduceMotion, isTouch]);

  if (shouldReduceMotion || isTouch) {
    return <div className={`glass-card ${className}`}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        ...style
      }}
      className={`glass-card will-change-transform transition-shadow duration-300 ${
        isHovered ? 'shadow-2xl shadow-[var(--accent)]/15' : ''
      } ${className}`}
    >
      <div style={{ transform: 'translateZ(30px)' }} className="h-full w-full">
        {children}
      </div>
    </motion.div>
  );
}
