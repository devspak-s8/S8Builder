import { useState } from "react";
import { Plus, Upload, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TemplateUploadModal } from "./TemplateUploadModal";

export function FloatingActionButton() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);

  const actions = [
    { 
      icon: Upload, 
      label: "Add Template", 
      color: "emerald",
      onClick: () => {
        setShowTemplateModal(true);
        setIsExpanded(false);
      }
    },
    { 
      icon: Calendar, 
      label: "New Booking", 
      color: "blue",
      onClick: () => {
        console.log("New booking clicked");
        setIsExpanded(false);
      }
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Expanded Actions */}
      <div className={`absolute bottom-16 right-0 space-y-3 transition-all duration-300 ${
        isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}>
        {actions.map((action, index) => (
          <div
            key={action.label}
            className="flex items-center space-x-3"
            style={{
              transitionDelay: isExpanded ? `${index * 50}ms` : '0ms'
            }}
          >
            <span className="glass-card px-3 py-2 rounded-lg text-sm whitespace-nowrap border border-white/20 backdrop-blur-md">
              {action.label}
            </span>
            <Button
              size="icon"
              onClick={action.onClick}
              className={`h-12 w-12 rounded-full glass-card border-white/20 hover:scale-110 transition-all duration-300 ${
                action.color === 'emerald' ? 'hover:bg-green-500/20 hover:border-green-500/50' :
                action.color === 'blue' ? 'hover:bg-blue-500/20 hover:border-blue-500/50' :
                'hover:bg-primary/20 hover:border-primary/50'
              } backdrop-blur-md`}
            >
              <action.icon className="h-5 w-5" />
            </Button>
          </div>
        ))}
      </div>

      {/* Main FAB */}
      <Button
        size="icon"
        className="h-16 w-16 rounded-full bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 neon-glow pulse-glow transition-all duration-300 hover:scale-110"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Plus
          className={`h-6 w-6 transition-transform duration-300 ${
            isExpanded ? 'rotate-45' : 'rotate-0'
          }`}
        />
      </Button>

      <TemplateUploadModal 
        isOpen={showTemplateModal}
        onClose={() => setShowTemplateModal(false)}
      />
    </div>
  );
}