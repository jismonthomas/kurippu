import Link from "next/link";

import { DocumentTextIcon } from "@heroicons/react/24/solid";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div>
        <div className="flex items-center gap-3 p-3 lg:p-6">
          <div className="inline-block rounded-lg bg-slate-950 p-2">
            <DocumentTextIcon className="h-7 w-7 text-slate-50 sm:h-14 sm:w-14 lg:h-24 lg:w-24" />
          </div>
          <h1 className="text-5xl font-bold sm:text-7xl lg:text-9xl">
            Kurippu
          </h1>
        </div>

        <Link
          className="mt-2.5 inline-block rounded-md border border-slate-950 bg-transparent px-4 py-2 text-center hover:bg-slate-950 hover:text-slate-50 max-sm:w-full sm:float-right lg:mt-5"
          href={`/login`}
        >
          continue to dashboard
        </Link>
      </div>
    </div>
  );
}
