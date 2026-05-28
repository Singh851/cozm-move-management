import { Bell, Search, Menu, MessageSquare, HelpCircle } from "lucide-react";

export function Topbar({ onToggleSidebar, collapsed }: { onToggleSidebar: () => void; collapsed: boolean }) {
  return (
    <div className="flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-4 fixed top-0 z-50">
      <div className="flex items-center gap-4 h-full">
        <div className={`flex items-center h-full transition-all duration-300 ${collapsed ? "w-10" : "w-56"}`}>
          {!collapsed ? (
            <img
              src="https://public-cozm.s3.eu-central-1.amazonaws.com/assets/logos/the-cozm-logo.png"
              alt="Cozm"
              className="h-7 w-auto object-contain"
            />
          ) : (
            <img
              src="https://public-cozm.s3.eu-central-1.amazonaws.com/assets/logos/the-cozm-logo.png"
              alt="Cozm"
              className="h-6 w-auto object-contain"
            />
          )}
        </div>

        <button
          onClick={onToggleSidebar}
          className="p-2 text-slate-500 hover:text-primary-600 hover:bg-slate-100 rounded-md transition-colors focus:outline-none"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg border border-slate-200 w-80">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search cases, employees..."
            className="bg-transparent border-none outline-none text-sm w-full text-slate-700 placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
          EN
        </button>
        <button className="p-2 text-slate-500 hover:text-primary-600 hover:bg-slate-100 rounded-md transition-colors relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 border border-white" />
        </button>
        <button className="p-2 text-slate-500 hover:text-primary-600 hover:bg-slate-100 rounded-md transition-colors hidden sm:block">
          <MessageSquare className="h-5 w-5" />
        </button>
        <button className="p-2 text-slate-500 hover:text-primary-600 hover:bg-slate-100 rounded-md transition-colors hidden sm:block">
          <HelpCircle className="h-5 w-5" />
        </button>
        <div className="ml-2 h-9 w-9 rounded-full bg-gradient-to-tr from-slate-900 to-primary-600 flex items-center justify-center text-white font-semibold text-sm cursor-pointer shadow-sm">
          HM
        </div>
      </div>
    </div>
  );
}
