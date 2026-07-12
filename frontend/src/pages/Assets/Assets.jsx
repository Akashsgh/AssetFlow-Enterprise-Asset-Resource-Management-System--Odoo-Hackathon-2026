import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  useReactTable, getCoreRowModel, getFilteredRowModel, getPaginationRowModel,
  flexRender 
} from '@tanstack/react-table';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { QRCodeSVG } from 'qrcode.react';
import { Search, Plus, QrCode, X, ChevronLeft, ChevronRight, Box } from 'lucide-react';
import toast from 'react-hot-toast';

const initialData = [
  { id: 'AST-1001', name: 'MacBook Pro M3', category: 'Hardware', status: 'In Use', assignee: 'Sarah Jenkins', purchaseDate: '2024-01-15' },
  { id: 'AST-1002', name: 'Dell PowerEdge R740', category: 'Infrastructure', status: 'Maintenance', assignee: 'IT Operations', purchaseDate: '2023-08-22' },
  { id: 'AST-1003', name: 'Herman Miller Chair', category: 'Furniture', status: 'Available', assignee: 'Unassigned', purchaseDate: '2024-02-10' },
  { id: 'AST-1004', name: 'Adobe Creative Cloud', category: 'Software', status: 'In Use', assignee: 'Design Team', purchaseDate: '2024-01-01' },
  { id: 'AST-1005', name: 'Sony A7IV Camera', category: 'Hardware', status: 'Available', assignee: 'Unassigned', purchaseDate: '2023-11-05' },
];

const assetSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  category: z.string().min(2, 'Category is required'),
  status: z.string().min(2, 'Status is required'),
  purchaseDate: z.string().min(2, 'Date is required'),
});

