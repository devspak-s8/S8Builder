import React, { useState } from 'react';
import {
  Type, Image, Square, Layout, Layers, Settings, Undo, Redo, Download,
  Navigation, Grid3X3, FileText, Video, Minus, Copy, Trash2, Eye,
  EyeOff, Zap, Palette, Monitor, Tablet, Smartphone
} from 'lucide-react';
import { useBuilder } from '../contexts/BuilderContext';
import { Component } from '../contexts/BuilderContext';

const componentTemplates = {
  text: {
    id: '',
    type: 'text',
    content: 'Your text here',
    styles: {
      fontSize: '16px',
      color: '#e5e7eb',
      padding: '12px',
      fontWeight: '400',
    },
    responsive: {
      mobile: { fontSize: '14px', padding: '8px' },
      tablet: { fontSize: '15px', padding: '10px' },
      desktop: { fontSize: '16px', padding: '12px' },
    },
    animation: { type: 'fadeIn', duration: '0.5s', delay: '0s' },
  },
  image: {
    id: '',
    type: 'image',
    src: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=400',
    alt: 'Sample image',
    styles: {
      width: '300px',
      height: '200px',
      borderRadius: '12px',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
    },
    responsive: {
      mobile: { width: '100%', height: '150px' },
      tablet: { width: '250px', height: '175px' },
      desktop: { width: '300px', height: '200px' },
    },
    animation: { type: 'slideUp', duration: '0.6s', delay: '0.1s' },
  },
  // ...other components in similar fashion
};

