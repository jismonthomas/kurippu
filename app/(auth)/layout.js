import Link from "next/link";

import { DocumentTextIcon } from "@heroicons/react/24/solid";

export default function RootLayout({ children }) {
  return (
    <>
      <div className="fixed left-0 top-0 flex min-h-20 w-full items-center px-10">
        <Link href={`/`} className="flex gap-1">
          <DocumentTextIcon className="h-5 w-5" />
          <h1 className="font-medium">Kurippu</h1>
        </Link>
      </div>
      <div className="flex min-h-svh py-20">{children}</div>
    </>
  );
}
