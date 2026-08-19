// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { Sprout, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
// import Cookies from 'js-cookie';
// import api from '../api';

// export default function Login() {
//     const [formData, setFormData] = useState({ email: '', password: '' });
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             const { data } = await api.post('/auth/login', formData);

//             // ✅ FIXED: Persistent cookie (7 days)
//             Cookies.set('token', data.token, {
//                 expires: 7,
//                 sameSite: 'lax'
//             });

//             toast.success('Welcome back!');
//             navigate('/dashboard');

//         } catch (err) {
//             toast.error(err.response?.data?.msg || 'Login failed');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen flex bg-surface-light">
//             {/* Visual Side */}
//             <div className="hidden lg:flex w-1/2 bg-primary-dark relative overflow-hidden items-center justify-center p-12">
//                 <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1625246333195-58197ebd0031?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
//                 <div className="relative z-10 text-white max-w-lg">
//                     <h1 className="text-5xl font-bold mb-6">
//                         Farming made <br /> 
//                         <span className="text-secondary-light">Intelligent.</span>
//                     </h1>
//                     <p className="text-lg text-gray-200 leading-relaxed">
//                         Access real-time crop insights, disease detection, and yield forecasts powered by advanced AI algorithms.
//                     </p>
//                 </div>
//                 <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary rounded-full blur-3xl opacity-20"></div>
//             </div>

//             {/* Form Side */}
//             <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 relative">
//                 <div className="lg:hidden absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 -z-10"></div>

//                 <div className="w-full max-w-md glass-card border-none shadow-none lg:shadow-glass bg-white/50 lg:bg-white/80">
//                     <div className="text-center mb-8">
//                         <div className="inline-flex p-3 bg-primary/10 rounded-2xl text-primary mb-4">
//                             <Sprout size={32} />
//                         </div>
//                         <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
//                         <p className="text-gray-500 mt-2">
//                             Enter your credentials to access your farm dashboard.
//                         </p>
//                     </div>

//                     <form onSubmit={handleSubmit} className="space-y-5">
//                         <div className="space-y-1">
//                             <label className="text-sm font-medium text-gray-700 ml-1">
//                                 Email Address
//                             </label>
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
//                             <label className="text-sm font-medium text-gray-700 ml-1">
//                                 Password
//                             </label>
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

//                         <button
//                             type="submit"
//                             disabled={loading}
//                             className="w-full btn-primary flex items-center justify-center gap-2 py-3.5"
//                         >
//                             {loading ? (
//                                 <Loader2 className="animate-spin" />
//                             ) : (
//                                 <>
//                                     Sign In <ArrowRight size={20} />
//                                 </>
//                             )}
//                         </button>
//                     </form>

//                     <div className="mt-8 text-center text-sm text-gray-500">
//                         Don't have an account?{" "}
//                         <Link to="/signup" className="text-primary font-semibold hover:underline">
//                             Create Account
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }






// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { Sprout, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
// import Cookies from 'js-cookie';
// import api from '../api';

// export default function Login() {
//     const [formData, setFormData] = useState({ email: '', password: '' });
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             const { data } = await api.post('/auth/login', formData);

//             // ✅ Store token (7 days)
//             Cookies.set('token', data.token, {
//                 expires: 7,
//                 sameSite: 'lax'
//             });

//             // ✅ IMPORTANT: Store user (for role-based access)
//             Cookies.set('user', JSON.stringify(data.user), {
//                 expires: 7,
//                 sameSite: 'lax'
//             });

//             toast.success('Welcome back!');
//             navigate('/dashboard');

//         } catch (err) {
//             toast.error(err.response?.data?.msg || 'Login failed');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen flex bg-surface-light">
//             {/* Visual Side */}
//             <div className="hidden lg:flex w-1/2 bg-primary-dark relative overflow-hidden items-center justify-center p-12">
//                 <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1625246333195-58197ebd0031?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
//                 <div className="relative z-10 text-white max-w-lg">
//                     <h1 className="text-5xl font-bold mb-6">
//                         Farming made <br /> 
//                         <span className="text-secondary-light">Intelligent.</span>
//                     </h1>
//                     <p className="text-lg text-gray-200 leading-relaxed">
//                         Access real-time crop insights, disease detection, and yield forecasts powered by advanced AI algorithms.
//                     </p>
//                 </div>
//                 <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary rounded-full blur-3xl opacity-20"></div>
//             </div>

//             {/* Form Side */}
//             <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 relative">
//                 <div className="lg:hidden absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 -z-10"></div>

//                 <div className="w-full max-w-md glass-card border-none shadow-none lg:shadow-glass bg-white/50 lg:bg-white/80">
//                     <div className="text-center mb-8">
//                         <div className="inline-flex p-3 bg-primary/10 rounded-2xl text-primary mb-4">
//                             <Sprout size={32} />
//                         </div>
//                         <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
//                         <p className="text-gray-500 mt-2">
//                             Enter your credentials to access your farm dashboard.
//                         </p>
//                     </div>

//                     <form onSubmit={handleSubmit} className="space-y-5">
//                         <div className="space-y-1">
//                             <label className="text-sm font-medium text-gray-700 ml-1">
//                                 Email Address
//                             </label>
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
//                             <label className="text-sm font-medium text-gray-700 ml-1">
//                                 Password
//                             </label>
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

