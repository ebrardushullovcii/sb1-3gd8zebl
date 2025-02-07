'use client';

import { forwardRef } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SearchInputProps {
  isExpanded: boolean;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onExpandClick: () => void;
  onCloseClick: () => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(({
  isExpanded,
  searchQuery,
  onSearchChange,
  onExpandClick,
  onCloseClick
}, ref) => {
  if (isExpanded) {
    return (
      <div className="relative flex items-center bg-white/50 border border-gray-200/50 rounded-full overflow-hidden pl-3 h-[42px]">
        <Search className="w-4 h-4 text-gray-400 mr-2" />
        <div className="relative flex-1">
          <input
            ref={ref}
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className={cn(
              "w-48 text-sm focus:outline-none bg-transparent pt-4",
              "placeholder:text-gray-400"
            )}
            placeholder=" "
          />
          <span className={cn(
            "absolute left-0 text-sm transition-all duration-200 pointer-events-none",
            searchQuery ? "text-xs text-gray-500 top-1" : "text-gray-400 top-3"
          )}>
            Search...
          </span>
        </div>
        <Button
          onClick={onCloseClick}
          variant="ghost"
          size="icon"
          className="h-[42px] w-[42px] hover:bg-transparent"
        >
          <X className="w-4 h-4 text-gray-500" />
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={onExpandClick}
      variant="ghost"
      size="icon"
      className="h-[42px] w-[42px] border border-gray-200/50 bg-white/50 rounded-full hover:bg-white/60"
    >
      <Search className="w-5 h-5 text-gray-500" />
    </Button>
  );
});