import React from 'react';
import { useBuilder, Component } from '../contexts/BuilderContext';

export const RenderComponent = ({ component, isPreview = false }) => {
  const { state, dispatch } = useBuilder();

  const getResponsiveStyles = () => {
    const baseStyles = component.styles;
    const responsiveStyles = (component.responsive && component.responsive[state.viewport]) || {};
    return { ...baseStyles, ...responsiveStyles };
  };

  const handleClick = (e) => {
    if (isPreview) return;
    e.stopPropagation();
    dispatch({ type: 'SELECT_COMPONENT', payload: component });
  };

  const isSelected = state.selectedComponent && state.selectedComponent.id === component.id && !isPreview;

  const getAnimationClass = (animation) => {
    if (!animation || animation.type === 'none') return '';

    const animationMap = {
      fadeIn: 'animate-fade-in',
      slideUp: 'animate-slide-up',
      slideDown: 'animate-slide-down',
      slideLeft: 'animate-slide-left',
      slideRight: 'animate-slide-right',
      bounce: 'animate-bounce-in',
      pulse: 'animate-pulse-scale',
    };

    return animationMap[animation.type] || '';
  };
  const renderContent = () => {
    const animationClass = getAnimationClass(component.animation);
    const responsiveStyles = getResponsiveStyles();
    const baseClasses = `transition-all duration-200 ${animationClass} ${
      isSelected ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-gray-900' : ''
    } ${!isPreview ? 'hover:ring-1 hover:ring-blue-400/50' : ''}`;

    switch (component.type) {
      case 'text':
        return (
          <div
            style={responsiveStyles}
            className={baseClasses}
            onClick={handleClick}
          >
            {component.content}
          </div>
        );

      case 'image':
        return (
          <img
            src={component.src}
            alt={component.alt}
            style={responsiveStyles}
            className={`${baseClasses} hover:scale-105`}
            onClick={handleClick}
          />
        );

      case 'button':
        return (
          <button
            style={responsiveStyles}
            className={`${baseClasses} hover:scale-105 hover:shadow-lg active:scale-95`}
            onClick={handleClick}
          >
            {component.content}
          </button>
        );

      case 'container':
        return (
          <div
            style={responsiveStyles}
            className={`${baseClasses} hover:border-blue-500/30`}
            onClick={handleClick}
          >
            {component.children?.map((child) => (
              <RenderComponent key={child.id} component={child} isPreview={isPreview} />
            ))}
            {(!component.children || component.children.length === 0) && !isPreview && (
              <div className="text-gray-500 text-center py-8 text-sm">
                Drop components here
              </div>
            )}
          </div>
        );

      case 'grid':
        return (
          <div
            style={responsiveStyles}
            className={`${baseClasses} hover:border-blue-500/30`}
            onClick={handleClick}
          >
            {component.children?.map((child) => (
              <RenderComponent key={child.id} component={child} isPreview={isPreview} />
            ))}
            {(!component.children || component.children.length === 0) && !isPreview && (
              <div className="col-span-full text-gray-500 text-center py-8 text-sm">
                Drop components into grid cells
              </div>
            )}
          </div>
        );

      case 'hero':
        return (
          <div
            style={{
              ...responsiveStyles,
              background: responsiveStyles.backgroundColor?.includes('gradient') 
                ? responsiveStyles.backgroundColor 
                : responsiveStyles.backgroundColor,
            }}
            className={`${baseClasses} relative overflow-hidden`}
            onClick={handleClick}
          >
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10">
              <h1 className="mb-4">{component.content}</h1>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                Create amazing experiences with our powerful tools
              </p>
              <div className="mt-8 flex gap-4 justify-center">
                <button className="px-8 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Get Started
                </button>
                <button className="px-8 py-3 border border-white/30 text-white rounded-lg font-semibold hover:bg-white/10 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        );

      case 'card':
        return (
          <div
            style={responsiveStyles}
            className={`${baseClasses} hover:scale-105 hover:shadow-2xl`}
            onClick={handleClick}
          >
            <h3 className="text-xl font-semibold mb-3 text-white">{component.content}</h3>
            <p className="text-gray-300 mb-4">
              This is a beautiful card component with hover effects and smooth animations.
            </p>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              Learn More
            </button>
          </div>
        );

      case 'navbar':
        return (
          <nav
            style={responsiveStyles}
            className={baseClasses}
            onClick={handleClick}
          >
            <div className="font-bold text-xl">Brand</div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-blue-400 transition-colors">Home</a>
              <a href="#" className="hover:text-blue-400 transition-colors">About</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Services</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Contact</a>
            </div>
          </nav>
        );

      case 'footer':
        return (
          <footer
            style={responsiveStyles}
            className={baseClasses}
            onClick={handleClick}
          >
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                <div>
                  <h4 className="font-semibold text-white mb-4">Company</h4>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-4">Products</h4>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-4">Resources</h4>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Help</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-4">Legal</h4>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-gray-700 pt-8">
                <p className="text-center">{component.content}</p>
              </div>
            </div>
          </footer>
        );

      case 'form':
        return (
          <form
            style={responsiveStyles}
            className={`${baseClasses} space-y-4`}
            onClick={handleClick}
          >
            <h3 className="text-xl font-semibold mb-6">{component.content}</h3>
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input 
                type="email" 
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea 
                rows={4}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white resize-none"
                placeholder="Your message..."
              />
            </div>
            <button 
              type="submit"
              className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              Send Message
            </button>
          </form>
        );

      case 'video':
        return (
          <video
            controls
            style={responsiveStyles}
            className={`${baseClasses} hover:scale-105`}
            onClick={handleClick}
          >
            <source src={component.src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        );

      case 'divider':
        return (
          <hr
            style={responsiveStyles}
            className={baseClasses}
            onClick={handleClick}
          />
        );

      default:
        return null;
    }
  };

  return <>{renderContent()}</>;
};