//                         <button
//                             type="submit"
//                             disabled={loading}
//                             className="w-full btn-primary flex items-center justify-center gap-2 py-3.5"
//                         >
//                             {loading ? (
//                                 <Loader2 className="animate-spin" />
//                             ) : (
//                                 <>
//                                     Sign In <ArrowRight size={20} />
//                                 </>
//                             )}
//                         </button>
//                     </form>

//                     <div className="mt-8 text-center text-sm text-gray-500">
//                         Don't have an account?{" "}
//                         <Link to="/signup" className="text-primary font-semibold hover:underline">
//                             Create Account
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }













// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { Sprout, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
// import Cookies from 'js-cookie';
// import api from '../api';

// export default function Login() {
//     const [formData, setFormData] = useState({ email: '', password: '' });
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);

//         try {
//             const { data } = await api.post('/auth/login', formData);

//             // ✅ Store token (7 days)
//             Cookies.set('token', data.token, {
//                 expires: 7,
//                 sameSite: 'lax'
//             });

//             // ✅ Store user (for role-based access)
//             Cookies.set('user', JSON.stringify(data.user), {
//                 expires: 7,
//                 sameSite: 'lax'
//             });

//             toast.success('Welcome back!');

//             // ✅ ROLE BASED REDIRECT
//             if (data.user.role === "admin") {
//                 navigate('/admin-dashboard');
//             } else {
//                 navigate('/dashboard');
//             }

//         } catch (err) {
//             toast.error(err.response?.data?.msg || 'Login failed');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen flex bg-surface-light">
//             {/* Visual Side */}
//             <div className="hidden lg:flex w-1/2 bg-primary-dark relative overflow-hidden items-center justify-center p-12">
//                 <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1625246333195-58197ebd0031?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
//                 <div className="relative z-10 text-white max-w-lg">
//                     <h1 className="text-5xl font-bold mb-6">
//                         Farming made <br /> 
//                         <span className="text-secondary-light">Intelligent.</span>
//                     </h1>
//                     <p className="text-lg text-gray-200 leading-relaxed">
//                         Access real-time crop insights, disease detection, and yield forecasts powered by advanced AI algorithms.
//                     </p>
//                 </div>
//                 <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary rounded-full blur-3xl opacity-20"></div>
//             </div>

//             {/* Form Side */}
//             <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 relative">
//                 <div className="lg:hidden absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 -z-10"></div>

//                 <div className="w-full max-w-md glass-card border-none shadow-none lg:shadow-glass bg-white/50 lg:bg-white/80">
//                     <div className="text-center mb-8">
//                         <div className="inline-flex p-3 bg-primary/10 rounded-2xl text-primary mb-4">
//                             <Sprout size={32} />
//                         </div>
//                         <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
//                         <p className="text-gray-500 mt-2">
//                             Enter your credentials to access your farm dashboard.
//                         </p>
//                     </div>

//                     <form onSubmit={handleSubmit} className="space-y-5">
//                         <div className="space-y-1">
//                             <label className="text-sm font-medium text-gray-700 ml-1">
//                                 Email Address
//                             </label>
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
//                             <label className="text-sm font-medium text-gray-700 ml-1">
//                                 Password
//                             </label>
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

//                         <button
//                             type="submit"
//                             disabled={loading}
//                             className="w-full btn-primary flex items-center justify-center gap-2 py-3.5"
//                         >
//                             {loading ? (
//                                 <Loader2 className="animate-spin" />
//                             ) : (
//                                 <>
//                                     Sign In <ArrowRight size={20} />
//                                 </>
//                             )}
//                         </button>
//                     </form>

//                     <div className="mt-8 text-center text-sm text-gray-500">
//                         Don't have an account?{" "}
//                         <Link to="/signup" className="text-primary font-semibold hover:underline">
//                             Create Account
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }










// import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { Sprout, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
// import Cookies from 'js-cookie';
// import api from '../api';

// export default function Login() {
//     const [formData, setFormData] = useState({ email: '', password: '' });
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     // ✅ Auto redirect if already logged in
//     useEffect(() => {
//         const token = Cookies.get("token");

//         if (token) {
//             const user = JSON.parse(Cookies.get("user") || "{}");

//             if (user.role === "admin") {
//                 navigate("/admin-dashboard");
//             } else {
//                 navigate("/dashboard");
//             }
//         }
//     }, [navigate]);

//     // const handleSubmit = async (e) => {
//     //     e.preventDefault();
//     //     setLoading(true);

//     //     try {
//     //         const { data } = await api.post('/auth/login', formData);

//     //         // ✅ Store token (7 days)
//     //         Cookies.set('token', data.token, {
//     //             expires: 7,
//     //             sameSite: 'lax'
//     //         });

//     //         // ✅ Store user (for role-based access)
//     //         Cookies.set('user', JSON.stringify(data.user), {
//     //             expires: 7,
//     //             sameSite: 'lax'
//     //         });

//     //         toast.success('Welcome back!');

//     //         // ✅ ROLE BASED REDIRECT
//     //         if (data.user.role === "admin") {
//     //             navigate('/admin-dashboard');
//     //         } else {
//     //             navigate('/dashboard');
//     //         }

