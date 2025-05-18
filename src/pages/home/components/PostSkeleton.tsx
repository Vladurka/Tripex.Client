import { Skeleton } from "@/components/ui/skeleton";

export const PostSkeleton = () => {
  return (
    <div className="flex items-start space-x-3 p-3">
      <Skeleton className="w-[300px] h-[300px] rounded-full bg-zinc-700" />
    </div>
  );
};
