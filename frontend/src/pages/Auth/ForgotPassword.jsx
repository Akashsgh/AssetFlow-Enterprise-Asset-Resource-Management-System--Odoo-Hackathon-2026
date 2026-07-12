import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Box, Mail, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Password reset link sent to your email!');
    } catch (error) {
      toast.error('Failed to send reset link.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 font-sans text-slate-900">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden"
      >
        <div className="p-8">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <Box className="w-7 h-7 text-white" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-center text-slate-800 mb-2">Reset your password</h2>
          <p className="text-center text-slate-500 mb-8 text-sm">Enter your email address and we'll send you a link to reset your password.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="email"
                  {...register('email')}
                  className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors ${errors.email ? 'border-red-500' : 'border-slate-200'}`}
                  placeholder="name@company.com"
                />
              </div>
              {errors.email && <span className="text-xs text-red-500 mt-1 block">{errors.email.message}</span>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 active:scale-[0.98]"
            >
              {isSubmitting ? 'Sending link...' : 'Send reset link'}
            </button>
          </form>

          <div className="mt-8 flex justify-center">
            <Link to="/login" className="flex items-center text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to log in
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
