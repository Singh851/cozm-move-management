import { useState } from "react";
import { Card, CardContent } from "../../../components/ui/Card";
import { Input } from "../../../components/ui/Input";
import { Label } from "../../../components/ui/Label";
import { Select } from "../../../components/ui/Select";
import { Button } from "../../../components/ui/Button";
import { Briefcase, Plus, X } from "lucide-react";
import { HelpTooltip } from "../../../components/ui/HelpTooltip";

export function Step3JobInfo() {
  const [poNumbers, setPoNumbers] = useState<string[]>([""]);

  const addPoNumber = () => setPoNumbers([...poNumbers, ""]);
  const removePoNumber = (index: number) => {
    if (poNumbers.length > 1) {
      setPoNumbers(poNumbers.filter((_, i) => i !== index));
    }
  };
  const updatePoNumber = (index: number, value: string) => {
    const newPo = [...poNumbers];
    newPo[index] = value;
    setPoNumbers(newPo);
  };

  return (
    <div className="space-y-8">
      <section>
        <div className="flex items-center gap-2 mb-6">
          <div className="h-8 w-8 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center">
            <Briefcase className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Assignment Specific Details</h2>
        </div>
        <Card>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center">
                  <Label>Employee ID</Label>
                  <HelpTooltip text="The assignee's unique HR system employee identifier." />
                </div>
                <Input placeholder="e.g. EMP-00234" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Label>Cost Centre</Label>
                  <HelpTooltip text="The cost centre code that assignment costs will be billed against." />
                </div>
                <Input placeholder="e.g. CC-4521" />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <div className="mb-4">
                <div className="flex items-center">
                  <Label>Purchase Order Number(s) <span className="text-red-500">*</span></Label>
                  <HelpTooltip text="The PO number required for invoicing assignment-related services." />
                </div>
              </div>
              <div className="space-y-3">
                {poNumbers.map((po, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Input 
                      placeholder="e.g. PO-2026-00142" 
                      value={po}
                      onChange={(e) => updatePoNumber(index, e.target.value)}
                    />
                    {poNumbers.length > 1 && (
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => removePoNumber(index)}
                        className="shrink-0 text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button 
                  variant="outline" 
                  onClick={addPoNumber} 
                  className="text-primary-600 border-primary-200 hover:bg-primary-50 w-full sm:w-auto mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Another PO Number
                </Button>
              </div>
            </div>

          </CardContent>
        </Card>
      </section>
    </div>
  );
}
