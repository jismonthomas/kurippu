"use server";

import Link from "next/link";
import TopbarProfile from "./TopbarProfile";
import { DocumentTextIcon } from "@heroicons/react/24/solid";
import MobileSidebar from "./sidebar/MobileSidebar";

const Topbar = () => {
  return (
    <div className="sticky left-0 top-0 flex items-center border-b border-slate-200 bg-white px-6">
      {/* mobile menu items */}
      <div className="flex items-center gap-2 md:hidden">
        {/* sidebar */}
        <MobileSidebar />
        {/* top logo */}
        <Link href={"/dashboard"} className="flex items-center gap-3 p-2">
          <div className="inline-block rounded bg-slate-950 p-1">
            <DocumentTextIcon className="h-3 w-3 text-slate-50" />
          </div>
          <h1 className="text-xl font-bold">Kurippu</h1>
        </Link>
      </div>

      <div className="ml-auto flex min-h-16 items-center justify-end">
        <TopbarProfile />
      </div>
    </div>
  );
};

export default Topbar;
