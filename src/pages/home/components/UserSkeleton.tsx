import { Skeleton } from "@/components/ui/skeleton";

export const UserSkeleton = () => {
  return (
    <div className="inline-flex items-start space-x-3 p-3">
      <Skeleton className="w-10 h-10 rounded-full bg-zinc-700" />
      <Skeleton className="w-40 h-10 rounded bg-gray-600" />
    </div>
  );
};
