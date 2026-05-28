import { Card, CardContent, CardHeader } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { PlusCircle, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";

export function Cases() {
  const cases = [
    { name: "Sarah Miller", dept: "Engineering", type: "Long-Term", from: "🇩🇪 Germany", to: "🇬🇧 UK", start: "01 Mar 2026", status: "Briefing Call", statusCol: "warning" },
    { name: "James Chen", dept: "Finance", type: "Short-Term", from: "🇸🇬 Singapore", to: "🇺🇸 USA", start: "15 Feb 2026", status: "Survey & Quotes", statusCol: "default" },
    { name: "Priya Sharma", dept: "HR", type: "Commuter", from: "🇮🇳 India", to: "🇦🇪 UAE", start: "01 Jan 2026", status: "Complete", statusCol: "success" },
    { name: "Marco Rossi", dept: "Operations", type: "Permanent Transfer", from: "🇮🇹 Italy", to: "🇳🇱 Netherlands", start: "10 Apr 2026", status: "Mover Assigned", statusCol: "default" },
  ];

  return (
    <div className="max-w-7xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-slate-900 tracking-tight">Cases</h1>
          <p className="text-slate-500 mt-1">Manage all mobility assignments.</p>
        </div>
        <Link to="/new-case">
          <Button className="bg-primary-600 hover:bg-primary-700 h-10 px-5">
            <PlusCircle className="h-4 w-4 mr-2" /> New Case
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2 w-full max-w-sm px-3 py-1.5 bg-slate-100 rounded-lg border border-slate-200">
            <Search className="h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search cases..." 
              className="bg-transparent border-none outline-none text-sm w-full text-slate-700 placeholder:text-slate-400"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" /> Filter
          </Button>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50/80 border-b tracking-wider hidden sm:table-header-group">
              <tr>
                <th className="px-6 py-4 font-semibold">Employee</th>
                <th className="px-6 py-4 font-semibold">Type</th>
                <th className="px-6 py-4 font-semibold">Route</th>
                <th className="px-6 py-4 font-semibold">Start Date</th>
                <th className="px-6 py-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {cases.map((c, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors flex flex-col sm:table-row p-4 sm:p-0">
                  <td className="px-0 sm:px-6 py-2 sm:py-4">
                    <div className="font-semibold text-slate-900">{c.name}</div>
                    <div className="text-slate-500 text-xs mt-0.5">{c.dept}</div>
                  </td>
                  <td className="px-0 sm:px-6 py-2 sm:py-4">
                    <span className="sm:hidden text-xs text-slate-400 uppercase font-semibold mr-2">Type:</span>
                    {c.type}
                  </td>
                  <td className="px-0 sm:px-6 py-2 sm:py-4">
                    <span className="sm:hidden text-xs text-slate-400 uppercase font-semibold mr-2">Route:</span>
                    {c.from} <span className="text-slate-300 mx-1">→</span> {c.to}
                  </td>
                  <td className="px-0 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-slate-600">
                    <span className="sm:hidden text-xs text-slate-400 uppercase font-semibold mr-2">Start:</span>
                    {c.start}
                  </td>
                  <td className="px-0 sm:px-6 py-2 sm:py-4">
                    <Badge variant={c.statusCol as any}>{c.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