const Assets = () => {
  const [data, setData] = useState(initialData);
  const [globalFilter, setGlobalFilter] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [qrModalData, setQrModalData] = useState(null);

  const columns = useMemo(() => [
    { header: 'Asset ID', accessorKey: 'id', cell: info => <span className="font-mono font-medium text-zinc-600">{info.getValue()}</span> },
    { header: 'Asset Name', accessorKey: 'name', cell: info => <span className="font-semibold text-zinc-900">{info.getValue()}</span> },
    { header: 'Category', accessorKey: 'category' },
    { 
      header: 'Status', 
      accessorKey: 'status',
      cell: info => {
        const status = info.getValue();
        const colors = {
          'Available': 'bg-emerald-100 text-emerald-700 border-emerald-200',
          'In Use': 'bg-blue-100 text-blue-700 border-blue-200',
          'Maintenance': 'bg-amber-100 text-amber-700 border-amber-200',
          'Retired': 'bg-rose-100 text-rose-700 border-rose-200'
        };
        return (
          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${colors[status] || 'bg-zinc-100 text-zinc-700 border-zinc-200'}`}>
            {status}
          </span>
        );
      }
    },
    { header: 'Assignee', accessorKey: 'assignee' },
    { 
      header: 'Actions', 
      id: 'actions',
      cell: info => (
        <button 
          onClick={() => setQrModalData(info.row.original)}
          className="p-2 text-zinc-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
          title="Generate QR Code"
        >
          <QrCode className="w-5 h-5" />
        </button>
      )
    },
  ], []);

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(assetSchema),
  });

  const onAddAsset = (formData) => {
    const newAsset = {
      id: `AST-${Math.floor(1000 + Math.random() * 9000)}`,
      ...formData,
      assignee: 'Unassigned',
    };
    setData([newAsset, ...data]);
    setIsAddModalOpen(false);
    reset();
    toast.success('Asset added successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight">Assets</h1>
          <p className="text-zinc-500 mt-1">Manage and track your organization's physical and digital resources.</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-emerald-200 transition-all active:scale-95 flex items-center justify-center w-full sm:w-auto"
        >
          <Plus className="w-5 h-5 mr-2" />
          Register Asset
        </button>
      </div>

      <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-zinc-200 bg-zinc-50 flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
            <input
              type="text"
              value={globalFilter ?? ''}
              onChange={e => setGlobalFilter(e.target.value)}
              placeholder="Search assets by name, ID, or assignee..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-zinc-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-zinc-50 text-zinc-500 font-semibold border-b border-zinc-200">
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id} className="px-6 py-4">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} className="hover:bg-zinc-50/50 transition-colors">
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-6 py-4 text-zinc-700">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
              {table.getRowModel().rows.length === 0 && (
                <tr>
                  <td colSpan={columns.length} className="px-6 py-12 text-center text-zinc-500">
                    <Box className="w-12 h-12 text-zinc-300 mx-auto mb-3" />
                    <p className="text-lg font-medium text-zinc-900">No assets found</p>
                    <p>Try adjusting your search query.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-zinc-200 bg-zinc-50 flex items-center justify-between">
          <span className="text-sm text-zinc-500 font-medium">
            Showing Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount() || 1}
          </span>
          <div className="flex space-x-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="p-2 border border-zinc-300 rounded-lg bg-white text-zinc-600 disabled:opacity-50 disabled:bg-zinc-50 hover:bg-zinc-100 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="p-2 border border-zinc-300 rounded-lg bg-white text-zinc-600 disabled:opacity-50 disabled:bg-zinc-50 hover:bg-zinc-100 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-zinc-200"
            >
              <div className="px-6 py-5 border-b border-zinc-100 flex items-center justify-between bg-zinc-50">
                <h3 className="text-xl font-bold text-zinc-900">Register New Asset</h3>
                <button onClick={() => setIsAddModalOpen(false)} className="p-2 text-zinc-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleSubmit(onAddAsset)} className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Asset Name</label>
                  <input {...register('name')} className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" placeholder="e.g. MacBook Pro M3" />
                  {errors.name && <p className="text-xs text-red-500 mt-1.5">{errors.name.message}</p>}
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Category</label>
                    <select {...register('category')} className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all">
                      <option value="">Select...</option>
                      <option value="Hardware">Hardware</option>
                      <option value="Software">Software</option>
                      <option value="Infrastructure">Infrastructure</option>
                      <option value="Furniture">Furniture</option>
                    </select>
                    {errors.category && <p className="text-xs text-red-500 mt-1.5">{errors.category.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Initial Status</label>
                    <select {...register('status')} className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all">
                      <option value="">Select...</option>
                      <option value="Available">Available</option>
                      <option value="In Use">In Use</option>
                      <option value="Maintenance">Maintenance</option>
                    </select>
                    {errors.status && <p className="text-xs text-red-500 mt-1.5">{errors.status.message}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Purchase Date</label>
                  <input type="date" {...register('purchaseDate')} className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" />
                  {errors.purchaseDate && <p className="text-xs text-red-500 mt-1.5">{errors.purchaseDate.message}</p>}
                </div>
                <div className="pt-4 border-t border-zinc-100 flex justify-end space-x-3">
                  <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-5 py-2.5 text-sm font-semibold text-zinc-600 hover:bg-zinc-100 rounded-xl transition-colors">Cancel</button>
                  <button type="submit" className="px-5 py-2.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md shadow-emerald-200 transition-all active:scale-95">Save Asset</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {qrModalData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm" onClick={() => setQrModalData(null)}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-sm flex flex-col items-center text-center border border-zinc-200"
            >
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 text-emerald-600">
                <QrCode className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-extrabold text-zinc-900">{qrModalData.id}</h3>
              <p className="text-zinc-500 mb-8 mt-1 font-medium">{qrModalData.name}</p>
              
              <div className="p-4 bg-white border-2 border-dashed border-zinc-200 rounded-2xl inline-block shadow-sm">
                <QRCodeSVG value={`assetflow://asset/${qrModalData.id}`} size={200} level="H" includeMargin={false} />
              </div>
              
              <p className="text-xs text-zinc-400 mt-8">Scan this code using the AssetFlow mobile app or scanner to view details or update status.</p>
              
              <button 
                onClick={() => setQrModalData(null)}
                className="mt-6 w-full py-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-xl font-bold transition-colors"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Assets;
