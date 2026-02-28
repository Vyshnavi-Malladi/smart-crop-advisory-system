import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Sprout, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import Cookies from 'js-cookie';
import api from '../api';

export default function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await api.post('/auth/login', formData);
            Cookies.set('token', data.token);
            toast.success('Welcome back!');
            navigate('/dashboard');
        } catch (err) {
            toast.error(err.response?.data?.msg || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-surface-light">
            {/* Visual Side */}
            <div className="hidden lg:flex w-1/2 bg-primary-dark relative overflow-hidden items-center justify-center p-12">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1625246333195-58197ebd0031?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
                <div className="relative z-10 text-white max-w-lg">
                    <h1 className="text-5xl font-bold mb-6">Farming made <br /> <span className="text-secondary-light">Intelligent.</span></h1>
                    <p className="text-lg text-gray-200 leading-relaxed">Access real-time crop insights, disease detection, and yield forecasts powered by advanced AI algorithms.</p>
                </div>
                {/* Decoration */}
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary rounded-full blur-3xl opacity-20"></div>
            </div>

            {/* Form Side */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 relative">
                {/* Mobile bg decoration */}
                <div className="lg:hidden absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 -z-10"></div>

                <div className="w-full max-w-md glass-card border-none shadow-none lg:shadow-glass bg-white/50 lg:bg-white/80">
                    <div className="text-center mb-8">
                        <div className="inline-flex p-3 bg-primary/10 rounded-2xl text-primary mb-4">
                            <Sprout size={32} />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
                        <p className="text-gray-500 mt-2">Enter your credentials to access your farm dashboard.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700 ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-3.5 text-gray-400" size={20} />
                                <input
                                    type="email"
                                    required
                                    className="input-field pl-12"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700 ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-3.5 text-gray-400" size={20} />
                                <input
                                    type="password"
                                    required
                                    className="input-field pl-12"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                        </div>

                        <button type="submit" disabled={loading} className="w-full btn-primary flex items-center justify-center gap-2 py-3.5">
                            {loading ? <Loader2 className="animate-spin" /> : <>Sign In <ArrowRight size={20} /></>}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm text-gray-500">
                        Don't have an account? <Link to="/signup" className="text-primary font-semibold hover:underline">Create Account</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
