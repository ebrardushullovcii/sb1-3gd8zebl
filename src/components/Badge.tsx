'use client';

import React from 'react';

interface BadgeProps {
  count: number;
}

export function Badge({ count }: BadgeProps) {
  return (
    <span className="bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
      {count}
    </span>
  );
}