//     //     } catch (err) {
//     //         toast.error(err.response?.data?.msg || 'Login failed');
//     //     } finally {
//     //         setLoading(false);
//     //     }
//     // };







//     const handleSubmit = async (e) => {

//     e.preventDefault();

//     setLoading(true);

//     try {

//         const { data } = await api.post("/auth/login", formData);

//         // Store Token
//         Cookies.set("token", data.token, {
//             expires: 7,
//             sameSite: "lax"
//         });

//         // Store User
//         Cookies.set("user", JSON.stringify(data.user), {
//             expires: 7,
//             sameSite: "lax"
//         });

//         toast.success("Welcome Back!");

//         // ===========================
//         // ADMIN LOGIN
//         // ===========================

//         if (data.user.role === "admin") {

//             navigate("/admin-dashboard");

//             return;

//         }

//         // ===========================
//         // CHECK FARMER PROFILE
//         // ===========================

//         try {

//             const profileRes = await api.get("/farmer/check", {
//                 headers: {
//                     Authorization: `Bearer ${data.token}`
//                 }
//             });
//             console.log(profileRes.data);

//             if (profileRes.data.exists && profileRes.data.isComplete) {
//     navigate("/dashboard");
// } else {
//     navigate("/farmer-profile");
// }

//         }

//         catch (err) {

//             console.error(err);

//             navigate("/farmer-profile");

//         }

//     }

//     catch (err) {

//         toast.error(

//             err.response?.data?.msg ||

//             "Login failed"

//         );

//     }

//     finally {

//         setLoading(false);

//     }

// };
//     return (
//         <div className="min-h-screen flex bg-surface-light">
//             {/* Visual Side */}
//             <div className="hidden lg:flex w-1/2 bg-primary-dark relative overflow-hidden items-center justify-center p-12">
//                 <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1625246333195-58197ebd0031?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
//                 <div className="relative z-10 text-white max-w-lg">
//                     <h1 className="text-5xl font-bold mb-6">
//                         Farming made <br /> 
//                         <span className="text-secondary-light">Intelligent.</span>
//                     </h1>
//                     <p className="text-lg text-gray-200 leading-relaxed">
//                         Access real-time crop insights, disease detection, and yield forecasts powered by advanced AI algorithms.
//                     </p>
//                 </div>
//                 <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary rounded-full blur-3xl opacity-20"></div>
//             </div>

//             {/* Form Side */}
//             <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 relative">
//                 <div className="lg:hidden absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 -z-10"></div>

//                 <div className="w-full max-w-md glass-card border-none shadow-none lg:shadow-glass bg-white/50 lg:bg-white/80">
//                     <div className="text-center mb-8">
//                         <div className="inline-flex p-3 bg-primary/10 rounded-2xl text-primary mb-4">
//                             <Sprout size={32} />
//                         </div>
//                         <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
//                         <p className="text-gray-500 mt-2">
//                             Enter your credentials to access your farm dashboard.
//                         </p>
//                     </div>

//                     <form onSubmit={handleSubmit} className="space-y-5">
//                         <div className="space-y-1">
//                             <label className="text-sm font-medium text-gray-700 ml-1">
//                                 Email Address
//                             </label>
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
//                             <label className="text-sm font-medium text-gray-700 ml-1">
//                                 Password
//                             </label>
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

//                         <button
//                             type="submit"
//                             disabled={loading}
//                             className="w-full btn-primary flex items-center justify-center gap-2 py-3.5"
//                         >
//                             {loading ? (
//                                 <Loader2 className="animate-spin" />
//                             ) : (
//                                 <>
//                                     Sign In <ArrowRight size={20} />
//                                 </>
//                             )}
//                         </button>
//                     </form>

//                     <div className="mt-8 text-center text-sm text-gray-500">
//                         Don't have an account?{" "}
//                         <Link to="/signup" className="text-primary font-semibold hover:underline">
//                             Create Account
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }























// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Mail, Lock, ArrowRight, Loader2, Sprout } from "lucide-react";
// import { toast } from "react-toastify";
// import Cookies from "js-cookie";
// import api from "../api";

// export default function Login() {
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(false);
//     const [formData, setFormData] = useState({
//         email: "",
//         password: ""
//     });

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);

//         try {
//             const { data } = await api.post("/auth/login", formData);

//             // Store Token
//             Cookies.set("token", data.token, {
//                 expires: 7,
//                 sameSite: "lax"
//             });

//             // Store User
//             Cookies.set("user", JSON.stringify(data.user), {
//                 expires: 7,
//                 sameSite: "lax"
//             });

//             toast.success("Welcome Back!");

//             // ===========================
//             // ADMIN LOGIN
//             // ===========================
//             if (data.user.role === "admin") {
//                 navigate("/admin-dashboard");
//                 return;
//             }

//             // ===========================
//             // ✅ CHECK FARMER PROFILE
//             // ===========================
//             try {
//                 const profileRes = await api.get("/farmer/check", {
//                     headers: {
//                         Authorization: `Bearer ${data.token}`
//                     }
//                 });
                
//                 console.log("Profile check response:", profileRes.data);

