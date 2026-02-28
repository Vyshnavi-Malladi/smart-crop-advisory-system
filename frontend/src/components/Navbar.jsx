import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, Sprout, LogOut, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { t, i18n } = useTranslation();
    const location = useLocation();
    const token = Cookies.get('token');

    const links = [
        { name: t('nav_dashboard'), path: '/dashboard' },
        { name: t('nav_crop'), path: '/crop-recommend' },
        { name: t('nav_yield'), path: '/yield-predict' },
        { name: t('nav_disease'), path: '/disease-detect' },
        { name: t('nav_store'), path: '/store' },
    ];

    const handleLogout = () => {
        Cookies.remove('token');
        window.location.href = '/login';
    };

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    if (!token) return null;

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass px-6 py-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link to="/dashboard" className="flex items-center gap-2 text-primary-dark hover:scale-105 transition-transform">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        <Sprout size={24} strokeWidth={2.5} />
                    </div>
                    <span className="text-xl font-bold tracking-tight">SmartCrop<span className="text-primary">.ai</span></span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {links.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === link.path ? 'text-primary' : 'text-gray-600'
                                }`}
                        >
                            {link.name}
                            {location.pathname === link.path && (
                                <motion.div
                                    layoutId="underline"
                                    className="h-1 w-full bg-primary rounded-full mt-1"
                                />
                            )}
                        </Link>
                    ))}
                </div>

                {/* Actions */}
                <div className="hidden md:flex items-center gap-4">
                    {/* Language Switcher */}
                    <div className="relative group">
                        <button className="p-2 text-gray-500 hover:text-primary transition-colors">
                            <Globe size={20} />
                        </button>
                        {/* Wrapper with padding top to bridge the gap */}
                        <div className="absolute right-0 top-full pt-2 w-32 hidden group-hover:block hover:block z-50">
                            <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                                <button onClick={() => changeLanguage('en')} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 text-gray-600 font-medium">English</button>
                                <button onClick={() => changeLanguage('hi')} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 text-gray-600 font-medium">Hindi</button>
                                <button onClick={() => changeLanguage('te')} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 text-gray-600 font-medium">Telugu</button>
                            </div>
                        </div>
                    </div>

                    <Link to="/store" className="p-2 text-gray-500 hover:text-primary hover:bg-white/50 rounded-full transition-all">
                        <ShoppingBag size={20} />
                    </Link>

                    <div className="h-6 w-px bg-gray-200"></div>

                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold text-xs shadow-md">
                            U
                        </div>
                        <button onClick={handleLogout} className="text-sm font-medium text-gray-600 hover:text-red-500 transition-colors flex items-center gap-1">
                            {t('logout')} <LogOut size={14} />
                        </button>
                    </div>
                </div>

                {/* Mobile Toggle */}
                <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-gray-600">
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 mt-2 rounded-2xl shadow-xl"
                    >
                        <div className="flex flex-col p-4 gap-2">
                            <div className="flex gap-2 mb-2 p-2 justify-center">
                                <button onClick={() => changeLanguage('en')} className="px-3 py-1 bg-gray-100 rounded-lg text-xs">En</button>
                                <button onClick={() => changeLanguage('hi')} className="px-3 py-1 bg-gray-100 rounded-lg text-xs">Hi</button>
                                <button onClick={() => changeLanguage('te')} className="px-3 py-1 bg-gray-100 rounded-lg text-xs">Te</button>
                            </div>
                            {links.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`p-3 rounded-xl text-sm font-medium ${location.pathname === link.path ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <hr className="my-2 border-gray-100" />
                            <button onClick={handleLogout} className="p-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 text-left flex items-center gap-2">
                                <LogOut size={16} /> {t('logout')}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
