// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { Sprout, User, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
// import api from '../api';

// export default function Signup() {
//     const [formData, setFormData] = useState({ name: '', email: '', password: '' });
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             await api.post('/auth/register', formData);
//             toast.success('Account created! Please login.');
//             navigate('/login');
//         } catch (err) {
//             toast.error(err.response?.data?.msg || 'Signup failed');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen flex bg-surface-light">
//             {/* Form Side */}
//             <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 relative order-2 lg:order-1">
//                 <div className="lg:hidden absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 -z-10"></div>

//                 <div className="w-full max-w-md glass-card border-none shadow-none lg:shadow-glass bg-white/50 lg:bg-white/80">
//                     <div className="text-center mb-8">
//                         <div className="inline-flex p-3 bg-secondary/10 rounded-2xl text-secondary mb-4">
//                             <Sprout size={32} />
//                         </div>
//                         <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
//                         <p className="text-gray-500 mt-2">Join the smart farming revolution today.</p>
//                     </div>

//                     <form onSubmit={handleSubmit} className="space-y-4">
//                         <div className="space-y-1">
//                             <label className="text-sm font-medium text-gray-700 ml-1">Full Name</label>
//                             <div className="relative">
//                                 <User className="absolute left-4 top-3.5 text-gray-400" size={20} />
//                                 <input
//                                     type="text"
//                                     required
//                                     className="input-field pl-12"
//                                     placeholder="John Doe"
//                                     value={formData.name}
//                                     onChange={e => setFormData({ ...formData, name: e.target.value })}
//                                 />
//                             </div>
//                         </div>

//                         <div className="space-y-1">
//                             <label className="text-sm font-medium text-gray-700 ml-1">Email Address</label>
//                             <div className="relative">
//                                 <Mail className="absolute left-4 top-3.5 text-gray-400" size={20} />
//                                 <input
//                                     type="email"
//                                     required
//                                     className="input-field pl-12"
//                                     placeholder="you@example.com"
//                                     value={formData.email}
//                                     onChange={e => setFormData({ ...formData, email: e.target.value })}
//                                 />
//                             </div>
//                         </div>

//                         <div className="space-y-1">
//                             <label className="text-sm font-medium text-gray-700 ml-1">Password</label>
//                             <div className="relative">
//                                 <Lock className="absolute left-4 top-3.5 text-gray-400" size={20} />
//                                 <input
//                                     type="password"
//                                     required
//                                     className="input-field pl-12"
//                                     placeholder="••••••••"
//                                     value={formData.password}
//                                     onChange={e => setFormData({ ...formData, password: e.target.value })}
//                                 />
//                             </div>
//                         </div>

//                         <button type="submit" disabled={loading} className="w-full btn-primary flex items-center justify-center gap-2 py-3.5 mt-2 bg-gradient-to-r from-secondary to-secondary-dark">
//                             {loading ? <Loader2 className="animate-spin" /> : <>Get Started <ArrowRight size={20} /></>}
//                         </button>
//                     </form>

//                     <div className="mt-8 text-center text-sm text-gray-500">
//                         Already have an account? <Link to="/login" className="text-secondary font-semibold hover:underline">Sign In</Link>
//                     </div>
//                 </div>
//             </div>

//             {/* Visual Side */}
//             <div className="hidden lg:flex w-1/2 bg-secondary-dark relative overflow-hidden items-center justify-center p-12 order-1 lg:order-2">
//                 <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1628352081506-83c43123ed6d?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
//                 <div className="relative z-10 text-white max-w-lg text-right">
//                     <h1 className="text-5xl font-bold mb-6">Grow with <br /> <span className="text-primary-light">Confidence.</span></h1>
//                     <p className="text-lg text-gray-200 leading-relaxed">Join thousands of farmers using SmartCrop to optimize their yield and protect their harvest.</p>
//                 </div>
//             </div>
//         </div>
//     );
// }
















import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Lock, ArrowRight, Loader2, Sprout, Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import api from "../api";
import farmerImage from "../assets/farmer.png";

