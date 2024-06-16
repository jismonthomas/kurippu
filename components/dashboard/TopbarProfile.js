"use server";

import Link from "next/link";

import { createClient } from "@/utils/supabase/server";
import LogoutButton from "../auth/logout/LogoutButton";

import { Separator } from "@/components/ui/separator";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const TopbarProfile = async () => {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  const userDetails = {
    name: data.user.user_metadata.name,
    email: data.user.user_metadata.email,
  };

  const firstNameInitial = userDetails.name.slice(0, 1);
  const lastName = userDetails.name?.split(" ");

  const lastNameInitial =
    lastName.length > 1 ? lastName?.slice(-1)[0]?.slice(0, 1) : null;

  return (
    <>
      <Popover>
        <PopoverTrigger>
          <Avatar>
            <AvatarFallback className="border border-gray-200 bg-gray-200 font-semibold uppercase text-gray-950">
              {firstNameInitial}
              {lastNameInitial}
            </AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          className="rounded-xl px-0 py-4 text-sm text-gray-500 shadow-none"
        >
          <div className="px-4 py-2">{userDetails.email}</div>
          <Link
            href="/dashboard/account"
            className="flex items-center justify-between gap-1 px-4 py-2 hover:bg-gray-200 hover:text-gray-700"
          >
            Account Settings
            <Cog6ToothIcon className="h-6" />
          </Link>
          <Separator className="mx-4 my-2 w-auto" />
          <div className="px-4 pt-2">
            <LogoutButton />
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default TopbarProfile;
