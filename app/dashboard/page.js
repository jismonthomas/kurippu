import { Suspense } from "react";

import Dashboard from "@/components/dashboard/Dashboard";
import DashboardSkeleton from "@/components/ui/DashboardSkeleton";

export const metadata = {
  title: "Dashboard",
};

const DashboardPage = () => {
  return (
    <div className="mx-auto max-w-[800px] p-5">
      <Suspense fallback={<DashboardSkeleton />}>
        <Dashboard />
      </Suspense>
    </div>
  );
};

export default DashboardPage;