export default function Signup() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await api.post("/auth/register", formData);
            toast.success("Account created! Please login.");
            navigate("/login");
        } catch (err) {
            toast.error(err.response?.data?.msg || "Signup failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-[#0b1f17]">
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
                style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0b1f17]/70 via-[#0b1f17]/95 to-[#0b1f17]" />

            <div className="relative z-10 flex h-screen flex-col">
                <header className="flex items-center justify-between px-6 py-4 lg:px-10">
                    <Link to="/" className="flex items-center gap-2.5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#a3e635]">
                            <Sprout className="h-4.5 w-4.5 text-[#0b1f17]" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white">FarmXpert</span>
                    </Link>
                    <Link to="/login">
                        <button className="h-9 rounded-lg border border-white/10 bg-white/5 px-4 text-sm font-medium text-white hover:bg-white/10">
                            Sign in
                        </button>
                    </Link>
                </header>

                <main className="flex flex-1 items-center justify-center px-6 py-5 lg:px-10">
                    <div className="grid w-full max-w-5xl grid-cols-1 items-center gap-8 lg:grid-cols-2">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="order-2 w-full max-w-sm justify-self-center lg:order-1 lg:justify-self-start"
                        >
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-7 shadow-2xl backdrop-blur-xl sm:p-9">
                                <div className="mb-6">
                                    <h2 className="text-2xl font-semibold tracking-tight text-white">
                                        Create Account
                                    </h2>
                                    <p className="mt-1.5 text-sm text-white/60">
                                        Join the smart farming revolution today.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="space-y-1.5">
                                        <label htmlFor="name" className="text-sm font-medium text-white">
                                            Full Name
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-white/40" />
                                            <input
                                                id="name"
                                                type="text"
                                                placeholder="John Doe"
                                                className="flex h-11 w-full rounded-lg border border-white/10 bg-white/5 px-3 pl-10 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#a3e635]"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label htmlFor="email" className="text-sm font-medium text-white">
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-white/40" />
                                            <input
                                                id="email"
                                                type="email"
                                                placeholder="farmer@example.com"
                                                className="flex h-11 w-full rounded-lg border border-white/10 bg-white/5 px-3 pl-10 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#a3e635]"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label htmlFor="password" className="text-sm font-medium text-white">
                                            Password
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-white/40" />
                                            <input
                                                id="password"
                                                type={showPassword ? "text" : "password"}
                                                placeholder="••••••••"
                                                className="flex h-11 w-full rounded-lg border border-white/10 bg-white/5 px-3 pl-10 pr-10 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#a3e635]"
                                                value={formData.password}
                                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                                            >
                                                {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#a3e635] px-4 text-sm font-medium text-[#0b1f17] hover:bg-[#bef264] focus:outline-none focus:ring-2 focus:ring-[#a3e635] disabled:opacity-50"
                                    >
                                        {loading ? (
                                            <Loader2 className="h-4.5 w-4.5 animate-spin" />
                                        ) : (
                                            <>
                                                Get Started <ArrowRight className="h-4.5 w-4.5" />
                                            </>
                                        )}
                                    </button>
                                </form>

                                <p className="mt-5 text-center text-sm text-white/60">
                                    Already have an account?{" "}
                                    <Link to="/login" className="font-medium text-[#a3e635] hover:underline">
                                        Sign In
                                    </Link>
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="order-1 hidden flex-col justify-center lg:order-2 lg:flex"
                        >
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a3e635]">
                                02 — Grow Together
                            </p>
                            <h1 className="mt-3 text-4xl font-semibold leading-[1.05] tracking-tight text-white">
                                Grow with <br />
                                <span className="bg-gradient-to-r from-[#bef264] to-[#a3e635] bg-clip-text text-transparent">
                                    confidence.
                                </span>
                            </h1>
                            <p className="mt-4 max-w-md text-base text-white/60">
                                Join thousands of farmers using FarmXpert to optimize their yield and
                                protect their harvest.
                            </p>
                            <div className="mt-5">
                                <img src={farmerImage} alt="Farmer" className="h-auto w-72 drop-shadow-2xl" />
                            </div>
                        </motion.div>
                    </div>
                </main>
            </div>
        </div>
    );
}