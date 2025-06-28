
import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
}

export const SearchFilter = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  priceRange,
  onPriceRangeChange,
}: SearchFilterProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const clearFilters = () => {
    onSearchChange('');
    onCategoryChange('All');
    onPriceRangeChange([0, 200]);
  };

  const hasActiveFilters = searchTerm || selectedCategory !== 'All' || priceRange[0] > 0 || priceRange[1] < 200;

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8 p-6 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-amber-100">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600 h-5 w-5" />
        <Input
          placeholder="Search fragrances..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 border-amber-200 focus:border-rose-400 focus:ring-rose-200 bg-white/80"
        />
      </div>

      <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            className="border-amber-200 text-amber-800 hover:bg-amber-50 relative"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {hasActiveFilters && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full"></span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-6 bg-white/95 backdrop-blur-md border-amber-200">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-playfair font-semibold text-amber-900">Filters</h3>
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-rose-600 hover:text-rose-700"
                >
                  Clear all
                </Button>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-amber-800 mb-3">
                Category
              </label>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => onCategoryChange(category)}
                    className={selectedCategory === category 
                      ? "bg-gradient-to-r from-rose-500 to-amber-500 text-white" 
                      : "border-amber-200 text-amber-800 hover:bg-amber-50"
                    }
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-amber-800 mb-3">
                Price Range: ${priceRange[0]} - ${priceRange[1]}
              </label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={priceRange[0]}
                  onChange={(e) => onPriceRangeChange([Number(e.target.value), priceRange[1]])}
                  className="border-amber-200 focus:border-rose-400"
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={priceRange[1]}
                  onChange={(e) => onPriceRangeChange([priceRange[0], Number(e.target.value)])}
                  className="border-amber-200 focus:border-rose-400"
                />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="icon"
          onClick={clearFilters}
          className="text-rose-600 hover:text-rose-700 hover:bg-rose-50"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};
