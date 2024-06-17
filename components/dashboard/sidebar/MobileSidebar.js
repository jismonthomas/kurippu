import { Suspense } from "react";

import SidebarLinks from "./SidebarLinks";

import { Menu } from "lucide-react";
import SidebarSkeleton from "@/components/ui/SidebarSkeleton";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className="h-6">
        <Menu className="h-6 w-6" />
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        <div>
          <Suspense fallback={<SidebarSkeleton />}>
            <SidebarLinks className={`px-0`} />
          </Suspense>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
