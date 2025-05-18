import { Skeleton } from "@/components/ui/skeleton";

export function MessageSkeleton() {
  return (
    <div className="flex items-start space-x-3 p-3">
      <Skeleton className="w-10 h-10 rounded-full bg-zinc-700" />

      <div className="flex flex-col space-y-2">
        <Skeleton className="w-24 h-4 rounded bg-gray-600" />

        <Skeleton className="w-60 h-4 rounded bg-gray-600" />
        <Skeleton className="w-48 h-4 rounded bg-gray-600" />
      </div>
    </div>
  );
}
