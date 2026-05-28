import { Card, CardContent } from "../components/ui/Card";
import { EMAIL_TEMPLATES } from "../data/emailTemplates";
import { Mail, Clock, Users, ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "../lib/utils";

export function EmailTemplates() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filter, setFilter] = useState("");

  const filtered = EMAIL_TEMPLATES.filter(t =>
    t.trigger.toLowerCase().includes(filter.toLowerCase()) ||
    t.to.toLowerCase().includes(filter.toLowerCase()) ||
    t.phase.toLowerCase().includes(filter.toLowerCase()) ||
    t.subject.toLowerCase().includes(filter.toLowerCase())
  );

  const phases = [...new Set(EMAIL_TEMPLATES.map(t => t.phase))];

  return (
    <div className="max-w-5xl mx-auto pb-12">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-semibold tracking-widest text-primary-600 uppercase">BNP Paribas</span>
        </div>
        <h1 className="font-display text-3xl font-bold text-slate-900 tracking-tight">Email Templates</h1>
        <p className="text-slate-500 mt-1">17 automated email triggers configured per Schedule A.4 — from initiation to CSAT.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-2.5 bg-primary-100 text-primary-600 rounded-lg"><Mail className="h-5 w-5" /></div>
            <div>
              <div className="text-2xl font-display font-bold text-slate-900">{EMAIL_TEMPLATES.length}</div>
              <div className="text-sm text-slate-500">Total Templates</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-2.5 bg-green-100 text-green-600 rounded-lg"><Clock className="h-5 w-5" /></div>
            <div>
              <div className="text-2xl font-display font-bold text-slate-900">100%</div>
              <div className="text-sm text-slate-500">Fully Automated</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-2.5 bg-purple-100 text-purple-600 rounded-lg"><Users className="h-5 w-5" /></div>
            <div>
              <div className="text-2xl font-display font-bold text-slate-900">{phases.length}</div>
              <div className="text-sm text-slate-500">Workflow Phases</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-4">
        <input
          type="text"
          value={filter}
          onChange={e => setFilter(e.target.value)}
          placeholder="Search templates by trigger, recipient or phase..."
          className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
        />
      </div>

      <div className="space-y-3">
        {filtered.map((t) => {
          const isOpen = expanded === t.id;
          return (
            <div key={t.id} className={cn("rounded-2xl border bg-white overflow-hidden transition-all", isOpen ? "border-primary-400 shadow-md" : "border-slate-200")}>
              <button
                className="w-full flex items-center justify-between p-4 md:px-5 text-left hover:bg-slate-50/60 transition-colors focus:outline-none"
                onClick={() => setExpanded(isOpen ? null : t.id)}
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600 text-xs font-bold mt-0.5">
                    {t.id.replace("ET-", "")}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-slate-900">{t.trigger}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-medium">{t.phase}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                      <span className="text-xs text-slate-500"><strong>To:</strong> {t.to}</span>
                      <span className="text-xs text-slate-400">·</span>
                      <span className="text-xs text-slate-500"><strong>When:</strong> {t.timing}</span>
                    </div>
                  </div>
                </div>
                <ChevronDown className={cn("h-4 w-4 text-slate-400 shrink-0 transition-transform", isOpen && "rotate-180")} />
              </button>

              {isOpen && (
                <div className="px-4 pb-5 md:px-5 border-t border-slate-100 pt-4 space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Subject</p>
                    <p className="text-sm font-medium text-slate-800">{t.subject}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Body</p>
                    <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-sm text-slate-700 whitespace-pre-wrap leading-relaxed font-mono text-xs">
                      {t.body}
                    </div>
                  </div>
                  {t.attachments && t.attachments.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Attachments</p>
                      <div className="flex flex-wrap gap-2">
                        {t.attachments.map(a => (
                          <span key={a} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium">
                            📎 {a}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-slate-400 text-sm">No templates match your search.</div>
        )}
      </div>
    </div>
  );
}
