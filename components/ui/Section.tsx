import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/utils/cn';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  container?: boolean;
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, container = true, children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn('py-16 md:py-24', className)}
        {...props}
      >
        {container ? (
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
            {children}
          </div>
        ) : (
          children
        )}
      </section>
    );
  }
);

Section.displayName = 'Section';

export default Section;
