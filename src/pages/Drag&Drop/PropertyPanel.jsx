import React, { useState } from 'react';
import {
  Settings, Palette, Type, Layout, Image as ImageIcon, Zap,
  Monitor, Tablet, Smartphone, Copy, Trash2, RotateCcw
} from 'lucide-react';
import { useBuilder, Component } from '../contexts/BuilderContext';


export const PropertyPanel = () => {
  const { state, dispatch } = useBuilder();
  const [activeTab, setActiveTab] = useState('style');

  if (!state.selectedComponent) {
    return (
      <div className="w-80 bg-gray-900 border-l border-gray-700 p-6 text-white">
        <div className="text-center text-gray-500">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-800 rounded-2xl flex items-center justify-center">
            <Settings className="w-8 h-8 text-gray-600" />
          </div>
          <h3 className="font-semibold text-gray-300 mb-2">No Selection</h3>
          <p className="text-sm text-gray-500">Select a component to edit its properties</p>
          <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
            <p className="text-xs text-gray-400 mb-2">Quick Tips:</p>
            <ul className="text-xs text-gray-500 space-y-1 text-left">
              <li>• Click any component to select it</li>
              <li>• Use the layers panel to navigate</li>
              <li>• Drag components to reorder</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  const component = state.selectedComponent;

  const updateComponent = (updates) => {
    dispatch({
      type: 'UPDATE_COMPONENT',
      payload: { id: component.id, updates }
    });
  };

  const updateStyle = (styleKey, value) => {
    if (state.responsiveMode && state.activeBreakpoint !== 'desktop') {
      dispatch({
        type: 'UPDATE_RESPONSIVE_STYLE',
        payload: {
          id: component.id,
          breakpoint: state.activeBreakpoint,
          styles: { [styleKey]: value }
        }
      });
    } else {
      updateComponent({
        styles: { ...component.styles, [styleKey]: value }
      });
    }
  };

  const getCurrentStyles = () => {
    if (state.responsiveMode && state.activeBreakpoint !== 'desktop') {
      return {
        ...component.styles,
        ...(component.responsive?.[state.activeBreakpoint] || {})
      };
    }
    return component.styles;
  };

  // eslint-disable-next-line no-unused-vars
  const currentStyles = getCurrentStyles();

  const updateAnimation = (animationKey, value) => {
    updateComponent({
      animation: { ...component.animation, [animationKey]: value }
    });
  };

  const duplicateComponent = () => {
    dispatch({ type: 'DUPLICATE_COMPONENT', payload: component.id });
  };

  const deleteComponent = () => {
    dispatch({ type: 'DELETE_COMPONENT', payload: component.id });
  };

  const resetStyles = () => {
    if (window.confirm('Reset all styles to default?')) {
      const defaultStyles = {
        text: { fontSize: '16px', color: '#e5e7eb', padding: '12px', fontWeight: '400' },
        button: { backgroundColor: '#3B82F6', color: 'white', padding: '14px 28px', borderRadius: '8px' },
        container: { padding: '32px', backgroundColor: '#1f2937', borderRadius: '12px' },
      };

      updateComponent({
        styles: defaultStyles[component.type] || {}
      });
    }
  };


  const tabs = [
    { id: 'content', label: 'Content', icon: Type },
    { id: 'style', label: 'Style', icon: Palette },
    { id: 'layout', label: 'Layout', icon: Layout },
    { id: 'animation', label: 'Animation', icon: Zap },
    { id: 'responsive', label: 'Responsive', icon: Monitor },
  ];

  const animationTypes = [
    { value: 'none', label: 'None' },
    { value: 'fadeIn', label: 'Fade In' },
    { value: 'slideUp', label: 'Slide Up' },
    { value: 'slideDown', label: 'Slide Down' },
    { value: 'slideLeft', label: 'Slide Left' },
    { value: 'slideRight', label: 'Slide Right' },
    { value: 'bounce', label: 'Bounce' },
    { value: 'pulse', label: 'Pulse' },
  ];

  return (
    <div className="w-80 bg-gray-900 border-l border-gray-700 flex flex-col text-white">
      {/* Header */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-white">Properties</h2>
              <p className="text-sm text-gray-400 capitalize">{component.type} Component</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={duplicateComponent}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm text-gray-300 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-200 hover:scale-105"
          >
            <Copy className="w-4 h-4" />
            Duplicate
          </button>
          <button
            onClick={resetStyles}
            className="flex items-center justify-center gap-2 px-3 py-2 text-sm text-gray-300 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-200 hover:scale-105"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={deleteComponent}
            className="flex items-center justify-center gap-2 px-3 py-2 text-sm text-red-400 bg-red-500/20 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-all duration-200 hover:scale-105"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-5 bg-gray-800 rounded-lg p-1 gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center gap-1 px-2 py-2 text-xs rounded-md transition-all duration-200 ${activeTab === tab.id
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-gray-300 hover:bg-gray-700'
                  }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'content' && (
          <div className="space-y-6">
            {(component.type === 'text' || component.type === 'button' || component.type === 'hero' || component.type === 'card' || component.type === 'navbar' || component.type === 'footer' || component.type === 'form') && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">Content</label>
                <textarea
                  value={component.content || ''}
                  onChange={(e) => updateComponent({ content: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-white placeholder-gray-500"
                  rows={4}
                  placeholder="Enter your content..."
                />
              </div>
            )}

            {(component.type === 'image' || component.type === 'video') && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    {component.type === 'image' ? 'Image URL' : 'Video URL'}
                  </label>
                  <input
                    type="url"
                    value={component.src || ''}
                    onChange={(e) => updateComponent({ src: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500"
                    placeholder={`https://example.com/${component.type === 'image' ? 'image.jpg' : 'video.mp4'}`}
                  />
                </div>
                {component.type === 'image' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">Alt Text</label>
                    <input
                      type="text"
                      value={component.alt || ''}
                      onChange={(e) => updateComponent({ alt: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500"
                      placeholder="Describe the image"
                    />
                  </div>
                )}
              </>
            )}

            {component.type === 'button' && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">Link URL</label>
                <input
                  type="url"
                  value={component.href || ''}
                  onChange={(e) => updateComponent({ href: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500"
                  placeholder="https://example.com"
                />
              </div>
            )}
          </div>
        )}

        {activeTab === 'style' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">Background</label>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <input
                    type="color"
                    value={component.styles.backgroundColor?.startsWith('#') ? component.styles.backgroundColor : '#1f2937'}
                    onChange={(e) => updateStyle('backgroundColor', e.target.value)}
                    className="w-12 h-12 border border-gray-600 rounded-lg bg-gray-800"
                  />
                  <input
                    type="text"
                    value={component.styles.backgroundColor || ''}
                    onChange={(e) => updateStyle('backgroundColor', e.target.value)}
                    className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500"
                    placeholder="#1f2937 or gradient"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                  ].map((gradient, index) => (
                    <button
                      key={index}
                      onClick={() => updateStyle('backgroundColor', gradient)}
                      className="h-8 rounded-lg border border-gray-600 hover:scale-105 transition-transform"
                      style={{ background: gradient }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {(component.type === 'text' || component.type === 'button' || component.type === 'hero' || component.type === 'card' || component.type === 'navbar' || component.type === 'footer' || component.type === 'form') && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Text Color</label>
                  <div className="flex gap-3">
                    <input
                      type="color"
                      value={component.styles.color || '#e5e7eb'}
                      onChange={(e) => updateStyle('color', e.target.value)}
                      className="w-12 h-12 border border-gray-600 rounded-lg bg-gray-800"
                    />
                    <input
                      type="text"
                      value={component.styles.color || ''}
                      onChange={(e) => updateStyle('color', e.target.value)}
                      className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500"
                      placeholder="#e5e7eb"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">Font Size</label>
                    <input
                      type="text"
                      value={component.styles.fontSize || ''}
                      onChange={(e) => updateStyle('fontSize', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500"
                      placeholder="16px"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">Font Weight</label>
                    <select
                      value={component.styles.fontWeight || '400'}
                      onChange={(e) => updateStyle('fontWeight', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                    >
                      <option value="300">Light</option>
                      <option value="400">Normal</option>
                      <option value="500">Medium</option>
                      <option value="600">Semi Bold</option>
                      <option value="700">Bold</option>
                      <option value="800">Extra Bold</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Text Align</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['left', 'center', 'right'].map((align) => (
                      <button
                        key={align}
                        onClick={() => updateStyle('textAlign', align)}
                        className={`px-3 py-2 text-sm rounded-lg transition-all duration-200 capitalize ${component.styles.textAlign === align
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                          }`}
                      >
                        {align}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">Border Radius</label>
                <input
                  type="text"
                  value={component.styles.borderRadius || ''}
                  onChange={(e) => updateStyle('borderRadius', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500"
                  placeholder="8px"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">Opacity</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={component.styles.opacity || '1'}
                  onChange={(e) => updateStyle('opacity', e.target.value)}
                  className="w-full"
                />
                <div className="text-xs text-gray-400 mt-1">{Math.round((parseFloat(component.styles.opacity || '1') * 100))}%</div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">Box Shadow</label>
              <select
                value={component.styles.boxShadow || 'none'}
                onChange={(e) => updateStyle('boxShadow', e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
              >
                <option value="none">None</option>
                <option value="0 1px 3px 0 rgba(0, 0, 0, 0.1)">Small</option>
                <option value="0 4px 6px -1px rgba(0, 0, 0, 0.1)">Medium</option>
                <option value="0 10px 15px -3px rgba(0, 0, 0, 0.1)">Large</option>
                <option value="0 20px 25px -5px rgba(0, 0, 0, 0.3)">Extra Large</option>
              </select>
            </div>
          </div>
        )}

        {activeTab === 'layout' && (
          <div className="space-y-6">
            {/* Canvas Size Controls */}
            <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
              <h4 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
                <Palette className="w-4 h-4" />
                Canvas Size
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-400 mb-2">Width (px)</label>
                  <input
                    type="number"
                    value={state.canvasWidth}
                    onChange={(e) => dispatch({
                      type: 'SET_CANVAS_SIZE',
                      payload: { width: parseInt(e.target.value) || 1200 }
                    })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm"
                    min="320"
                    max="3000"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-2">Height (px)</label>
                  <input
                    type="number"
                    value={state.canvasHeight}
                    onChange={(e) => dispatch({
                      type: 'SET_CANVAS_SIZE',
                      payload: { height: parseInt(e.target.value) || 800 }
                    })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm"
                    min="400"
                    max="3000"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">Width</label>
                <input
                  type="text"
                  value={component.styles.width || ''}
                  onChange={(e) => updateStyle('width', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500"
                  placeholder="auto"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">Height</label>
                <input
                  type="text"
                  value={component.styles.height || ''}
                  onChange={(e) => updateStyle('height', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500"
                  placeholder="auto"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">Padding</label>
                <input
                  type="text"
                  value={component.styles.padding || ''}
                  onChange={(e) => updateStyle('padding', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500"
                  placeholder="12px"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">Margin</label>
                <input
                  type="text"
                  value={component.styles.margin || ''}
                  onChange={(e) => updateStyle('margin', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500"
                  placeholder="0"
                />
              </div>
            </div>

            {(component.type === 'container' || component.type === 'grid') && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Display</label>
                  <select
                    value={component.styles.display || 'block'}
                    onChange={(e) => updateStyle('display', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                  >
                    <option value="block">Block</option>
                    <option value="flex">Flex</option>
                    <option value="grid">Grid</option>
                    <option value="inline-block">Inline Block</option>
                  </select>
                </div>

                {component.styles.display === 'flex' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">Flex Direction</label>
                      <div className="grid grid-cols-2 gap-2">
                        {['row', 'column'].map((direction) => (
                          <button
                            key={direction}
                            onClick={() => updateStyle('flexDirection', direction)}
                            className={`px-3 py-2 text-sm rounded-lg transition-all duration-200 capitalize ${component.styles.flexDirection === direction
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                              }`}
                          >
                            {direction}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">Justify Content</label>
                      <select
                        value={component.styles.justifyContent || 'flex-start'}
                        onChange={(e) => updateStyle('justifyContent', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                      >
                        <option value="flex-start">Start</option>
                        <option value="center">Center</option>
                        <option value="flex-end">End</option>
                        <option value="space-between">Space Between</option>
                        <option value="space-around">Space Around</option>
                        <option value="space-evenly">Space Evenly</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">Align Items</label>
                      <select
                        value={component.styles.alignItems || 'stretch'}
                        onChange={(e) => updateStyle('alignItems', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                      >
                        <option value="stretch">Stretch</option>
                        <option value="flex-start">Start</option>
                        <option value="center">Center</option>
                        <option value="flex-end">End</option>
                        <option value="baseline">Baseline</option>
                      </select>
                    </div>
                  </div>
                )}

                {component.type === 'grid' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">Grid Columns</label>
                      <input
                        type="text"
                        value={component.styles.gridTemplateColumns || ''}
                        onChange={(e) => updateStyle('gridTemplateColumns', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500"
                        placeholder="repeat(3, 1fr)"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">Grid Gap</label>
                      <input
                        type="text"
                        value={component.styles.gridGap || ''}
                        onChange={(e) => updateStyle('gridGap', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500"
                        placeholder="24px"
                      />
                    </div>
                  </div>
                )}
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">Position</label>
              <select
                value={component.styles.position || 'static'}
                onChange={(e) => updateStyle('position', e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
              >
                <option value="static">Static</option>
                <option value="relative">Relative</option>
                <option value="absolute">Absolute</option>
                <option value="fixed">Fixed</option>
                <option value="sticky">Sticky</option>
              </select>
            </div>
          </div>
        )}

        {activeTab === 'animation' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">Animation Type</label>
              <select
                value={component.animation?.type || 'none'}
                onChange={(e) => updateAnimation('type', e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
              >
                {animationTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {component.animation?.type !== 'none' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">Duration</label>
                    <select
                      value={component.animation?.duration || '0.5s'}
                      onChange={(e) => updateAnimation('duration', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                    >
                      <option value="0.2s">0.2s</option>
                      <option value="0.3s">0.3s</option>
                      <option value="0.5s">0.5s</option>
                      <option value="0.7s">0.7s</option>
                      <option value="1s">1s</option>
                      <option value="1.5s">1.5s</option>
                      <option value="2s">2s</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">Delay</label>
                    <select
                      value={component.animation?.delay || '0s'}
                      onChange={(e) => updateAnimation('delay', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                    >
                      <option value="0s">0s</option>
                      <option value="0.1s">0.1s</option>
                      <option value="0.2s">0.2s</option>
                      <option value="0.3s">0.3s</option>
                      <option value="0.5s">0.5s</option>
                      <option value="1s">1s</option>
                    </select>
                  </div>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Preview</h4>
                  <div className="text-xs text-gray-400">
                    Animation: {animationTypes.find(t => t.value === component.animation?.type)?.label}
                    <br />
                    Duration: {component.animation?.duration}
                    <br />
                    Delay: {component.animation?.delay}
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === 'responsive' && (
          <div className="space-y-6">
            {/* Responsive Mode Toggle */}
            <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-medium text-gray-300">Responsive Design</h4>
                <button
                  onClick={() => dispatch({ type: 'TOGGLE_RESPONSIVE_MODE' })}
                  className={`px-3 py-1.5 text-xs rounded-lg transition-all duration-200 ${state.responsiveMode
                      ? 'bg-emerald-500 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                >
                  {state.responsiveMode ? 'ON' : 'OFF'}
                </button>
              </div>
              <p className="text-xs text-gray-400">
                {state.responsiveMode
                  ? 'Editing responsive styles for different screen sizes'
                  : 'Enable to customize styles for different devices'
                }
              </p>
            </div>

            {/* Breakpoint Selector */}
            <div className="text-center">
              <div className="flex justify-center gap-2 mb-4">
                {[
                  { key: 'mobile', icon: Smartphone, label: 'Mobile' },
                  { key: 'tablet', icon: Tablet, label: 'Tablet' },
                  { key: 'desktop', icon: Monitor, label: 'Desktop' },
                // eslint-disable-next-line no-unused-vars
                ].map(({ key, icon: Icon, label }) => (
                  <button
                    key={key}
                    onClick={() => {
                      dispatch({ type: 'SET_VIEWPORT', payload: key });
                      dispatch({ type: 'SET_ACTIVE_BREAKPOINT', payload: key });
                    }}

                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${state.activeBreakpoint === key
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500">
                {state.responsiveMode
                  ? `Editing styles for ${state.activeBreakpoint} devices`
                  : 'Switch viewports to preview responsive behavior'
                }
              </p>
            </div>

            {/* Responsive Style Editor */}
            {state.responsiveMode && (
              <div className="space-y-4">
                <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                  <h4 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
                    <Palette className="w-4 h-4" />
                    {state.activeBreakpoint.charAt(0).toUpperCase() + state.activeBreakpoint.slice(1)} Styles
                  </h4>

                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-400 mb-2">Width</label>
                        <input
                          type="text"
                          value={component.responsive?.[state.activeBreakpoint]?.width || ''}
                          onChange={(e) => updateStyle('width', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm"
                          placeholder={state.activeBreakpoint === 'mobile' ? '100%' : 'auto'}
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-2">Height</label>
                        <input
                          type="text"
                          value={component.responsive?.[state.activeBreakpoint]?.height || ''}
                          onChange={(e) => updateStyle('height', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm"
                          placeholder="auto"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-400 mb-2">Padding</label>
                        <input
                          type="text"
                          value={component.responsive?.[state.activeBreakpoint]?.padding || ''}
                          onChange={(e) => updateStyle('padding', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm"
                          placeholder={
                            state.activeBreakpoint === 'mobile' ? '16px' :
                              state.activeBreakpoint === 'tablet' ? '24px' : '32px'
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-2">Font Size</label>
                        <input
                          type="text"
                          value={component.responsive?.[state.activeBreakpoint]?.fontSize || ''}
                          onChange={(e) => updateStyle('fontSize', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm"
                          placeholder={
                            state.activeBreakpoint === 'mobile' ? '14px' :
                              state.activeBreakpoint === 'tablet' ? '15px' : '16px'
                          }
                        />
                      </div>
                      {component.type === 'grid' && (
                        <div>
                          <label className="block text-xs text-gray-400 mb-2">Grid Columns</label>
                          <select
                            value={component.responsive?.[state.activeBreakpoint]?.gridTemplateColumns || ''}
                            onChange={(e) => updateStyle('gridTemplateColumns', e.target.value)}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm"
                          >
                            <option value="">Default</option>
                            <option value="1fr">1 Column</option>
                            <option value="repeat(2, 1fr)">2 Columns</option>
                            <option value="repeat(3, 1fr)">3 Columns</option>
                            <option value="repeat(4, 1fr)">4 Columns</option>
                          </select>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* Responsive Preview */}
                <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                  <h4 className="text-sm font-medium text-gray-300 mb-3">Breakpoint Info</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Mobile:</span>
                      <span className="text-gray-300">≤ 768px</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Tablet:</span>
                      <span className="text-gray-300">769px - 1024px</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Desktop:</span>
                      <span className="text-gray-300">≥ 1025px</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Current Responsive Values Display */}
            {component.responsive && (
              <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                <h4 className="text-sm font-medium text-gray-300 mb-3">Applied Styles</h4>
                <div className="space-y-2">
                  {Object.entries(component.responsive).map(([breakpoint, styles]) => (
                    <div key={breakpoint} className="text-xs">
                      <div className="flex items-center gap-2 mb-1">
                        <div className={`w-2 h-2 rounded-full ${breakpoint === 'mobile' ? 'bg-red-500' :
                            breakpoint === 'tablet' ? 'bg-yellow-500' : 'bg-green-500'
                          }`}></div>
                        <span className="text-gray-300 capitalize font-medium">{breakpoint}</span>
                      </div>
                      <div className="text-gray-500 ml-4">
                        {Object.entries(styles || {}).length > 0
                          ? Object.entries(styles || {}).map(([key, value]) => (
                            <div key={key}>{key}: {value}</div>
                          ))
                          : 'No custom styles'
                        }
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};