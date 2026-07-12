import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Mail, Phone, Building2, UserPlus, 
  X, Laptop, Smartphone, Monitor, ChevronRight
} from 'lucide-react';
import toast from 'react-hot-toast';

const mockEmployees = [
  { id: 'EMP-001', name: 'Sarah Jenkins', role: 'Senior Developer', department: 'Engineering', email: 'sarah.j@assetflow.com', phone: '+1 555-0101', avatar: 'SJ', assets: [
    { id: 'AST-1001', name: 'MacBook Pro M3', type: 'Laptop' },
    { id: 'AST-1005', name: 'Sony A7IV Camera', type: 'Equipment' }
  ]},
  { id: 'EMP-002', name: 'Mike Ross', role: 'UX Designer', department: 'Design', email: 'mike.r@assetflow.com', phone: '+1 555-0102', avatar: 'MR', assets: [
    { id: 'AST-1004', name: 'Adobe Creative Cloud', type: 'Software' }
  ]},
  { id: 'EMP-003', name: 'John Doe', role: 'Operations Manager', department: 'Main Office', email: 'john.d@assetflow.com', phone: '+1 555-0103', avatar: 'JD', assets: [
    { id: 'AST-1003', name: 'Herman Miller Chair', type: 'Furniture' },
    { id: 'AST-1009', name: 'Dell UltraSharp 27"', type: 'Monitor' }
  ]},
  { id: 'EMP-004', name: 'Emily Chen', role: 'QA Engineer', department: 'Engineering', email: 'emily.c@assetflow.com', phone: '+1 555-0104', avatar: 'EC', assets: []},
  { id: 'EMP-005', name: 'David Smith', role: 'Backend Developer', department: 'Engineering', email: 'david.s@assetflow.com', phone: '+1 555-0105', avatar: 'DS', assets: [
    { id: 'AST-1010', name: 'ThinkPad X1 Carbon', type: 'Laptop' },
    { id: 'AST-1011', name: 'Logitech MX Master 3', type: 'Equipment' }
  ]},
  { id: 'EMP-006', name: 'Sophia Lee', role: 'Product Manager', department: 'Product', email: 'sophia.l@assetflow.com', phone: '+1 555-0106', avatar: 'SL', assets: [
    { id: 'AST-1012', name: 'MacBook Air M2', type: 'Laptop' }
  ]},
  { id: 'EMP-007', name: 'James Wilson', role: 'HR Director', department: 'Human Resources', email: 'james.w@assetflow.com', phone: '+1 555-0107', avatar: 'JW', assets: [
    { id: 'AST-1013', name: 'Dell XPS 15', type: 'Laptop' }
  ]},
  { id: 'EMP-008', name: 'Olivia Taylor', role: 'Marketing Lead', department: 'Marketing', email: 'olivia.t@assetflow.com', phone: '+1 555-0108', avatar: 'OT', assets: []},
  { id: 'EMP-009', name: 'Daniel Brown', role: 'Sales Executive', department: 'Sales', email: 'daniel.b@assetflow.com', phone: '+1 555-0109', avatar: 'DB', assets: [
    { id: 'AST-1014', name: 'iPad Pro', type: 'Equipment' }
  ]},
  { id: 'EMP-010', name: 'Mia Martinez', role: 'Frontend Developer', department: 'Engineering', email: 'mia.m@assetflow.com', phone: '+1 555-0110', avatar: 'MM', assets: [
    { id: 'AST-1015', name: 'MacBook Pro 14"', type: 'Laptop' }
  ]},
  { id: 'EMP-011', name: 'Ethan Anderson', role: 'Data Scientist', department: 'Data', email: 'ethan.a@assetflow.com', phone: '+1 555-0111', avatar: 'EA', assets: [
    { id: 'AST-1016', name: 'Dell Precision Tower', type: 'Equipment' },
    { id: 'AST-1017', name: 'LG 32" 4K Monitor', type: 'Monitor' }
  ]},
  { id: 'EMP-012', name: 'Ava Thomas', role: 'Graphic Designer', department: 'Design', email: 'ava.t@assetflow.com', phone: '+1 555-0112', avatar: 'AT', assets: [
    { id: 'AST-1018', name: 'Wacom Cintiq Pro', type: 'Equipment' }
  ]},
  { id: 'EMP-013', name: 'Liam Jackson', role: 'DevOps Engineer', department: 'Engineering', email: 'liam.j@assetflow.com', phone: '+1 555-0113', avatar: 'LJ', assets: []},
  { id: 'EMP-014', name: 'Isabella White', role: 'Financial Analyst', department: 'Finance', email: 'isabella.w@assetflow.com', phone: '+1 555-0114', avatar: 'IW', assets: [
    { id: 'AST-1019', name: 'Lenovo ThinkPad T14', type: 'Laptop' }
  ]},
  { id: 'EMP-015', name: 'Noah Harris', role: 'Customer Support Rep', department: 'Support', email: 'noah.h@assetflow.com', phone: '+1 555-0115', avatar: 'NH', assets: [
    { id: 'AST-1020', name: 'Jabra Evolve2 Headset', type: 'Equipment' }
  ]},
  { id: 'EMP-016', name: 'Charlotte Clark', role: 'Project Manager', department: 'Operations', email: 'charlotte.c@assetflow.com', phone: '+1 555-0116', avatar: 'CC', assets: [
    { id: 'AST-1021', name: 'Surface Pro 9', type: 'Laptop' }
  ]},
  { id: 'EMP-017', name: 'William Lewis', role: 'Security Analyst', department: 'IT', email: 'william.l@assetflow.com', phone: '+1 555-0117', avatar: 'WL', assets: []},
  { id: 'EMP-018', name: 'Amelia Robinson', role: 'Content Writer', department: 'Marketing', email: 'amelia.r@assetflow.com', phone: '+1 555-0118', avatar: 'AR', assets: [
    { id: 'AST-1022', name: 'MacBook Air M1', type: 'Laptop' }
  ]},
  { id: 'EMP-019', name: 'Benjamin Walker', role: 'System Administrator', department: 'IT', email: 'benjamin.w@assetflow.com', phone: '+1 555-0119', avatar: 'BW', assets: [
    { id: 'AST-1023', name: 'Server Rack Key', type: 'Equipment' },
    { id: 'AST-1024', name: 'ThinkPad P15', type: 'Laptop' }
  ]},
  { id: 'EMP-020', name: 'Harper Hall', role: 'Legal Counsel', department: 'Legal', email: 'harper.h@assetflow.com', phone: '+1 555-0120', avatar: 'HH', assets: [
    { id: 'AST-1025', name: 'Ergonomic Desk', type: 'Furniture' }
  ]}
];

