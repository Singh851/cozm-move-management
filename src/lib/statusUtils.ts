import type { CaseStatus } from "../data/types";

export const STATUS_ORDER: CaseStatus[] = [
  "Initialized",
  "Briefing Call Complete",
  "Survey & Quotes",
  "Mover Assigned",
  "Awaiting Move Dates",
  "Awaiting Finals Origin",
  "In Transit",
  "Delivery Follow Up",
  "Awaiting Final Billing",
  "Complete",
];

export function getStatusIndex(status: CaseStatus): number {
  return STATUS_ORDER.indexOf(status);
}

export function getStatusColor(status: CaseStatus): { bg: string; text: string; dot: string } {
  switch (status) {
    case "Initialized":
      return { bg: "bg-slate-100", text: "text-slate-700", dot: "bg-slate-400" };
    case "Briefing Call Complete":
      return { bg: "bg-blue-100", text: "text-blue-700", dot: "bg-blue-500" };
    case "Survey & Quotes":
      return { bg: "bg-amber-100", text: "text-amber-700", dot: "bg-amber-500" };
    case "Mover Assigned":
      return { bg: "bg-purple-100", text: "text-purple-700", dot: "bg-purple-500" };
    case "Awaiting Move Dates":
      return { bg: "bg-orange-100", text: "text-orange-700", dot: "bg-orange-500" };
    case "Awaiting Finals Origin":
      return { bg: "bg-orange-100", text: "text-orange-800", dot: "bg-orange-600" };
    case "In Transit":
      return { bg: "bg-primary-100", text: "text-primary-700", dot: "bg-primary-500" };
    case "Delivery Follow Up":
      return { bg: "bg-teal-100", text: "text-teal-700", dot: "bg-teal-600" };
    case "Awaiting Final Billing":
      return { bg: "bg-red-100", text: "text-red-700", dot: "bg-red-400" };
    case "Complete":
      return { bg: "bg-green-100", text: "text-green-700", dot: "bg-green-500" };
    default:
      return { bg: "bg-slate-100", text: "text-slate-700", dot: "bg-slate-400" };
  }
}

/** Returns the Unity phase index (1–14) that is currently ACTIVE for a given case status.
 *  Phases below the returned index are "complete"; the returned index is "active"; above is "pending". */
export function getActivePhase(status: CaseStatus): number {
  switch (status) {
    case "Initialized":            return 3;   // D.1+D.2 auto-complete on creation; D.3 service intro 24-hr window
    case "Briefing Call Complete": return 5;   // D.4 done; D.5 shipment config now active
    case "Survey & Quotes":        return 6;   // D.5 done; D.6 survey & quote requests active
    case "Mover Assigned":         return 9;   // D.6-D.8 done; D.9 mover booking active
    case "Awaiting Move Dates":    return 10;  // D.9 done; D.10 SP enrollment active
    case "Awaiting Finals Origin": return 11;  // D.10 done; D.11 move coordination active
    case "In Transit":             return 11;  // still in D.11 coordination / KPI tracking
    case "Delivery Follow Up":     return 12;  // D.11 done; D.12 delivery follow-up active
    case "Awaiting Final Billing": return 13;  // D.12 done; D.13 invoice & billing active
    case "Complete":               return 14;  // D.13 done; D.14 CSAT active / complete
    default:                       return 1;
  }
}
