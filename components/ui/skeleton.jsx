import { cn } from '@/lib/utils';

function Skeleton({ className, ...props }) {
    return (
        <div
            className={cn(
                'animate-pulse rounded-md bg-foreground/5',
                className
            )}
            {...props}
        />
    );
}

export { Skeleton };