//                 // Check if profile exists and is complete
//                 if (profileRes.data.exists && profileRes.data.isComplete) {
//                     navigate("/dashboard");
//                 } else {
//                     // Profile doesn't exist or incomplete
//                     navigate("/farmer-profile");
//                 }
//             } catch (err) {
//                 console.error("Profile check error:", err);
//                 // On error, redirect to profile page to be safe
//                 navigate("/farmer-profile");
//             }
//         } catch (err) {
//             toast.error(
//                 err.response?.data?.msg ||
//                 "Login failed"
//             );
//         } finally {
//             setLoading(false);
//         }




//         // In Login.jsx - handleSubmit function
// try {
//     const profileRes = await api.get("/farmer/check", {
//         headers: {
//             Authorization: `Bearer ${data.token}`
//         }
//     });
    
//     console.log("Profile check response:", profileRes.data);

//     // ✅ If profile exists and is complete, go to dashboard
//     if (profileRes.data.exists && profileRes.data.isComplete) {
//         navigate("/dashboard");
//     } else {
//         // Profile doesn't exist or incomplete
//         navigate("/farmer-profile");
//     }
// } catch (err) {
//     console.error("Profile check error:", err);
//     navigate("/farmer-profile");
// }
//     };

//     return (
//         <div className="min-h-screen flex bg-surface-light">
//             {/* Visual Side */}
//             <div className="hidden lg:flex w-1/2 bg-primary-dark relative overflow-hidden items-center justify-center p-12">
//                 <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1625246333195-58197ebd0031?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
//                 <div className="relative z-10 text-white max-w-lg">
//                     <h1 className="text-5xl font-bold mb-6">
//                         Farming made <br /> 
//                         <span className="text-secondary-light">Intelligent.</span>
//                     </h1>
//                     <p className="text-lg text-gray-200 leading-relaxed">
//                         Access real-time crop insights, disease detection, and yield forecasts powered by advanced AI algorithms.
//                     </p>
//                 </div>
//                 <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary rounded-full blur-3xl opacity-20"></div>
//             </div>

//             {/* Form Side */}
//             <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 relative">
//                 <div className="lg:hidden absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 -z-10"></div>

//                 <div className="w-full max-w-md glass-card border-none shadow-none lg:shadow-glass bg-white/50 lg:bg-white/80">
//                     <div className="text-center mb-8">
//                         <div className="inline-flex p-3 bg-primary/10 rounded-2xl text-primary mb-4">
//                             <Sprout size={32} />
//                         </div>
//                         <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
//                         <p className="text-gray-500 mt-2">
//                             Enter your credentials to access your farm dashboard.
//                         </p>
//                     </div>

//                     <form onSubmit={handleSubmit} className="space-y-5">
//                         <div className="space-y-1">
//                             <label className="text-sm font-medium text-gray-700 ml-1">
//                                 Email Address
//                             </label>
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
//                             <label className="text-sm font-medium text-gray-700 ml-1">
//                                 Password
//                             </label>
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

//                         <button
//                             type="submit"
//                             disabled={loading}
//                             className="w-full btn-primary flex items-center justify-center gap-2 py-3.5"
//                         >
//                             {loading ? (
//                                 <Loader2 className="animate-spin" />
//                             ) : (
//                                 <>
//                                     Sign In <ArrowRight size={20} />
//                                 </>
//                             )}
//                         </button>
//                     </form>

//                     <div className="mt-8 text-center text-sm text-gray-500">
//                         Don't have an account?{" "}
//                         <Link to="/signup" className="text-primary font-semibold hover:underline">
//                             Create Account
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }













// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Mail, Lock, ArrowRight, Loader2, Sprout } from "lucide-react";
// import { toast } from "react-toastify";
// import Cookies from "js-cookie";
// import api from "../api";

// export default function Login() {
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(false);
//     const [formData, setFormData] = useState({
//         email: "",
//         password: ""
//     });

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);

//         try {
//             const { data } = await api.post("/auth/login", formData);

//             // Store Token
//             Cookies.set("token", data.token, {
//                 expires: 7,
//                 sameSite: "lax"
//             });

//             // Store User
//             Cookies.set("user", JSON.stringify(data.user), {
//                 expires: 7,
//                 sameSite: "lax"
//             });

//             toast.success("Welcome Back!");

//             // ===========================
//             // ADMIN LOGIN
//             // ===========================
//             if (data.user.role === "admin") {
//                 navigate("/admin-dashboard");
//                 return;
//             }

//             // ===========================
//             // ✅ CHECK FARMER PROFILE & REDIRECT
//             // ===========================
//             try {
//                 const profileRes = await api.get("/farmer/check", {
//                     headers: {
//                         Authorization: `Bearer ${data.token}`
//                     }
//                 });
                
//                 console.log("Profile check response:", profileRes.data);

