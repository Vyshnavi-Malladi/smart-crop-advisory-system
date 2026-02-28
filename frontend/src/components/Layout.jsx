import Navbar from './Navbar';
import Chatbot from './Chatbot';
import { motion } from 'framer-motion';

export default function Layout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50/50 pb-20">
            <Navbar />
            <main className="pt-24 px-4 md:px-8 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    {children}
                </motion.div>
            </main>
            <Chatbot />
        </div>
    );
}
