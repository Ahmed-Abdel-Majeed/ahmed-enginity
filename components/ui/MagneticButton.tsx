'use client';
import { useRef, ReactNode, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  as?: any;
  href?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export function MagneticButton({ children, className = '', as: Component = 'button', ...props }: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (shouldReduceMotion) return;
    if (!ref.current) return;
    
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Magnetic pull strength
    const strength = 15;
    
    const moveX = ((clientX - centerX) / (width / 2)) * strength;
    const moveY = ((clientY - centerY) / (height / 2)) * strength;
    
    x.set(moveX);
    y.set(moveY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  if (shouldReduceMotion) {
    return (
      <Component className={className} {...props}>
        {children}
      </Component>
    );
  }

  const MotionComponent = motion(Component as any);

  return (
    <MotionComponent
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        x: mouseXSpring,
        y: mouseYSpring,
        ...props.style
      }}
      className={className}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}
