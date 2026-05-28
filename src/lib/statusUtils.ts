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

/** Returns the Unity phase index (1–14) from the D-phases based on current case status */
export function getActivePhase(status: CaseStatus): number {
  switch (status) {
    case "Initialized":            return 3;  // Up to D.3 active
    case "Briefing Call Complete": return 4;
    case "Survey & Quotes":        return 7;
    case "Mover Assigned":         return 10;
    case "Awaiting Move Dates":    return 11;
    case "Awaiting Finals Origin": return 11;
    case "In Transit":             return 12;
    case "Delivery Follow Up":     return 13;
    case "Awaiting Final Billing": return 13;
    case "Complete":               return 14;
    default:                       return 1;
  }
}
