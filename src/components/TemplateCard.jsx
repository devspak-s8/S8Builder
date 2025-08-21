import { useState } from "react";
import { Heart, Eye, Download, Star, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CustomizeModal } from "./CustomizeModal";

export function TemplateCard({
  template,                   // 🔑 full template object
  onPreview = () => {},       // callback when Preview clicked
  onCustomize = () => {},     // callback when Customize clicked
  onBuy = () => {},           // callback when Buy clicked
}) {
  const {
    _id,
    title = "Untitled",
    price = 0,
    images = ["/placeholder.png"],
    category = "General",
    rating = 0,
    downloads = 0,
    isNew = false,
    isPremium = false,
  } = template;

  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showCustomizeModal, setShowCustomizeModal] = useState(false);

  return (
    <div
      className="group relative glass-card rounded-xl overflow-hidden ripple float transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={images[0]}
          alt={title}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
        />

        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3">
            <div className="flex space-x-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => onPreview(template)}
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>

              <Button
                size="sm"
                variant="outline"
                className="glass-card border-accent/50 text-accent hover:bg-accent/20 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100"
                onClick={() => {
                  setShowCustomizeModal(true);
                  onCustomize(template);
                }}
              >
                <Palette className="h-4 w-4 mr-2" />
                Customize
              </Button>
            </div>

            <Button
              size="sm"
              className="bg-primary hover:bg-primary/80 neon-glow transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 min-w-[120px]"
              onClick={() => onBuy(template)}
            >
              <Download className="h-4 w-4 mr-2" />
              Buy Now ${price}
            </Button>
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex space-x-2">
          {isNew && (
            <Badge className="bg-accent neon-glow-emerald text-black font-medium">
              New
            </Badge>
          )}
          {isPremium && (
            <Badge className="bg-destructive neon-glow-violet">Premium</Badge>
          )}
        </div>

        {/* Like */}
        <Button
          size="sm"
          variant="ghost"
          className="absolute top-3 right-3 h-8 w-8 rounded-full glass-card border-white/20 hover:border-red-500/50 hover:bg-red-500/20 transition-all duration-300"
          onClick={() => setIsLiked(!isLiked)}
        >
          <Heart
            className={`h-4 w-4 transition-all duration-300 ${
              isLiked ? "fill-red-500 text-red-500" : "text-white/70"
            }`}
          />
        </Button>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <Badge variant="outline" className="text-xs border-white/20">
              {category}
            </Badge>
            <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors duration-300">
              {title}
            </h3>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">${price}</div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>{rating}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Download className="h-4 w-4" />
            <span>{downloads.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <CustomizeModal
        isOpen={showCustomizeModal}
        onClose={() => setShowCustomizeModal(false)}
        templateTitle={title}
      />
    </div>
  );
}
