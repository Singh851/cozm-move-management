import { Card, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Truck, CheckCircle2, Clock, FileText, AlertCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { BNP_CASES } from "../data/bnpCases";
import { getStatusColor, STATUS_ORDER } from "../lib/statusUtils";
import { useState } from "react";
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  LineChart, Line,
} from "recharts";

// ── Filters ──────────────────────────────────────────────────────────────────
const ANALYSE_BY = ["All Moves", "By Entity", "By MMC", "By Route", "By Shipment Type"];
const DATE_RANGES = ["This Month", "Last Month", "Last Quarter", "Year to Date"];

// ── KPIs — derived from real case data where possible ────────────────────────
const activeMoves    = BNP_CASES.filter(c => c.status !== "Complete").length;
const completedCases = BNP_CASES.filter(c => c.status === "Complete").length;
const unassigned     = BNP_CASES.filter(c => !c.mmc).length;
const totalSavings   = BNP_CASES.flatMap(c => c.quotes).filter(q => q.winner && q.savings).reduce((a, q) => a + (q.savings ?? 0), 0);

const kpis = [
  { label: "Active Moves",           value: String(activeMoves),   icon: Truck,        color: "bg-primary-100 text-primary-600", badge: undefined,  bv: undefined },
  { label: "Completed Cases",        value: String(completedCases),icon: CheckCircle2, color: "bg-green-100 text-green-600",     badge: undefined,  bv: undefined },
  { label: "On-Time Delivery",       value: "94%",                 icon: Clock,        color: "bg-primary-100 text-primary-600", badge: "↑ 2%",    bv: "success" as const },
  { label: "Quote Timeliness",       value: "87%",                 icon: FileText,     color: "bg-yellow-100 text-yellow-600",   badge: undefined,  bv: undefined },
  { label: "Unassigned Cases",       value: String(unassigned),    icon: AlertCircle,  color: unassigned > 0 ? "bg-red-100 text-red-600" : "bg-slate-100 text-slate-500", badge: unassigned > 0 ? "Action needed" : undefined, bv: unassigned > 0 ? "destructive" as const : undefined },
];

// ── Chart data ────────────────────────────────────────────────────────────────
const STATUS_COLORS: Record<string, string> = {
  "Initialized": "#94a3b8",
  "Briefing Call Complete": "#60a5fa",
  "Survey & Quotes": "#fbbf24",
  "Mover Assigned": "#a78bfa",
  "Awaiting Move Dates": "#fb923c",
  "Awaiting Finals Origin": "#f97316",
  "In Transit": "#3FAEBD",
  "Delivery Follow Up": "#0d9488",
  "Awaiting Final Billing": "#f87171",
  "Complete": "#4ade80",
};

const statusPieData = STATUS_ORDER
  .map((s) => ({ name: s, value: BNP_CASES.filter((c) => c.status === s).length }))
  .filter((d) => d.value > 0);

const monthlyData = [
  { month: "Nov 25", initiated: 4, completed: 1 },
  { month: "Dec 25", initiated: 6, completed: 2 },
  { month: "Jan 26", initiated: 9, completed: 4 },
  { month: "Feb 26", initiated: 7, completed: 3 },
  { month: "Mar 26", initiated: 5, completed: 1 },
];

const savingsByEntity = [
  { entity: "FINDOMESTIC",     savings: 3050 },
  { entity: "BNPP London",     savings: 2460 },
  { entity: "BNPP HK",         savings: 558.30 },
  { entity: "BNPP Portugal",   savings: 509.30 },
];

const TOTAL_SAVINGS = totalSavings > 0 ? totalSavings : savingsByEntity.reduce((a, e) => a + e.savings, 0);

