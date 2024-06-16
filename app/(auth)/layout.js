import Link from 'next/link';

import { DocumentTextIcon } from '@heroicons/react/24/outline';

export default function RootLayout({ children }) {
    return (
        <>
            <div className="fixed top-0 left-0 w-full min-h-20 flex items-center px-10">
                <Link href={`/`} className="flex gap-1">
                    <DocumentTextIcon className="h-5 w-5 " />
                    <h1 className=" font-medium">Kurippu</h1>
                </Link>
            </div>
            <div className="min-h-svh flex py-20 ">{children}</div>
        </>
    );
}
