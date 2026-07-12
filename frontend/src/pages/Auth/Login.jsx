import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Box, Mail, Lock, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      login({ email: data.email, role: 'Admin' });
      toast.success('Login successful!');
      navigate('/');
    } catch (error) {
      toast.error('Login failed. Please try again.');
    }
  };

  return (
    <div className="flex min-h-screen bg-zinc-950 font-sans">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-emerald-800 via-zinc-900 to-black items-center justify-center p-12">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,100 C30,70 70,30 100,0 L100,100 Z" fill="url(#gradient)" />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 text-white max-w-lg"
        >
          <div className="w-16 h-16 bg-white/5 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-white/10 shadow-2xl">
            <Box className="w-8 h-8 text-emerald-400" />
          </div>
          <h1 className="text-5xl font-extrabold mb-6 leading-tight text-white">Master Your<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-amber-200">Enterprise Assets</span></h1>
          <p className="text-lg text-zinc-300 leading-relaxed">
            Experience the future of resource management. AssetFlow brings clarity, control, and intelligence to your organizational workflow.
          </p>
        </motion.div>
        
        <motion.div 
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl"
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
            <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200">
              <Box className="w-7 h-7 text-white" />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-zinc-900 mb-2">Welcome back</h2>
          <p className="text-zinc-500 mb-8">Enter your details to access your account.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-zinc-700 mb-2">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors group-focus-within:text-emerald-600">
                  <Mail className="h-5 w-5 text-zinc-400 group-focus-within:text-emerald-500 transition-colors" />
                </div>
                <input
                  type="email"
                  {...register('email')}
                  className={`w-full pl-11 pr-4 py-3 bg-white border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm hover:bg-zinc-50 ${errors.email ? 'border-red-500 bg-red-50/50' : ''}`}
                  placeholder="name@company.com"
                />
              </div>
              {errors.email && <span className="text-xs font-medium text-red-500 mt-1.5 block">{errors.email.message}</span>}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-zinc-700">Password</label>
                <Link to="/forgot-password" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors group-focus-within:text-emerald-600">
                  <Lock className="h-5 w-5 text-zinc-400 group-focus-within:text-emerald-500 transition-colors" />
                </div>
                <input
                  type="password"
                  {...register('password')}
                  className={`w-full pl-11 pr-4 py-3 bg-white border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm hover:bg-zinc-50 ${errors.password ? 'border-red-500 bg-red-50/50' : ''}`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && <span className="text-xs font-medium text-red-500 mt-1.5 block">{errors.password.message}</span>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg shadow-emerald-200 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 transition-all duration-200 active:scale-[0.98] group"
            >
              {isSubmitting ? 'Signing in...' : 'Sign In'}
              {!isSubmitting && <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-zinc-600 font-medium">
            Don't have an account?{' '}
            <Link to="/signup" className="text-emerald-600 hover:text-emerald-700 transition-colors">
              Sign up today
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
