import { Card, CardContent, CardHeader } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { PlusCircle, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { BNP_CASES } from "../data/bnpCases";
import { getStatusColor } from "../lib/statusUtils";
import { useState } from "react";

export function Cases() {
  const [query, setQuery] = useState("");
  const filtered = BNP_CASES.filter(
    (c) =>
      c.id.toLowerCase().includes(query.toLowerCase()) ||
      c.assignee.name.toLowerCase().includes(query.toLowerCase()) ||
      c.from.country.toLowerCase().includes(query.toLowerCase()) ||
      c.to.country.toLowerCase().includes(query.toLowerCase()) ||
      c.entity.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold tracking-widest text-primary-600 uppercase">BNP Paribas</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-slate-900 tracking-tight">Cases</h1>
          <p className="text-slate-500 mt-1">Manage all mobility assignments — {BNP_CASES.length} active cases.</p>
        </div>
        <Link to="/new-case">
          <Button className="bg-primary-600 hover:bg-primary-700 h-10 px-5">
            <PlusCircle className="h-4 w-4 mr-2" /> New Case
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between p-4 border-b gap-3">
          <div className="flex items-center gap-2 w-full max-w-sm px-3 py-1.5 bg-slate-100 rounded-lg border border-slate-200">
            <Search className="h-4 w-4 text-slate-400 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search cases, assignees, entities..."
              className="bg-transparent border-none outline-none text-sm w-full text-slate-700 placeholder:text-slate-400"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" /> Filter
          </Button>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50/80 border-b tracking-wider">
              <tr>
                <th className="px-5 py-4 font-semibold">Case Ref</th>
                <th className="px-5 py-4 font-semibold">Assignee</th>
                <th className="px-5 py-4 font-semibold">Entity</th>
                <th className="px-5 py-4 font-semibold">Route</th>
                <th className="px-5 py-4 font-semibold">Type</th>
                <th className="px-5 py-4 font-semibold">MMC</th>
                <th className="px-5 py-4 font-semibold">Initiated</th>
                <th className="px-5 py-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((c) => {
                const col = getStatusColor(c.status);
                return (
                  <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4">
                      <Link to={`/cases/${c.id}`} className="text-primary-600 hover:underline font-mono text-xs font-semibold">
                        {c.id}
                      </Link>
                    </td>
                    <td className="px-5 py-4">
                      <div className="font-semibold text-slate-900">{c.assignee.name}</div>
                      <div className="text-slate-400 text-xs">{c.assignee.nationality}</div>
                    </td>
                    <td className="px-5 py-4 text-slate-600 max-w-[180px]">
                      <div className="truncate text-xs">{c.entity}</div>
                    </td>
                    <td className="px-5 py-4 text-slate-700 whitespace-nowrap">
                      {c.from.flag} {c.from.city} <span className="text-slate-300 mx-1">→</span> {c.to.flag} {c.to.city}
                    </td>
                    <td className="px-5 py-4 text-slate-600">{c.assignmentType}</td>
                    <td className="px-5 py-4 text-slate-600">
                      {c.mmc ?? <span className="text-amber-500 font-medium text-xs">⚠ Unassigned</span>}
                    </td>
                    <td className="px-5 py-4 text-slate-500 whitespace-nowrap">
                      {new Date(c.initiationDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${col.bg} ${col.text}`}>
                        <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${col.dot}`} />
                        {c.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-5 py-12 text-center text-slate-400">No cases match your search.</td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
