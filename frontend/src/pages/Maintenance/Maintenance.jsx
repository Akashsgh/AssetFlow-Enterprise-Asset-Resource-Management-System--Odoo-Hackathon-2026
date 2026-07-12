import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Wrench, Plus, X, AlertTriangle, AlertCircle, CheckCircle2, ChevronRight, MessageSquare } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import toast from 'react-hot-toast';

const initialTickets = [
  { id: 'TKT-001', asset: 'Dell PowerEdge R740', issue: 'Overheating under load', priority: 'High', status: 'In Repair', reporter: 'System Alert', date: new Date(Date.now() - 86400000 * 2) },
  { id: 'TKT-002', asset: 'MacBook Pro M3', issue: 'Keyboard keys sticking', priority: 'Medium', status: 'Pending', reporter: 'Sarah Jenkins', date: new Date(Date.now() - 3600000 * 4) },
  { id: 'TKT-003', asset: 'Office Printer A', issue: 'Paper jam error persistently showing', priority: 'Low', status: 'Resolved', reporter: 'John Doe', date: new Date(Date.now() - 86400000 * 5) },
];

const ticketSchema = z.object({
  asset: z.string().min(2, 'Please select an asset'),
  issue: z.string().min(10, 'Please provide a detailed description of the issue'),
  priority: z.string().min(2, 'Please select a priority level'),
});

