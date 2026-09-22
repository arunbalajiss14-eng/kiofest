import React from 'react';

export default function LoadingSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="fest-glass rounded-none overflow-hidden border-4 border-black p-5 space-y-4 animate-pulse"
        >
          {/* Image placeholder */}
          <div className="h-44 w-full bg-neutral-200 rounded-none" />

          {/* Badges placeholder */}
          <div className="flex gap-2">
            <div className="h-5 w-14 bg-neutral-200 rounded-none" />
            <div className="h-5 w-20 bg-neutral-200 rounded-none" />
          </div>

          {/* Title placeholder */}
          <div className="h-6 w-3/4 bg-neutral-200 rounded-none" />

          {/* Text lines */}
          <div className="space-y-2">
            <div className="h-3 w-full bg-neutral-200 rounded" />
            <div className="h-3 w-5/6 bg-neutral-200 rounded" />
          </div>

          {/* Bottom actions */}
          <div className="flex justify-between items-center pt-3 border-t-2 border-neutral-200">
            <div className="h-5 w-16 bg-neutral-200 rounded" />
            <div className="h-9 w-24 bg-neutral-200 rounded-none" />
          </div>
        </div>
      ))}
    </div>
  );
}
