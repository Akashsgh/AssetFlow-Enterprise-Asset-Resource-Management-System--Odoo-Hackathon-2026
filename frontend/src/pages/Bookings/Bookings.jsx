import { motion } from 'framer-motion';

const Bookings = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className=""
    >
      <h1 className="text-3xl font-bold text-zinc-900 mb-4">Bookings Module</h1>
      <div className="bg-white p-12 rounded-2xl border border-zinc-200 shadow-sm flex items-center justify-center text-zinc-500">
        <p>This module is under construction by the feature team.</p>
      </div>
    </motion.div>
  );
};

export default Bookings;
