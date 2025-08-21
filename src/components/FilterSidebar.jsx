import { useState } from "react";
import { Filter, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

const categories = [
  { name: "Landing Pages", count: 24, color: "primary" },
  { name: "E-commerce", count: 18, color: "accent" },
  { name: "SaaS Dashboards", count: 12, color: "destructive" },
  { name: "Portfolios", count: 32, color: "primary" },
  { name: "Mobile Apps", count: 16, color: "accent" },
  { name: "Gaming", count: 8, color: "destructive" },
];

const tags = ["React", "Vue", "Angular", "HTML/CSS", "WordPress", "Figma"];

export function FilterSidebar() {
  const [priceRange, setPriceRange] = useState([25, 150]);
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    tags: true,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="w-80 h-full glass-card border-r border-white/10 backdrop-blur-xl p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <Filter className="h-5 w-5 text-primary neon-glow" />
        <h2 className="text-lg font-semibold">Filters</h2>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-foreground/90">Categories</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleSection("categories")}
            className="h-auto p-1 hover:bg-white/10"
          >
            {expandedSections.categories ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>

        {expandedSections.categories && (
          <div className="space-y-2 animate-accordion-down">
            {categories.map((category) => (
              <div
                key={category.name}
                className="flex items-center justify-between p-3 rounded-lg glass hover:bg-white/10 cursor-pointer transition-all duration-300 group hover:scale-[1.02]"
              >
                <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors">
                  {category.name}
                </span>
                <Badge variant="secondary" className="text-xs">
                  {category.count}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-foreground/90">Price Range</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleSection("price")}
            className="h-auto p-1 hover:bg-white/10"
          >
            {expandedSections.price ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>

        {expandedSections.price && (
          <div className="space-y-4 animate-accordion-down">
            <div className="px-3">
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={200}
                min={0}
                step={5}
                className="w-full"
              />
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground px-3">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        )}
      </div>

      {/* Tags */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-foreground/90">Technologies</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleSection("tags")}
            className="h-auto p-1 hover:bg-white/10"
          >
            {expandedSections.tags ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>

        {expandedSections.tags && (
          <div className="flex flex-wrap gap-2 animate-accordion-down">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="cursor-pointer hover:bg-primary/20 hover:border-primary/50 transition-all duration-300 hover:scale-105"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Clear Filters */}
      <Button
        variant="outline"
        className="w-full glass-card border-white/20 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
      >
        Clear All Filters
      </Button>
    </div>
  );
}
