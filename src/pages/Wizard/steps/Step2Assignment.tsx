import { Label } from "../../../components/ui/Label";
import { Input } from "../../../components/ui/Input";
import { Select } from "../../../components/ui/Select";
import { HelpTooltip } from "../../../components/ui/HelpTooltip";
import { useState } from "react";

const COUNTRIES = ["France","United Kingdom","Germany","Netherlands","Belgium","Luxembourg","Portugal","Spain","Italy","Switzerland","United States","Canada","Australia","Singapore","Hong Kong","India","UAE","Other"];
const ENTITIES_BY_COUNTRY: Record<string, string[]> = {
  France: ["BNP PARIBAS PERSONAL FINANCE","GIE BNP PARIBAS CARDIF","ARVAL SERVICE LEASE SA (France)","FINDOMESTIC BANCA SPA"],
  "United Kingdom": ["BNP PARIBAS London Branch","BNP PARIBAS SA SYDNEY BRANCH"],
  Germany: ["BNP Paribas Niederlassung S.A. Deutschland - Frankfurt"],
  Luxembourg: ["BGL BNP PARIBAS"],
  Canada: ["BNPP SA Montreal Branch - CA"],
  Switzerland: ["BNPP SA Geneva Branch"],
  Singapore: ["BNP Paribas Singapore Branch"],
};

function FieldLabel({ htmlFor, children, tip }: { htmlFor?: string; children: React.ReactNode; tip: string }) {
  return (
    <div className="flex items-center">
      <Label htmlFor={htmlFor}>{children}</Label>
      <HelpTooltip text={tip} />
    </div>
  );
}

