import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Calendar as CalendarIcon, Plus, X, Search, Clock, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const initialBookings = [
  { id: 'BKG-001', asset: 'MacBook Pro M3', employee: 'Sarah Jenkins', startDate: '2024-03-01', endDate: '2024-06-01', status: 'Active' },
  { id: 'BKG-002', asset: 'Sony A7IV Camera', employee: 'Mike Ross', startDate: '2024-02-15', endDate: '2024-02-28', status: 'Overdue' },
  { id: 'BKG-003', asset: 'Dell UltraSharp 27"', employee: 'John Doe', startDate: '2023-11-10', endDate: '2024-01-10', status: 'Returned' },
];

const bookingSchema = z.object({
  asset: z.string().min(2, 'Please select an asset'),
  employee: z.string().min(2, 'Please select an employee'),
  startDate: z.string().min(2, 'Start date is required'),
  endDate: z.string().min(2, 'End date is required'),
}).refine(data => new Date(data.endDate) > new Date(data.startDate), {
  message: "End date must be after start date",
  path: ["endDate"]
});

const Bookings = () => {
  const [bookings, setBookings] = useState(initialBookings);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(bookingSchema),
  });

  const filteredBookings = bookings.filter(b => 
    b.asset.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onAddBooking = (data) => {
    const newBooking = {
      id: `BKG-${Math.floor(100 + Math.random() * 900)}`,
      ...data,
      status: 'Active'
    };
    setBookings([newBooking, ...bookings]);
    setIsModalOpen(false);
    reset();
    toast.success('Asset booked successfully!');
  };

  const markReturned = (id) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: 'Returned' } : b));
    toast.success('Asset marked as returned');
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Active': return <span className="flex items-center px-2.5 py-1 text-xs font-bold bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-full"><CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Active</span>;
      case 'Overdue': return <span className="flex items-center px-2.5 py-1 text-xs font-bold bg-rose-100 text-rose-700 border border-rose-200 rounded-full"><AlertCircle className="w-3.5 h-3.5 mr-1" /> Overdue</span>;
      case 'Returned': return <span className="flex items-center px-2.5 py-1 text-xs font-bold bg-zinc-100 text-zinc-600 border border-zinc-200 rounded-full"><RefreshCw className="w-3.5 h-3.5 mr-1" /> Returned</span>;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight">Bookings</h1>
          <p className="text-zinc-500 mt-1">Track asset allocations, return dates, and overdue items.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-emerald-200 transition-all active:scale-95 flex items-center justify-center w-full sm:w-auto"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Booking
        </button>
      </div>

      <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-zinc-200 bg-zinc-50">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search by asset, employee, or ID..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-zinc-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
            />
          </div>
        </div>

        <div className="divide-y divide-zinc-100">
          {filteredBookings.length > 0 ? filteredBookings.map((booking) => (
            <div key={booking.id} className="p-5 hover:bg-zinc-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center text-zinc-500 mr-4 flex-shrink-0">
                  <CalendarIcon className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center space-x-3 mb-1">
                    <h3 className="text-base font-bold text-zinc-900">{booking.asset}</h3>
                    {getStatusBadge(booking.status)}
                  </div>
                  <p className="text-sm text-zinc-600 font-medium">Assigned to: <span className="text-zinc-900">{booking.employee}</span> ({booking.id})</p>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-zinc-500 font-medium">
                    <div className="flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1" />
                      From: {format(new Date(booking.startDate), 'MMM dd, yyyy')}
                    </div>
                    <div className="flex items-center text-rose-600">
                      <Clock className="w-3.5 h-3.5 mr-1" />
                      Return by: {format(new Date(booking.endDate), 'MMM dd, yyyy')}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3 md:ml-auto">
                {booking.status !== 'Returned' && (
                  <button 
                    onClick={() => markReturned(booking.id)}
                    className="px-4 py-2 text-sm font-semibold text-zinc-600 bg-zinc-100 hover:bg-emerald-50 hover:text-emerald-700 border border-transparent hover:border-emerald-200 rounded-lg transition-all"
                  >
                    Mark Returned
                  </button>
                )}
                <button className="px-4 py-2 text-sm font-semibold text-zinc-600 hover:text-zinc-900 transition-colors">Details</button>
              </div>
            </div>
          )) : (
            <div className="p-12 text-center text-zinc-500">
              <p className="text-lg font-medium text-zinc-900">No bookings found</p>
              <p>Try a different search term or create a new booking.</p>
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
              <div className="px-6 py-5 border-b border-zinc-100 flex items-center justify-between bg-zinc-50">
                <h3 className="text-xl font-bold text-zinc-900">Allocate Asset</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 text-zinc-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit(onAddBooking)} className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Select Asset</label>
                  <select {...register('asset')} className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all">
                    <option value="">Select an asset...</option>
                    <option value="MacBook Pro M3">MacBook Pro M3 (AST-1001)</option>
                    <option value="Dell XPS 15">Dell XPS 15 (AST-1006)</option>
                    <option value="Sony A7IV Camera">Sony A7IV Camera (AST-1005)</option>
                  </select>
                  {errors.asset && <p className="text-xs text-red-500 mt-1.5">{errors.asset.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Assign To (Employee)</label>
                  <select {...register('employee')} className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all">
                    <option value="">Select employee...</option>
                    <option value="John Doe">John Doe</option>
                    <option value="Sarah Jenkins">Sarah Jenkins</option>
                    <option value="Mike Ross">Mike Ross</option>
                  </select>
                  {errors.employee && <p className="text-xs text-red-500 mt-1.5">{errors.employee.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Start Date</label>
                    <input type="date" {...register('startDate')} className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" />
                    {errors.startDate && <p className="text-xs text-red-500 mt-1.5">{errors.startDate.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Expected Return Date</label>
                    <input type="date" {...register('endDate')} className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" />
                    {errors.endDate && <p className="text-xs text-red-500 mt-1.5">{errors.endDate.message}</p>}
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-100 flex justify-end space-x-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-sm font-semibold text-zinc-600 hover:bg-zinc-100 rounded-xl transition-colors">Cancel</button>
                  <button type="submit" className="px-5 py-2.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md shadow-emerald-200 transition-all active:scale-95">Confirm Booking</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Bookings;
