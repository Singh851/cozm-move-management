import { HashRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Home } from "./pages/Home";
import { Dashboard } from "./pages/Dashboard";
import { Cases } from "./pages/Cases";
import { CaseDetail } from "./pages/CaseDetail";
import { NewCaseWizard } from "./pages/Wizard/NewCaseWizard";
import { EmailTemplates } from "./pages/EmailTemplates";
import { Billing } from "./pages/Billing";
import { Settings } from "./pages/Settings";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="cases" element={<Cases />} />
          <Route path="cases/:id" element={<CaseDetail />} />
          <Route path="new-case" element={<NewCaseWizard />} />
          <Route path="email-templates" element={<EmailTemplates />} />
          <Route path="billing" element={<Billing />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<div className="p-8 text-center text-slate-500">View under construction…</div>} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
