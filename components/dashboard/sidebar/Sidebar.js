"use server";

import Link from "next/link";
import { Suspense } from "react";

import SidebarLinks from "./SidebarLinks";

import { DocumentTextIcon } from "@heroicons/react/24/solid";
import SidebarSkeleton from "@/components/ui/SidebarSkeleton";

const Sidebar = () => {
  return (
    <aside className="sticky left-0 top-0 hidden min-w-[275px] bg-white text-slate-950 md:block">
      <Link href={"/dashboard"} className="flex items-center gap-3 p-6">
        <div className="inline-block rounded-md bg-slate-950 p-2">
          <DocumentTextIcon className="h-6 w-6 text-slate-50" />
        </div>
        <h1 className="text-2xl font-bold">Kurippu</h1>
      </Link>
      <Suspense fallback={<SidebarSkeleton />}>
        <SidebarLinks />
      </Suspense>
    </aside>
  );
};

export default Sidebar;
