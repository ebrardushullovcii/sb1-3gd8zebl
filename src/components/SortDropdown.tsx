'use client';

import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { SortOption } from '@/types';

interface SortDropdownProps {
  value: SortOption;
  isOpen: boolean;
  onToggle: () => void;
  onChange: (value: SortOption) => void;
  options: SortOption[];
}

export function SortDropdown({ value, isOpen, onToggle, onChange, options }: SortDropdownProps) {
  return (
    <div className="relative">
      <Button
        onClick={onToggle}
        variant="ghost"
        className={cn(
          "flex flex-col items-start bg-white/50 border border-gray-200/50 rounded-full px-3 py-1",
          "min-w-[120px] h-[42px] hover:bg-white/60"
        )}
      >
        <span className="text-xs text-gray-500">Sort by:</span>
        <div className="flex items-center justify-between w-full gap-2">
          <span className="text-sm">{value}</span>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </div>
      </Button>
      
      {isOpen && (
        <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200/50 rounded-2xl shadow-lg overflow-hidden z-10">
          {options.map((option, index) => (
            <Button
              key={option}
              onClick={() => onChange(option)}
              variant="ghost"
              className={cn(
                "w-full justify-start px-4 py-2.5 text-sm",
                value === option && "text-[rgba(255,86,52,1)]",
                index > 0 && "border-t border-gray-100"
              )}
            >
              {option}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}