"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const SidebarLink = ({ href, children }) => {
  const pathname = usePathname();

  const isActiveLink = pathname === href;

  return (
    <Link
      className={cn(
        "relative rounded-md bg-transparent px-2 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900",
        {
          "pointer-events-none text-slate-900": isActiveLink,
        },
      )}
      href={href}
    >
      <span className="z-10">{children}</span>

      {isActiveLink && (
        <motion.div
          layoutId="active-bg"
          className="absolute inset-0 z-[-1] rounded-md bg-slate-200"
        ></motion.div>
      )}
    </Link>
  );
};

export default SidebarLink;
