'use client';

import { forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/utils/cn';

interface CardProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  glass?: boolean;
  hover?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, glass = false, hover = true, children, ...props }, ref) => {
    const baseStyles = 'rounded-2xl p-6 transition-all';
    const glassStyles = glass ? 'glass' : 'bg-card border border-border';
    const hoverStyles = hover ? 'hover:shadow-lg hover:-translate-y-1' : '';

    return (
      <motion.div
        ref={ref}
        className={cn(baseStyles, glassStyles, hoverStyles, className)}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
