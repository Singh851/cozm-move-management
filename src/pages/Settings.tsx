import { useState } from "react";
import { Card, CardContent } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";
import { Button } from "../components/ui/Button";
import { Shield, UserPlus, Trash2, Settings2, Truck, CheckCircle2, Globe } from "lucide-react";
import { cn } from "../lib/utils";

type Role = "Super User" | "Admin" | "User";

interface AppUser {
  id: number;
  name: string;
  email: string;
  role: Role;
  entity: string;
}

const ROLE_STYLES: Record<Role, string> = {
  "Super User": "bg-primary-100 text-primary-700 border-primary-200",
  "Admin":      "bg-purple-100 text-purple-700 border-purple-200",
  "User":       "bg-green-100 text-green-700 border-green-200",
};

const PANEL_MOVERS = [
  { office: "Santa Fe Paris",    regions: "France, Benelux", approved: true },
  { office: "Santa Fe London",   regions: "UK, Ireland",     approved: true },
  { office: "Santa Fe Lisbon",   regions: "Portugal",        approved: true },
  { office: "Santa Fe Sydney",   regions: "ANZ",             approved: true },
  { office: "Santa Fe Hong Kong",regions: "APAC",            approved: true },
  { office: "Chess Moving Sydney",regions: "ANZ (alternate)",approved: true },
];

const CLIENT_CONFIG = [
  { label: "Client Name",          value: "BNP Paribas" },
  { label: "Client Code",          value: "BNPP" },
  { label: "Contract Ref",         value: "Amendment No.1 – Unity MM Module" },
  { label: "Billing Entity",       value: "Client (default)" },
  { label: "Quote Method",         value: "Weighted criteria (Price 40%, Preference 30%, Availability 20%, Service 10%)" },
  { label: "Min Quotes Required",  value: "2" },
  { label: "CSAT Trigger",         value: "5 days after delivery date entry" },
  { label: "SP Reminder Sequence", value: "1 week · 76 hrs · 48 hrs (MMC alert)" },
  { label: "Initiation Phases",    value: "D.1 – D.14 per Schedule A" },
];

let _nextId = 5;