const Directory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const filteredEmployees = mockEmployees.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRevoke = (assetName) => {
    toast.success(`Asset '${assetName}' revocation initiated.`);
  };

  const getAssetIcon = (type) => {
    switch(type) {
      case 'Laptop': return <Laptop className="w-4 h-4" />;
      case 'Monitor': return <Monitor className="w-4 h-4" />;
      case 'Software': return <Smartphone className="w-4 h-4" />;
      default: return <Building2 className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight">Employee Directory</h1>
          <p className="text-zinc-500 mt-1">Manage personnel and their allocated assets.</p>
        </div>
        <button 
          onClick={() => toast.success('Add Employee functionality will be integrated with HR module in next phase!')}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-emerald-200 transition-all active:scale-95 flex items-center justify-center w-full sm:w-auto"
        >
          <UserPlus className="w-5 h-5 mr-2" />
          Add Employee
        </button>
      </div>

      <div className="relative w-full max-w-lg mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search employees by name or department..."
          className="w-full pl-12 pr-4 py-3 bg-white border border-zinc-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all shadow-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredEmployees.map((emp, index) => (
          <motion.div
            key={emp.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => setSelectedEmployee(emp)}
            className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all cursor-pointer group flex flex-col items-center text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-2xl font-black mb-4 ring-4 ring-emerald-50">
              {emp.avatar}
            </div>
            <h3 className="text-lg font-extrabold text-zinc-900">{emp.name}</h3>
            <p className="text-sm font-medium text-emerald-600 mb-4">{emp.role}</p>
            
            <div className="w-full space-y-2 mb-6">
              <div className="flex items-center justify-center text-xs text-zinc-500 font-medium">
                <Building2 className="w-3.5 h-3.5 mr-1.5" /> {emp.department}
              </div>
              <div className="flex items-center justify-center text-xs text-zinc-500 font-medium">
                <Mail className="w-3.5 h-3.5 mr-1.5" /> {emp.email}
              </div>
            </div>

            <div className="mt-auto pt-4 w-full border-t border-zinc-100 flex items-center justify-between">
              <div className="flex items-center text-sm font-bold text-zinc-700">
                <span className="w-6 h-6 rounded bg-zinc-100 flex items-center justify-center mr-2 text-xs">
                  {emp.assets.length}
                </span>
                Assets
              </div>
              <ChevronRight className="w-5 h-5 text-zinc-400 group-hover:text-emerald-500 transition-colors" />
            </div>
          </motion.div>
        ))}
      </div>

      {filteredEmployees.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg font-bold text-zinc-900">No employees found</p>
          <p className="text-zinc-500">Adjust your search query.</p>
        </div>
      )}

      <AnimatePresence>
        {selectedEmployee && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm" onClick={() => setSelectedEmployee(null)}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-zinc-200"
            >
              <div className="px-6 py-5 border-b border-zinc-100 flex items-center justify-between bg-zinc-50">
                <h3 className="text-xl font-bold text-zinc-900">Employee Details</h3>
                <button onClick={() => setSelectedEmployee(null)} className="p-2 text-zinc-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-xl font-black mr-4">
                    {selectedEmployee.avatar}
                  </div>
                  <div>
                    <h2 className="text-xl font-extrabold text-zinc-900">{selectedEmployee.name}</h2>
                    <p className="text-sm font-medium text-zinc-500">{selectedEmployee.role} • {selectedEmployee.department}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center text-sm font-medium text-zinc-700 bg-zinc-50 px-4 py-2.5 rounded-xl">
                    <Mail className="w-4 h-4 mr-3 text-zinc-400" /> {selectedEmployee.email}
                  </div>
                  <div className="flex items-center text-sm font-medium text-zinc-700 bg-zinc-50 px-4 py-2.5 rounded-xl">
                    <Phone className="w-4 h-4 mr-3 text-zinc-400" /> {selectedEmployee.phone}
                  </div>
                </div>

                <h4 className="text-sm font-bold text-zinc-900 mb-3 flex items-center">
                  Allocated Assets ({selectedEmployee.assets.length})
                </h4>
                
                <div className="space-y-3">
                  {selectedEmployee.assets.length > 0 ? selectedEmployee.assets.map(asset => (
                    <div key={asset.id} className="flex items-center justify-between p-3 border border-zinc-200 rounded-xl hover:border-emerald-300 transition-colors">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded bg-zinc-100 flex items-center justify-center text-zinc-500 mr-3">
                          {getAssetIcon(asset.type)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-zinc-900">{asset.name}</p>
                          <p className="text-xs text-zinc-500">{asset.id}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleRevoke(asset.name)}
                        className="text-xs font-bold text-rose-600 hover:text-white hover:bg-rose-600 px-3 py-1.5 rounded-lg transition-colors border border-rose-200 hover:border-rose-600"
                      >
                        Revoke
                      </button>
                    </div>
                  )) : (
                    <div className="p-4 border border-dashed border-zinc-200 rounded-xl text-center text-zinc-500 text-sm font-medium">
                      No assets currently allocated.
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Directory;
