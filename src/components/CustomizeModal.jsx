import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Upload, Palette, Type, Image as ImageIcon, Edit3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function CustomizeModal({ isOpen, onClose, templateTitle }) {
  const navigate = useNavigate();
  const [selectedTheme, setSelectedTheme] = useState("dark");
  const [brandName, setBrandName] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#00FFFF");
  const [secondaryColor, setSecondaryColor] = useState("#10B981");

  const handleChangeText = () => {
    onClose();
    navigate("/text-editor");
  };

  const themes = [
    { id: "dark", name: "Dark Mode", preview: "bg-slate-900" },
    { id: "light", name: "Light Mode", preview: "bg-slate-100" },
    { id: "custom", name: "Custom", preview: "bg-gradient-to-r from-primary to-accent" }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card border-white/20 max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">
            Customize "{templateTitle}"
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Theme Selector */}
          <div className="space-y-3">
            <Label className="text-lg font-semibold flex items-center gap-2">
              <Palette className="h-5 w-5 text-primary" />
              Theme
            </Label>
            <div className="grid grid-cols-3 gap-3">
              {themes.map((theme) => (
                <div
                  key={theme.id}
                  className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                    selectedTheme === theme.id
                      ? "border-primary neon-glow"
                      : "border-white/20 hover:border-white/40"
                  }`}
                  onClick={() => setSelectedTheme(theme.id)}
                >
                  <div className={`w-full h-16 rounded ${theme.preview} mb-2`} />
                  <span className="text-sm font-medium">{theme.name}</span>
                  {selectedTheme === theme.id && (
                    <Badge className="absolute -top-2 -right-2 bg-primary neon-glow">
                      Selected
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Brand Name */}
          <div className="space-y-3">
            <Label className="text-lg font-semibold flex items-center gap-2">
              <Type className="h-5 w-5 text-primary" />
              Brand Name
            </Label>
            <Input
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              placeholder="Enter your brand name"
              className="glass-card border-white/20 focus:border-primary/50"
            />
          </div>

          {/* Color Pickers */}
          <div className="space-y-3">
            <Label className="text-lg font-semibold flex items-center gap-2">
              <Palette className="h-5 w-5 text-primary" />
              Brand Colors
            </Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm">Primary Color</Label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-12 h-12 rounded-lg border-2 border-white/20 cursor-pointer"
                  />
                  <Input
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="glass-card border-white/20"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Secondary Color</Label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    className="w-12 h-12 rounded-lg border-2 border-white/20 cursor-pointer"
                  />
                  <Input
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    className="glass-card border-white/20"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Logo Upload */}
          <div className="space-y-3">
            <Label className="text-lg font-semibold flex items-center gap-2">
              <Upload className="h-5 w-5 text-primary" />
              Logo Upload
            </Label>
            <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer glass-card">
              <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-2">Drop your logo here or click to browse</p>
              <p className="text-xs text-muted-foreground">Supports PNG, JPG, SVG (max 5MB)</p>
            </div>
          </div>

          {/* Image Replacements */}
          <div className="space-y-3">
            <Label className="text-lg font-semibold flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-primary" />
              Replace Images
            </Label>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((index) => (
                <div key={index} className="space-y-2">
                  <Label className="text-sm">Image {index}</Label>
                  <div className="border border-white/20 rounded-lg p-4 text-center hover:border-primary/50 transition-colors cursor-pointer glass-card">
                    <ImageIcon className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">Click to replace</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Change Text Section */}
          <div className="space-y-3">
            <Label className="text-lg font-semibold flex items-center gap-2">
              <Edit3 className="h-5 w-5 text-primary" />
              Text Content
            </Label>
            <div className="glass-card border border-white/20 rounded-lg p-4">
              <p className="text-muted-foreground mb-3 text-sm">
                Edit all text content across your template with our advanced text editor
              </p>
              <Button 
                onClick={handleChangeText}
                variant="outline" 
                className="w-full glass-card border-primary/30 hover:border-primary/50 hover:bg-primary/10"
              >
                <Edit3 className="h-4 w-4 mr-2" />
                Change Text Content
              </Button>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-6 border-t border-white/10">
          <Button variant="outline" onClick={onClose} className="glass-card border-white/20">
            Cancel
          </Button>
          <Button className="bg-primary hover:bg-primary/80 neon-glow">
            Apply Customization
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
