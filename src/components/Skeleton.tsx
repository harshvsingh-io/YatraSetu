import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return <div className={cn("skeleton", className)} />;
}

export function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-earth-200 bg-white p-4 space-y-3">
      <Skeleton className="h-48 w-full rounded-xl" />
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <div className="flex gap-2">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-3 w-12" />
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="flex min-h-[80vh] items-center px-6">
      <div className="mx-auto max-w-7xl w-full grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-3/4" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-5/6" />
          <div className="flex gap-4">
            <Skeleton className="h-12 w-40 rounded-xl" />
            <Skeleton className="h-12 w-36 rounded-xl" />
          </div>
        </div>
        <Skeleton className="h-[400px] rounded-2xl" />
      </div>
    </div>
  );
}
