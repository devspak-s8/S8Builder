import React, { useEffect, useRef } from 'react';

export default function ScrollRevealEnhanced({
  children,
  direction = 'up',
  delay = 0,
  className = '',
}) {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log('Element revealed:', entry.target); // DEBUG: Check console
            setTimeout(() => {
              entry.target.classList.add('reveal-active');
            }, delay);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [delay]);

  const getTransformClass = () => {
    switch (direction) {
      case 'up': return 'translate-y-16';
      case 'down': return '-translate-y-16';
      case 'left': return 'translate-x-16';
      case 'right': return '-translate-x-16';
      default: return 'translate-y-16';
    }
  };

  return (
    <div
      ref={elementRef}
      className={`opacity-0 ${getTransformClass()} transition-all duration-1000 ease-out ${className}`}
      style={{ transform: 'translateZ(0)' }}
    >
      {children}
    </div>
  );
}
