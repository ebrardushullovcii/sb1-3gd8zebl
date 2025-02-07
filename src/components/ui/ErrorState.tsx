'use client';

import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="max-w-3xl mx-auto bg-white/60 backdrop-blur-sm rounded-xl shadow-sm p-8">
      <div className="text-center text-red-600">
        <p className="text-lg font-medium">{message}</p>
        <Button
          onClick={onRetry}
          variant="ghost"
          className="mt-4 text-sm"
        >
          Try again
        </Button>
      </div>
    </div>
  );
}