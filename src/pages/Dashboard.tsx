import { Card, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Truck, CheckCircle2, Clock, FileText, AlertCircle } from "lucide-react";

export function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-slate-900 tracking-tight">Move Management Dashboard</h1>
        <p className="text-slate-500 mt-1">Real-time overview of your global mobility programme.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <Card>
          <CardContent className="p-5 flex flex-col items-start gap-4">
            <div className="flex w-full justify-between items-start">
              <div className="p-2.5 bg-primary-100 text-primary-600 rounded-lg">
                <Truck className="h-5 w-5" />
              </div>
              <Badge variant="success" className="text-[10px]">↑ 6%</Badge>
            </div>
            <div>
              <div className="text-3xl font-display font-bold text-slate-900">38</div>
              <div className="text-sm font-medium text-slate-500 mt-1">Active Moves</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 flex flex-col items-start gap-4">
            <div className="flex w-full justify-between items-start">
              <div className="p-2.5 bg-green-100 text-green-600 rounded-lg">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <Badge variant="success" className="text-[10px]">↑ 3</Badge>
            </div>
            <div>
              <div className="text-3xl font-display font-bold text-slate-900">12</div>
              <div className="text-sm font-medium text-slate-500 mt-1">Completed This Month</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 flex flex-col items-start gap-4">
            <div className="flex w-full justify-between items-start">
              <div className="p-2.5 bg-primary-100 text-primary-600 rounded-lg">
                <Clock className="h-5 w-5" />
              </div>
              <Badge variant="success" className="text-[10px]">↑ 2%</Badge>
            </div>
            <div>
              <div className="text-3xl font-display font-bold text-slate-900">94%</div>
              <div className="text-sm font-medium text-slate-500 mt-1">On-Time Delivery</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 flex flex-col items-start gap-4">
            <div className="flex w-full justify-between items-start">
              <div className="p-2.5 bg-yellow-100 text-yellow-600 rounded-lg">
                <FileText className="h-5 w-5" />
              </div>
              <span className="text-xs text-slate-300 font-bold">—</span>
            </div>
            <div>
              <div className="text-3xl font-display font-bold text-slate-900">87%</div>
              <div className="text-sm font-medium text-slate-500 mt-1">Quote Timeliness</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 flex flex-col items-start gap-4">
            <div className="flex w-full justify-between items-start">
              <div className="p-2.5 bg-red-100 text-red-600 rounded-lg">
                <AlertCircle className="h-5 w-5" />
              </div>
              <Badge variant="destructive" className="text-[10px] bg-red-100 text-red-800">↓ 2</Badge>
            </div>
            <div>
              <div className="text-3xl font-display font-bold text-slate-900">5</div>
              <div className="text-sm font-medium text-slate-500 mt-1">Pending Approvals</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="h-96 flex flex-col items-center justify-center text-slate-400">
          <Truck className="h-12 w-12 text-slate-200 mb-4" />
          <p className="font-medium text-slate-500">Pipeline Chart View</p>
          <span className="text-sm text-slate-400">Implementation pending detailed data format</span>
        </Card>
        
        <Card className="h-96 flex flex-col items-center justify-center text-slate-400">
          <FileText className="h-12 w-12 text-slate-200 mb-4" />
          <p className="font-medium text-slate-500">Shipment Type Breakdown</p>
          <span className="text-sm text-slate-400">Implementation pending detailed data format</span>
        </Card>
      </div>
    </div>
  );
}
