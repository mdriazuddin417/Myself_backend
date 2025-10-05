"use client";

import { File, Home, PlusCircle } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  const session = { status: "authenticated" };

  const allAdminNavigation = [
    { icon: Home, title: "Home", path: "/" },
    { icon: Home, title: "Dashboard", path: "/admin" },
    { icon: PlusCircle, title: "Project Management", path: "/admin/projects" },
    { icon: File, title: "Blog Management", path: "/admin/blog" },
  ];

  return (
    <aside className="h-screen w-64 flex flex-col border-r bg-black text-white">
      {/* Top navigation */}
      <nav className="flex-1 space-y-2 p-4">
        {allAdminNavigation.map((item) => (
          <Link
            key={item.title}
            href={item.path}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100 hover:text-black"
          >
            <item.icon className="h-4 w-4" />
            {item.title}
          </Link>
        ))}
      </nav>

      {/* Bottom action */}
      {/* <div className="p-4 border-t border-gray-500">
        {session.status === "authenticated" && (
          <Button
            variant="destructive"
            className="w-full justify-start gap-2 cursor-pointer"
            onClick={() => signOut()}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        )}
      </div> */}
    </aside>
  );
}

