import AdminSidebar from "./_components/AdminSidebar";
import AdminHeader from "./_components/AdminHeader";
import { SidebarProvider } from "./_components/AdminSidebarContext";

export const metadata = {
  title: "Administration — L'Escapade Rangeoise",
  robots: "noindex, nofollow",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="min-h-[100dvh] bg-gray-50">
        <AdminSidebar />
        <div className="lg:ml-64 flex flex-col min-h-[100dvh]">
          <AdminHeader />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
