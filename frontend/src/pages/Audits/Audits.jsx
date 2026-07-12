import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ClipboardCheck, Search, Plus, X, Maximize, QrCode, 
  CheckCircle2, AlertCircle, ChevronRight, PlayCircle
} from 'lucide-react';
import toast from 'react-hot-toast';

const mockAudits = [
  { id: 'ADT-2024-001', department: 'IT Operations', inspector: 'Sarah Jenkins', date: 'Oct 12, 2024', status: 'Completed', accuracy: 98 },
  { id: 'ADT-2024-002', department: 'Design Team', inspector: 'Mike Ross', date: 'Oct 05, 2024', status: 'Completed', accuracy: 100 },
  { id: 'ADT-2024-003', department: 'Main Office', inspector: 'John Doe', date: 'Sep 28, 2024', status: 'Incomplete', accuracy: 85 },
];

const Audits = () => {
  const [audits, setAudits] = useState(mockAudits);
  const [isNewAuditModalOpen, setIsNewAuditModalOpen] = useState(false);
  const [activeAudit, setActiveAudit] = useState(null);
  const [scanProgress, setScanProgress] = useState(0);

  const startNewAudit = (e) => {
    e.preventDefault();
    const department = e.target.department.value;
    if (!department) return toast.error('Please select a department');
    
    setIsNewAuditModalOpen(false);
    setActiveAudit({
      id: `ADT-${Math.floor(2000 + Math.random() * 900)}`,
      department,
      totalExpected: 45,
      scanned: 0
    });
    setScanProgress(0);
    toast.success(`Audit started for ${department}`);
  };

  const simulateScan = () => {
    if (activeAudit.scanned < activeAudit.totalExpected) {
      const newScanned = activeAudit.scanned + 1;
      setActiveAudit({ ...activeAudit, scanned: newScanned });
      setScanProgress(Math.floor((newScanned / activeAudit.totalExpected) * 100));
      toast.success('Asset verified successfully!', { icon: '📸' });
    } else {
      toast.success('All assets verified!');
    }
  };

  const endAudit = () => {
    const newAuditRec = {
      id: activeAudit.id,
      department: activeAudit.department,
      inspector: 'Current User',
      date: 'Just now',
      status: scanProgress === 100 ? 'Completed' : 'Incomplete',
      accuracy: scanProgress
    };
    setAudits([newAuditRec, ...audits]);
    setActiveAudit(null);
    toast.success('Audit saved to history');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight">Audits & Inventory</h1>
          <p className="text-zinc-500 mt-1">Verify physical assets against database records.</p>
        </div>
        {!activeAudit && (
          <button 
            onClick={() => setIsNewAuditModalOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-emerald-200 transition-all active:scale-95 flex items-center justify-center w-full sm:w-auto"
          >
            <PlayCircle className="w-5 h-5 mr-2" />
            Start New Audit
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {activeAudit ? (
          <motion.div 
            key="active-audit"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white border-2 border-emerald-500 rounded-3xl p-8 shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-zinc-100">
              <motion.div 
                className="h-full bg-emerald-500"
                initial={{ width: 0 }}
                animate={{ width: `${scanProgress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold mb-4">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-2" />
                  Audit in Progress
                </div>
                <h2 className="text-3xl font-extrabold text-zinc-900">{activeAudit.department}</h2>
                <p className="text-zinc-500 font-medium mt-1">Audit ID: {activeAudit.id}</p>
                
                <div className="mt-8 flex items-center justify-center md:justify-start space-x-12">
                  <div>
                    <p className="text-sm font-bold text-zinc-500">Scanned / Expected</p>
                    <p className="text-4xl font-black text-zinc-900">{activeAudit.scanned} <span className="text-2xl text-zinc-300">/ {activeAudit.totalExpected}</span></p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-zinc-500">Match Rate</p>
                    <p className="text-4xl font-black text-emerald-600">{scanProgress}%</p>
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-auto flex flex-col items-center">
                <button 
                  onClick={simulateScan}
                  disabled={activeAudit.scanned >= activeAudit.totalExpected}
                  className="w-48 h-48 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white flex flex-col items-center justify-center shadow-2xl transition-transform active:scale-95 disabled:opacity-50 disabled:active:scale-100"
                >
                  <Maximize className="w-12 h-12 mb-3 text-emerald-400" />
                  <span className="font-bold text-lg">Scan QR Code</span>
                </button>
                
                <button 
                  onClick={endAudit}
                  className="mt-6 px-6 py-2.5 bg-rose-100 hover:bg-rose-200 text-rose-700 font-bold rounded-xl transition-colors"
                >
                  End Audit Session
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="audit-history"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden"
          >
            <div className="p-4 border-b border-zinc-200 bg-zinc-50 flex items-center justify-between">
              <h3 className="font-bold text-zinc-900 px-2">Past Audits</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search history..."
                  className="pl-9 pr-4 py-2 bg-white border border-zinc-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                />
              </div>
            </div>
            <div className="divide-y divide-zinc-100">
              {audits.map((audit) => (
                <div key={audit.id} className="p-5 hover:bg-zinc-50 transition-colors flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-500 mr-4">
                      <ClipboardCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-zinc-900">{audit.department}</h4>
                      <p className="text-sm text-zinc-500">By {audit.inspector} on {audit.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="text-right hidden sm:block">
                      <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Accuracy</p>
                      <p className={`font-bold ${audit.accuracy >= 95 ? 'text-emerald-600' : 'text-amber-600'}`}>{audit.accuracy}%</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center ${audit.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                      {audit.status === 'Completed' ? <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> : <AlertCircle className="w-3.5 h-3.5 mr-1" />}
                      {audit.status}
                    </div>
                    <button className="text-zinc-400 hover:text-zinc-900 transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isNewAuditModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-zinc-200"
            >
              <div className="px-6 py-5 border-b border-zinc-100 flex items-center justify-between bg-zinc-50">
                <h3 className="text-xl font-bold text-zinc-900">Start New Audit</h3>
                <button onClick={() => setIsNewAuditModalOpen(false)} className="p-2 text-zinc-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={startNewAudit} className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Target Department / Location</label>
                  <select name="department" className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all">
                    <option value="">Select location to audit...</option>
                    <option value="IT Operations">IT Operations</option>
                    <option value="Design Team">Design Team</option>
                    <option value="Main Office">Main Office</option>
                    <option value="Server Room A">Server Room A</option>
                  </select>
                </div>

                <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start">
                  <QrCode className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-800 font-medium">Starting an audit will lock the selected department's assets until the inventory scan is completed or manually aborted.</p>
                </div>

                <div className="pt-4 border-t border-zinc-100 flex justify-end space-x-3">
                  <button type="button" onClick={() => setIsNewAuditModalOpen(false)} className="px-5 py-2.5 text-sm font-semibold text-zinc-600 hover:bg-zinc-100 rounded-xl transition-colors">Cancel</button>
                  <button type="submit" className="px-5 py-2.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md shadow-emerald-200 transition-all active:scale-95">Initialize Audit</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Audits;
