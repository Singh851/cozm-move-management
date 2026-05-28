import { Label } from "../../../components/ui/Label";
import { Input } from "../../../components/ui/Input";
import { Select } from "../../../components/ui/Select";
import { Button } from "../../../components/ui/Button";
import { HelpTooltip } from "../../../components/ui/HelpTooltip";
import { useState } from "react";
import { PlusCircle, X } from "lucide-react";

const SALUTATIONS = ["Mr", "Mrs", "Ms", "Dr", "Prof"];
const NATIONALITIES = ["British","French","German","Dutch","Belgian","Portuguese","Spanish","Italian","Irish","Swiss","Australian","Singaporean","American","Canadian","Indian","Other"];
const MARITAL = ["Single","Married","Civil Partnership","Divorced","Widowed","Prefer not to say"];
const GENDERS = ["Male","Female","Non-binary","Prefer not to say"];
const COUNTRIES = ["France","United Kingdom","Germany","Netherlands","Belgium","Luxembourg","Portugal","Spain","Italy","Switzerland","United States","Canada","Australia","Singapore","Hong Kong","India","UAE","Other"];

interface Dependent { name: string; relationship: string; dob: string; nationality: string; }

function FieldLabel({ htmlFor, children, tip }: { htmlFor?: string; children: React.ReactNode; tip: string }) {
  return (
    <div className="flex items-center">
      <Label htmlFor={htmlFor}>{children}</Label>
      <HelpTooltip text={tip} />
    </div>
  );
}

