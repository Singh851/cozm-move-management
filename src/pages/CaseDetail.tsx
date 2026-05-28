import { useParams, Link } from "react-router-dom";
import { BNP_CASES } from "../data/bnpCases";
import { getStatusColor, getActivePhase } from "../lib/statusUtils";
import { Card, CardContent } from "../components/ui/Card";
import {
  ArrowLeft, Check, ChevronDown, User, Phone, Mail, Map,
  Briefcase, ShieldCheck, ClipboardList, Truck, FileText,
  Clock, CreditCard, Star, AlertTriangle, CheckCircle2,
} from "lucide-react";
import { useState } from "react";
import { cn } from "../lib/utils";
import type { MMCase } from "../data/types";

const PHASES = [
  { id: 1,  title: "Initiation & MMC Assignment",       desc: "Case created, MMC assigned, team notified",                icon: User,          status_key: "Initialized" },
  { id: 2,  title: "Acknowledgement of Initiation",     desc: "Auto email to client with documents",                     icon: Mail,          status_key: "Initialized" },
  { id: 3,  title: "Assignee Service Introduction",     desc: "Auto email to assignee within 24 hrs",                    icon: User,          status_key: "Initialized" },
  { id: 4,  title: "Briefing Call Coordination",        desc: "Call scheduled, notes captured, summary sent",            icon: Phone,         status_key: "Briefing Call Complete" },
  { id: 5,  title: "Shipment Type Configuration",       desc: "Air / Sea / Road / Vehicle / Pet selection",              icon: Truck,         status_key: "Briefing Call Complete" },
  { id: 6,  title: "Pre-Move Survey & Quote Request",   desc: "Survey requested from panel movers, min 2 quotes",        icon: FileText,      status_key: "Survey & Quotes" },
  { id: 7,  title: "Quote Comparison & Mover Ranking",  desc: "Weighted criteria, recommendation, assignee ranking",     icon: ClipboardList, status_key: "Survey & Quotes" },
  { id: 8,  title: "Exception Handling",                desc: "Exception workflow if policy deviation required",         icon: AlertTriangle, status_key: "Survey & Quotes" },
  { id: 9,  title: "Mover Selection & Booking",         desc: "Mover confirmed, booking & SP confirmation sent",         icon: CheckCircle2,  status_key: "Mover Assigned" },
  { id: 10, title: "Shipment Protection Enrollment",    desc: "SP form, reminders, declarations per shipment method",    icon: ShieldCheck,   status_key: "Awaiting Move Dates" },
  { id: 11, title: "Move Coordination (KPI Tracking)",  desc: "Packing, finals, departure & arrival dates captured",     icon: Map,           status_key: "In Transit" },
  { id: 12, title: "Delivery Follow-Up",                desc: "Delivery confirmed, claims info sent to assignee",        icon: Truck,         status_key: "Delivery Follow Up" },
  { id: 13, title: "Awaiting Invoice & Billing",        desc: "Billing fields completed, CORE updated by MMC",           icon: CreditCard,    status_key: "Awaiting Final Billing" },
  { id: 14, title: "Completion & CSAT",                 desc: "Status set Complete, CSAT triggered 5 days post-delivery",icon: Star,          status_key: "Complete" },
];

function phaseState(phaseId: number, activePhase: number): "complete" | "active" | "pending" {
  if (phaseId < activePhase) return "complete";
  if (phaseId === activePhase) return "active";
  return "pending";
}

function InfoRow({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-2 text-sm">
      <span className="text-slate-400 w-40 shrink-0">{label}</span>
      <span className="text-slate-800 font-medium">{value}</span>
    </div>
  );
}