export function Settings() {
  const [users, setUsers] = useState<AppUser[]>([
    { id: 1, name: "Sarah Clarke",  email: "s.clarke@unityglobal.com",  role: "Super User", entity: "All" },
    { id: 2, name: "Oliver Brown",  email: "o.brown@unityglobal.com",   role: "Admin",      entity: "BNP Paribas" },
    { id: 3, name: "Emma Wilson",   email: "e.wilson@unityglobal.com",  role: "Admin",      entity: "BNP Paribas" },
    { id: 4, name: "Laura Chen",    email: "l.chen@unityglobal.com",    role: "User",       entity: "BNP Paribas" },
  ]);

  const [newEmail, setNewEmail]   = useState("");
  const [newName,  setNewName]    = useState("");
  const [newRole,  setNewRole]    = useState<Role>("User");
  const [newEntity,setNewEntity]  = useState("BNP Paribas");
  const [addError, setAddError]   = useState("");

  const addUser = () => {
    if (!newEmail.trim() || !newName.trim()) {
      setAddError("Name and email are required.");
      return;
    }
    if (users.some(u => u.email.toLowerCase() === newEmail.toLowerCase())) {
      setAddError("A user with this email already exists.");
      return;
    }
    setUsers(prev => [...prev, { id: _nextId++, name: newName.trim(), email: newEmail.trim(), role: newRole, entity: newEntity }]);
    setNewEmail("");
    setNewName("");
    setNewRole("User");
    setAddError("");
  };

  const removeUser = (id: number) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto pb-12 space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-bold text-slate-900 tracking-tight">Settings</h1>
        <p className="text-slate-500 mt-1">Manage users, roles, client configuration and panel movers.</p>
      </div>

      {/* Role Legend */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-5 w-5 text-primary-600" />
            <h2 className="font-bold text-slate-900 text-lg">Role Permissions</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {(["Super User","Admin","User"] as Role[]).map(role => (
              <div key={role} className={cn("flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-semibold", ROLE_STYLES[role])}>
                <span className={cn("h-2 w-2 rounded-full", role === "Super User" ? "bg-primary-500" : role === "Admin" ? "bg-purple-500" : "bg-green-500")} />
                {role}
                <span className="font-normal opacity-70">
                  {role === "Super User" ? "— Full access + user management" : role === "Admin" ? "— Case management + reporting" : "— View + case actions only"}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* User Table */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-5">
            <UserPlus className="h-5 w-5 text-primary-600" />
            <h2 className="font-bold text-slate-900 text-lg">User Management</h2>
          </div>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 text-xs font-semibold text-slate-500 border border-slate-200">Name</th>
                  <th className="text-left p-3 text-xs font-semibold text-slate-500 border border-slate-200">Email</th>
                  <th className="text-left p-3 text-xs font-semibold text-slate-500 border border-slate-200">Role</th>
                  <th className="text-left p-3 text-xs font-semibold text-slate-500 border border-slate-200">Entity</th>
                  <th className="text-center p-3 text-xs font-semibold text-slate-500 border border-slate-200">Remove</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-3 border border-slate-200 font-medium text-slate-900">{u.name}</td>
                    <td className="p-3 border border-slate-200 text-slate-600 font-mono text-xs">{u.email}</td>
                    <td className="p-3 border border-slate-200">
                      <span className={cn("px-2 py-0.5 rounded-full text-xs font-bold border", ROLE_STYLES[u.role])}>
                        {u.role}
                      </span>
                    </td>
                    <td className="p-3 border border-slate-200 text-slate-600 text-xs">{u.entity}</td>
                    <td className="p-3 border border-slate-200 text-center">
                      <button
                        onClick={() => removeUser(u.id)}
                        className="text-slate-400 hover:text-red-500 transition-colors"
                        title="Remove user"
                      >
                        <Trash2 className="h-4 w-4 mx-auto" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add User Form */}
          <div className="border-t border-slate-100 pt-5">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Add User</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
              <div>
                <label className="text-xs font-semibold text-slate-500 block mb-1">Full Name</label>
                <Input
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  placeholder="e.g. Jane Smith"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 block mb-1">Email Address</label>
                <Input
                  type="email"
                  value={newEmail}
                  onChange={e => setNewEmail(e.target.value)}
                  placeholder="jane@unityglobal.com"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 block mb-1">Role</label>
                <Select value={newRole} onChange={e => setNewRole(e.target.value as Role)}>
                  <option>User</option>
                  <option>Admin</option>
                  <option>Super User</option>
                </Select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 block mb-1">Entity</label>
                <Select value={newEntity} onChange={e => setNewEntity(e.target.value)}>
                  <option>All</option>
                  <option>BNP Paribas</option>
                </Select>
              </div>
            </div>
            {addError && <p className="text-red-500 text-xs mb-2">{addError}</p>}
            <Button onClick={addUser} className="bg-primary-600 hover:bg-primary-700">
              <UserPlus className="h-4 w-4 mr-2" /> Add User
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Client Configuration */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-5">
            <Settings2 className="h-5 w-5 text-primary-600" />
            <h2 className="font-bold text-slate-900 text-lg">Client Configuration — BNP Paribas</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CLIENT_CONFIG.map(({ label, value }) => (
              <div key={label} className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                <p className="text-xs text-slate-400 mb-1">{label}</p>
                <p className="text-sm font-semibold text-slate-800">{value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Panel Movers */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-5">
            <Truck className="h-5 w-5 text-primary-600" />
            <h2 className="font-bold text-slate-900 text-lg">Approved Panel Movers</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 text-xs font-semibold text-slate-500 border border-slate-200">Office</th>
                  <th className="text-left p-3 text-xs font-semibold text-slate-500 border border-slate-200">Coverage Region</th>
                  <th className="text-center p-3 text-xs font-semibold text-slate-500 border border-slate-200">Status</th>
                </tr>
              </thead>
              <tbody>
                {PANEL_MOVERS.map(m => (
                  <tr key={m.office} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-3 border border-slate-200 font-medium text-slate-900">
                      <div className="flex items-center gap-2">
                        <Globe className="h-3.5 w-3.5 text-slate-400" /> {m.office}
                      </div>
                    </td>
                    <td className="p-3 border border-slate-200 text-slate-600 text-xs">{m.regions}</td>
                    <td className="p-3 border border-slate-200 text-center">
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="h-3 w-3" /> Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
