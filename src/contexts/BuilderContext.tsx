import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface Component {
  id: string;
  type: 'text' | 'image' | 'button' | 'container' | 'hero' | 'card' | 'navbar' | 'footer' | 'grid' | 'form' | 'video' | 'divider';
  content?: string;
  src?: string;
  alt?: string;
  href?: string;
  placeholder?: string;
  styles: {
    width?: string;
    height?: string;
    backgroundColor?: string;
    color?: string;
    fontSize?: string;
    fontWeight?: string;
    padding?: string;
    margin?: string;
    borderRadius?: string;
    border?: string;
    textAlign?: 'left' | 'center' | 'right';
    display?: string;
    flexDirection?: 'row' | 'column';
    justifyContent?: string;
    alignItems?: string;
    gap?: string;
    position?: string;
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
    zIndex?: string;
    opacity?: string;
    transform?: string;
    transition?: string;
    boxShadow?: string;
    gridTemplateColumns?: string;
    gridTemplateRows?: string;
    gridGap?: string;
    overflow?: string;
    maxWidth?: string;
    minHeight?: string;
  };
  children?: Component[];
  parentId?: string;
  animation?: {
    type: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'bounce' | 'pulse' | 'none';
    duration: string;
    delay: string;
  };
  responsive?: {
    mobile?: Partial<Component['styles']>;
    tablet?: Partial<Component['styles']>;
    desktop?: Partial<Component['styles']>;
  };
  breakpoints?: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
}

export interface BuilderState {
  components: Component[];
  selectedComponent: Component | null;
  draggedComponent: Component | null;
  history: Component[][];
  currentHistoryIndex: number;
  viewport: 'mobile' | 'tablet' | 'desktop';
  showGrid: boolean;
  snapToGrid: boolean;
  zoom: number;
  previewMode: boolean;
  canvasWidth: number;
  canvasHeight: number;
  activeBreakpoint: 'mobile' | 'tablet' | 'desktop';
  responsiveMode: boolean;
}

type BuilderAction =
  | { type: 'ADD_COMPONENT'; payload: Component }
  | { type: 'UPDATE_COMPONENT'; payload: { id: string; updates: Partial<Component> } }
  | { type: 'DELETE_COMPONENT'; payload: string }
  | { type: 'SELECT_COMPONENT'; payload: Component | null }
  | { type: 'SET_DRAGGED'; payload: Component | null }
  | { type: 'REORDER_COMPONENTS'; payload: Component[] }
  | { type: 'DUPLICATE_COMPONENT'; payload: string }
  | { type: 'UNDO' }
  | { type: 'REDO' }
  | { type: 'SAVE_HISTORY' }
  | { type: 'SET_VIEWPORT'; payload: 'mobile' | 'tablet' | 'desktop' }
  | { type: 'TOGGLE_GRID' }
  | { type: 'TOGGLE_SNAP' }
  | { type: 'SET_ZOOM'; payload: number }
  | { type: 'TOGGLE_PREVIEW' }
  | { type: 'CLEAR_ALL' }
  | { type: 'SET_CANVAS_SIZE'; payload: { width?: number; height?: number } }
  | { type: 'SET_ACTIVE_BREAKPOINT'; payload: 'mobile' | 'tablet' | 'desktop' }
  | { type: 'TOGGLE_RESPONSIVE_MODE' }
  | { type: 'UPDATE_RESPONSIVE_STYLE'; payload: { id: string; breakpoint: 'mobile' | 'tablet' | 'desktop'; styles: Partial<Component['styles']> } };

