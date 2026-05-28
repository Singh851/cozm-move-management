import { NavLink } from "react-router-dom";
import {
  LayoutDashboard, Users, FileText, Settings,
  Briefcase, PlusCircle, CreditCard, ChevronDown, Mail,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { useState } from "react";

const navigation = [
  { name: "Introduction", href: "/", icon: FileText },
  {
    name: "Core Mobility",
    icon: Briefcase,
    children: [
      { name: "New Case", href: "/new-case", icon: PlusCircle },
      { name: "Cases", href: "/cases", icon: Users },
      { name: "Billing", href: "/billing", icon: CreditCard },
    ],
  },
  {
    name: "Analytics",
    icon: LayoutDashboard,
    children: [
      { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    ],
  },
  { name: "Email Templates", href: "/email-templates", icon: Mail },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar({ collapsed }: { collapsed: boolean }) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    "Core Mobility": true,
    Analytics: true,
  });

  const toggle = (name: string) =>
    setOpenSections((prev) => ({ ...prev, [name]: !prev[name] }));

  return (
    <div
      className={cn(
        "flex flex-col bg-slate-950 text-slate-400 transition-all duration-300 overflow-y-auto border-r border-slate-800",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex flex-col py-4">
        {navigation.map((item) => (
          <div key={item.name} className="flex flex-col mb-1">
            {item.children ? (
              <>
                <button
                  onClick={() => toggle(item.name)}
                  className={cn(
                    "flex items-center justify-between py-2.5 px-4 hover:bg-slate-900 hover:text-slate-100 transition-colors focus:outline-none",
                    collapsed && "justify-center px-0"
                  )}
                  title={item.name}
                >
                  <div className="flex items-center">
                    <item.icon className="h-5 w-5 shrink-0" />
                    {!collapsed && <span className="ml-3 text-sm font-medium">{item.name}</span>}
                  </div>
                  {!collapsed && (
                    <ChevronDown
                      className={cn("h-4 w-4 transition-transform", openSections[item.name] && "rotate-180")}
                    />
                  )}
                </button>
                {!collapsed && openSections[item.name] && (
                  <div className="flex flex-col mt-1 mb-2 space-y-1">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.name}
                        to={child.href}
                        className={({ isActive }) =>
                          cn(
                            "flex items-center py-2 pl-12 pr-4 text-sm font-medium transition-colors hover:text-white hover:bg-slate-900 border-l-2",
                            isActive
                              ? "text-primary-400 border-primary-500 bg-slate-900/50"
                              : "text-slate-400 border-transparent"
                          )
                        }
                      >
                        {child.icon && <child.icon className="h-4 w-4 shrink-0 mr-3" />}
                        {child.name}
                      </NavLink>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <NavLink
                to={item.href!}
                end
                className={({ isActive }) =>
                  cn(
                    "flex items-center py-2.5 px-4 transition-colors border-l-2",
                    isActive
                      ? "text-primary-400 border-primary-500 bg-slate-900/50"
                      : "text-slate-400 border-transparent hover:text-slate-100 hover:bg-slate-900",
                    collapsed && "justify-center px-0"
                  )
                }
                title={item.name}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {!collapsed && <span className="ml-3 text-sm font-medium">{item.name}</span>}
              </NavLink>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
