import { Card, CardContent } from "../../../components/ui/Card";
import { Input } from "../../../components/ui/Input";
import { Label } from "../../../components/ui/Label";
import { Select } from "../../../components/ui/Select";
import { Switch } from "../../../components/ui/Switch";
import { CalendarDays, Building2, MapPin, PlaneTakeoff, PlaneLanding } from "lucide-react";
import { HelpTooltip } from "../../../components/ui/HelpTooltip";

export function Step2Assignment() {
  return (
    <div className="space-y-8">
      <section>
        <div className="flex items-center gap-2 mb-6">
          <div className="h-8 w-8 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center">
            <CalendarDays className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Assignment Dates</h2>
        </div>
        <Card>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date <span className="text-red-500">*</span></Label>
                <Input id="startDate" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input id="endDate" type="date" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
              <div className="space-y-2">
                <div className="flex items-center">
                  <Label className="text-base">Mark as Confidential</Label>
                  <HelpTooltip text="Restricts visibility of this case to authorised personnel only." />
                </div>
                <div className="flex items-center gap-3">
                   <Switch id="confidential" />
                   <Label htmlFor="confidential" className="font-normal text-slate-600">Confidential</Label>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Label className="text-base">VIP Status</Label>
                  <HelpTooltip text="Enable for senior executives or board-level assignees requiring priority handling." />
                </div>
                <div className="flex items-center gap-3">
                   <Switch id="vipStatus" />
                   <Label htmlFor="vipStatus" className="font-normal text-slate-600">Qualifies for VIP status</Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <div className="flex items-center gap-2 mb-6">
          <div className="h-8 w-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
            <Building2 className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Legal Entities</h2>
        </div>
        <Card>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="filterHomeCountry">Filter Legal Home Entity by Country</Label>
                  <HelpTooltip text="Narrow down the home entity list by selecting a country first." />
                </div>
                <Select id="filterHomeCountry">
                  <option value="">Select an option</option>
                  <option>Germany</option>
                  <option>United Kingdom</option>
                  <option>USA</option>
                </Select>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="filterHostCountry">Filter Legal Host Entity by Country</Label>
                  <HelpTooltip text="Narrow down the host entity list by selecting a country first." />
                </div>
                <Select id="filterHostCountry">
                  <option value="">Select an option</option>
                  <option>Germany</option>
                  <option>United Kingdom</option>
                  <option>USA</option>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="homeEntity">Legal Home Entity</Label>
                  <HelpTooltip text="Entity in the home country." />
                </div>
                <Select id="homeEntity">
                  <option value="">Select entity...</option>
                  <option>GmbH (Germany)</option>
                  <option>Company Ltd (UK)</option>
                </Select>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="hostEntity">Legal Host Entity <span className="text-red-500">*</span></Label>
                  <HelpTooltip text="Entity receiving the assignee." />
                </div>
                <Select id="hostEntity">
                  <option value="">Select entity...</option>
                  <option>Company Ltd (UK)</option>
                  <option>Inc (USA)</option>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
              <div className="space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="filterBillingCountry">Filter Legal Billing Entity by Country</Label>
                  <HelpTooltip text="Optional — use if the billing entity differs from home or host entity country." />
                </div>
                <Select id="filterBillingCountry">
                  <option value="">Select an option</option>
                  <option>Germany</option>
                  <option>United Kingdom</option>
                  <option>USA</option>
                </Select>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="billingEntity">Legal Billing Entity</Label>
                  <HelpTooltip text="The entity responsible for billing and invoicing of assignment costs." />
                </div>
                <Select id="billingEntity">
                  <option value="">Select an option</option>
                  <option>Entity A</option>
                  <option>Entity B</option>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <div className="flex items-center gap-2 mb-6">
          <div className="h-8 w-8 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center">
            <MapPin className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Relocation Route</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-t-4 border-t-slate-300">
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <PlaneTakeoff className="h-5 w-5 text-teal-600" />
                <h3 className="font-bold text-slate-900 text-lg">Relocating From</h3>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center">
                  <Label>Address</Label>
                  <HelpTooltip text="Current home address of the assignee." />
                </div>
                <Input placeholder="Street address" />
              </div>
              <div className="space-y-2">
                <Label>City <span className="text-red-500">*</span></Label>
                <Input placeholder="e.g. Berlin" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Post Code</Label>
                  <Input placeholder="e.g. 10115" />
                </div>
                <div className="space-y-2">
                  <Label>State / County</Label>
                  <Input placeholder="e.g. Bavaria" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Country <span className="text-red-500">*</span></Label>
                <Select>
                  <option value="">Select an option</option>
                  <option>Germany</option>
                  <option>France</option>
                </Select>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-t-4 border-t-teal-500">
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <PlaneLanding className="h-5 w-5 text-teal-600" />
                <h3 className="font-bold text-slate-900 text-lg">Relocating To</h3>
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <Label>Address</Label>
                  <HelpTooltip text="Destination address in the host country (if known)." />
                </div>
                <Input placeholder="Street address" />
              </div>
              <div className="space-y-2">
                <Label>City <span className="text-red-500">*</span></Label>
                <Input placeholder="e.g. London" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Post Code</Label>
                  <Input placeholder="e.g. SW1A 1AA" />
                </div>
                <div className="space-y-2">
                  <Label>State / County</Label>
                  <Input placeholder="e.g. Greater London" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Country <span className="text-red-500">*</span></Label>
                <Select>
                  <option value="">Select an option</option>
                  <option>United Kingdom</option>
                  <option>USA</option>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}