const Maintenance = () => {
  const [tickets, setTickets] = useState(initialTickets);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState('All');

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(ticketSchema),
  });

  const filteredTickets = tickets.filter(t => filter === 'All' ? true : t.status === filter);

  const onReportIssue = (data) => {
    const newTicket = {
      id: `TKT-${Math.floor(100 + Math.random() * 900)}`,
      ...data,
      status: 'Pending',
      reporter: 'Current User',
      date: new Date()
    };
    setTickets([newTicket, ...tickets]);
    setIsModalOpen(false);
    reset();
    toast.success('Issue reported successfully!');
  };

  const markResolved = (id) => {
    setTickets(tickets.map(t => t.id === id ? { ...t, status: 'Resolved' } : t));
    toast.success('Ticket marked as resolved');
  };

  const getPriorityBadge = (priority) => {
    switch(priority) {
      case 'High': return <span className="flex items-center px-2 py-0.5 text-xs font-bold bg-rose-100 text-rose-700 rounded"><AlertTriangle className="w-3 h-3 mr-1" /> High</span>;
      case 'Medium': return <span className="flex items-center px-2 py-0.5 text-xs font-bold bg-amber-100 text-amber-700 rounded"><AlertCircle className="w-3 h-3 mr-1" /> Medium</span>;
      case 'Low': return <span className="flex items-center px-2 py-0.5 text-xs font-bold bg-blue-100 text-blue-700 rounded"><CheckCircle2 className="w-3 h-3 mr-1" /> Low</span>;
      default: return null;
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Pending': return <span className="px-2.5 py-1 text-xs font-bold bg-amber-100 text-amber-700 border border-amber-200 rounded-full">Pending</span>;
      case 'In Repair': return <span className="px-2.5 py-1 text-xs font-bold bg-blue-100 text-blue-700 border border-blue-200 rounded-full">In Repair</span>;
      case 'Resolved': return <span className="px-2.5 py-1 text-xs font-bold bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-full">Resolved</span>;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight">Maintenance</h1>
          <p className="text-zinc-500 mt-1">Track repairs, report issues, and monitor asset health.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-emerald-200 transition-all active:scale-95 flex items-center justify-center w-full sm:w-auto"
        >
          <AlertTriangle className="w-5 h-5 mr-2" />
          Report Issue
        </button>
      </div>

      <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-zinc-200 bg-zinc-50 flex items-center space-x-2 overflow-x-auto">
          {['All', 'Pending', 'In Repair', 'Resolved'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-colors ${filter === status ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-100'}`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="divide-y divide-zinc-100">
          {filteredTickets.length > 0 ? filteredTickets.map((ticket) => (
            <div key={ticket.id} className="p-5 hover:bg-zinc-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start flex-1 min-w-0">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 ${ticket.status === 'Resolved' ? 'bg-emerald-100 text-emerald-600' : 'bg-zinc-100 text-zinc-500'}`}>
                  <Wrench className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-1">
                    <h3 className="text-base font-bold text-zinc-900 truncate">{ticket.asset}</h3>
                    {getStatusBadge(ticket.status)}
                    {getPriorityBadge(ticket.priority)}
                  </div>
                  <p className="text-sm text-zinc-600 font-medium truncate mb-2">{ticket.issue}</p>
                  <div className="flex items-center space-x-4 mt-1 text-xs text-zinc-500 font-medium">
                    <div className="flex items-center">
                      <MessageSquare className="w-3.5 h-3.5 mr-1" />
                      Reported by {ticket.reporter}
                    </div>
                    <div className="flex items-center">
                      • {formatDistanceToNow(ticket.date, { addSuffix: true })}
                    </div>
                    <div className="flex items-center">
                      • {ticket.id}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3 md:ml-4 flex-shrink-0 mt-4 md:mt-0">
                {ticket.status !== 'Resolved' && (
                  <button 
                    onClick={() => markResolved(ticket.id)}
                    className="px-4 py-2 text-sm font-semibold text-zinc-600 bg-zinc-100 hover:bg-emerald-50 hover:text-emerald-700 border border-transparent hover:border-emerald-200 rounded-lg transition-all"
                  >
                    Resolve Issue
                  </button>
                )}
                <button className="w-9 h-9 flex items-center justify-center text-zinc-400 hover:text-zinc-900 bg-zinc-100 hover:bg-zinc-200 rounded-lg transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )) : (
            <div className="p-12 text-center text-zinc-500">
              <div className="w-16 h-16 bg-zinc-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-zinc-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <p className="text-lg font-bold text-zinc-900">All clear!</p>
              <p className="mt-1 font-medium">No maintenance tickets found for this filter.</p>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-zinc-200"
            >
              <div className="px-6 py-5 border-b border-rose-100 flex items-center justify-between bg-rose-50/50">
                <div className="flex items-center text-rose-700">
                  <AlertTriangle className="w-6 h-6 mr-2" />
                  <h3 className="text-xl font-bold">Report an Issue</h3>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-2 text-zinc-400 hover:text-rose-500 hover:bg-rose-100 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit(onReportIssue)} className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Select Asset</label>
                  <select {...register('asset')} className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all">
                    <option value="">Select an asset...</option>
                    <option value="MacBook Pro M3">MacBook Pro M3 (AST-1001)</option>
                    <option value="Dell PowerEdge R740">Dell PowerEdge R740 (AST-1002)</option>
                    <option value="Office Printer A">Office Printer A (AST-1007)</option>
                  </select>
                  {errors.asset && <p className="text-xs text-red-500 mt-1.5">{errors.asset.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Priority Level</label>
                  <select {...register('priority')} className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all">
                    <option value="">Select priority...</option>
                    <option value="Low">Low (Can wait, non-critical)</option>
                    <option value="Medium">Medium (Affects work, needs repair soon)</option>
                    <option value="High">High (Critical failure, immediate action required)</option>
                  </select>
                  {errors.priority && <p className="text-xs text-red-500 mt-1.5">{errors.priority.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Issue Description</label>
                  <textarea 
                    {...register('issue')} 
                    rows="4" 
                    placeholder="Describe what is broken or what happened..."
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none" 
                  />
                  {errors.issue && <p className="text-xs text-red-500 mt-1.5">{errors.issue.message}</p>}
                </div>

                <div className="pt-4 border-t border-zinc-100 flex justify-end space-x-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-sm font-semibold text-zinc-600 hover:bg-zinc-100 rounded-xl transition-colors">Cancel</button>
                  <button type="submit" className="px-5 py-2.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md shadow-emerald-200 transition-all active:scale-95">Submit Ticket</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Maintenance;