//                 // ✅ If profile exists and is complete → Go to Dashboard
//                 if (profileRes.data.exists && profileRes.data.isComplete) {
//                     navigate("/dashboard");
//                     return;
//                 } 
//                 // ✅ If profile doesn't exist or incomplete → Go to Farmer Profile
//                 else {
//                     navigate("/farmer-profile");
//                     return;
//                 }
//             } catch (err) {
//                 console.error("Profile check error:", err);
//                 // On error, redirect to farmer-profile to be safe
//                 navigate("/farmer-profile");
//                 return;
//             }
//         } catch (err) {
//             toast.error(
//                 err.response?.data?.msg ||
//                 "Login failed"
//             );
//             setLoading(false);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen flex bg-surface-light">
//             {/* Visual Side */}
//             <div className="hidden lg:flex w-1/2 bg-primary-dark relative overflow-hidden items-center justify-center p-12">
//                 <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1625246333195-58197ebd0031?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
//                 <div className="relative z-10 text-white max-w-lg">
//                     <h1 className="text-5xl font-bold mb-6">
//                         Farming made <br /> 
//                         <span className="text-secondary-light">Intelligent.</span>
//                     </h1>
//                     <p className="text-lg text-gray-200 leading-relaxed">
//                         Access real-time crop insights, disease detection, and yield forecasts powered by advanced AI algorithms.
//                     </p>
//                 </div>
//                 <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary rounded-full blur-3xl opacity-20"></div>
//             </div>

//             {/* Form Side */}
//             <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 relative">
//                 <div className="lg:hidden absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 -z-10"></div>

//                 <div className="w-full max-w-md glass-card border-none shadow-none lg:shadow-glass bg-white/50 lg:bg-white/80">
//                     <div className="text-center mb-8">
//                         <div className="inline-flex p-3 bg-primary/10 rounded-2xl text-primary mb-4">
//                             <Sprout size={32} />
//                         </div>
//                         <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
//                         <p className="text-gray-500 mt-2">
//                             Enter your credentials to access your farm dashboard.
//                         </p>
//                     </div>

//                     <form onSubmit={handleSubmit} className="space-y-5">
//                         <div className="space-y-1">
//                             <label className="text-sm font-medium text-gray-700 ml-1">
//                                 Email Address
//                             </label>
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
//                             <label className="text-sm font-medium text-gray-700 ml-1">
//                                 Password
//                             </label>
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

//                         <button
//                             type="submit"
//                             disabled={loading}
//                             className="w-full btn-primary flex items-center justify-center gap-2 py-3.5"
//                         >
//                             {loading ? (
//                                 <Loader2 className="animate-spin" />
//                             ) : (
//                                 <>
//                                     Sign In <ArrowRight size={20} />
//                                 </>
//                             )}
//                         </button>
//                     </form>

//                     <div className="mt-8 text-center text-sm text-gray-500">
//                         Don't have an account?{" "}
//                         <Link to="/signup" className="text-primary font-semibold hover:underline">
//                             Create Account
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }













// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Mail, Lock, ArrowRight, Loader2, Sprout, Eye, EyeOff } from "lucide-react";
// import { toast } from "react-toastify";
// import Cookies from "js-cookie";
// import api from "../api";
// import farmerImage from "../assets/farmer.png";

// export default function Login() {
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(false);
//     const [showPassword, setShowPassword] = useState(false);
//     const [formData, setFormData] = useState({ email: "", password: "" });

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);

//         try {
//             const { data } = await api.post("/auth/login", formData);

//             Cookies.set("token", data.token, { expires: 7, sameSite: "lax" });
//             Cookies.set("user", JSON.stringify(data.user), { expires: 7, sameSite: "lax" });

//             toast.success("Welcome Back!");

//             if (data.user.role === "admin") {
//                 navigate("/admin-dashboard");
//                 return;
//             }

//             try {
//                 const profileRes = await api.get("/farmer/check", {
//                     headers: { Authorization: `Bearer ${data.token}` },
//                 });

//                 if (profileRes.data.exists && profileRes.data.isComplete) {
//                     navigate("/dashboard");
//                 } else {
//                     navigate("/farmer-profile");
//                 }
//             } catch (err) {
//                 navigate("/farmer-profile");
//             }
//         } catch (err) {
//             toast.error(err.response?.data?.msg || "Login failed");
//             setLoading(false);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="relative min-h-screen w-full overflow-hidden bg-[#0b1f17]">
//             <div
//                 className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
//                 style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
//             />
//             <div className="absolute inset-0 bg-gradient-to-r from-[#0b1f17] via-[#0b1f17]/95 to-[#0b1f17]/70" />

//             <div className="relative z-10 flex h-screen flex-col">
//                 <header className="flex items-center justify-between px-6 py-4 lg:px-10">
//                     <Link to="/" className="flex items-center gap-2.5">
//                         <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#a3e635]">
//                             <Sprout className="h-4.5 w-4.5 text-[#0b1f17]" />
//                         </div>
//                         <span className="text-xl font-bold tracking-tight text-white">FarmXpert</span>
//                     </Link>
//                     <Link to="/signup">
//                         <button className="h-9 rounded-lg border border-white/10 bg-white/5 px-4 text-sm font-medium text-white hover:bg-white/10">
//                             Create account
//                         </button>
//                     </Link>
//                 </header>

