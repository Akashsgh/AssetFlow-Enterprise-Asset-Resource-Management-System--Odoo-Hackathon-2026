import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Box, Mail, ArrowLeft, Send } from 'lucide-react';
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
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 font-sans p-4 relative overflow-hidden">
      
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-900 via-zinc-950 to-black"></div>
      </div>
      
      <motion.div 
        animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        className="absolute top-1/4 -left-20 w-96 h-96 bg-amber-600/10 rounded-full blur-[100px] z-0"
      />
      <motion.div 
        animate={{ y: [0, 40, 0], x: [0, -30, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
        className="absolute bottom-1/4 -right-20 w-[30rem] h-[30rem] bg-orange-600/10 rounded-full blur-[120px] z-0"
      />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-lg bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-3xl shadow-2xl p-8 sm:p-10"
      >
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-amber-500/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-amber-500/20 shadow-lg">
            <Box className="w-8 h-8 text-amber-500" />
          </div>
        </div>
        
        <h2 className="text-3xl font-extrabold text-center text-white mb-3">Forgot Password?</h2>
        <p className="text-center text-zinc-400 mb-10 text-sm leading-relaxed px-4">
          No worries, we'll send you reset instructions. Enter the email address associated with your account.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-zinc-500 group-focus-within:text-amber-500 transition-colors" />
              </div>
              <input
                type="email"
                {...register('email')}
                className={`w-full pl-12 pr-4 py-3.5 bg-zinc-950/50 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all ${errors.email ? 'border-red-500/50' : ''}`}
                placeholder="name@company.com"
              />
            </div>
            {errors.email && <span className="text-xs font-medium text-red-400 mt-2 block pl-1">{errors.email.message}</span>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center py-3.5 px-4 rounded-xl shadow-lg shadow-amber-900/20 text-sm font-bold text-zinc-950 bg-amber-500 hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-950 focus:ring-amber-500 disabled:opacity-70 transition-all duration-200 active:scale-[0.98] group"
          >
            {isSubmitting ? 'Sending instructions...' : 'Reset Password'}
            {!isSubmitting && <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        <div className="mt-10 flex justify-center">
          <Link to="/login" className="flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-300 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to login
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