export function Dashboard() {
  const [analyseBy, setAnalyseBy] = useState("All Moves");
  const [dateRange, setDateRange] = useState("Year to Date");

  return (
    <div className="max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="mb-5">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-xs font-semibold tracking-widest text-primary-600 uppercase">BNP Paribas</span>
        </div>
        <h1 className="font-display text-3xl font-bold text-slate-900 tracking-tight">Move Management Dashboard</h1>
        <p className="text-slate-500 mt-1">Real-time overview of your global mobility programme.</p>
      </div>

      {/* Filters — EM-style */}
      <div className="flex flex-wrap gap-3 mb-7 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Analyse By</label>
          <select
            value={analyseBy}
            onChange={(e) => setAnalyseBy(e.target.value)}
            className="h-9 px-3 border border-slate-200 rounded-lg text-sm text-slate-700 bg-white focus:outline-none focus:border-primary-400 min-w-[160px]"
          >
            {ANALYSE_BY.map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Date Range</label>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="h-9 px-3 border border-slate-200 rounded-lg text-sm text-slate-700 bg-white focus:outline-none focus:border-primary-400 min-w-[160px]"
          >
            {DATE_RANGES.map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1 ml-auto self-end">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider invisible">.</span>
          <span className="h-9 flex items-center px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-500 font-medium">
            {BNP_CASES.length} cases · BNP Paribas
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-7">
        {kpis.map((kpi) => (
          <Card key={kpi.label}>
            <CardContent className="p-5 flex flex-col items-start gap-4">
              <div className="flex w-full justify-between items-start">
                <div className={`p-2.5 rounded-lg ${kpi.color}`}><kpi.icon className="h-5 w-5" /></div>
                {kpi.badge
                  ? <Badge variant={kpi.bv ?? "default"} className="text-[10px]">{kpi.badge}</Badge>
                  : <span className="text-xs text-slate-300 font-bold">—</span>}
              </div>
              <div>
                <div className="text-3xl font-display font-bold text-slate-900">{kpi.value}</div>
                <div className="text-sm font-medium text-slate-500 mt-1">{kpi.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Row 2: Donut + Monthly Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

        {/* Cases by Status — Donut */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-semibold text-slate-900">Cases by Status</h2>
              <select className="text-xs border border-slate-200 rounded-lg px-2 py-1 text-slate-600 bg-white focus:outline-none">
                <option>Status</option>
                <option>Type</option>
                <option>Route</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={statusPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {statusPieData.map((entry) => (
                    <Cell key={entry.name} fill={STATUS_COLORS[entry.name] ?? "#94a3b8"} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(v: number) => [`${v} case${v !== 1 ? "s" : ""}`, ""]}
                  contentStyle={{ fontSize: "11px", borderRadius: "8px", border: "1px solid #e2e8f0" }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1 mt-1">
              {statusPieData.map((d) => (
                <div key={d.name} className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: STATUS_COLORS[d.name] }} />
                  <span className="text-[10px] text-slate-500 truncate">{d.name}</span>
                  <span className="text-[10px] font-bold text-slate-700 ml-auto">{d.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Move Volume — Line/Bar */}
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-semibold text-slate-900">Monthly Move Volume</h2>
              <select className="text-xs border border-slate-200 rounded-lg px-2 py-1 text-slate-600 bg-white focus:outline-none">
                <option>Initiated vs Completed</option>
                <option>Period Comparison</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={monthlyData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ fontSize: "11px", borderRadius: "8px", border: "1px solid #e2e8f0" }}
                />
                <Legend wrapperStyle={{ fontSize: "11px" }} />
                <Line type="monotone" dataKey="initiated" stroke="#3FAEBD" strokeWidth={2.5} dot={{ fill: "#3FAEBD", r: 4 }} name="Initiated" />
                <Line type="monotone" dataKey="completed" stroke="#4ade80" strokeWidth={2.5} dot={{ fill: "#4ade80", r: 4 }} name="Completed" strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Row 3: Cost Savings Bar + Recent Cases */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

        {/* Cost Savings by Entity */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-display font-semibold text-slate-900">Cost Savings</h2>
              <span className="text-xs text-slate-400">EUR · YTD</span>
            </div>
            <div className="mb-4">
              <p className="text-3xl font-display font-bold text-green-600">€{TOTAL_SAVINGS.toLocaleString("en-GB", { maximumFractionDigits: 0 })}</p>
              <p className="text-xs text-slate-400 mt-0.5">Total savings across {savingsByEntity.length} cases</p>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={savingsByEntity} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `€${v}`} />
                <YAxis type="category" dataKey="entity" tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} width={80} />
                <Tooltip
                  formatter={(v: number) => [`€${v.toLocaleString()}`, "Savings"]}
                  contentStyle={{ fontSize: "11px", borderRadius: "8px", border: "1px solid #e2e8f0" }}
                />
                <Bar dataKey="savings" fill="#3FAEBD" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Cases Table */}
        <Card className="lg:col-span-2">
          <CardContent className="p-0">
            <div className="flex items-center justify-between p-5 pb-4 border-b">
              <h2 className="font-display font-semibold text-slate-900">Recent Cases — BNP</h2>
              <Link to="/cases" className="text-sm text-primary-600 hover:underline flex items-center gap-1">
                View all <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-[10px] text-slate-400 uppercase bg-slate-50/80 border-b tracking-wider">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Case</th>
                    <th className="px-4 py-3 font-semibold">Assignee</th>
                    <th className="px-4 py-3 font-semibold">Route</th>
                    <th className="px-4 py-3 font-semibold">MMC</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {BNP_CASES.slice(0, 5).map((c) => {
                    const col = getStatusColor(c.status);
                    return (
                      <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3">
                          <Link to={`/cases/${c.id}`} className="text-primary-600 hover:underline font-mono text-xs">{c.id}</Link>
                        </td>
                        <td className="px-4 py-3 font-medium text-slate-900 text-xs">{c.assignee.name}</td>
                        <td className="px-4 py-3 text-slate-600 text-xs whitespace-nowrap">{c.from.flag} {c.from.city} → {c.to.flag} {c.to.city}</td>
                        <td className="px-4 py-3 text-slate-500 text-xs">{c.mmc ?? <span className="text-amber-500">Unassigned</span>}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${col.bg} ${col.text}`}>
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
    </div>
  );
}
