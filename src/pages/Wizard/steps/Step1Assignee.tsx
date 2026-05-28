import { useState } from "react";
import { Card, CardContent } from "../../../components/ui/Card";
import { Input } from "../../../components/ui/Input";
import { Label } from "../../../components/ui/Label";
import { Select } from "../../../components/ui/Select";
import { User, Users, UserPlus } from "lucide-react";
import { HelpTooltip } from "../../../components/ui/HelpTooltip";

export function Step1Assignee() {
  const [hasAdditionalInfo, setHasAdditionalInfo] = useState("no");
  const [totalRelocating, setTotalRelocating] = useState<number>(1);
  const [isPreferredName, setIsPreferredName] = useState("yes");

  return (
    <div className="space-y-8">
      <section>
        <div className="flex items-center gap-2 mb-6">
          <div className="h-8 w-8 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center">
            <User className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">About Assignee</h2>
        </div>
        
        <Card>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="firstName">First Name <span className="text-red-500">*</span></Label>
                  <HelpTooltip text="Legal first name as it appears on passport." />
                </div>
                <Input id="firstName" placeholder="e.g. Sarah" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="lastName">Last Name <span className="text-red-500">*</span></Label>
                  <HelpTooltip text="Legal last name as it appears on passport." />
                </div>
                <Input id="lastName" placeholder="e.g. Miller" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center">
                  <Label>Is this the Preferred First Name?</Label>
                  <HelpTooltip text='Select "No" if the assignee goes by a different preferred name day-to-day.' />
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                    <input type="radio" value="yes" checked={isPreferredName === "yes"} onChange={() => setIsPreferredName("yes")} className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-slate-300" />
                    Yes
                  </label>
                  <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                    <input type="radio" value="no" checked={isPreferredName === "no"} onChange={() => setIsPreferredName("no")} className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-slate-300" />
                    No
                  </label>
                </div>
              </div>
              
              {isPreferredName === "no" && (
                <div className="space-y-2 animate-[fadeIn_0.3s_ease-out_forwards]">
                  <div className="flex items-center">
                    <Label htmlFor="prefName">Preferred Name</Label>
                    <HelpTooltip text="The name the assignee prefers to be called." />
                  </div>
                  <Input id="prefName" placeholder="e.g. Sam" />
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="salutation">Salutation</Label>
                  <HelpTooltip text="Formal title to be used in official correspondence." />
                </div>
                <Select id="salutation">
                  <option value="">Select an option...</option>
                  <option>Mr</option>
                  <option>Mrs</option>
                  <option>Ms</option>
                  <option>Dr</option>
                  <option>Prof</option>
                  <option>Mx</option>
                </Select>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="email">Primary Email <span className="text-red-500">*</span></Label>
                  <HelpTooltip text="Main email for assignment communications." />
                </div>
                <Input id="email" type="email" placeholder="sarah.miller@company.com" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="additionalInfo">Additional Assignee Information</Label>
                  <HelpTooltip text="Include secondary contact, birthdate, status, etc." />
                </div>
                <Select 
                  id="additionalInfo" 
                  value={hasAdditionalInfo} 
                  onChange={(e) => setHasAdditionalInfo(e.target.value)}
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </Select>
              </div>
            </div>

            {hasAdditionalInfo === "yes" && (
              <div className="pt-4 mt-4 border-t border-slate-100 space-y-6 animate-[fadeIn_0.3s_ease-out_forwards]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="additionalContactType">Add Additional Contact Type</Label>
                    <Select id="additionalContactType">
                      <option value="">Select option...</option>
                      <option>Personal Email</option>
                      <option>Mobile Phone</option>
                      <option>Home Phone</option>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="birthdate">Birthdate</Label>
                    <Input id="birthdate" type="date" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="maritalStatus">Marital Status</Label>
                    <Select id="maritalStatus">
                      <option value="">Select status...</option>
                      <option>Single</option>
                      <option>Married</option>
                      <option>Domestic Partner</option>
                      <option>Divorced</option>
                      <option>Widowed</option>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select id="gender">
                      <option value="">Select gender...</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Non-binary</option>
                      <option>Prefer not to say</option>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="residenceCountry">Permanent Residence Country</Label>
                    <Input id="residenceCountry" placeholder="e.g. Germany" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="residenceCity">Permanent Residence City</Label>
                    <Input id="residenceCity" placeholder="e.g. Berlin" />
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      <section>
         <div className="flex items-center gap-2 mb-6">
          <div className="h-8 w-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
            <Users className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Relocating Family</h2>
        </div>

        <Card>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="totalRelocating">Total People Relocating <span className="text-red-500">*</span></Label>
                  <HelpTooltip text="Including assignee and dependants." />
                </div>
                <Input 
                  id="totalRelocating" 
                  type="number" 
                  min="1" 
                  max="10"
                  placeholder="e.g. 3" 
                  value={totalRelocating || ""}
                  onChange={(e) => setTotalRelocating(parseInt(e.target.value) || 0)}
                />
              </div>
            </div>

            {totalRelocating > 1 && (
              <div className="space-y-4 pt-2">
                <div className="flex items-center">
                  <Label className="text-base">Family Members</Label>
                  <HelpTooltip text={`Please provide details for the ${totalRelocating - 1} accompanying dependant(s).`} />
                </div>
                
                {Array.from({ length: totalRelocating - 1 }).map((_, idx) => (
                  <div key={idx} className="p-5 rounded-xl border border-dashed border-slate-300 bg-slate-50/50 space-y-4 animate-[fadeIn_0.3s_ease-out_forwards]">
                    <div className="flex gap-2 items-center text-slate-700 font-semibold mb-2">
                      <UserPlus className="h-4 w-4" /> Family Member {idx + 1}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-xs">First Name</Label>
                        <Input placeholder="First Name" />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs">Last Name</Label>
                        <Input placeholder="Last Name" />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs">Relationship</Label>
                        <Select>
                          <option value="">Select...</option>
                          <option>Spouse / Partner</option>
                          <option>Child</option>
                          <option>Dependant</option>
                        </Select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
