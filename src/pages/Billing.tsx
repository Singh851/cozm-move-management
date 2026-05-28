import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "../components/ui/Card";
import { BNP_CASES } from "../data/bnpCases";
import { CreditCard, CheckCircle2, Clock, AlertCircle, ExternalLink } from "lucide-react";
import { cn } from "../lib/utils";

type BillingFilter = "All" | "Complete" | "Pending" | "Awaiting Invoice";

function formatDate(d?: string) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export function Billing() {
  const [filter, setFilter] = useState<BillingFilter>("All");

  const billingRows = BNP_CASES.map(c => {
    const winner = c.quotes.find(q => q.winner);
    const amount = winner && winner.price > 0 ? winner.price : null;
    const currency = winner?.currency ?? "EUR";

    let billingStatus: "Complete" | "Awaiting Invoice" | "Pending";
    if (c.billing.billingCompletedDate) billingStatus = "Complete";
    else if (c.billing.moverInvoiceReceivedDate) billingStatus = "Awaiting Invoice";
    else billingStatus = "Pending";

    const whoToBillDisplay =
      c.billing.whoToBill === "AM" ? "Unity (AM)" :
      c.billing.whoToBill === "Client" ? "Client" :
      "TBC";

    return {
      id: c.id,
      assignee: c.assignee.name,
      entity: c.entity,
      mover: c.selectedMover,
      whoToBill: whoToBillDisplay,
      invoiceReceived: c.billing.moverInvoiceReceivedDate,
      billingCompleted: c.billing.billingCompletedDate,
      amount,
      currency,
      billingStatus,
    };
  });

  const filtered = filter === "All" ? billingRows : billingRows.filter(r => r.billingStatus === filter);

  const countComplete = billingRows.filter(r => r.billingStatus === "Complete").length;
  const countAwaiting = billingRows.filter(r => r.billingStatus === "Awaiting Invoice").length;
  const countPending  = billingRows.filter(r => r.billingStatus === "Pending").length;
  const totalAmount   = billingRows.filter(r => r.amount).reduce((a, r) => a + (r.amount ?? 0), 0);

  const STATUS_STYLE: Record<string, string> = {
    "Complete":       "bg-green-50 border-green-200 text-green-700",
    "Awaiting Invoice": "bg-amber-50 border-amber-200 text-amber-700",
    "Pending":        "bg-slate-50 border-slate-200 text-slate-500",
  };

  const filters: BillingFilter[] = ["All", "Complete", "Awaiting Invoice", "Pending"];

  return (
    <div className="max-w-7xl mx-auto pb-12 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <span className="text-xs font-semibold tracking-widest text-primary-600 uppercase">BNP Paribas</span>
        </div>
        <h1 className="font-display text-3xl font-bold text-slate-900 tracking-tight">Billing</h1>
        <p className="text-slate-500 mt-1">Invoice tracking and billing status across all active cases.</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-9 w-9 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Billing Complete</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">{countComplete}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-9 w-9 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
                <AlertCircle className="h-5 w-5" />
              </div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Awaiting Invoice</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">{countAwaiting}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-9 w-9 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
                <Clock className="h-5 w-5" />
              </div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Pending</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">{countPending}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-9 w-9 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center">
                <CreditCard className="h-5 w-5" />
              </div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Total Move Value</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">€{totalAmount.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filter bar */}
      <div className="flex gap-2 flex-wrap">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors",
              filter === f
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left p-3 px-4 text-xs font-semibold text-slate-500">Case</th>
                  <th className="text-left p-3 text-xs font-semibold text-slate-500">Assignee</th>
                  <th className="text-left p-3 text-xs font-semibold text-slate-500 hidden md:table-cell">Entity</th>
                  <th className="text-left p-3 text-xs font-semibold text-slate-500 hidden lg:table-cell">Mover</th>
                  <th className="text-left p-3 text-xs font-semibold text-slate-500 hidden lg:table-cell">Bill To</th>
                  <th className="text-right p-3 text-xs font-semibold text-slate-500">Move Value</th>
                  <th className="text-left p-3 text-xs font-semibold text-slate-500 hidden md:table-cell">Invoice Received</th>
                  <th className="text-left p-3 text-xs font-semibold text-slate-500 hidden md:table-cell">Billing Complete</th>
                  <th className="text-center p-3 text-xs font-semibold text-slate-500">Status</th>
                  <th className="text-center p-3 text-xs font-semibold text-slate-500"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(r => (
                  <tr key={r.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                    <td className="p-3 px-4 font-mono text-xs font-semibold text-primary-600 whitespace-nowrap">{r.id}</td>
                    <td className="p-3 font-medium text-slate-900 whitespace-nowrap">{r.assignee}</td>
                    <td className="p-3 text-slate-500 text-xs hidden md:table-cell">{r.entity}</td>
                    <td className="p-3 text-slate-600 text-xs hidden lg:table-cell">{r.mover ?? "—"}</td>
                    <td className="p-3 text-slate-600 text-xs hidden lg:table-cell">{r.whoToBill}</td>
                    <td className="p-3 text-right font-bold text-slate-900 whitespace-nowrap">
                      {r.amount ? `${r.currency} ${r.amount.toLocaleString()}` : <span className="text-slate-300 font-normal">—</span>}
                    </td>
                    <td className="p-3 text-slate-600 text-xs hidden md:table-cell">{formatDate(r.invoiceReceived)}</td>
                    <td className="p-3 text-slate-600 text-xs hidden md:table-cell">{formatDate(r.billingCompleted)}</td>
                    <td className="p-3 text-center">
                      <span className={cn("px-2.5 py-1 rounded-full text-xs font-bold border whitespace-nowrap", STATUS_STYLE[r.billingStatus])}>
                        {r.billingStatus}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <Link to={`/cases/${r.id}`} title="View case">
                        <ExternalLink className="h-4 w-4 text-slate-400 hover:text-primary-600 transition-colors mx-auto" />
                      </Link>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={10} className="p-8 text-center text-slate-400 text-sm">No billing records match this filter.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
