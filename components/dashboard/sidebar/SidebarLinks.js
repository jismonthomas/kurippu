"use server";

import SidebarLink from "./SidebarLink";
import getAllTags from "@/lib/getAllTags";

const SidebarLinks = async () => {
  const allTags = await getAllTags();

  let allSidebarLinks = [
    {
      href: "/dashboard",
      label: `All Todos`,
    },
  ];

  if (allTags && allTags.length > 0) {
    const tagLinks = allTags?.map((tag) => ({
      href: `/dashboard/tag/${tag.tag_name}--${tag.tag_id}`,
      label: `# ${tag.tag_name}`,
    }));
    allSidebarLinks = [...allSidebarLinks, ...tagLinks];
  }

  return (
    <div className="flex flex-col gap-2 p-6">
      {allSidebarLinks?.map((link) => {
        return (
          <SidebarLink key={link.label} href={link.href}>
            {link.label}
          </SidebarLink>
        );
      })}
    </div>
  );
};

export default SidebarLinks;
