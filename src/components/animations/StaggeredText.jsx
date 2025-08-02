import React, { useEffect, useRef, useState } from 'react';

export function StaggeredText({
  text,
  className = '',
  staggerDelay = 50,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const words = text.split(' ');

  return (
    <div ref={elementRef} className={className}>
      {words.map((word, index) => (
        <span
          key={index}
          className={`inline-block transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{
            transitionDelay: `${index * staggerDelay}ms`,
          }}
        >
          {word}&nbsp;
        </span>
      ))}
    </div>
  );
}
