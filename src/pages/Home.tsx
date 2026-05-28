import { motion } from "framer-motion";
import { PlusCircle, FolderOpen, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "../components/ui/Card";

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
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Welcome to Unity Move Management
          </h1>
          <p className="text-lg text-slate-300 mb-8 leading-relaxed">
            Unity Move Management is designed to streamline the employee experience and simplify the role of the global mobility team. You can start by choosing an option below.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link 
              to="/new-case" 
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/20 transition-all focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 focus:ring-primary-500"
            >
              <PlusCircle className="h-5 w-5" />
              New Case
            </Link>
            <Link 
              to="/cases" 
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold rounded-xl backdrop-blur-sm transition-all focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 focus:ring-white"
            >
              <FolderOpen className="h-5 w-5" />
              View Cases
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
            <p className="text-slate-500 text-sm">You currently have 14 active relocation cases requiring attention.</p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 bg-yellow-50 text-yellow-600 rounded-xl flex items-center justify-center">
                <CheckSquare className="h-6 w-6" />
              </div>
              <Link to="/dashboard" className="text-sm font-medium text-primary-600 hover:underline flex items-center">
                Dashboard <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Pending Actions</h2>
            <p className="text-slate-500 text-sm">There are 5 approvals pending your sign-off.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Importing icons locally to avoid passing as props
import { CheckSquare } from "lucide-react";
