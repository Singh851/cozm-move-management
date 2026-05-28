import { Label } from "../../../components/ui/Label";
import { Input } from "../../../components/ui/Input";
import { Select } from "../../../components/ui/Select";

const ASSIGNMENT_TYPES = ["Short-Term","Long-Term","Commuter","Permanent Transfer","Business Trip","Developmental"];
const INITIATION_TYPES = ["Standard","VIP","Urgent","Confidential"];
const FAMILY_STATUSES = ["Accompanied","Unaccompanied"];
const DUAL_CAREER = ["Yes","No","TBC"];
const SOCIAL_SECURITY = ["Home Country","Host Country","Split","Not Applicable"];
const PAYROLL_SPLITS = ["Home","Host","Split","Not Applicable"];
const ASSIGNMENT_REASONS = ["Business Need","Developmental","Rotational","Permanent Transfer","Other"];

export function Step3JobInfo() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-4">Job & Assignment Information</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Employee ID</Label>
            <Input placeholder="e.g. EMP-12345" className="mt-1" />
          </div>
          <div>
            <Label>Job Title</Label>
            <Input placeholder="Job title" className="mt-1" />
          </div>
          <div>
            <Label>Job Category</Label>
            <Input placeholder="e.g. Manager, Director" className="mt-1" />
          </div>
          <div>
            <Label>Cost Centre</Label>
            <Input placeholder="Cost centre code" className="mt-1" />
          </div>
          <div>
            <Label>Purchase Order Number <span className="text-red-500">*</span></Label>
            <Select className="mt-1">
              <option value="">Select an option</option>
              {["PO-1001","PO-1002","PO-1003","PO-1004","PO-1005","New PO"].map(p => <option key={p}>{p}</option>)}
            </Select>
          </div>
          <div>
            <Label>Business Unit</Label>
            <Input placeholder="Business unit" className="mt-1" />
          </div>
          <div>
            <Label>Department</Label>
            <Input placeholder="Department" className="mt-1" />
          </div>
          <div>
            <Label>Assignment Type</Label>
            <Select className="mt-1">
              <option value="">Select an option</option>
              {ASSIGNMENT_TYPES.map(a => <option key={a}>{a}</option>)}
            </Select>
          </div>
          <div>
            <Label>Initiation Type</Label>
            <Select className="mt-1">
              <option value="">Select an option</option>
              {INITIATION_TYPES.map(i => <option key={i}>{i}</option>)}
            </Select>
          </div>
          <div>
            <Label>Family Status</Label>
            <Select className="mt-1">
              <option value="">Select an option</option>
              {FAMILY_STATUSES.map(f => <option key={f}>{f}</option>)}
            </Select>
          </div>
          <div>
            <Label>Number of Children</Label>
            <Select className="mt-1">
              <option value="">Select an option</option>
              {["0","1","2","3","4","5+"].map(n => <option key={n}>{n}</option>)}
            </Select>
          </div>
          <div>
            <Label>Related Dual Career</Label>
            <Select className="mt-1">
              <option value="">Select an option</option>
              {DUAL_CAREER.map(d => <option key={d}>{d}</option>)}
            </Select>
          </div>
          <div>
            <Label>Dual Career Type</Label>
            <Input placeholder="e.g. Professional, Academic" className="mt-1" />
          </div>
          <div>
            <Label>Assignment Social Security</Label>
            <Select className="mt-1">
              <option value="">Select an option</option>
              {SOCIAL_SECURITY.map(s => <option key={s}>{s}</option>)}
            </Select>
          </div>
          <div>
            <Label>Payroll Split</Label>
            <Select className="mt-1">
              <option value="">Select an option</option>
              {PAYROLL_SPLITS.map(p => <option key={p}>{p}</option>)}
            </Select>
          </div>
          <div>
            <Label>Assignment Reason</Label>
            <Select className="mt-1">
              <option value="">Select an option</option>
              {ASSIGNMENT_REASONS.map(r => <option key={r}>{r}</option>)}
            </Select>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-4">HR Contacts</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Home HR Contact</Label>
            <Input placeholder="Name or email" className="mt-1" />
          </div>
          <div>
            <Label>Host HR Contact</Label>
            <Input placeholder="Name or email" className="mt-1" />
          </div>
          <div>
            <Label>Home Business Unit Manager</Label>
            <Input placeholder="Name" className="mt-1" />
          </div>
          <div>
            <Label>Host Business Unit Manager</Label>
            <Input placeholder="Name" className="mt-1" />
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-4">Client-Specific Fields (BNP Paribas)</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>CAROL ID</Label>
            <Input placeholder="Client HR ID" className="mt-1" />
          </div>
          <div>
            <Label>GPZ Number</Label>
            <Input placeholder="GPZ number" className="mt-1" />
          </div>
          <div>
            <Label>Host Business Unit Code</Label>
            <Input placeholder="BU code" className="mt-1" />
          </div>
          <div>
            <Label>ManCom / Non-ManCom</Label>
            <Select className="mt-1">
              <option value="">Select an option</option>
              <option>ManCom</option>
              <option>Non-ManCom</option>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