const builderReducer = (state: BuilderState, action: BuilderAction): BuilderState => {
  switch (action.type) {
    case 'ADD_COMPONENT':
      const newComponents = [...state.components, action.payload];
      return {
        ...state,
        components: newComponents,
        history: [...state.history.slice(0, state.currentHistoryIndex + 1), newComponents],
        currentHistoryIndex: state.currentHistoryIndex + 1,
      };

    case 'UPDATE_COMPONENT':
      const updatedComponents = state.components.map(comp =>
        comp.id === action.payload.id
          ? { ...comp, ...action.payload.updates }
          : comp
      );
      return {
        ...state,
        components: updatedComponents,
        selectedComponent: state.selectedComponent?.id === action.payload.id
          ? { ...state.selectedComponent, ...action.payload.updates }
          : state.selectedComponent,
      };

    case 'DELETE_COMPONENT':
      const filteredComponents = state.components.filter(comp => comp.id !== action.payload);
      return {
        ...state,
        components: filteredComponents,
        selectedComponent: state.selectedComponent?.id === action.payload ? null : state.selectedComponent,
        history: [...state.history.slice(0, state.currentHistoryIndex + 1), filteredComponents],
        currentHistoryIndex: state.currentHistoryIndex + 1,
      };

    case 'DUPLICATE_COMPONENT':
      const componentToDuplicate = state.components.find(comp => comp.id === action.payload);
      if (componentToDuplicate) {
        const duplicatedComponent: Component = {
          ...componentToDuplicate,
          id: `${componentToDuplicate.type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          content: componentToDuplicate.content ? `${componentToDuplicate.content} (Copy)` : undefined,
        };
        const newComponentsWithDuplicate = [...state.components, duplicatedComponent];
        return {
          ...state,
          components: newComponentsWithDuplicate,
          history: [...state.history.slice(0, state.currentHistoryIndex + 1), newComponentsWithDuplicate],
          currentHistoryIndex: state.currentHistoryIndex + 1,
        };
      }
      return state;

    case 'SELECT_COMPONENT':
      return { ...state, selectedComponent: action.payload };

    case 'SET_DRAGGED':
      return { ...state, draggedComponent: action.payload };

    case 'REORDER_COMPONENTS':
      return {
        ...state,
        components: action.payload,
        history: [...state.history.slice(0, state.currentHistoryIndex + 1), action.payload],
        currentHistoryIndex: state.currentHistoryIndex + 1,
      };

    case 'UNDO':
      if (state.currentHistoryIndex > 0) {
        return {
          ...state,
          components: state.history[state.currentHistoryIndex - 1],
          currentHistoryIndex: state.currentHistoryIndex - 1,
        };
      }
      return state;

    case 'REDO':
      if (state.currentHistoryIndex < state.history.length - 1) {
        return {
          ...state,
          components: state.history[state.currentHistoryIndex + 1],
          currentHistoryIndex: state.currentHistoryIndex + 1,
        };
      }
      return state;

    case 'SET_VIEWPORT':
      return { ...state, viewport: action.payload };

    case 'TOGGLE_GRID':
      return { ...state, showGrid: !state.showGrid };

    case 'TOGGLE_SNAP':
      return { ...state, snapToGrid: !state.snapToGrid };

    case 'SET_ZOOM':
      return { ...state, zoom: Math.max(0.25, Math.min(2, action.payload)) };

    case 'TOGGLE_PREVIEW':
      return { ...state, previewMode: !state.previewMode };

    case 'CLEAR_ALL':
      const emptyComponents: Component[] = [];
      return {
        ...state,
        components: emptyComponents,
        selectedComponent: null,
        history: [...state.history.slice(0, state.currentHistoryIndex + 1), emptyComponents],
        currentHistoryIndex: state.currentHistoryIndex + 1,
      };

    case 'SET_CANVAS_SIZE':
      return {
        ...state,
        canvasWidth: action.payload.width ?? state.canvasWidth,
        canvasHeight: action.payload.height ?? state.canvasHeight,
      };

    case 'SET_ACTIVE_BREAKPOINT':
      return { ...state, activeBreakpoint: action.payload };

    case 'TOGGLE_RESPONSIVE_MODE':
      return { ...state, responsiveMode: !state.responsiveMode };

    case 'UPDATE_RESPONSIVE_STYLE':
      const updatedResponsiveComponents = state.components.map(comp =>
        comp.id === action.payload.id
          ? {
              ...comp,
              responsive: {
                ...comp.responsive,
                [action.payload.breakpoint]: {
                  ...comp.responsive?.[action.payload.breakpoint],
                  ...action.payload.styles
                }
              }
            }
          : comp
      );
      return {
        ...state,
        components: updatedResponsiveComponents,
        selectedComponent: state.selectedComponent?.id === action.payload.id
          ? {
              ...state.selectedComponent,
              responsive: {
                ...state.selectedComponent.responsive,
                [action.payload.breakpoint]: {
                  ...state.selectedComponent.responsive?.[action.payload.breakpoint],
                  ...action.payload.styles
                }
              }
            }
          : state.selectedComponent,
      };

    case 'SAVE_HISTORY':
      return {
        ...state,
        history: [...state.history.slice(0, state.currentHistoryIndex + 1), state.components],
        currentHistoryIndex: state.currentHistoryIndex + 1,
      };

    default:
      return state;
  }
};

const initialState: BuilderState = {
  components: [],
  selectedComponent: null,
  draggedComponent: null,
  history: [[]],
  currentHistoryIndex: 0,
  viewport: 'desktop',
  showGrid: false,
  snapToGrid: true,
  zoom: 1,
  previewMode: false,
  canvasWidth: 1200,
  canvasHeight: 800,
  activeBreakpoint: 'desktop',
  responsiveMode: false,
};

const BuilderContext = createContext<{
  state: BuilderState;
  dispatch: React.Dispatch<BuilderAction>;
} | null>(null);

export const BuilderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(builderReducer, initialState);

  return (
    <BuilderContext.Provider value={{ state, dispatch }}>
      {children}
    </BuilderContext.Provider>
  );
};

export const useBuilder = () => {
  const context = useContext(BuilderContext);
  if (!context) {
    throw new Error('useBuilder must be used within a BuilderProvider');
  }
  return context;
};