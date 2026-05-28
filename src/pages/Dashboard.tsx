import { Card, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Truck, CheckCircle2, Clock, FileText, AlertCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { BNP_CASES } from "../data/bnpCases";
import { getStatusColor, STATUS_ORDER } from "../lib/statusUtils";

const kpis = [
  { label: "Active Moves", value: "38", icon: Truck, color: "bg-primary-100 text-primary-600", badge: "↑ 6%", badgeVariant: "success" as const },
  { label: "Completed This Month", value: "12", icon: CheckCircle2, color: "bg-green-100 text-green-600", badge: "↑ 3", badgeVariant: "success" as const },
  { label: "On-Time Delivery", value: "94%", icon: Clock, color: "bg-primary-100 text-primary-600", badge: "↑ 2%", badgeVariant: "success" as const },
  { label: "Quote Timeliness", value: "87%", icon: FileText, color: "bg-yellow-100 text-yellow-600", badge: undefined, badgeVariant: undefined },
  { label: "Pending Approvals", value: "5", icon: AlertCircle, color: "bg-red-100 text-red-600", badge: "↓ 2", badgeVariant: "destructive" as const },
];

const pipelineCounts = STATUS_ORDER.map((s) => ({
  status: s,
  count: BNP_CASES.filter((c) => c.status === s).length,
}));

export function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto pb-12">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-xs font-semibold tracking-widest text-primary-600 uppercase">BNP Paribas</span>
        </div>
        <h1 className="font-display text-3xl font-bold text-slate-900 tracking-tight">Move Management Dashboard</h1>
        <p className="text-slate-500 mt-1">Real-time overview of your global mobility programme.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {kpis.map((kpi) => (
          <Card key={kpi.label}>
            <CardContent className="p-5 flex flex-col items-start gap-4">
              <div className="flex w-full justify-between items-start">
                <div className={`p-2.5 rounded-lg ${kpi.color}`}>
                  <kpi.icon className="h-5 w-5" />
                </div>
                {kpi.badge ? (
                  <Badge variant={kpi.badgeVariant ?? "default"} className="text-[10px]">{kpi.badge}</Badge>
                ) : (
                  <span className="text-xs text-slate-300 font-bold">—</span>
                )}
              </div>
              <div>
                <div className="text-3xl font-display font-bold text-slate-900">{kpi.value}</div>
                <div className="text-sm font-medium text-slate-500 mt-1">{kpi.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Pipeline chart */}
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <h2 className="font-display font-semibold text-slate-900 mb-5">Case Pipeline</h2>
            <div className="space-y-3">
              {pipelineCounts.map(({ status, count }) => {
                const colors = getStatusColor(status);
                const total = BNP_CASES.length || 1;
                const pct = Math.round((count / total) * 100);
                return (
                  <div key={status} className="flex items-center gap-3">
                    <div className="w-44 text-xs font-medium text-slate-600 truncate shrink-0">{status}</div>
                    <div className="flex-1 bg-slate-100 rounded-full h-2.5 overflow-hidden">
                      <div
                        className={`h-2.5 rounded-full ${colors.dot}`}
                        style={{ width: count === 0 ? "2px" : `${Math.max(pct, 3)}%` }}
                      />
                    </div>
                    <div className="w-6 text-xs text-slate-500 text-right shrink-0">{count}</div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Cost Savings */}
        <Card>
          <CardContent className="p-6">
            <h2 className="font-display font-semibold text-slate-900 mb-5">Cost Savings (EUR)</h2>
            <div className="space-y-4">
              {BNP_CASES.filter(c => c.quotes.some(q => q.winner && q.savings)).slice(0,4).map((c) => {
                const winner = c.quotes.find(q => q.winner);
                return (
                  <div key={c.id} className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium text-slate-900">{c.assignee.name}</p>
                      <p className="text-xs text-slate-500">{c.from.flag} {c.from.city} → {c.to.flag} {c.to.city}</p>
                    </div>
                    <span className="text-sm font-semibold text-green-600 shrink-0">
                      €{winner?.savings?.toLocaleString()}
                    </span>
                  </div>
                );
              })}
              <div className="border-t pt-3 mt-2">
                <p className="text-xs text-slate-500">Total savings (YTD)</p>
                <p className="text-2xl font-display font-bold text-green-600">
                  €{BNP_CASES.flatMap(c => c.quotes).filter(q => q.winner && q.savings).reduce((acc, q) => acc + (q.savings ?? 0), 0).toLocaleString("en-GB", { maximumFractionDigits: 0 })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Cases */}
      <Card>
        <CardContent className="p-0">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="font-display font-semibold text-slate-900">Recent Cases — BNP</h2>
            <Link to="/cases" className="text-sm text-primary-600 hover:underline flex items-center gap-1">
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50/80 border-b tracking-wider">
                <tr>
                  <th className="px-5 py-3 font-semibold">Case</th>
                  <th className="px-5 py-3 font-semibold">Assignee</th>
                  <th className="px-5 py-3 font-semibold">Route</th>
                  <th className="px-5 py-3 font-semibold">MMC</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {BNP_CASES.slice(0, 6).map((c) => {
                  const col = getStatusColor(c.status);
                  return (
                    <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-3">
                        <Link to={`/cases/${c.id}`} className="text-primary-600 hover:underline font-mono text-xs">{c.id}</Link>
                      </td>
                      <td className="px-5 py-3 font-medium text-slate-900">{c.assignee.name}</td>
                      <td className="px-5 py-3 text-slate-600">{c.from.flag} {c.from.city} → {c.to.flag} {c.to.city}</td>
                      <td className="px-5 py-3 text-slate-600">{c.mmc ?? <span className="text-slate-400 italic">Unassigned</span>}</td>
                      <td className="px-5 py-3">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${col.bg} ${col.text}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${col.dot}`} />
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
