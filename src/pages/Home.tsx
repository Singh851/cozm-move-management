import { motion } from "framer-motion";
import { PlusCircle, FolderOpen, ArrowRight, Mail, LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "../components/ui/Card";
import { BNP_CASES } from "../data/bnpCases";

const activeCount = BNP_CASES.filter(c => c.status !== "Complete").length;
const pendingApprovals = 5;

export function Home() {
  return (
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-slate-950 px-8 py-12 md:px-12 md:py-16 text-white mb-8"
      >
        <div className="absolute top-0 right-0 -mt-20 -mr-20 h-96 w-96 rounded-full bg-primary-500/20 blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/20 border border-primary-500/30 text-primary-300 text-xs font-semibold mb-4 tracking-wide uppercase">
            BNP Paribas — Phase 1 Live
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Unity Move Management
          </h1>
          <p className="text-lg text-slate-300 mb-8 leading-relaxed">
            Streamline the employee relocation experience and simplify the role of the global mobility team — from initiation through to CSAT.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/new-case"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/20 transition-all"
            >
              <PlusCircle className="h-5 w-5" /> New Case
            </Link>
            <Link
              to="/cases"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold rounded-xl backdrop-blur-sm transition-all"
            >
              <FolderOpen className="h-5 w-5" /> View Cases
            </Link>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center">
                <FolderOpen className="h-6 w-6" />
              </div>
              <Link to="/cases" className="text-sm font-medium text-primary-600 hover:underline flex items-center">
                View all <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Active Cases</h2>
            <p className="text-slate-500 text-sm">You currently have <strong>{activeCount}</strong> active relocation cases for BNP Paribas requiring attention.</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
                <LayoutDashboard className="h-6 w-6" />
              </div>
              <Link to="/dashboard" className="text-sm font-medium text-primary-600 hover:underline flex items-center">
                Dashboard <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Pending Approvals</h2>
            <p className="text-slate-500 text-sm">There are <strong>{pendingApprovals}</strong> approvals pending your sign-off.</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center">
                <Mail className="h-6 w-6" />
              </div>
              <Link to="/email-templates" className="text-sm font-medium text-primary-600 hover:underline flex items-center">
                View all <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Email Templates</h2>
            <p className="text-slate-500 text-sm">17 automated email triggers configured for the BNP MM workflow, from initiation to CSAT.</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow bg-gradient-to-br from-primary-50 to-white border-primary-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center">
                <span className="text-xl font-bold">14</span>
              </div>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Workflow Phases</h2>
            <p className="text-slate-500 text-sm">Full end-to-end MM workflow: Initiation → CSAT across 14 automated phases per Schedule A.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
