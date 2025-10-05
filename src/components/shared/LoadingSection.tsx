"use client";

import { Loader2 } from "lucide-react";

export default function LoadingSection() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh] space-y-4">
      {/* Spinner */}
      <Loader2 className="w-10 h-10 animate-spin text-primary" />

      {/* Text */}
      <p className="text-muted-foreground text-sm">Loading, please wait...</p>

      {/* Skeleton shimmer */}
      <div className="w-full max-w-md space-y-3">
        <div className="h-6 bg-muted rounded-md animate-pulse" />
        <div className="h-4 bg-muted rounded-md animate-pulse" />
        <div className="h-4 bg-muted rounded-md animate-pulse w-2/3" />
      </div>
    </div>
  );
}
