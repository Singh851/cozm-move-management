import { Card, CardContent } from "../../../components/ui/Card";
import { CheckCircle2, Info } from "lucide-react";

const WHAT_HAPPENS_NEXT = [
  "An MMC will be assigned to this case automatically and a confirmation sent to the MM team mailbox.",
  "An acknowledgement email with supporting documents will be sent to the client HR contact.",
  "The assignee will receive a personalised service introduction email within 24 hours.",
  "A briefing call will be scheduled with the assignee to confirm shipment requirements.",
  "Quotes will be requested from the approved panel of movers.",
];

export function Step5Summary() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3 p-4 bg-primary-50 border border-primary-200 rounded-xl">
        <Info className="h-5 w-5 text-primary-600 mt-0.5 shrink-0" />
        <p className="text-sm text-primary-800 font-medium">
          Please review all details using the steps above before submitting. Use the Back button or click any step header to make changes.
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <h3 className="font-display font-bold text-slate-900 mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary-500" />
            What happens after you submit
          </h3>
          <div className="space-y-3">
            {WHAT_HAPPENS_NEXT.map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="h-6 w-6 shrink-0 rounded-full bg-primary-100 text-primary-700 text-xs font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold text-slate-900 mb-3 text-sm">Automated Email Triggers on Submission</h3>
          <div className="space-y-2">
            {[
              { id: "ET-01", label: "MMC Assignment Notification", to: "MM General Mailbox", timing: "Immediate" },
              { id: "ET-02", label: "Client Acknowledgement", to: "Client HR Contact", timing: "Immediate" },
              { id: "ET-03", label: "Assignee Service Introduction", to: "Assignee", timing: "Within 24 hours" },
            ].map((t) => (
              <div key={t.id} className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-primary-600 font-mono">{t.id}</span>
                  <span className="font-medium text-slate-800">{t.label}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-500">
                  <span>→ {t.to}</span>
                  <span className="text-slate-300">·</span>
                  <span>{t.timing}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div>
        <label className="text-sm font-medium text-slate-700 block mb-2">Additional Notes</label>
        <textarea
          className="w-full rounded-xl border border-slate-200 p-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 resize-none"
          rows={3}
          placeholder="Any additional context for the MMC or client HR team…"
        />
      </div>
    </div>
  );
}
