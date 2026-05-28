import { Label } from "../../../components/ui/Label";
import { Input } from "../../../components/ui/Input";
import { Select } from "../../../components/ui/Select";
import { HelpTooltip } from "../../../components/ui/HelpTooltip";

const ASSIGNMENT_TYPES = ["Short-Term","Long-Term","Commuter","Permanent Transfer","Business Trip","Developmental"];
const INITIATION_TYPES = ["Standard","VIP","Urgent","Confidential"];
const FAMILY_STATUSES = ["Accompanied","Unaccompanied"];
const DUAL_CAREER = ["Yes","No","TBC"];
const SOCIAL_SECURITY = ["Home Country","Host Country","Split","Not Applicable"];
const PAYROLL_SPLITS = ["Home","Host","Split","Not Applicable"];
const ASSIGNMENT_REASONS = ["Business Need","Developmental","Rotational","Permanent Transfer","Other"];

function FieldLabel({ htmlFor, children, tip }: { htmlFor?: string; children: React.ReactNode; tip: string }) {
  return (
    <div className="flex items-center">
      <Label htmlFor={htmlFor}>{children}</Label>
      <HelpTooltip text={tip} />
    </div>
  );
}

export function Step3JobInfo() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-4">Job & Assignment Information</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <FieldLabel tip="The assignee's unique employee identifier in your HR system. Used to cross-reference records throughout the move lifecycle.">Employee ID</FieldLabel>
            <Input placeholder="e.g. EMP-12345" className="mt-1" />
          </div>
          <div>
            <FieldLabel tip="The assignee's official job title at the time of initiation. This appears on official correspondence and is used for vendor briefings.">Job Title</FieldLabel>
            <Input placeholder="Job title" className="mt-1" />
          </div>
          <div>
            <FieldLabel tip="The job grade or category band (e.g. Manager, Director, VP). Determines the applicable policy tier and service level.">Job Category</FieldLabel>
            <Input placeholder="e.g. Manager, Director" className="mt-1" />
          </div>
          <div>
            <FieldLabel tip="The cost centre code that will be charged for move-related expenses. Must be a valid code from your finance system.">Cost Centre</FieldLabel>
            <Input placeholder="Cost centre code" className="mt-1" />
          </div>
          <div>
            <FieldLabel tip="The purchase order number authorising move spend. Required before any supplier is instructed. Select 'New PO' if one has not been raised yet.">Purchase Order Number <span className="text-red-500">*</span></FieldLabel>
            <Select className="mt-1">
              <option value="">Select an option</option>
              {["PO-1001","PO-1002","PO-1003","PO-1004","PO-1005","New PO"].map(p => <option key={p}>{p}</option>)}
            </Select>
          </div>
          <div>
            <FieldLabel tip="The business unit that the assignee belongs to in the home country. Used for reporting and cost allocation.">Business Unit</FieldLabel>
            <Input placeholder="Business unit" className="mt-1" />
          </div>
          <div>
            <FieldLabel tip="The specific department or team within the business unit. Used for granular reporting and HR record-keeping.">Department</FieldLabel>
            <Input placeholder="Department" className="mt-1" />
          </div>
          <div>
            <FieldLabel tip="The type of assignment determines the policy, duration, and entitlements that apply. Short-Term is up to 12 months; Long-Term is 12–36 months.">Assignment Type</FieldLabel>
            <Select className="mt-1">
              <option value="">Select an option</option>
              {ASSIGNMENT_TYPES.map(a => <option key={a}>{a}</option>)}
            </Select>
          </div>
          <div>
            <FieldLabel tip="Controls the handling protocol for this case. VIP and Confidential cases receive restricted access and elevated service standards.">Initiation Type</FieldLabel>
            <Select className="mt-1">
              <option value="">Select an option</option>
              {INITIATION_TYPES.map(i => <option key={i}>{i}</option>)}
            </Select>
          </div>
          <div>
            <FieldLabel tip="Indicates whether family members are relocating with the assignee. Accompanied moves require additional planning for partner and children.">Family Status</FieldLabel>
            <Select className="mt-1">
              <option value="">Select an option</option>
              {FAMILY_STATUSES.map(f => <option key={f}>{f}</option>)}
            </Select>
          </div>
          <div>
            <FieldLabel tip="Total number of dependent children relocating. Affects volume estimates, school search, and child visa requirements.">Number of Children</FieldLabel>
            <Select className="mt-1">
              <option value="">Select an option</option>
              {["0","1","2","3","4","5+"].map(n => <option key={n}>{n}</option>)}
            </Select>
          </div>
          <div>
            <FieldLabel tip="Indicates whether the assignee's partner has a career that needs to be considered as part of the relocation support plan.">Related Dual Career</FieldLabel>
            <Select className="mt-1">
              <option value="">Select an option</option>
              {DUAL_CAREER.map(d => <option key={d}>{d}</option>)}
            </Select>
          </div>
          <div>
            <FieldLabel tip="Describes the nature of the partner's career (e.g. Medical, Legal, Academic). Used to tailor the career support service offering.">Dual Career Type</FieldLabel>
            <Input placeholder="e.g. Professional, Academic" className="mt-1" />
          </div>
          <div>
            <FieldLabel tip="Determines which country's social security scheme the assignee remains in or moves to. Has tax and compliance implications — confirm with your tax adviser.">Assignment Social Security</FieldLabel>
            <Select className="mt-1">
              <option value="">Select an option</option>
              {SOCIAL_SECURITY.map(s => <option key={s}>{s}</option>)}
            </Select>
          </div>
          <div>
            <FieldLabel tip="Indicates how the assignee's salary will be split between home and host payrolls. Impacts shadow payroll, tax equalisation, and vendor invoicing.">Payroll Split</FieldLabel>
            <Select className="mt-1">
              <option value="">Select an option</option>
              {PAYROLL_SPLITS.map(p => <option key={p}>{p}</option>)}
            </Select>
          </div>
          <div>
            <FieldLabel tip="The primary business reason for the assignment. Used for internal reporting, policy justification, and regulatory disclosures.">Assignment Reason</FieldLabel>
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
            <FieldLabel tip="The HR Business Partner or coordinator in the assignee's home country. They are the first point of contact for policy queries and approvals.">Home HR Contact</FieldLabel>
            <Input placeholder="Name or email" className="mt-1" />
          </div>
          <div>
            <FieldLabel tip="The HR representative in the host country who will support onboarding, local compliance, and any host-side payroll matters.">Host HR Contact</FieldLabel>
            <Input placeholder="Name or email" className="mt-1" />
          </div>
          <div>
            <FieldLabel tip="The assignee's line manager in the home country. May need to approve the move initiation and will be copied on key milestone communications.">Home Business Unit Manager</FieldLabel>
            <Input placeholder="Name" className="mt-1" />
          </div>
          <div>
            <FieldLabel tip="The receiving manager in the host location who will be responsible for the assignee on arrival. Included in briefing calls and move updates.">Host Business Unit Manager</FieldLabel>
            <Input placeholder="Name" className="mt-1" />
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-4">Client-Specific Fields (BNP Paribas)</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <FieldLabel tip="BNP Paribas CAROL system identifier. Used to link this move record to the assignee's profile in the client HRIS for automated data exchange.">CAROL ID</FieldLabel>
            <Input placeholder="Client HR ID" className="mt-1" />
          </div>
          <div>
            <FieldLabel tip="The GPZ (Global Payroll Zone) number assigned by BNP Paribas. Required for payroll instruction and cross-border tax equalisation processing.">GPZ Number</FieldLabel>
            <Input placeholder="GPZ number" className="mt-1" />
          </div>
          <div>
            <FieldLabel tip="The BNP Paribas business unit code in the host country. Used for internal cost allocation and ensures correct billing entity is charged.">Host Business Unit Code</FieldLabel>
            <Input placeholder="BU code" className="mt-1" />
          </div>
          <div>
            <FieldLabel tip="Indicates whether the assignee is part of the Management Committee (ManCom) population. ManCom moves have elevated approval requirements and reporting obligations.">ManCom / Non-ManCom</FieldLabel>
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
