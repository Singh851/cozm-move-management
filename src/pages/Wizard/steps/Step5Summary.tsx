import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/Card";
import { User, CalendarDays, Briefcase, Scale } from "lucide-react";

export function Step5Summary() {
  return (
    <div className="space-y-6">
      <p className="text-slate-500 mb-6">
        Please review all details before submitting. Use the Back button or click any tab to make changes.
      </p>

      <Card>
        <CardHeader className="bg-slate-50 border-b py-3 px-6 rounded-t-xl">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary-600" />
            <CardTitle className="text-sm">Assignee Details</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x border-b border-transparent">
            <div className="p-4 px-6 flex items-start gap-4">
              <span className="text-xs font-semibold text-slate-500 w-32 uppercase tracking-wide">Name</span>
              <span className="text-sm font-medium text-slate-900">Sarah Miller</span>
            </div>
            <div className="p-4 px-6 flex items-start gap-4">
              <span className="text-xs font-semibold text-slate-500 w-32 uppercase tracking-wide">Email</span>
              <span className="text-sm font-medium text-slate-900">sarah.miller@company.com</span>
            </div>
            <div className="p-4 px-6 flex items-start gap-4 border-t">
              <span className="text-xs font-semibold text-slate-500 w-32 uppercase tracking-wide">Relocating</span>
              <span className="text-sm font-medium text-slate-900">3 person(s)</span>
            </div>
             <div className="p-4 px-6 flex items-start gap-4 border-t">
              <span className="text-xs font-semibold text-slate-500 w-32 uppercase tracking-wide">Nationality</span>
              <span className="text-sm font-medium text-slate-900">German</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="bg-slate-50 border-b py-3 px-6 rounded-t-xl">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-primary-600" />
            <CardTitle className="text-sm">Assignment Details</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x">
            <div className="p-4 px-6 flex items-start gap-4">
              <span className="text-xs font-semibold text-slate-500 w-32 uppercase tracking-wide">Start Date</span>
              <span className="text-sm font-medium text-slate-900">01 Mar 2026</span>
            </div>
            <div className="p-4 px-6 flex items-start gap-4">
              <span className="text-xs font-semibold text-slate-500 w-32 uppercase tracking-wide">Duration</span>
              <span className="text-sm font-medium text-slate-900">24 months</span>
            </div>
            <div className="p-4 px-6 flex items-start gap-4 border-t">
              <span className="text-xs font-semibold text-slate-500 w-32 uppercase tracking-wide">Route</span>
              <span className="text-sm font-medium text-slate-900">Berlin, Germany → London, UK</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="bg-slate-50 border-b py-3 px-6 rounded-t-xl">
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-primary-600" />
            <CardTitle className="text-sm">Job & Policy</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x">
            <div className="p-4 px-6 flex items-start gap-4">
              <span className="text-xs font-semibold text-slate-500 w-32 uppercase tracking-wide">PO Number</span>
              <span className="text-sm font-medium text-slate-900">PO-2026-00142</span>
            </div>
            <div className="p-4 px-6 flex items-start gap-4">
              <span className="text-xs font-semibold text-slate-500 w-32 uppercase tracking-wide">Policy</span>
              <span className="text-sm font-medium text-slate-900">Standard Long-Term</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="pt-4">
        <label className="text-sm font-medium text-slate-700 block mb-2">Additional Notes</label>
        <textarea 
          className="w-full rounded-md border border-slate-300 p-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500" 
          rows={3} 
          placeholder="Any other information..."
        />
      </div>
    </div>
  );
}
