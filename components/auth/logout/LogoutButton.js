'use client';

import { useTransition } from 'react';

import { cn } from '@/lib/utils';
import logout from '@/lib/actions/logout';

import { Button } from '@/components/ui/button';
import LoadingAnimation from '@/components/LoadingAnimation';

const LogoutButton = () => {
    const [isPending, startTransition] = useTransition();

    const logoutUser = () => {
        startTransition(() => logout());
    };

    return (
        <form action={logoutUser}>
            <Button type="submit" className="h-auto w-full relative">
                <span
                    className={cn('opacity-100', {
                        'opacity-0': isPending,
                    })}>
                    Log Out
                </span>
                <LoadingAnimation
                    className={cn(
                        `absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0`,
                        {
                            'opacity-100': isPending,
                        }
                    )}
                />
            </Button>
        </form>
    );
};

export default LogoutButton;
