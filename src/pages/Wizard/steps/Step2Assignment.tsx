import { Label } from "../../../components/ui/Label";
import { Input } from "../../../components/ui/Input";
import { Select } from "../../../components/ui/Select";
import { useState } from "react";

const COUNTRIES = ["France","United Kingdom","Germany","Netherlands","Belgium","Luxembourg","Portugal","Spain","Italy","Switzerland","United States","Canada","Australia","Singapore","Hong Kong","India","UAE","Other"];
const ENTITIES_BY_COUNTRY: Record<string, string[]> = {
  France: ["BNP PARIBAS PERSONAL FINANCE","GIE BNP PARIBAS CARDIF","BNP Paribas Hong Kong Branch","ARVAL SERVICE LEASE SA (France)","FINDOMESTIC BANCA SPA","BNP PARIBAS SA / PORTUGAL"],
  "United Kingdom": ["BNP PARIBAS London Branch","BNP PARIBAS SA SYDNEY BRANCH"],
  Germany: ["BNP Paribas Niederlassung S.A. Deutschland - Frankfurt"],
  Luxembourg: ["BGL BNP PARIBAS"],
  Canada: ["BNPP SA Montreal Branch - CA"],
  Switzerland: ["BNPP SA Geneva Branch"],
  Australia: ["Chess Moving Sydney"],
  Singapore: ["BNP Paribas Singapore Branch"],
};

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
      {/* Assignment Dates */}
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-4">Assignment Details</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="startDate">Assignment Start Date <span className="text-red-500">*</span></Label>
            <Input id="startDate" type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="mt-1" />
          </div>
          <div>
            <Label htmlFor="endDate">Assignment End Date</Label>
            <Input id="endDate" type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="mt-1" />
          </div>
          <div>
            <Label>Length of Assignment (months)</Label>
            <Input value={monthsDiff} readOnly placeholder="Auto-calculated" className="mt-1 bg-slate-50" />
          </div>
          <div className="flex flex-col gap-3 justify-end">
            <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-700">
              <input type="checkbox" className="accent-primary-600 h-4 w-4" />
              Mark assignment as confidential
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-700">
              <input type="checkbox" className="accent-primary-600 h-4 w-4" />
              Does this individual qualify for VIP status?
            </label>
          </div>
        </div>
      </div>

      {/* Entities */}
      <div className="pt-4 border-t border-slate-100">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-4">Entities</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Filter Legal Home Entity by Country</Label>
            <Select className="mt-1" value={homeCountry} onChange={e => setHomeCountry(e.target.value)}>
              <option value="">Select country</option>
              {COUNTRIES.map(c => <option key={c}>{c}</option>)}
            </Select>
          </div>
          <div>
            <Label>Legal Home Entity</Label>
            <Select className="mt-1">
              <option value="">Select entity</option>
              {(ENTITIES_BY_COUNTRY[homeCountry] ?? []).map(e => <option key={e}>{e}</option>)}
            </Select>
          </div>
          <div>
            <Label>Filter Legal Host Entity by Country <span className="text-red-500">*</span></Label>
            <Select className="mt-1" value={hostCountry} onChange={e => setHostCountry(e.target.value)}>
              <option value="">Select country</option>
              {COUNTRIES.map(c => <option key={c}>{c}</option>)}
            </Select>
          </div>
          <div>
            <Label>Legal Host Entity <span className="text-red-500">*</span></Label>
            <Select className="mt-1">
              <option value="">Select entity</option>
              {(ENTITIES_BY_COUNTRY[hostCountry] ?? []).map(e => <option key={e}>{e}</option>)}
            </Select>
          </div>
          <div>
            <Label>Filter Legal Billing Entity by Country</Label>
            <Select className="mt-1" value={billingCountry} onChange={e => setBillingCountry(e.target.value)}>
              <option value="">Select country</option>
              {COUNTRIES.map(c => <option key={c}>{c}</option>)}
            </Select>
          </div>
          <div>
            <Label>Legal Billing Entity</Label>
            <Select className="mt-1">
              <option value="">Select entity</option>
              {(ENTITIES_BY_COUNTRY[billingCountry] ?? []).map(e => <option key={e}>{e}</option>)}
            </Select>
          </div>
        </div>
      </div>

      {/* Origin */}
      <div className="pt-4 border-t border-slate-100">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-4">Relocating From</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Label>Address</Label>
            <Input placeholder="Street address" className="mt-1" />
          </div>
          <div>
            <Label>City <span className="text-red-500">*</span></Label>
            <Input placeholder="City" className="mt-1" />
          </div>
          <div>
            <Label>Post Code</Label>
            <Input placeholder="Post code" className="mt-1" />
          </div>
          <div>
            <Label>State / County</Label>
            <Input placeholder="State or county" className="mt-1" />
          </div>
          <div>
            <Label>Country <span className="text-red-500">*</span></Label>
            <Select className="mt-1">
              <option value="">Select country</option>
              {COUNTRIES.map(c => <option key={c}>{c}</option>)}
            </Select>
          </div>
        </div>
      </div>

      {/* Destination */}
      <div className="pt-4 border-t border-slate-100">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-4">Relocating To</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Label>Address</Label>
            <Input placeholder="Street address (if known)" className="mt-1" />
          </div>
          <div>
            <Label>City <span className="text-red-500">*</span></Label>
            <Input placeholder="City" className="mt-1" />
          </div>
          <div>
            <Label>Post Code</Label>
            <Input placeholder="Post code" className="mt-1" />
          </div>
          <div>
            <Label>State / County</Label>
            <Input placeholder="State or county" className="mt-1" />
          </div>
          <div>
            <Label>Country <span className="text-red-500">*</span></Label>
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
