import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Sprout, User, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import api from '../api';

export default function Signup() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/auth/register', formData);
            toast.success('Account created! Please login.');
            navigate('/login');
        } catch (err) {
            toast.error(err.response?.data?.msg || 'Signup failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-surface-light">
            {/* Form Side */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 relative order-2 lg:order-1">
                <div className="lg:hidden absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 -z-10"></div>

                <div className="w-full max-w-md glass-card border-none shadow-none lg:shadow-glass bg-white/50 lg:bg-white/80">
                    <div className="text-center mb-8">
                        <div className="inline-flex p-3 bg-secondary/10 rounded-2xl text-secondary mb-4">
                            <Sprout size={32} />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
                        <p className="text-gray-500 mt-2">Join the smart farming revolution today.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700 ml-1">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-3.5 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    required
                                    className="input-field pl-12"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                        </div>

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

                        <button type="submit" disabled={loading} className="w-full btn-primary flex items-center justify-center gap-2 py-3.5 mt-2 bg-gradient-to-r from-secondary to-secondary-dark">
                            {loading ? <Loader2 className="animate-spin" /> : <>Get Started <ArrowRight size={20} /></>}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm text-gray-500">
                        Already have an account? <Link to="/login" className="text-secondary font-semibold hover:underline">Sign In</Link>
                    </div>
                </div>
            </div>

            {/* Visual Side */}
            <div className="hidden lg:flex w-1/2 bg-secondary-dark relative overflow-hidden items-center justify-center p-12 order-1 lg:order-2">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1628352081506-83c43123ed6d?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
                <div className="relative z-10 text-white max-w-lg text-right">
                    <h1 className="text-5xl font-bold mb-6">Grow with <br /> <span className="text-primary-light">Confidence.</span></h1>
                    <p className="text-lg text-gray-200 leading-relaxed">Join thousands of farmers using SmartCrop to optimize their yield and protect their harvest.</p>
                </div>
            </div>
        </div>
    );
}
