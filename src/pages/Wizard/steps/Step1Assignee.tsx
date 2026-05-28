import { Label } from "../../../components/ui/Label";
import { Input } from "../../../components/ui/Input";
import { Select } from "../../../components/ui/Select";
import { Button } from "../../../components/ui/Button";
import { useState } from "react";
import { PlusCircle, X } from "lucide-react";

const SALUTATIONS = ["Mr", "Mrs", "Ms", "Dr", "Prof"];
const NATIONALITIES = ["British","French","German","Dutch","Belgian","Portuguese","Spanish","Italian","Irish","Swiss","Australian","Singaporean","American","Canadian","Indian","Other"];
const MARITAL = ["Single","Married","Civil Partnership","Divorced","Widowed","Prefer not to say"];
const GENDERS = ["Male","Female","Non-binary","Prefer not to say"];
const COUNTRIES = ["France","United Kingdom","Germany","Netherlands","Belgium","Luxembourg","Portugal","Spain","Italy","Switzerland","United States","Canada","Australia","Singapore","Hong Kong","India","UAE","Other"];

interface Dependent { name: string; relationship: string; dob: string; nationality: string; }

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
            <Label htmlFor="firstName">First Name <span className="text-red-500">*</span></Label>
            <Input id="firstName" placeholder="Enter first name" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name <span className="text-red-500">*</span></Label>
            <Input id="lastName" placeholder="Enter last name" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="salutation">Salutation</Label>
            <Select id="salutation" className="mt-1">
              <option value="">Select an option</option>
              {SALUTATIONS.map(s => <option key={s}>{s}</option>)}
            </Select>
          </div>
          <div>
            <Label htmlFor="primaryEmail">Primary Email <span className="text-red-500">*</span></Label>
            <Input id="primaryEmail" type="email" placeholder="email@company.com" className="mt-1" />
          </div>
          <div>
            <Label>Is this a Preferred First Name?</Label>
            <div className="flex gap-4 mt-2">
              {["Yes", "No"].map(v => (
                <label key={v} className="flex items-center gap-2 cursor-pointer text-sm text-slate-700">
                  <input type="radio" name="preferredName" value={v} onChange={() => setPreferredName(v === "Yes")}
                    className="accent-primary-600" />
                  {v}
                </label>
              ))}
            </div>
          </div>
          {preferredName && (
            <div>
              <Label htmlFor="preferredNameField">Preferred Name</Label>
              <Input id="preferredNameField" placeholder="Preferred first name" className="mt-1" />
            </div>
          )}
          <div>
            <Label htmlFor="nationality">Nationality <span className="text-red-500">*</span></Label>
            <Select id="nationality" className="mt-1">
              <option value="">Select an option</option>
              {NATIONALITIES.map(n => <option key={n}>{n}</option>)}
            </Select>
          </div>
          <div>
            <Label htmlFor="otherNationality">Other Nationality</Label>
            <Select id="otherNationality" className="mt-1">
              <option value="">Select an option</option>
              {NATIONALITIES.map(n => <option key={n}>{n}</option>)}
            </Select>
          </div>
          <div>
            <Label htmlFor="dob">Date of Birth</Label>
            <Input id="dob" type="date" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="gender">Gender</Label>
            <Select id="gender" className="mt-1">
              <option value="">Select an option</option>
              {GENDERS.map(g => <option key={g}>{g}</option>)}
            </Select>
          </div>
          <div>
            <Label htmlFor="maritalStatus">Marital Status</Label>
            <Select id="maritalStatus" className="mt-1">
              <option value="">Select an option</option>
              {MARITAL.map(m => <option key={m}>{m}</option>)}
            </Select>
          </div>
          <div>
            <Label htmlFor="totalPeople">Total People Relocating (incl. assignee) <span className="text-red-500">*</span></Label>
            <Input id="totalPeople" type="number" min={1} placeholder="1" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="permResCountry">Permanent Residence Country</Label>
            <Select id="permResCountry" className="mt-1">
              <option value="">Select an option</option>
              {COUNTRIES.map(c => <option key={c}>{c}</option>)}
            </Select>
          </div>
          <div>
            <Label htmlFor="permResCity">Permanent Residence City</Label>
            <Input id="permResCity" placeholder="City" className="mt-1" />
          </div>
        </div>
      </div>

      {/* Dependants */}
      <div className="pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Family Members / Dependants</p>
          <Button type="button" variant="outline" size="sm" onClick={addDependant}>
            <PlusCircle className="h-4 w-4 mr-1.5" /> Add Family Member
          </Button>
        </div>
        {dependants.length === 0 && (
          <p className="text-sm text-slate-400 italic">No dependants added.</p>
        )}
        {dependants.map((dep, i) => (
          <div key={i} className="border border-slate-200 rounded-xl p-4 mb-3 bg-slate-50/50 relative">
            <button type="button" onClick={() => removeDependant(i)} className="absolute top-3 right-3 text-slate-400 hover:text-red-500 transition-colors">
              <X className="h-4 w-4" />
            </button>
            <p className="text-xs font-semibold text-slate-500 mb-3">Family Member {i + 1}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <Label>Full Name</Label>
                <Input value={dep.name} onChange={e => updateDependant(i, "name", e.target.value)} placeholder="Full name" className="mt-1" />
              </div>
              <div>
                <Label>Relationship</Label>
                <Select value={dep.relationship} onChange={e => updateDependant(i, "relationship", e.target.value)} className="mt-1">
                  <option value="">Select</option>
                  {["Spouse/Partner","Child","Parent","Other"].map(r => <option key={r}>{r}</option>)}
                </Select>
              </div>
              <div>
                <Label>Date of Birth</Label>
                <Input type="date" value={dep.dob} onChange={e => updateDependant(i, "dob", e.target.value)} className="mt-1" />
              </div>
              <div>
                <Label>Nationality</Label>
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
