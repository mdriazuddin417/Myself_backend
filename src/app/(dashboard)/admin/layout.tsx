import Sidebar from "@/components/shared/Sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar stays fixed height */}
      <Sidebar />

      {/* Content should scroll */}
      <main className="flex-1 overflow-y-auto p-4 bg-white">
        {children}
      </main>
    </div>
  );
}
