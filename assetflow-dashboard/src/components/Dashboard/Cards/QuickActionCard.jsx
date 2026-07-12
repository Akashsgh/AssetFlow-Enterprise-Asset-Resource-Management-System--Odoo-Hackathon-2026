import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function QuickActionCard({ icon: Icon, label, description, to, colorClass = 'bg-primary-50 text-primary-600 dark:bg-primary-950/40 dark:text-primary-400' }) {
  const navigate = useNavigate();

  return (
    <motion.button
      onClick={() => navigate(to)}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="focus-ring card-base p-4 text-left flex flex-col gap-3 hover:shadow-soft-lg transition-shadow"
    >
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClass}`}>
        <Icon size={18} />
      </div>
      <div>
        <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{label}</p>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{description}</p>
      </div>
    </motion.button>
  );
}