function PhaseContent({ phase, c }: { phase: typeof PHASES[0]; c: MMCase }) {
  switch (phase.id) {
    case 1:
      return (
        <div className="space-y-3">
          <InfoRow label="Case Reference" value={c.id} />
          <InfoRow label="Entity" value={c.entity} />
          <InfoRow label="Assignee" value={`${c.assignee.salutation ?? ""} ${c.assignee.name}`.trim()} />
          <InfoRow label="Nationality" value={c.assignee.nationality} />
          <InfoRow label="Email" value={c.assignee.email} />
          <InfoRow label="Phone" value={c.assignee.phone} />
          <InfoRow label="Initiation Date" value={new Date(c.initiationDate).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })} />
          <InfoRow label="Assignment Type" value={c.assignmentType} />
          <InfoRow label="Assigned MMC" value={c.mmc ?? "⚠ Unassigned"} />
          <div className="mt-3 p-3 rounded-lg bg-green-50 border border-green-200 flex items-center gap-2 text-xs text-green-700">
            <Check className="h-4 w-4" /> MM Team distribution email sent automatically on case creation.
          </div>
        </div>
      );
    case 2:
      return (
        <div className="space-y-3">
          <p className="text-sm text-slate-600">Auto-acknowledgement sent to client HR on case creation.</p>
          {c.acknowledgedDate && (
            <InfoRow label="Sent Date" value={new Date(c.acknowledgedDate).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })} />
          )}
          <div className="mt-2 space-y-1.5">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Attachments</p>
            {["Personal Data Consent Letter", "Move Needs Assessment Form", "Shipment Protection Enrolment Pack", "BNP Employee Presentation"].map(a => (
              <div key={a} className="flex items-center gap-2 text-xs text-slate-600">
                <FileText className="h-3.5 w-3.5 text-slate-400" /> {a}
              </div>
            ))}
          </div>
        </div>
      );
    case 3:
      return (
        <div className="space-y-3">
          <p className="text-sm text-slate-600">Service introduction email sent automatically within 24 hours of initiation date.</p>
          {c.serviceIntroSentDate && (
            <InfoRow label="Sent Date" value={new Date(c.serviceIntroSentDate).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })} />
          )}
          <div className="mt-2 space-y-1.5">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Attachments</p>
            {["Move Needs Assessment Form", "Employee Presentation", "Shipment Protection Enrolment Pack"].map(a => (
              <div key={a} className="flex items-center gap-2 text-xs text-slate-600">
                <FileText className="h-3.5 w-3.5 text-slate-400" /> {a}
              </div>
            ))}
          </div>
        </div>
      );
    case 4:
      return (
        <div className="space-y-3">
          <InfoRow label="Scheduled Date" value={c.briefingCall.scheduledDate ? new Date(c.briefingCall.scheduledDate).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" }) : undefined} />
          <InfoRow label="Completed Date" value={c.briefingCall.completedDate ? new Date(c.briefingCall.completedDate).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" }) : undefined} />
          <InfoRow label="Summary Sent" value={c.briefingCall.summarySentDate ? new Date(c.briefingCall.summarySentDate).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" }) : undefined} />
          {c.briefingCall.notes && (
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Call Notes <span className="text-red-500">*</span></p>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {c.briefingCall.notes}
              </div>
            </div>
          )}
        </div>
      );
    case 5:
      return (
        <div className="space-y-3">
          <p className="text-xs text-slate-500 uppercase font-semibold tracking-wide mb-2">Selected Shipment Types</p>
          {c.shipmentTypes.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {c.shipmentTypes.map(s => (
                <span key={s.method} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-50 text-primary-700 border border-primary-200 rounded-lg text-sm font-semibold">
                  <Check className="h-3.5 w-3.5" /> {s.method}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-400 italic">No shipment types selected yet.</p>
          )}
          <p className="text-xs text-slate-500 mt-2">Options: Air · Sea · Road · Vehicle · Pet — configured per client policy.</p>
        </div>
      );
    case 6:
      return (
        <div className="space-y-3">
          <p className="text-sm text-slate-600">Pre-move survey & door-to-door quote requests sent to panel movers. Minimum 2 quotes required.</p>
          {c.quotes.length > 0 ? (
            <div className="space-y-2">
              {c.quotes.map(q => (
                <div key={q.id} className={cn("flex items-center justify-between p-3 rounded-lg border text-sm", q.winner ? "border-green-300 bg-green-50" : "border-slate-200 bg-slate-50")}>
                  <div>
                    <span className="font-semibold text-slate-900">{q.mover}</span>
                    <span className="text-slate-500 ml-2 text-xs">{q.id}</span>
                    <p className="text-xs text-slate-500 mt-0.5">{q.volume}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-slate-900">{q.price > 0 ? `${q.currency} ${q.price.toLocaleString()}` : "Pending"}</p>
                    {q.winner && <p className="text-xs text-green-600 font-semibold">✓ Selected</p>}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-400 italic">Awaiting quotes from panel movers.</p>
          )}
        </div>
      );
    case 7:
      return (
        <div className="space-y-3">
          <p className="text-sm text-slate-600">Quote comparison using client-specific weighted criteria. Unity recommends mover once all quotes received.</p>
          {c.quotes.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="text-left p-2 text-xs text-slate-500 font-semibold border border-slate-200">Mover</th>
                      <th className="text-left p-2 text-xs text-slate-500 font-semibold border border-slate-200">Volume</th>
                      <th className="text-right p-2 text-xs text-slate-500 font-semibold border border-slate-200">Price (EUR)</th>
                      <th className="text-right p-2 text-xs text-slate-500 font-semibold border border-slate-200">Saving</th>
                      <th className="text-center p-2 text-xs text-slate-500 font-semibold border border-slate-200">Selected</th>
                    </tr>
                  </thead>
                  <tbody>
                    {c.quotes.map(q => (
                      <tr key={q.id} className={cn(q.winner && "bg-green-50")}>
                        <td className="p-2 border border-slate-200 font-medium text-slate-900">{q.mover}</td>
                        <td className="p-2 border border-slate-200 text-slate-600 text-xs">{q.volume}</td>
                        <td className="p-2 border border-slate-200 text-right font-bold text-slate-900">{q.price > 0 ? q.price.toLocaleString() : "—"}</td>
                        <td className="p-2 border border-slate-200 text-right text-green-600 font-semibold">{q.savings ? `€${q.savings.toLocaleString()}` : "—"}</td>
                        <td className="p-2 border border-slate-200 text-center">{q.winner ? "✅" : ""}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800">
                <strong>Weighted Criteria (BNP):</strong> Price 40% · Assignee Preference 30% · Availability 20% · Service Record 10%
              </div>
              {c.quotes.find(q => q.winner)?.selectionReason && (
                <InfoRow label="Selection Reason" value={c.quotes.find(q => q.winner)?.selectionReason} />
              )}
            </>
          ) : (
            <p className="text-sm text-slate-400 italic">Awaiting quotes for comparison.</p>
          )}
        </div>
      );
    case 8:
      return (
        <div className="space-y-3">
          {c.exceptionRaised ? (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              <strong>Exception Raised:</strong> {c.exceptionReason}
            </div>
          ) : (
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-500">
              No exception raised — standard policy applied. Exception workflow triggered if fewer than 2 quotes or cost exceeds policy threshold.
            </div>
          )}
          <p className="text-xs text-slate-400">Exception approval requests are sent to the client via Unity with an approval/decline link. Full audit trail maintained.</p>
        </div>
      );
    case 9:
      return (
        <div className="space-y-3">
          {c.selectedMover ? (
            <>
              <InfoRow label="Selected Mover" value={c.selectedMover} />
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-xs text-green-700 space-y-1">
                <p><Check className="inline h-3.5 w-3.5 mr-1" /> Booking confirmation auto-sent to {c.selectedMover}</p>
                <p><Check className="inline h-3.5 w-3.5 mr-1" /> Mover confirmation + SP pack auto-sent to assignee</p>
              </div>
            </>
          ) : (
            <p className="text-sm text-slate-400 italic">Mover not yet selected.</p>
          )}
        </div>
      );
    case 10:
      return (
        <div className="space-y-3">
          {c.shipmentTypes.length > 0 ? (
            <>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">SP Status by Shipment Method</p>
              <div className="space-y-2">
                {c.shipmentTypes.map(s => {
                  const statusColor = s.spStatus === "Complete"
                    ? "bg-green-50 border-green-200 text-green-700"
                    : s.spStatus === "Form Received"
                    ? "bg-blue-50 border-blue-200 text-blue-700"
                    : "bg-amber-50 border-amber-200 text-amber-700";
                  return (
                    <div key={s.method} className={cn("flex items-center justify-between p-3 rounded-lg border text-sm", statusColor)}>
                      <span className="font-semibold">{s.method} Shipment — SP Declaration</span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white/60">{s.spStatus ?? "Not Enrolled"}</span>
                    </div>
                  );
                })}
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Reminders: 1 week before packing (if not received) · 76 hrs before packing · MMC alert at 48 hrs.
              </p>
            </>
          ) : (
            <p className="text-sm text-slate-400 italic">Shipment types not yet configured.</p>
          )}
        </div>
      );
    case 11:
      return (
        <div className="space-y-3">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Move KPI Fields</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { label: "Pre-Move Survey Date", value: c.kpi.preMoveServeyDate },
              { label: "Actual Packing Date", value: c.kpi.actualPackingDate },
              { label: "Finals Received Date", value: c.kpi.finalsReceivedDate },
              { label: "Actual Departure Date", value: c.kpi.actualDepartureDate },
              { label: "Actual Arrival Date", value: c.kpi.actualArrivalDate },
              { label: "Delivery Complete", value: c.kpi.deliveryComplete ? "Yes" : "No" },
            ].map(({ label, value }) => (
              <div key={label} className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                <p className="text-xs text-slate-400 mb-1">{label}</p>
                <p className={cn("text-sm font-semibold", value && value !== "No" ? "text-slate-900" : "text-slate-300")}>
                  {value ? (value.includes("-") ? new Date(value).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : value) : "—"}
                </p>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-1">Auto follow-up to mover for packing dates (packing +24h) and finals (packing +24h) and in-transit dates (packing +48h).</p>
        </div>
      );
    case 12:
      return (
        <div className="space-y-3">
          {c.kpi.deliveryDate ? (
            <>
              <InfoRow label="Delivery Date" value={new Date(c.kpi.deliveryDate).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })} />
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-xs text-green-700">
                <Check className="inline h-3.5 w-3.5 mr-1" /> Delivery follow-up email auto-sent to assignee on delivery date entry (includes claims process document).
              </div>
            </>
          ) : (
            <p className="text-sm text-slate-400 italic">Awaiting delivery date entry to trigger follow-up email.</p>
          )}
        </div>
      );
    case 13:
      return (
        <div className="space-y-3">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Billing Fields</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
              <p className="text-xs text-slate-400 mb-1">Who is to be Billed?</p>
              <p className={cn("text-sm font-semibold", c.billing.whoToBill ? "text-slate-900" : "text-slate-300")}>
                {c.billing.whoToBill ?? "—"}
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
              <p className="text-xs text-slate-400 mb-1">Mover Invoice Received Date</p>
              <p className={cn("text-sm font-semibold", c.billing.moverInvoiceReceivedDate ? "text-slate-900" : "text-slate-300")}>
                {c.billing.moverInvoiceReceivedDate ? new Date(c.billing.moverInvoiceReceivedDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—"}
              </p>
            </div>
          </div>
          <div className={cn("flex items-center justify-between p-3 rounded-lg border text-sm", c.billing.billingCompletedDate ? "bg-green-50 border-green-200" : "bg-slate-50 border-slate-200")}>
            <span className="font-semibold text-slate-700">Billing Completed</span>
            <span className={cn("text-xs font-bold", c.billing.billingCompletedDate ? "text-green-700" : "text-slate-400")}>
              {c.billing.billingCompletedDate ? `✓ ${new Date(c.billing.billingCompletedDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}` : "Pending"}
            </span>
          </div>
          <p className="text-xs text-slate-400">On billing completion, Parent Job status auto-updates to Complete.</p>
        </div>
      );
    case 14:
      return (
        <div className="space-y-3">
          {c.csatSent ? (
            <>
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700 flex items-center gap-2">
                <Check className="h-4 w-4" /> CSAT survey sent to assignee 5 days after delivery date.
              </div>
              {c.csatScore && (
                <div className="flex items-center gap-2">
                  <span className="text-slate-600 text-sm">CSAT Score:</span>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={cn("h-5 w-5", i < c.csatScore! ? "text-yellow-400 fill-yellow-400" : "text-slate-200")} />
                    ))}
                    <span className="ml-1 font-bold text-slate-900">{c.csatScore}/5</span>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-500">
              CSAT survey will be triggered automatically 5 days after delivery date entry.
              {c.kpi.deliveryDate && (
                <span className="block text-xs text-slate-400 mt-1">
                  Scheduled: {new Date(new Date(c.kpi.deliveryDate).getTime() + 5 * 86400000).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                </span>
              )}
            </div>
          )}
        </div>
      );
    default:
      return null;
  }
}

export function CaseDetail() {
  const { id } = useParams<{ id: string }>();
  const c = BNP_CASES.find((x) => x.id === id);

  const [expandedPhase, setExpandedPhase] = useState<number | null>(() => {
    if (!c) return null;
    return getActivePhase(c.status);
  });

  if (!c) {
    return (
      <div className="max-w-4xl mx-auto pb-12 text-center py-24">
        <p className="text-slate-500">Case not found.</p>
        <Link to="/cases" className="text-primary-600 hover:underline mt-4 inline-block">← Back to Cases</Link>
      </div>
    );
  }

  const activePhase = getActivePhase(c.status);
  const col = getStatusColor(c.status);

  return (
    <div className="max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="mb-6">
        <Link to="/cases" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-primary-600 mb-4 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Cases
        </Link>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-mono text-sm font-semibold text-primary-600">{c.id}</span>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${col.bg} ${col.text}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${col.dot}`} />
                    {c.status}
                  </span>
                </div>
                <h1 className="font-display text-2xl font-bold text-slate-900 mb-1">{c.assignee.name}</h1>
                <p className="text-slate-600 text-sm mb-2">
                  {c.from.flag} {c.from.city}, {c.from.country} → {c.to.flag} {c.to.city}, {c.to.country}
                </p>
                <p className="text-slate-500 text-xs">{c.entity}</p>
              </div>
              <div className="flex flex-col gap-1.5 text-sm shrink-0">
                <div className="flex items-center gap-2 text-slate-600">
                  <User className="h-4 w-4 text-slate-400" />
                  <span>MMC: <strong>{c.mmc ?? "Unassigned"}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Briefcase className="h-4 w-4 text-slate-400" />
                  <span>{c.assignmentType}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Clock className="h-4 w-4 text-slate-400" />
                  <span>Initiated: {new Date(c.initiationDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</span>
                </div>
              </div>
            </div>

            {/* Phase progress bar */}
            <div className="mt-5 pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-2">Workflow Progress</p>
              <div className="flex items-center gap-1 overflow-x-auto pb-1">
                {PHASES.map((p) => {
                  const state = phaseState(p.id, activePhase);
                  return (
                    <div
                      key={p.id}
                      className={cn(
                        "h-2 flex-1 rounded-full min-w-[18px] transition-colors",
                        state === "complete" ? "bg-primary-500" :
                        state === "active"   ? "bg-primary-300 animate-pulse" :
                                              "bg-slate-200"
                      )}
                      title={p.title}
                    />
                  );
                })}
              </div>
              <p className="text-xs text-slate-400 mt-1">{activePhase - 1} / {PHASES.length} phases complete</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Workflow Phases */}
      <div className="space-y-3">
        {PHASES.map((phase) => {
          const state = phaseState(phase.id, activePhase);
          const isExpanded = expandedPhase === phase.id;
          const Icon = phase.icon;

          return (
            <div
              key={phase.id}
              className={cn(
                "rounded-2xl border bg-white transition-all duration-300 overflow-hidden",
                isExpanded
                  ? "border-primary-400 shadow-lg shadow-primary-500/10 ring-1 ring-primary-400"
                  : state === "complete"
                  ? "border-green-200 bg-green-50/30"
                  : state === "pending"
                  ? "border-slate-200 opacity-60"
                  : "border-primary-300 shadow-sm"
              )}
            >
              <button
                onClick={() => state !== "pending" && setExpandedPhase(isExpanded ? null : phase.id)}
                className={cn(
                  "w-full flex items-center justify-between p-4 md:px-6 text-left transition-colors focus-visible:outline-none",
                  state !== "pending" ? "hover:bg-slate-50/60" : "cursor-default"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-2 transition-all",
                    state === "complete" ? "border-green-400 bg-green-400 text-white" :
                    state === "active"   ? "border-primary-400 bg-primary-50 text-primary-600" :
                                          "border-slate-200 bg-slate-100 text-slate-300"
                  )}>
                    {state === "complete" ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "text-sm font-bold font-display tracking-tight",
                        state === "complete" ? "text-slate-600" :
                        state === "active"   ? "text-primary-700" :
                                              "text-slate-300"
                      )}>
                        D.{phase.id} — {phase.title}
                      </span>
                      {state === "active" && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary-100 text-primary-600 uppercase tracking-wide">Active</span>
                      )}
                    </div>
                    <span className="text-xs text-slate-400">{phase.desc}</span>
                  </div>
                </div>
                {state !== "pending" && (
                  <ChevronDown className={cn("h-5 w-5 text-slate-400 transition-transform shrink-0", isExpanded && "rotate-180")} />
                )}
              </button>

              {isExpanded && state !== "pending" && (
                <div className="px-4 pb-5 md:px-6 md:pb-6 border-t border-slate-100 pt-4">
                  <PhaseContent phase={phase} c={c} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
