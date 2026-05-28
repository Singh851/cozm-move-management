/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { HashRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Home } from "./pages/Home";
import { Dashboard } from "./pages/Dashboard";
import { Cases } from "./pages/Cases";
import { NewCaseWizard } from "./pages/Wizard/NewCaseWizard";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="cases" element={<Cases />} />
          <Route path="new-case" element={<NewCaseWizard />} />
          <Route path="*" element={<div className="p-8 text-center text-slate-500">View under construction...</div>} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