//                 <main className="flex flex-1 items-center justify-center px-6 py-5 lg:px-10">
//                     <div className="grid w-full max-w-5xl grid-cols-1 items-center gap-8 lg:grid-cols-2">
//                         <motion.div
//                             initial={{ opacity: 0, x: -30 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ duration: 0.6 }}
//                             className="hidden flex-col justify-center lg:flex"
//                         >
//                             <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a3e635]">
//                                 01 — Crop Intelligence
//                             </p>
//                             <h1 className="mt-3 text-4xl font-semibold leading-[1.05] tracking-tight text-white">
//                                 Smart farming, <br />
//                                 <span className="bg-gradient-to-r from-[#bef264] to-[#a3e635] bg-clip-text text-transparent">
//                                     richer harvest.
//                                 </span>
//                             </h1>
//                             <p className="mt-4 max-w-md text-base text-white/60">
//                                 Access real-time crop insights, disease detection, and yield forecasts
//                                 powered by advanced AI algorithms.
//                             </p>
//                             <div className="mt-5">
//                                 <img src={farmerImage} alt="Farmer" className="h-auto w-72 drop-shadow-2xl" />
//                             </div>
//                         </motion.div>

//                         <motion.div
//                             initial={{ opacity: 0, x: 30 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ duration: 0.6, delay: 0.1 }}
//                             className="w-full max-w-sm justify-self-center lg:justify-self-end"
//                         >
//                             <div className="rounded-2xl border border-white/10 bg-white/5 p-7 shadow-2xl backdrop-blur-xl sm:p-9">
//                                 <div className="mb-6">
//                                     <h2 className="text-2xl font-semibold tracking-tight text-white">Welcome back</h2>
//                                     <p className="mt-1.5 text-sm text-white/60">
//                                         Enter your credentials to access your farm dashboard.
//                                     </p>
//                                 </div>

//                                 <form onSubmit={handleSubmit} className="space-y-4">
//                                     <div className="space-y-1.5">
//                                         <label htmlFor="email" className="text-sm font-medium text-white">
//                                             Email Address
//                                         </label>
//                                         <div className="relative">
//                                             <Mail className="absolute left-3 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-white/40" />
//                                             <input
//                                                 id="email"
//                                                 type="email"
//                                                 placeholder="farmer@example.com"
//                                                 className="flex h-11 w-full rounded-lg border border-white/10 bg-white/5 px-3 pl-10 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#a3e635]"
//                                                 value={formData.email}
//                                                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                                             />
//                                         </div>
//                                     </div>

//                                     <div className="space-y-1.5">
//                                         <label htmlFor="password" className="text-sm font-medium text-white">
//                                             Password
//                                         </label>
//                                         <div className="relative">
//                                             <Lock className="absolute left-3 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-white/40" />
//                                             <input
//                                                 id="password"
//                                                 type={showPassword ? "text" : "password"}
//                                                 placeholder="••••••••"
//                                                 className="flex h-11 w-full rounded-lg border border-white/10 bg-white/5 px-3 pl-10 pr-10 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#a3e635]"
//                                                 value={formData.password}
//                                                 onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                                             />
//                                             <button
//                                                 type="button"
//                                                 onClick={() => setShowPassword(!showPassword)}
//                                                 className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
//                                             >
//                                                 {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
//                                             </button>
//                                         </div>
//                                     </div>

//                                     <button
//                                         type="submit"
//                                         disabled={loading}
//                                         className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#a3e635] px-4 text-sm font-medium text-[#0b1f17] hover:bg-[#bef264] focus:outline-none focus:ring-2 focus:ring-[#a3e635] disabled:opacity-50"
//                                     >
//                                         {loading ? (
//                                             <Loader2 className="h-4.5 w-4.5 animate-spin" />
//                                         ) : (
//                                             <>
//                                                 Sign In <ArrowRight className="h-4.5 w-4.5" />
//                                             </>
//                                         )}
//                                     </button>
//                                 </form>

//                                 <p className="mt-5 text-center text-sm text-white/60">
//                                     Don't have an account?{" "}
//                                     <Link to="/signup" className="font-medium text-[#a3e635] hover:underline">
//                                         Create Account
//                                     </Link>
//                                 </p>
//                             </div>
//                         </motion.div>
//                     </div>
//                 </main>
//             </div>
//         </div>
//     );
// }























import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    Mail,
    Lock,
    ArrowRight,
    Loader2,
    Sprout,
    Eye,
    EyeOff
} from "lucide-react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import api from "../api";
import farmerImage from "../assets/farmer.png";

