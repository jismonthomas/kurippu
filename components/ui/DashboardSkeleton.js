import { Skeleton } from "@/components/ui/skeleton";
import TodoFormSkeleton from "./TodoFormSkeleton";

const DashboardSkeleton = () => {
  return (
    <div className="flex flex-col space-y-3">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-6 w-full" />
        </div>
      </div>

      <TodoFormSkeleton />

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-6 w-full" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-6 w-full" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-6 w-full" />
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
