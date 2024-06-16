'use server';

import Link from 'next/link';

import { createClient } from '@/utils/supabase/server';

import { Separator } from '@/components/ui/separator';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import LogoutButton from '../auth/logout/LogoutButton';

const TopbarProfile = async () => {
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();
    // console.log('user', data.user);

    const userDetails = {
        name: data.user.user_metadata.name,
        email: data.user.user_metadata.email,
    };

    const firstNameInitial = userDetails.name.slice(0, 1);
    const lastName = userDetails.name?.split(' ');

    const lastNameInitial =
        lastName.length > 1 ? lastName?.slice(-1)[0]?.slice(0, 1) : null;

    return (
        <>
            <Popover>
                <PopoverTrigger>
                    <Avatar>
                        <AvatarFallback className="bg-gray-200 text-gray-950 uppercase border border-gray-200 font-semibold">
                            {firstNameInitial}
                            {lastNameInitial}
                        </AvatarFallback>
                    </Avatar>
                </PopoverTrigger>
                <PopoverContent
                    align="end"
                    className="text-sm text-gray-500 shadow-none px-0 py-4 rounded-xl">
                    <div className="px-4 py-2">{userDetails.email}</div>
                    <Link
                        href="/dashboard/account"
                        className="flex items-center justify-between gap-1 px-4 py-2 hover:text-gray-700 hover:bg-gray-200">
                        Account Settings
                        <Cog6ToothIcon className="h-6" />
                    </Link>
                    <Separator className="my-2 mx-4 w-auto" />
                    <div className="px-4 pt-2">
                        <LogoutButton />
                    </div>
                </PopoverContent>
            </Popover>
        </>
    );
};

export default TopbarProfile;
