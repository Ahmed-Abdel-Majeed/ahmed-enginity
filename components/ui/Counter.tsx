'use client';
import { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation, useMotionValue, useTransform, animate } from 'framer-motion';

export function Counter({ value, className = '' }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  // Extract number and suffix/prefix (e.g., "50+", "100K+")
  const numericMatch = value.match(/\d+/);
  const numericValue = numericMatch ? parseInt(numericMatch[0], 10) : 0;
  const prefix = numericMatch ? value.substring(0, numericMatch.index) : '';
  const suffix = numericMatch ? value.substring(numericMatch.index! + numericMatch[0].length) : value;

  useEffect(() => {
    if (isInView && ref.current && numericValue > 0) {
      animate(0, numericValue, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (latest) => {
          if (ref.current) {
            ref.current.textContent = `${prefix}${Math.floor(latest)}${suffix}`;
          }
        },
      });
    }
  }, [isInView, numericValue, prefix, suffix]);

  return <span ref={ref} className={className}>{value}</span>;
}
