import React, { useEffect, useState } from 'react';
import { Rocket } from 'lucide-react';

const RocketAnimation = ({ isVisible, message, onComplete }) => {
  const [showRocket, setShowRocket] = useState(false);
  const [showFlames, setShowFlames] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShowRocket(true);
      setShowFlames(true);

      const timer = setTimeout(() => {
        setShowRocket(false);
        setShowFlames(false);
        if (onComplete) onComplete();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
     <div className="fixed inset-0 z-50 flex flex-col items-center justify-center">
      {/* Backdrop blur */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-lg" />
      
      {/* Rocket */}
      {showRocket && (
        <div className="rocket-launch relative z-10">
          <Rocket 
            size={80} 
            className="text-primary rotate-45 drop-shadow-[0_0_20px_rgba(99,102,241,0.8)]" 
          />
          
          {/* Flame trail */}
          {showFlames && (
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
              <div className="flame-trail w-6 h-16 bg-gradient-to-t from-orange-500 via-red-500 to-yellow-400 rounded-full blur-sm" />
              <div className="flame-trail w-4 h-12 bg-gradient-to-t from-orange-400 via-red-400 to-yellow-300 rounded-full blur-sm absolute left-1/2 top-2 transform -translate-x-1/2" />
            </div>
          )}
        </div>
      )}
      
      {/* Loading message */}
      <div className="relative z-10 mt-16 text-center">
        <p className="text-2xl font-bold text-primary animate-pulse">
          {message}
        </p>
        <div className="mt-4 flex justify-center space-x-1">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-0" />
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-100" />
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-200" />
        </div>
      </div>
    </div>
  );
};

export default RocketAnimation;
