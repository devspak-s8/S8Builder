import React from 'react';
import {
  Monitor, Tablet, Smartphone, Grid3X3, ZoomIn, ZoomOut, Eye, EyeOff,
  Maximize2, Move, RotateCcw, Settings
} from 'lucide-react';
import { useBuilder } from '../contexts/BuilderContext';
import { RenderComponent } from './RenderComponent';

export const Canvas = () => {
  const { state, dispatch } = useBuilder();

  const handleDrop = (e) => {
    e.preventDefault();
    if (state.draggedComponent) {
      dispatch({ type: 'ADD_COMPONENT', payload: state.draggedComponent });
      dispatch({ type: 'SET_DRAGGED', payload: null });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleCanvasClick = (e) => {
    if (e.target === e.currentTarget) {
      dispatch({ type: 'SELECT_COMPONENT', payload: null });
    }
  };

  const viewportSizes = {
    mobile: { width: '375px', icon: Smartphone },
    tablet: { width: '768px', icon: Tablet },
    desktop: { width: '100%', icon: Monitor },
  };

  const currentViewport = viewportSizes[state.viewport];

  const handleCanvasSizeChange = (dimension, value) => {
    dispatch({
      type: 'SET_CANVAS_SIZE',
      payload: { [dimension]: Math.max(320, Math.min(3000, value)) },
    });
  };
  const presetSizes = [
    { name: 'Mobile', width: 375, height: 667 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Desktop', width: 1200, height: 800 },
    { name: 'Large', width: 1440, height: 900 },
    { name: 'XL', width: 1920, height: 1080 },
  ];

  return (
    <div className="flex-1 bg-gray-800 overflow-hidden flex flex-col">
      {/* Toolbar */}
      <div className="bg-gray-900 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          {/* Viewport Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => dispatch({ type: 'TOGGLE_RESPONSIVE_MODE' })}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${state.responsiveMode
                ? 'bg-emerald-500 text-white shadow-lg'
                : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800'
                }`}
            >
              <Monitor className="w-4 h-4" />
              <span className="hidden sm:inline">Responsive</span>
            </button>

            {Object.entries(viewportSizes).map(([viewport, config]) => {
              const Icon = config.icon;
              return (
                <button
                  key={viewport}
                  onClick={() => dispatch({ type: 'SET_VIEWPORT', payload: viewport })}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${state.viewport === viewport
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="capitalize hidden sm:inline">{viewport}</span>
                </button>
              );
            })}
          </div>

          {/* Canvas Controls */}
          <div className="flex items-center gap-2">
            {/* Canvas Size Controls */}
            <div className="flex items-center gap-2 bg-gray-800 rounded-lg p-1">
              <div className="flex items-center gap-2 px-3 py-2">
                <Maximize2 className="w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  value={state.canvasWidth}
                  onChange={(e) => handleCanvasSizeChange('width', parseInt(e.target.value) || 1200)}
                  className="w-16 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs text-center"
                  min="320"
                  max="3000"
                />
                <span className="text-gray-400 text-xs">×</span>
                <input
                  type="number"
                  value={state.canvasHeight}
                  onChange={(e) => handleCanvasSizeChange('height', parseInt(e.target.value) || 800)}
                  className="w-16 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs text-center"
                  min="400"
                  max="3000"
                />
              </div>
            </div>

            {/* Preset Sizes */}
            <div className="relative group">
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-gray-300 hover:bg-gray-800 transition-all duration-200">
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">Presets</span>
              </button>
              <div className="absolute top-full right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-2">
                  {presetSizes.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => dispatch({
                        type: 'SET_CANVAS_SIZE',
                        payload: { width: preset.width, height: preset.height }
                      })}
                      className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <span>{preset.name}</span>
                      <span className="text-xs text-gray-500">{preset.width}×{preset.height}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => dispatch({ type: 'TOGGLE_GRID' })}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${state.showGrid
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800'
                }`}
            >
              <Grid3X3 className="w-4 h-4" />
              <span className="hidden sm:inline">Grid</span>
            </button>

            <div className="flex items-center gap-1 bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => dispatch({ type: 'SET_ZOOM', payload: state.zoom - 0.1 })}
                className="p-2 text-gray-400 hover:text-gray-300 transition-colors"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="px-3 py-1 text-sm text-gray-300 min-w-[60px] text-center">
                {Math.round(state.zoom * 100)}%
              </span>
              <button
                onClick={() => dispatch({ type: 'SET_ZOOM', payload: state.zoom + 0.1 })}
                className="p-2 text-gray-400 hover:text-gray-300 transition-colors"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => dispatch({ type: 'TOGGLE_PREVIEW' })}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${state.previewMode
                ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800'
                }`}
            >
              {state.previewMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span className="hidden sm:inline">Preview</span>
            </button>
          </div>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 overflow-auto bg-gray-800 p-8">
        <div className="mx-auto transition-all duration-300 relative" style={{
          width: state.viewport === 'desktop' ? `${state.canvasWidth}px` : currentViewport.width,
          transform: `scale(${state.zoom})`,
          transformOrigin: 'top center'
        }}>
          <div
            className="bg-gray-900 rounded-xl shadow-2xl border border-gray-700 overflow-hidden relative"
            style={{
              minHeight: `${state.canvasHeight}px`,
              height: state.components.length === 0 ? `${state.canvasHeight}px` : 'auto'
            }}
          >
            {/* Resize Handles */}
            {!state.previewMode && state.viewport === 'desktop' && (
              <>
                {/* Right resize handle */}
                <div
                  className="absolute top-0 right-0 w-2 h-full bg-blue-500/20 hover:bg-blue-500/40 cursor-ew-resize opacity-0 hover:opacity-100 transition-opacity group"
                  onMouseDown={(e) => {
                    const startX = e.clientX;
                    const startWidth = state.canvasWidth;

                    const handleMouseMove = (e) => {
                      const deltaX = e.clientX - startX;
                      const newWidth = Math.max(320, Math.min(3000, startWidth + deltaX / state.zoom));
                      dispatch({ type: 'SET_CANVAS_SIZE', payload: { width: Math.round(newWidth) } });
                    };


                    const handleMouseUp = () => {
                      document.removeEventListener('mousemove', handleMouseMove);
                      document.removeEventListener('mouseup', handleMouseUp);
                    };

                    document.addEventListener('mousemove', handleMouseMove);
                    document.addEventListener('mouseup', handleMouseUp);
                  }}
                >
                  <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-l opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>

                {/* Bottom resize handle */}
                <div
                  className="absolute bottom-0 left-0 w-full h-2 bg-blue-500/20 hover:bg-blue-500/40 cursor-ns-resize opacity-0 hover:opacity-100 transition-opacity group"
                  onMouseDown={(e) => {
                    const startY = e.clientY;
                    const startHeight = state.canvasHeight;

                    const handleMouseMove = (e) => {
                      const deltaY = e.clientY - startY;
                      const newHeight = Math.max(400, Math.min(3000, startHeight + deltaY / state.zoom));

                      dispatch({
                        type: 'SET_CANVAS_SIZE',
                        payload: { height: Math.round(newHeight) }
                      });
                    };


                    const handleMouseUp = () => {
                      document.removeEventListener('mousemove', handleMouseMove);
                      document.removeEventListener('mouseup', handleMouseUp);
                    };

                    document.addEventListener('mousemove', handleMouseMove);
                    document.addEventListener('mouseup', handleMouseUp);
                  }}
                >
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-blue-500 rounded-t opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                {/* Browser Chrome */}
                {!state.previewMode && (
                  <div className="bg-gray-800 border-b border-gray-700 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex gap-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                        <div className="text-sm text-gray-400">
                          {state.viewport.charAt(0).toUpperCase() + state.viewport.slice(1)} Preview
                          {state.responsiveMode && (
                            <span className="ml-2 px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded border border-emerald-500/30">
                              Responsive Mode
                            </span>
                          )}
                          {state.viewport === 'desktop' && (
                            <span className="ml-2 text-xs">({state.canvasWidth}×{state.canvasHeight})</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>{state.components.length} components</span>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>Editing: {state.viewport}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Corner resize handle */}
                <div
                  className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500/20 hover:bg-blue-500/40 cursor-nw-resize opacity-0 hover:opacity-100 transition-opacity group"
                  onMouseDown={(e) => {
                    const startX = e.clientX;
                    const startY = e.clientY;
                    const startWidth = state.canvasWidth;
                    const startHeight = state.canvasHeight;

                    const handleMouseMove = (e) => {
                      const deltaX = e.clientX - startX;
                      const deltaY = e.clientY - startY;

                      const newWidth = Math.max(320, Math.min(3000, startWidth + deltaX / state.zoom));
                      const newHeight = Math.max(400, Math.min(3000, startHeight + deltaY / state.zoom));

                      dispatch({
                        type: 'SET_CANVAS_SIZE',
                        payload: {
                          width: Math.round(newWidth),
                          height: Math.round(newHeight)
                        }
                      });
                    };


                    const handleMouseUp = () => {
                      document.removeEventListener('mousemove', handleMouseMove);
                      document.removeEventListener('mouseup', handleMouseUp);
                    };

                    document.addEventListener('mousemove', handleMouseMove);
                    document.addEventListener('mouseup', handleMouseUp);
                  }}
                >
                  <div className="absolute bottom-0 right-0 w-2 h-2 bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </>
            )}

            {/* Canvas Content */}
            <div
              className={`relative ${state.showGrid ? 'bg-grid-pattern' : ''}`}

              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={handleCanvasClick}
              style={{
                minHeight: `${state.canvasHeight - 60}px`,
                backgroundImage: state.showGrid
                  ? 'radial-gradient(circle, #4b5563 1px, transparent 1px)'
                  : undefined,
                backgroundSize: state.showGrid ? '20px 20px' : undefined,
              }}
            >
              {state.components.length === 0 ? (
                <div className="flex items-center justify-center" style={{ height: `${state.canvasHeight - 60}px` }}>
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center border border-gray-600">
                      <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-300 mb-3">Start Creating</h3>
                    <p className="text-gray-500 mb-6 max-w-sm">
                      Drag components from the sidebar to build your website.
                      Start with a hero section or container.
                    </p>
                    <div className="flex items-center justify-center gap-3 text-sm">
                      <div className="flex items-center gap-2 px-3 py-2 bg-gray-800 rounded-lg border border-gray-700">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-400">Hero</span>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-2 bg-gray-800 rounded-lg border border-gray-700">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-gray-400">Container</span>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-2 bg-gray-800 rounded-lg border border-gray-700">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <span className="text-gray-400">Card</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-0">
                  {state.components.map((component) => (
                    <RenderComponent
                      key={component.id}
                      component={component}
                      isPreview={state.previewMode}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};