export function Step1Assignee() {
  const [preferredName, setPreferredName] = useState(false);
  const [dependants, setDependants] = useState<Dependent[]>([]);

  const addDependant = () => setDependants(d => [...d, { name: "", relationship: "", dob: "", nationality: "" }]);
  const removeDependant = (i: number) => setDependants(d => d.filter((_, idx) => idx !== i));
  const updateDependant = (i: number, field: keyof Dependent, value: string) =>
    setDependants(d => d.map((item, idx) => idx === i ? { ...item, [field]: value } : item));

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-4">About Assignee</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <FieldLabel htmlFor="firstName" tip="Enter the assignee's legal first name exactly as it appears on their passport. Used in all automated emails and legal documents.">
              First Name <span className="text-red-500">*</span>
            </FieldLabel>
            <Input id="firstName" placeholder="Enter first name" className="mt-1" />
          </div>
          <div>
            <FieldLabel htmlFor="lastName" tip="Enter the assignee's legal last name exactly as it appears on their passport.">
              Last Name <span className="text-red-500">*</span>
            </FieldLabel>
            <Input id="lastName" placeholder="Enter last name" className="mt-1" />
          </div>
          <div>
            <FieldLabel htmlFor="salutation" tip="Select the appropriate title. Used in all correspondence to the assignee.">
              Salutation
            </FieldLabel>
            <Select id="salutation" className="mt-1">
              <option value="">Select an option</option>
              {SALUTATIONS.map(s => <option key={s}>{s}</option>)}
            </Select>
          </div>
          <div>
            <FieldLabel htmlFor="primaryEmail" tip="The assignee's primary email address. All 17 automated workflow emails — including service introduction, SP reminders, and CSAT — will be sent here.">
              Primary Email <span className="text-red-500">*</span>
            </FieldLabel>
            <Input id="primaryEmail" type="email" placeholder="email@company.com" className="mt-1" />
          </div>
          <div>
            <FieldLabel tip="Select Yes if the assignee goes by a name different from their legal first name. A separate preferred name field will appear.">
              Is this a Preferred First Name?
            </FieldLabel>
            <div className="flex gap-4 mt-2">
              {["Yes", "No"].map(v => (
                <label key={v} className="flex items-center gap-2 cursor-pointer text-sm text-slate-700">
                  <input type="radio" name="preferredName" value={v} onChange={() => setPreferredName(v === "Yes")} className="accent-primary-600" />
                  {v}
                </label>
              ))}
            </div>
          </div>
          {preferredName && (
            <div>
              <FieldLabel htmlFor="preferredNameField" tip="The name the assignee prefers to be addressed by in correspondence. This does not replace the legal name.">
                Preferred Name
              </FieldLabel>
              <Input id="preferredNameField" placeholder="Preferred first name" className="mt-1" />
            </div>
          )}
          <div>
            <FieldLabel htmlFor="nationality" tip="Select the assignee's primary nationality. Used for visa eligibility checks and SP enrollment.">
              Nationality <span className="text-red-500">*</span>
            </FieldLabel>
            <Select id="nationality" className="mt-1">
              <option value="">Select an option</option>
              {NATIONALITIES.map(n => <option key={n}>{n}</option>)}
            </Select>
          </div>
          <div>
            <FieldLabel htmlFor="otherNationality" tip="If the assignee holds dual nationality, select the second nationality here. May affect immigration route options.">
              Other Nationality
            </FieldLabel>
            <Select id="otherNationality" className="mt-1">
              <option value="">Select an option</option>
              {NATIONALITIES.map(n => <option key={n}>{n}</option>)}
            </Select>
          </div>
          <div>
            <FieldLabel htmlFor="dob" tip="Required for shipment protection enrollment, visa applications, and assignee identification. Must match passport.">
              Date of Birth
            </FieldLabel>
            <Input id="dob" type="date" className="mt-1" />
          </div>
          <div>
            <FieldLabel htmlFor="gender" tip="Used for internal demographic reporting and assignee portal personalisation. Not shared externally.">
              Gender
            </FieldLabel>
            <Select id="gender" className="mt-1">
              <option value="">Select an option</option>
              {GENDERS.map(g => <option key={g}>{g}</option>)}
            </Select>
          </div>
          <div>
            <FieldLabel htmlFor="maritalStatus" tip="Marital status affects policy entitlements, dependent documentation requirements, and shipment allowances under the BNP policy.">
              Marital Status
            </FieldLabel>
            <Select id="maritalStatus" className="mt-1">
              <option value="">Select an option</option>
              {MARITAL.map(m => <option key={m}>{m}</option>)}
            </Select>
          </div>
          <div>
            <FieldLabel htmlFor="totalPeople" tip="Include the assignee plus all family members who will be relocating. This drives the shipment volume estimate and SP enrollment.">
              Total People Relocating (incl. assignee) <span className="text-red-500">*</span>
            </FieldLabel>
            <Input id="totalPeople" type="number" min={1} placeholder="1" className="mt-1" />
          </div>
          <div>
            <FieldLabel htmlFor="permResCountry" tip="The country where the assignee currently permanently resides before this assignment begins.">
              Permanent Residence Country
            </FieldLabel>
            <Select id="permResCountry" className="mt-1">
              <option value="">Select an option</option>
              {COUNTRIES.map(c => <option key={c}>{c}</option>)}
            </Select>
          </div>
          <div>
            <FieldLabel htmlFor="permResCity" tip="City of the assignee's current permanent residence.">
              Permanent Residence City
            </FieldLabel>
            <Input id="permResCity" placeholder="City" className="mt-1" />
          </div>
        </div>
      </div>

      {/* Dependants */}
      <div className="pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Family Members / Dependants</p>
            <HelpTooltip text="Add each family member relocating with the assignee. Details are required for SP enrollment forms and dependent documentation." />
          </div>
          <Button type="button" variant="outline" size="sm" onClick={addDependant}>
            <PlusCircle className="h-4 w-4 mr-1.5" /> Add Family Member
          </Button>
        </div>
        {dependants.length === 0 && <p className="text-sm text-slate-400 italic">No dependants added.</p>}
        {dependants.map((dep, i) => (
          <div key={i} className="border border-slate-200 rounded-xl p-4 mb-3 bg-slate-50/50 relative">
            <button type="button" onClick={() => removeDependant(i)} className="absolute top-3 right-3 text-slate-400 hover:text-red-500 transition-colors">
              <X className="h-4 w-4" />
            </button>
            <p className="text-xs font-semibold text-slate-500 mb-3">Family Member {i + 1}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <FieldLabel tip="Full legal name of the family member as per their passport.">Full Name</FieldLabel>
                <Input value={dep.name} onChange={e => updateDependant(i, "name", e.target.value)} placeholder="Full name" className="mt-1" />
              </div>
              <div>
                <FieldLabel tip="Relationship to the primary assignee. Determines documentation requirements.">Relationship</FieldLabel>
                <Select value={dep.relationship} onChange={e => updateDependant(i, "relationship", e.target.value)} className="mt-1">
                  <option value="">Select</option>
                  {["Spouse/Partner","Child","Parent","Other"].map(r => <option key={r}>{r}</option>)}
                </Select>
              </div>
              <div>
                <FieldLabel tip="Date of birth required for visa applications and SP enrollment.">Date of Birth</FieldLabel>
                <Input type="date" value={dep.dob} onChange={e => updateDependant(i, "dob", e.target.value)} className="mt-1" />
              </div>
              <div>
                <FieldLabel tip="Nationality used for immigration route and documentation planning.">Nationality</FieldLabel>
                <Select value={dep.nationality} onChange={e => updateDependant(i, "nationality", e.target.value)} className="mt-1">
                  <option value="">Select</option>
                  {NATIONALITIES.map(n => <option key={n}>{n}</option>)}
                </Select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
