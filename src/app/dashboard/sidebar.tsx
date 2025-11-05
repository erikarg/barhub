"use client";

import {
  LayoutDashboard,
  Table,
  ClipboardList,
  Boxes,
  Users,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard /> },
    { name: "Tables", icon: <Table /> },
    { name: "Orders", icon: <ClipboardList /> },
    { name: "Inventory", icon: <Boxes /> },
    { name: "Staff", icon: <Users /> },
  ];

  return (
    <div
      className={`bg-gray-900 text-white h-full transition-all duration-300 ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      <div className="flex justify-between items-center p-4">
        {isOpen && <h1 className="text-xl font-bold">BarHub</h1>}
        <button onClick={toggleSidebar} className="focus:outline-none">
          {isOpen ? "«" : "»"}
        </button>
      </div>

      <ul
        className={`mt-6 space-y-4 flex flex-col ${
          isOpen ? "" : "items-center"
        }`}
      >
        {menuItems.map((item) => (
          <li
            key={item.name}
            className={`flex items-center gap-4 p-2 hover:bg-gray-800 rounded cursor-pointer ${
              isOpen ? "" : "justify-center"
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            {isOpen && <span>{item.name}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
