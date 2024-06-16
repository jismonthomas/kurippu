import { Skeleton } from './skeleton';

const TodoFormSkeleton = () => {
    return (
        <div className="border rounded-md flex flex-col justify-between p-3 bg-white min-h-[186px]">
            <div className="space-y-2">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-9 w-full" />
            </div>

            <div>
                <Skeleton className="h-8 w-24 mt-2 " />
            </div>

            <div className="mt-4 flex gap-2 justify-between">
                <Skeleton className="h-8 w-20" />
                <div className="flex gap-2">
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-8 w-20" />
                </div>
            </div>
        </div>
    );
};

export default TodoFormSkeleton;
