import React from 'react';
import { Code2, Zap, Shield, Sparkles } from 'lucide-react';
const WelcomeSection = () => {
  const features = [
    {
      icon: Code2,
      title: 'Developer-First',
      description: 'Built for modern development workflows',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized performance and instant loading',
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security and uptime',
    },
    {
      icon: Sparkles,
      title: 'AI-Powered',
      description: 'Smart automation and intelligent insights',
    },
  ];

  return (
    <div className="flex flex-col justify-center h-[85%] px-6 lg:px-16">
      {/* Welcome Text */}
      <div className="mb-12">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight space-y-2">
          <span className="block fade-in-up delay-100 bg-gradient-to-r from-primary to-accent bg-clip-text text-muted-foreground">
            Welcome back to
          </span>
         
          <span className="block fade-in-up delay-300 text-foreground">
            S8Builder
          </span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-muted-foreground fade-in-up delay-400 max-w-xl">
          The ultimate platform for building, deploying, and scaling your applications with ease.
        </p>
      </div>

      {/* Features */}
      <div className="space-y-5">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.title}
              className={`flex items-start space-x-4 fade-in-left delay-${500 + index * 100} group cursor-pointer`}
            >
              <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 group-hover:border-primary/40 group-hover:bg-primary/20 transition-all duration-300">
                <Icon size={22} className="text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WelcomeSection;