export function Step2Assignment() {
  const [homeCountry, setHomeCountry] = useState("");
  const [hostCountry, setHostCountry] = useState("");
  const [billingCountry, setBillingCountry] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const monthsDiff = startDate && endDate
    ? Math.max(0, Math.round((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24 * 30.44)))
    : "";

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-4">Assignment Details</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <FieldLabel htmlFor="startDate" tip="The official start date of the assignment in the host location. Used to calculate length of assignment and triggers the 24-hour assignee service introduction email.">
              Assignment Start Date <span className="text-red-500">*</span>
            </FieldLabel>
            <Input id="startDate" type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="mt-1" />
          </div>
          <div>
            <FieldLabel htmlFor="endDate" tip="The planned end date of the assignment. Leave blank for open-ended or permanent transfers. Used to auto-calculate assignment length.">
              Assignment End Date
            </FieldLabel>
            <Input id="endDate" type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="mt-1" />
          </div>
          <div>
            <FieldLabel tip="Automatically calculated from start and end dates. Short-term = under 12 months. Long-term = 12+ months. Drives policy entitlement.">
              Length of Assignment (months)
            </FieldLabel>
            <Input value={monthsDiff} readOnly placeholder="Auto-calculated" className="mt-1 bg-slate-50" />
          </div>
          <div className="flex flex-col gap-3 justify-end">
            <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-700">
              <input type="checkbox" className="accent-primary-600 h-4 w-4" />
              <span>Mark assignment as confidential</span>
              <HelpTooltip text="Restricts visibility of this case to authorised personnel only. The case will not appear in standard reports or team dashboards." />
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-700">
              <input type="checkbox" className="accent-primary-600 h-4 w-4" />
              <span>VIP status</span>
              <HelpTooltip text="Flag this assignee for elevated service levels. VIP cases receive priority MMC assignment and enhanced communication frequency." />
            </label>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-4">Entities</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <FieldLabel tip="Filter the home entity list by selecting the home country first. The home entity is the legal entity in the assignee's country of origin for HR and payroll purposes.">
              Filter Legal Home Entity by Country
            </FieldLabel>
            <Select className="mt-1" value={homeCountry} onChange={e => setHomeCountry(e.target.value)}>
              <option value="">Select country</option>
              {COUNTRIES.map(c => <option key={c}>{c}</option>)}
            </Select>
          </div>
          <div>
            <FieldLabel tip="The legal entity in the assignee's home country responsible for their home payroll and HR administration.">
              Legal Home Entity
            </FieldLabel>
            <Select className="mt-1">
              <option value="">Select entity</option>
              {(ENTITIES_BY_COUNTRY[homeCountry] ?? []).map(e => <option key={e}>{e}</option>)}
            </Select>
          </div>
          <div>
            <FieldLabel tip="Filter the host entity list by selecting the host country. The host entity is mandatory — it determines the client policy applicable to this move.">
              Filter Legal Host Entity by Country <span className="text-red-500">*</span>
            </FieldLabel>
            <Select className="mt-1" value={hostCountry} onChange={e => setHostCountry(e.target.value)}>
              <option value="">Select country</option>
              {COUNTRIES.map(c => <option key={c}>{c}</option>)}
            </Select>
          </div>
          <div>
            <FieldLabel tip="The legal entity in the host country that will employ or host the assignee. Mandatory — drives policy, allowances, and the panel mover list.">
              Legal Host Entity <span className="text-red-500">*</span>
            </FieldLabel>
            <Select className="mt-1">
              <option value="">Select entity</option>
              {(ENTITIES_BY_COUNTRY[hostCountry] ?? []).map(e => <option key={e}>{e}</option>)}
            </Select>
          </div>
          <div>
            <FieldLabel tip="Filter billing entity by country. If different from host entity, all invoices for this case will be addressed to the billing entity.">
              Filter Legal Billing Entity by Country
            </FieldLabel>
            <Select className="mt-1" value={billingCountry} onChange={e => setBillingCountry(e.target.value)}>
              <option value="">Select country</option>
              {COUNTRIES.map(c => <option key={c}>{c}</option>)}
            </Select>
          </div>
          <div>
            <FieldLabel tip="The entity to be invoiced for relocation services. Defaults to host entity if left blank.">
              Legal Billing Entity
            </FieldLabel>
            <Select className="mt-1">
              <option value="">Select entity</option>
              {(ENTITIES_BY_COUNTRY[billingCountry] ?? []).map(e => <option key={e}>{e}</option>)}
            </Select>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-4">Relocating From</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <FieldLabel tip="The full street address of the assignee's current home. This is provided to panel movers for the pre-move survey booking.">Address</FieldLabel>
            <Input placeholder="Street address" className="mt-1" />
          </div>
          <div>
            <FieldLabel tip="Origin city — used in all correspondence, the quote request to panel movers, and route-based reporting.">
              City <span className="text-red-500">*</span>
            </FieldLabel>
            <Input placeholder="City" className="mt-1" />
          </div>
          <div>
            <FieldLabel tip="Post code of the origin property. Required for accurate survey booking by the panel mover.">Post Code</FieldLabel>
            <Input placeholder="Post code" className="mt-1" />
          </div>
          <div>
            <FieldLabel tip="State or county if applicable. Required for US, Australia, Canada and similar countries.">State / County</FieldLabel>
            <Input placeholder="State or county" className="mt-1" />
          </div>
          <div>
            <FieldLabel tip="Origin country — mandatory for routing, mover selection, customs documentation, and SP enrollment.">
              Country <span className="text-red-500">*</span>
            </FieldLabel>
            <Select className="mt-1">
              <option value="">Select country</option>
              {COUNTRIES.map(c => <option key={c}>{c}</option>)}
            </Select>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-4">Relocating To</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <FieldLabel tip="Destination address if already known. Can be updated later once the assignee's housing is confirmed. Used for delivery coordination.">Address</FieldLabel>
            <Input placeholder="Street address (if known)" className="mt-1" />
          </div>
          <div>
            <FieldLabel tip="Destination city — mandatory. Used in mover selection, booking confirmation, and the assignee service introduction email.">
              City <span className="text-red-500">*</span>
            </FieldLabel>
            <Input placeholder="City" className="mt-1" />
          </div>
          <div>
            <FieldLabel tip="Destination post code. Provide if known — required by movers for final mile delivery planning.">Post Code</FieldLabel>
            <Input placeholder="Post code" className="mt-1" />
          </div>
          <div>
            <FieldLabel tip="State or county if applicable for the destination country.">State / County</FieldLabel>
            <Input placeholder="State or county" className="mt-1" />
          </div>
          <div>
            <FieldLabel tip="Destination country — mandatory. Drives customs requirements, SP terms, and mover panel selection.">
              Country <span className="text-red-500">*</span>
            </FieldLabel>
            <Select className="mt-1">
              <option value="">Select country</option>
              {COUNTRIES.map(c => <option key={c}>{c}</option>)}
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
