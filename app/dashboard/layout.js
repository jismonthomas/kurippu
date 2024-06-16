import Topbar from "@/components/dashboard/Topbar";
import Sidebar from "@/components/dashboard/sidebar/Sidebar";
import { Toaster } from "sonner";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-svh overflow-hidden">
      <Sidebar />
      <div className="bg--50 w-full bg-slate-50">
        <Topbar />
        {children}
      </div>
      <Toaster />
    </div>
  );
}
