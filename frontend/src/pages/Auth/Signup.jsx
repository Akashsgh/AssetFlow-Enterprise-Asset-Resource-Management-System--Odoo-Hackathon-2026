import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Box, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const signupSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const Signup = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Account created successfully!');
      navigate('/login');
    } catch (error) {
      toast.error('Signup failed. Please try again.');
    }
  };

  return (
    <div className="flex min-h-screen bg-zinc-950 font-sans flex-row-reverse">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-rose-700 via-zinc-900 to-black items-center justify-center p-12">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 text-white max-w-lg"
        >
          <div className="w-16 h-16 bg-white/5 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-white/10 shadow-2xl">
            <User className="w-8 h-8 text-rose-400" />
          </div>
          <h1 className="text-5xl font-extrabold mb-6 leading-tight">Join the<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-200">Asset Revolution</span></h1>
          <p className="text-lg text-zinc-300 leading-relaxed">
            Create an account to track, manage, and optimize your organization's resources from a single, powerful dashboard.
          </p>
        </motion.div>
        
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
          className="absolute -top-20 -right-20 w-96 h-96 bg-rose-500/20 rounded-full blur-3xl"
        />
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-zinc-50 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden flex justify-center mb-8">
            <div className="w-12 h-12 bg-rose-600 rounded-xl flex items-center justify-center shadow-lg shadow-rose-200">
              <Box className="w-7 h-7 text-white" />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-zinc-900 mb-2">Create an account</h2>
          <p className="text-zinc-500 mb-8">Fill in your details below to get started.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-zinc-700 mb-2">Full Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors">
                  <User className="h-5 w-5 text-zinc-400 group-focus-within:text-rose-500 transition-colors" />
                </div>
                <input
                  type="text"
                  {...register('fullName')}
                  className={`w-full pl-11 pr-4 py-3 bg-white border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all shadow-sm hover:bg-zinc-50 ${errors.fullName ? 'border-red-500 bg-red-50/50' : ''}`}
                  placeholder="John Doe"
                />
              </div>
              {errors.fullName && <span className="text-xs font-medium text-red-500 mt-1.5 block">{errors.fullName.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-zinc-700 mb-2">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors">
                  <Mail className="h-5 w-5 text-zinc-400 group-focus-within:text-rose-500 transition-colors" />
                </div>
                <input
                  type="email"
                  {...register('email')}
                  className={`w-full pl-11 pr-4 py-3 bg-white border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all shadow-sm hover:bg-zinc-50 ${errors.email ? 'border-red-500 bg-red-50/50' : ''}`}
                  placeholder="name@company.com"
                />
              </div>
              {errors.email && <span className="text-xs font-medium text-red-500 mt-1.5 block">{errors.email.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-zinc-700 mb-2">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors">
                  <Lock className="h-5 w-5 text-zinc-400 group-focus-within:text-rose-500 transition-colors" />
                </div>
                <input
                  type="password"
                  {...register('password')}
                  className={`w-full pl-11 pr-4 py-3 bg-white border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all shadow-sm hover:bg-zinc-50 ${errors.password ? 'border-red-500 bg-red-50/50' : ''}`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && <span className="text-xs font-medium text-red-500 mt-1.5 block">{errors.password.message}</span>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg shadow-rose-200 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 disabled:opacity-50 transition-all duration-200 active:scale-[0.98] group mt-2"
            >
              {isSubmitting ? 'Creating account...' : 'Create Account'}
              {!isSubmitting && <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-zinc-600 font-medium">
            Already have an account?{' '}
            <Link to="/login" className="text-rose-600 hover:text-rose-700 transition-colors">
              Sign in instead
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
