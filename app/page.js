import Link from "next/link";

import { DocumentTextIcon } from "@heroicons/react/24/solid";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div>
        <div className="flex items-center gap-3 p-6">
          <div className="inline-block rounded-lg bg-slate-950 p-2">
            <DocumentTextIcon className="h-24 w-24 text-slate-50" />
          </div>
          <h1 className="text-9xl font-bold">Kurippu</h1>
        </div>

        <Link
          className="float-right mt-5 inline-block rounded-md border border-slate-950 bg-transparent px-4 py-2 hover:bg-slate-950 hover:text-slate-50"
          href={`/dashboard`}
        >
          continue to dashboard
        </Link>
      </div>
    </div>
  );
}