export default function Sidebar() {
  const { state, dispatch } = useBuilder();
  const [activeTab, setActiveTab] = useState('components');

  const handleDragStart = (e, componentType) => {
    const template = componentTemplates[componentType];
    const component = {
      ...template,
      id: `${componentType}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };
    dispatch({ type: 'SET_DRAGGED', payload: component });
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleUndo = () => dispatch({ type: 'UNDO' });
  const handleRedo = () => dispatch({ type: 'REDO' });
  const togglePreview = () => dispatch({ type: 'TOGGLE_PREVIEW' });
  const clearAll = () => {
    if (window.confirm('Are you sure you want to clear all components?')) {
      dispatch({ type: 'CLEAR_ALL' });
    }
  };

  const duplicateComponent = (id) => {
    dispatch({ type: 'DUPLICATE_COMPONENT', payload: id });
  };

  const exportCode = () => {
    const generateComponentCode = (comp) => {
      // eslint-disable-next-line no-unused-vars
      const styleStr = Object.entries(comp.styles)
        .map(([key, value]) => `${key}: '${value}'`)
        .join(', ');

      const animationClass = comp.animation?.type !== 'none' ? ` animate-${comp.animation?.type}` : '';

      switch (comp.type) {
        case 'text': {
          return `<div className="component${animationClass}" style={${JSON.stringify(comp.styles)}}>${comp.content}</div>`;
        }
        case 'image': {
          return `<img className="component${animationClass}" src="${comp.src}" alt="${comp.alt}" style={${JSON.stringify(comp.styles)}} />`;
        }
        case 'button': {
          return `<button className="component${animationClass}" style={${JSON.stringify(comp.styles)}}>${comp.content}</button>`;
        }
        case 'container':
        case 'grid': {
          const children = comp.children?.map(generateComponentCode).join('\n') || '';
          return `<div className="component${animationClass}" style={${JSON.stringify(comp.styles)}}>\n${children}\n</div>`;
        }
        case 'video': {
          return `<video className="component${animationClass}" controls style={${JSON.stringify(comp.styles)}}>\n  <source src="${comp.src}" type="video/mp4" />\n</video>`;
        }
        case 'divider': {
          return `<hr className="component${animationClass}" style={${JSON.stringify(comp.styles)}} />`;
        }
        default: {
          return `<div className="component${animationClass}" style={${JSON.stringify(comp.styles)}}>${comp.content}</div>`;
        }
      }

    };

    const code = state.components.map(generateComponentCode).join('\n\n');
    const fullCode = `import React from 'react';\nimport './animations.css';\n\nexport default function GeneratedComponent() {\n  return (\n    <div className="generated-website">\n${code}\n    </div>\n  );\n}`;

    const blob = new Blob([fullCode], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated-component.jsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);



    a.href = url;
    a.download = 'generated-component.jsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const componentIcons = {
    text: Type,
    image: Image,
    button: Square,
    container: Layout,
    hero: Layers,
    card: Square,
    navbar: Navigation,
    footer: FileText,
    grid: Grid3X3,
    form: FileText,
    video: Video,
    divider: Minus,
  };

  const tabs = [
    { id: 'components', label: 'Components', icon: Square },
    { id: 'layers', label: 'Layers', icon: Layers },
    { id: 'assets', label: 'Assets', icon: Image },
  ];

  return (
    <div className="w-80 bg-gray-900 border-r border-gray-700 flex flex-col text-white">
      {/* Header */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
            <Layout className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-xl text-white">Builder Pro</h1>
            <p className="text-sm text-gray-400">Drag & Drop Editor</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <button
            onClick={handleUndo}
            disabled={state.currentHistoryIndex <= 0}
            className="flex items-center justify-center gap-2 px-3 py-2.5 text-sm text-gray-300 bg-gray-800 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
          >
            <Undo className="w-4 h-4" />
            Undo
          </button>
          <button
            onClick={handleRedo}
            disabled={state.currentHistoryIndex >= state.history.length - 1}
            className="flex items-center justify-center gap-2 px-3 py-2.5 text-sm text-gray-300 bg-gray-800 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
          >
            <Redo className="w-4 h-4" />
            Redo
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={togglePreview}
            className={`flex items-center justify-center gap-2 px-3 py-2.5 text-sm rounded-lg transition-all duration-200 hover:scale-105 ${state.previewMode
              ? 'text-blue-400 bg-blue-500/20 border border-blue-500/30'
              : 'text-gray-300 bg-gray-800 hover:bg-gray-700'
              }`}
          >
            {state.previewMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
          <button
            onClick={exportCode}
            className="flex items-center justify-center gap-2 px-3 py-2.5 text-sm text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 hover:scale-105 shadow-lg"
          >
            <Download className="w-4 h-4" />
          </button>
          <button
            onClick={clearAll}
            className="flex items-center justify-center gap-2 px-3 py-2.5 text-sm text-red-400 bg-red-500/20 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-all duration-200 hover:scale-105"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-700">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}

              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm transition-all duration-200 ${activeTab === tab.id
                ? 'text-blue-400 bg-blue-500/10 border-b-2 border-blue-500'
                : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800'
                }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'components' && (
          <div className="p-6">
            <div className="space-y-6">
              {/* Basic Components */}
              <div>
                <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  Basic Elements
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {Object.keys(componentIcons).map((type) => {
                    const Icon = componentIcons[type];

                    return (
                      <div
                        key={type}
                        draggable
                        onDragStart={(e) => handleDragStart(e, type)}
                        className="group flex flex-col items-center gap-2 p-4 bg-gray-800 rounded-xl cursor-move hover:bg-gray-700 transition-all duration-200 border border-gray-700 hover:border-gray-600 hover:scale-105 hover:shadow-lg"
                      >
                        <Icon className="w-6 h-6 text-gray-400 group-hover:text-blue-400 transition-colors" />
                        <span className="text-xs font-medium text-gray-300 capitalize">
                          {type}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Layout Components */}
              <div>
                <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                  <Layout className="w-4 h-4 text-green-500" />
                  Layout & Structure
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {['container', 'grid', 'hero', 'card'].map((type) => {
                    const Icon = componentIcons[type];

                    return (
                      <div
                        key={type}
                        draggable
                        onDragStart={(e) => handleDragStart(e, type)}
                        className="group flex flex-col items-center gap-2 p-4 bg-gray-800 rounded-xl cursor-move hover:bg-gray-700 transition-all duration-200 border border-gray-700 hover:border-gray-600 hover:scale-105 hover:shadow-lg"
                      >
                        <Icon className="w-6 h-6 text-gray-400 group-hover:text-green-400 transition-colors" />
                        <span className="text-xs font-medium text-gray-300 capitalize">
                          {type === 'hero' ? 'Hero' : type}
                        </span>
                      </div>
                    );
                  })}

                </div>
              </div>

              {/* Navigation & Media */}
              <div>
                <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                  <Palette className="w-4 h-4 text-purple-500" />
                  Navigation & Media
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {['navbar', 'footer', 'form', 'video'].map((type) => {
                    const Icon = componentIcons[type];

                    return (
                      <div
                        key={type}
                        draggable
                        onDragStart={(e) => handleDragStart(e, type)}
                        className="group flex flex-col items-center gap-2 p-4 bg-gray-800 rounded-xl cursor-move hover:bg-gray-700 transition-all duration-200 border border-gray-700 hover:border-gray-600 hover:scale-105 hover:shadow-lg"
                      >
                        <Icon className="w-6 h-6 text-gray-400 group-hover:text-purple-400 transition-colors" />
                        <span className="text-xs font-medium text-gray-300 capitalize">
                          {type}
                        </span>
                      </div>
                    );
                  })}

                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'layers' && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-300">Component Tree</h3>
              <span className="text-xs text-gray-500">{state.components.length} items</span>
            </div>

            <div className="space-y-2">
              {state.components.map((component, index) => (
                <div
                  key={component.id}
                  className={`group p-3 rounded-lg cursor-pointer transition-all duration-200 ${state.selectedComponent?.id === component.id
                    ? 'bg-blue-500/20 border border-blue-500/50 text-blue-400'
                    : 'text-gray-300 hover:bg-gray-800 border border-transparent'
                    }`}
                >
                  <div
                    className="flex items-center justify-between"
                    onClick={() => dispatch({ type: 'SELECT_COMPONENT', payload: component })}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full opacity-60"></div>
                      <span className="text-sm font-medium capitalize">
                        {component.type} {index + 1}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          duplicateComponent(component.id);
                        }}
                        className="p-1 text-gray-400 hover:text-blue-400 transition-colors"
                        title="Duplicate"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch({ type: 'DELETE_COMPONENT', payload: component.id });
                        }}
                        className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {state.components.length === 0 && (
                <div className="text-center py-8">
                  <Layers className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">No components yet</p>
                  <p className="text-gray-600 text-xs mt-1">Drag components to get started</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'assets' && (
          <div className="p-6">
            <h3 className="text-sm font-semibold text-gray-300 mb-4">Stock Images</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=200',
                'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=200',
                'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=200',
                'https://images.pexels.com/photos/1181345/pexels-photo-1181345.jpeg?auto=compress&cs=tinysrgb&w=200',
                'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=200',
                'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=200',
              ].map((src, index) => (
                <div
                  key={index}
                  className="aspect-square bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200 border border-gray-700 hover:border-gray-600"
                  onClick={() => {
                    const imageComponent = {
                      ...componentTemplates.image,
                      id: `image-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                      src,
                    };
                    dispatch({ type: 'ADD_COMPONENT', payload: imageComponent });
                  }}
                >
                  <img src={src} alt={`Stock ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};