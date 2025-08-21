import { useState } from "react";
import { Filter, Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export function FilterBar() {
  const [activeFilters, setActiveFilters] = useState([]);

  const categories = ["All", "Landing Pages", "E-commerce", "SaaS", "Portfolios", "Mobile Apps"];
  const priceRanges = ["All Prices", "$0-25", "$26-50", "$51-100", "$100+"];

  return (
    <div className="glass-card p-6 mb-8 space-y-4">
      {/* Search and Filters Row */}
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            className="pl-10 glass-card border-white/20 bg-background/50 focus:border-primary/50"
          />
        </div>
        
        <div className="flex items-center gap-3">
          <Select defaultValue="All">
            <SelectTrigger className="w-40 glass-card border-white/20 bg-background/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="glass-card border-white/20">
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select defaultValue="All Prices">
            <SelectTrigger className="w-32 glass-card border-white/20 bg-background/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="glass-card border-white/20">
              {priceRanges.map((range) => (
                <SelectItem key={range} value={range}>
                  {range}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm" className="glass-card border-white/20 hover:border-primary/50">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {activeFilters.map((filter) => (
            <Badge
              key={filter}
              variant="secondary"
              className="cursor-pointer hover:bg-destructive/20"
              onClick={() => setActiveFilters(prev => prev.filter(f => f !== filter))}
            >
              {filter} ×
            </Badge>
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveFilters([])}
            className="text-xs hover:bg-destructive/20"
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
}
