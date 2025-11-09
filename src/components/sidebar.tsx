"use client";

import {
  LayoutDashboard,
  ClipboardList,
  Users,
  UtensilsCrossed,
  Box,
  X,
  Menu,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard className="size-5" />,
      href: "/dashboard",
    },
    {
      name: "Tables",
      icon: <UtensilsCrossed className="size-5" />,
      href: "/tables",
    },
    {
      name: "Orders",
      icon: <ClipboardList className="size-5" />,
      href: "/orders",
    },
    {
      name: "Inventory",
      icon: <Box className="size-5" />,
      href: "/inventory",
    },
    { name: "Staff", icon: <Users className="size-5" />, href: "/staff" },
  ];

  return (
    <div
      className={`text-gray-600 h-full transition-all duration-300 px-4 ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      <div
        className={`flex items-center py-5 px-2 ${
          isOpen ? "justify-between" : "justify-center"
        }`}
      >
        {isOpen && <h1 className="text-xl font-bold">BarHub</h1>}
        <button onClick={toggleSidebar} className="focus:outline-none">
          {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <ul
        className={`mt-6 space-y-2 flex flex-col ${
          isOpen ? "" : "items-center"
        }`}
      >
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              href={item.href}
              key={item.name}
              className={`flex items-center font-semibold gap-4 p-3 rounded-lg cursor-pointer transition-colors ${
                isActive
                  ? "bg-blue-100 text-blue-600"
                  : "hover:bg-gray-100 focus:text-blue-500 focus:bg-blue-100/50"
              } ${isOpen ? "" : "justify-center"}`}
            >
              <span className="text-lg">{item.icon}</span>
              {isOpen && <span>{item.name}</span>}
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
