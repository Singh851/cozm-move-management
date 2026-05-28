import { useState } from "react";
import { Card, CardContent } from "../../../components/ui/Card";
import { Label } from "../../../components/ui/Label";
import { Select } from "../../../components/ui/Select";
import { 
  Scale, 
  ShieldCheck, 
  Plane, 
  FileText, 
  GraduationCap, 
  Home, 
  Globe, 
  BookOpen, 
  HeartPulse, 
  Calculator, 
  Briefcase, 
  FileSignature 
} from "lucide-react";
import { HelpTooltip } from "../../../components/ui/HelpTooltip";
import { cn } from "../../../lib/utils";

const SERVICES = [
  { id: "immi", icon: FileSignature, title: "Immigration", desc: "Visa, work permit, and right-to-work applications" },
  { id: "tax", icon: Scale, title: "Tax Compliance", desc: "Home and host country tax filing, shadow payroll" },
  { id: "ss", icon: ShieldCheck, title: "Social Security", desc: "Certificate of coverage and posted worker notifications" },
  { id: "home", icon: Home, title: "Home Search", desc: "Accommodation search and lease negotiation support" },
  { id: "ship", icon: Plane, title: "Shipping & Storage", desc: "Household goods move management" },
  { id: "school", icon: GraduationCap, title: "School Search", desc: "School finder and enrolment support for dependent children" },
  { id: "lang", icon: BookOpen, title: "Language Training", desc: "Language courses for assignee and accompanying family" },
  { id: "cult", icon: Globe, title: "Cultural Training", desc: "Cross-cultural orientation and awareness programmes" },
  { id: "health", icon: HeartPulse, title: "Global Health Insurance", desc: "International medical and health coverage" },
  { id: "cost", icon: Calculator, title: "Cost Estimate", desc: "Full financial cost estimate for budget approval" },
  { id: "assign", icon: FileText, title: "Assignment Letter", desc: "Drafting and issuance of the formal assignment letter" },
  { id: "dual", icon: Briefcase, title: "Dual Career Support", desc: "Career support for the accompanying partner" },
];

export function Step4Policy() {
  const [selectedServices, setSelectedServices] = useState<Record<string, boolean>>({});

  const toggleService = (id: string) => {
    setSelectedServices(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-8">
      <section>
        <div className="flex items-center gap-2 mb-6">
          <div className="h-8 w-8 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center">
            <Scale className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Policy & Services</h2>
        </div>
        <Card className="max-w-2xl">
          <CardContent className="p-6">
            <div className="space-y-2">
              <div className="flex items-center">
                <Label>Applicable Mobility Policy <span className="text-red-500">*</span></Label>
                <HelpTooltip text="Select the policy framework that governs this assignment." />
              </div>
              <Select className="mt-2">
                <option value="">Select an option...</option>
                <option>Standard Long-Term Assignment Policy</option>
                <option>Short-Term Assignment Policy</option>
                <option>Commuter Policy</option>
                <option>Localisation Policy</option>
              </Select>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <div className="flex items-center gap-2 mb-6">
          <div className="h-8 w-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Services Required</h2>
        </div>
        <p className="text-sm text-slate-500 mb-6">Select all services that apply to this assignment. These will be initiated upon submission.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {SERVICES.map((svc) => (
            <div
              key={svc.id}
              onClick={() => toggleService(svc.id)}
              className={cn(
                "relative cursor-pointer rounded-xl border p-5 transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
                selectedServices[svc.id]
                  ? "border-primary-500 bg-primary-50/50 shadow-sm"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
              )}
              role="checkbox"
              aria-checked={selectedServices[svc.id]}
              tabIndex={0}
            >
              <div className="flex flex-col gap-3">
                <div className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-lg transition-colors",
                  selectedServices[svc.id] ? "bg-primary-100 text-primary-600" : "bg-slate-100 text-slate-400"
                )}>
                  <svc.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 tracking-tight">{svc.title}</h3>
                  <p className="text-xs font-medium text-slate-500 mt-1.5 leading-relaxed">{svc.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
