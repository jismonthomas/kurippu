import { Skeleton } from "./skeleton";

const SidebarSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 p-6">
      <Skeleton className="h-8 w-full rounded-md" />
      <Skeleton className="h-8 w-full rounded-md" />
      <Skeleton className="h-8 w-full rounded-md" />
    </div>
  );
};

export default SidebarSkeleton;
