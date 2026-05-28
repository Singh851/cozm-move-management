import * as React from "react";
import { HelpCircle } from "lucide-react";

export function HelpTooltip({ text }: { text: string }) {
  return (
    <div className="group relative inline-flex items-center justify-center ml-1.5 cursor-help transform translate-y-[1px]">
      <HelpCircle className="h-4 w-4 text-slate-400 group-hover:text-primary-500 transition-colors" />
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 bg-slate-900 text-white text-xs p-2.5 rounded-lg shadow-xl text-center font-medium tracking-wide pointer-events-none leading-relaxed">
        {text}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-x-4 border-x-transparent border-t-4 border-t-slate-900" />
      </div>
    </div>
  );
}