export default function Login() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    /* =====================================================
       HANDLE LOGIN
    ===================================================== */

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            toast.error("Please enter your email and password.");
            return;
        }

        setLoading(true);

        try {
            /* =================================================
               LOGIN REQUEST
            ================================================= */

            const { data } = await api.post(
                "/auth/login",
                formData
            );

            /* =================================================
               SAVE TOKEN
            ================================================= */

            Cookies.set(
                "token",
                data.token,
                {
                    expires: 7,
                    sameSite: "lax"
                }
            );

            /* =================================================
               SAVE USER
            ================================================= */

            Cookies.set(
                "user",
                JSON.stringify(data.user),
                {
                    expires: 7,
                    sameSite: "lax"
                }
            );

            toast.success("Welcome Back!");

            /* =================================================
               ADMIN
            ================================================= */

            if (data.user.role === "admin") {
                navigate("/admin-dashboard");
                return;
            }

            /* =================================================
               PROFILE STATUS

               IMPORTANT:
               This value comes directly from MongoDB.

               true  -> Dashboard
               false -> Farmer Profile
            ================================================= */

            if (data.user.hasCompletedProfile === true) {
                navigate("/dashboard");
                return;
            }

            /* =================================================
               FIRST-TIME USER / PROFILE NOT COMPLETED
            ================================================= */

            navigate("/farmer-profile");

        } catch (err) {
            console.error("Login error:", err);

            toast.error(
                err.response?.data?.msg ||
                err.response?.data?.message ||
                "Login failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    /* =====================================================
       HANDLE INPUT
    ===================================================== */

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));
    };

    /* =====================================================
       UI
    ===================================================== */

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-[#0b1f17]">

            {/* =================================================
               BACKGROUND IMAGE
            ================================================= */}

            <div
                className="
                    absolute
                    inset-0
                    bg-cover
                    bg-center
                    bg-no-repeat
                    opacity-30
                "
                style={{
                    backgroundImage:
                        "url('/images/hero-bg.jpg')"
                }}
            />

            {/* =================================================
               DARK OVERLAY
            ================================================= */}

            <div
                className="
                    absolute
                    inset-0
                    bg-gradient-to-r
                    from-[#0b1f17]
                    via-[#0b1f17]/95
                    to-[#0b1f17]/70
                "
            />

            {/* =================================================
               MAIN CONTENT
            ================================================= */}

            <div
                className="
                    relative
                    z-10
                    flex
                    h-screen
                    flex-col
                "
            >

                {/* =================================================
                   HEADER
                ================================================= */}

                <header
                    className="
                        flex
                        items-center
                        justify-between
                        px-6
                        py-4
                        lg:px-10
                    "
                >

                    {/* BRAND */}

                    <Link
                        to="/"
                        className="
                            flex
                            items-center
                            gap-2.5
                            no-underline
                        "
                    >

                        <div
                            className="
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-full
                                bg-[#a3e635]
                            "
                        >
                            <Sprout
                                className="
                                    h-5
                                    w-5
                                    text-[#0b1f17]
                                "
                            />
                        </div>

                        <span
                            className="
                                text-xl
                                font-bold
                                tracking-tight
                                text-white
                            "
                        >
                            FarmXpert
                        </span>

                    </Link>

                    {/* CREATE ACCOUNT */}

                    <Link
                        to="/signup"
                        className="no-underline"
                    >
                        <button
                            type="button"
                            className="
                                h-9
                                rounded-lg
                                border
                                border-white/10
                                bg-white/5
                                px-4
                                text-sm
                                font-medium
                                text-white
                                transition
                                hover:bg-white/10
                            "
                        >
                            Create account
                        </button>
                    </Link>

                </header>

                {/* =================================================
                   MAIN
                ================================================= */}

                <main
                    className="
                        flex
                        flex-1
                        items-center
                        justify-center
                        px-6
                        py-5
                        lg:px-10
                    "
                >

                    <div
                        className="
                            grid
                            w-full
                            max-w-5xl
                            grid-cols-1
                            items-center
                            gap-8
                            lg:grid-cols-2
                        "
                    >

                        {/* =================================================
                           LEFT SIDE
                        ================================================= */}

                        <motion.div
                            initial={{
                                opacity: 0,
                                x: -30
                            }}
                            animate={{
                                opacity: 1,
                                x: 0
                            }}
                            transition={{
                                duration: 0.6
                            }}
                            className="
                                hidden
                                flex-col
                                justify-center
                                lg:flex
                            "
                        >

                            <p
                                className="
                                    text-xs
                                    font-semibold
                                    uppercase
                                    tracking-[0.2em]
                                    text-[#a3e635]
                                "
                            >
                                01 — Crop Intelligence
                            </p>

                            <h1
                                className="
                                    mt-3
                                    text-4xl
                                    font-semibold
                                    leading-[1.05]
                                    tracking-tight
                                    text-white
                                "
                            >
                                Smart farming,
                                <br />

                                <span
                                    className="
                                        bg-gradient-to-r
                                        from-[#bef264]
                                        to-[#a3e635]
                                        bg-clip-text
                                        text-transparent
                                    "
                                >
                                    richer harvest.
                                </span>
                            </h1>

                            <p
                                className="
                                    mt-4
                                    max-w-md
                                    text-base
                                    text-white/60
                                "
                            >
                                Access real-time crop insights,
                                disease detection, and yield
                                forecasts powered by advanced
                                AI algorithms.
                            </p>

                            <div className="mt-5">
                                <img
                                    src={farmerImage}
                                    alt="Farmer"
                                    className="
                                        h-auto
                                        w-72
                                        drop-shadow-2xl
                                    "
                                />
                            </div>

                        </motion.div>

                        {/* =================================================
                           LOGIN CARD
                        ================================================= */}

                        <motion.div
                            initial={{
                                opacity: 0,
                                x: 30
                            }}
                            animate={{
                                opacity: 1,
                                x: 0
                            }}
                            transition={{
                                duration: 0.6,
                                delay: 0.1
                            }}
                            className="
                                w-full
                                max-w-sm
                                justify-self-center
                                lg:justify-self-end
                            "
                        >

                            <div
                                className="
                                    rounded-2xl
                                    border
                                    border-white/10
                                    bg-white/5
                                    p-7
                                    shadow-2xl
                                    backdrop-blur-xl
                                    sm:p-9
                                "
                            >

                                {/* LOGIN HEADER */}

                                <div className="mb-6">

                                    <h2
                                        className="
                                            text-2xl
                                            font-semibold
                                            tracking-tight
                                            text-white
                                        "
                                    >
                                        Welcome back
                                    </h2>

                                    <p
                                        className="
                                            mt-1.5
                                            text-sm
                                            text-white/60
                                        "
                                    >
                                        Enter your credentials
                                        to access your farm
                                        dashboard.
                                    </p>

                                </div>

                                {/* LOGIN FORM */}

                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-4"
                                >

                                    {/* EMAIL */}

                                    <div className="space-y-1.5">

                                        <label
                                            htmlFor="email"
                                            className="
                                                text-sm
                                                font-medium
                                                text-white
                                            "
                                        >
                                            Email Address
                                        </label>

                                        <div className="relative">

                                            <Mail
                                                className="
                                                    absolute
                                                    left-3
                                                    top-1/2
                                                    h-[18px]
                                                    w-[18px]
                                                    -translate-y-1/2
                                                    text-white/40
                                                "
                                            />

                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                autoComplete="email"
                                                placeholder="farmer@example.com"
                                                className="
                                                    flex
                                                    h-11
                                                    w-full
                                                    rounded-lg
                                                    border
                                                    border-white/10
                                                    bg-white/5
                                                    px-3
                                                    pl-10
                                                    text-sm
                                                    text-white
                                                    placeholder:text-white/40
                                                    focus:outline-none
                                                    focus:ring-2
                                                    focus:ring-[#a3e635]
                                                "
                                                value={formData.email}
                                                onChange={handleChange}
                                            />

                                        </div>

                                    </div>

                                    {/* PASSWORD */}

                                    <div className="space-y-1.5">

                                        <label
                                            htmlFor="password"
                                            className="
                                                text-sm
                                                font-medium
                                                text-white
                                            "
                                        >
                                            Password
                                        </label>

                                        <div className="relative">

                                            <Lock
                                                className="
                                                    absolute
                                                    left-3
                                                    top-1/2
                                                    h-[18px]
                                                    w-[18px]
                                                    -translate-y-1/2
                                                    text-white/40
                                                "
                                            />

                                            <input
                                                id="password"
                                                name="password"
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                autoComplete="current-password"
                                                placeholder="••••••••"
                                                className="
                                                    flex
                                                    h-11
                                                    w-full
                                                    rounded-lg
                                                    border
                                                    border-white/10
                                                    bg-white/5
                                                    px-3
                                                    pl-10
                                                    pr-10
                                                    text-sm
                                                    text-white
                                                    placeholder:text-white/40
                                                    focus:outline-none
                                                    focus:ring-2
                                                    focus:ring-[#a3e635]
                                                "
                                                value={formData.password}
                                                onChange={handleChange}
                                            />

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowPassword(
                                                        (previous) =>
                                                            !previous
                                                    )
                                                }
                                                aria-label={
                                                    showPassword
                                                        ? "Hide password"
                                                        : "Show password"
                                                }
                                                className="
                                                    absolute
                                                    right-3
                                                    top-1/2
                                                    -translate-y-1/2
                                                    text-white/40
                                                    transition
                                                    hover:text-white
                                                "
                                            >
                                                {showPassword ? (
                                                    <EyeOff
                                                        className="
                                                            h-[18px]
                                                            w-[18px]
                                                        "
                                                    />
                                                ) : (
                                                    <Eye
                                                        className="
                                                            h-[18px]
                                                            w-[18px]
                                                        "
                                                    />
                                                )}
                                            </button>

                                        </div>

                                    </div>

                                    {/* SIGN IN BUTTON */}

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="
                                            inline-flex
                                            h-11
                                            w-full
                                            items-center
                                            justify-center
                                            gap-2
                                            rounded-lg
                                            bg-[#a3e635]
                                            px-4
                                            text-sm
                                            font-medium
                                            text-[#0b1f17]
                                            transition
                                            hover:bg-[#bef264]
                                            focus:outline-none
                                            focus:ring-2
                                            focus:ring-[#a3e635]
                                            disabled:cursor-not-allowed
                                            disabled:opacity-50
                                        "
                                    >

                                        {loading ? (
                                            <>
                                                <Loader2
                                                    className="
                                                        h-[18px]
                                                        w-[18px]
                                                        animate-spin
                                                    "
                                                />
                                                Signing in...
                                            </>
                                        ) : (
                                            <>
                                                Sign In

                                                <ArrowRight
                                                    className="
                                                        h-[18px]
                                                        w-[18px]
                                                    "
                                                />
                                            </>
                                        )}

                                    </button>

                                </form>

                                {/* SIGNUP LINK */}

                                <p
                                    className="
                                        mt-5
                                        text-center
                                        text-sm
                                        text-white/60
                                    "
                                >
                                    Don't have an account?{" "}

                                    <Link
                                        to="/signup"
                                        className="
                                            font-medium
                                            text-[#a3e635]
                                            hover:underline
                                        "
                                    >
                                        Create Account
                                    </Link>

                                </p>

                            </div>

                        </motion.div>

                    </div>

                </main>

            </div>

        </div>
    );
}