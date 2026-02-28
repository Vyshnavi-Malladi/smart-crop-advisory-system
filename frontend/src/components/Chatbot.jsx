import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Mic, Loader2, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import api from '../api';

// Fixed syntax error and added i18n
export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'bot', text: 'Namaste! I am AgriBot. How can I help you today?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const messagesEndRef = useRef(null);
    const { t } = useTranslation();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (manualInput = null) => {
        const userMsg = manualInput || input;
        if (!userMsg.trim()) return;

        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setInput('');
        setIsLoading(true);

        try {
            const { data } = await api.post('/chatbot/ask', { question: userMsg });
            const botResponse = data.answer || "I didn't get a clear response. Please try again.";

            setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
            setIsLoading(false);
            speak(botResponse);
        } catch (error) {
            console.error(error);
            const errorMsg = "Sorry, I'm having trouble connecting to the server.";
            setMessages(prev => [...prev, { role: 'bot', text: errorMsg }]);
            setIsLoading(false);
            speak(errorMsg);
        }
    };

    const recognitionRef = useRef(null);

    const toggleListening = () => {
        if (!('webkitSpeechRecognition' in window)) {
            alert("Speech recognition not supported in this browser.");
            return;
        }

        if (isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
            return;
        }

        const recognition = new window.webkitSpeechRecognition();
        recognition.continuous = true; // Allow continuous dictation until stop
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);

        recognition.onresult = (event) => {
            let transcription = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                transcription += event.results[i][0].transcript;
            }
            setInput(prev => {
                // Determine if we append or replace based on context (simple replace/append logic)
                return transcription;
            });
        };

        recognitionRef.current = recognition;
        recognition.start();
    };

    const speak = (text) => {
        if (!('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel(); // Stop previous
        const utterance = new SpeechSynthesisUtterance(text);
        // Try to select a female voice usually nicer
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(v => v.name.includes('Google US English') || v.name.includes('Samantha'));
        if (preferredVoice) utterance.voice = preferredVoice;

        window.speechSynthesis.speak(utterance);
    };

    // Stop speech when closed
    useEffect(() => {
        if (!isOpen) {
            window.speechSynthesis.cancel();
        }
    }, [isOpen]);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="bg-white rounded-2xl shadow-2xl w-80 md:w-96 mb-4 overflow-hidden border border-gray-100"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-primary to-primary-dark p-4 flex justify-between items-center text-white">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                    <MessageSquare size={16} />
                                </div>
                                <span className="font-bold">AgriBot</span>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded">
                                <X size={18} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="h-80 overflow-y-auto p-4 space-y-3 bg-gray-50">
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-primary text-white rounded-br-none' : 'bg-white text-gray-700 shadow-sm rounded-bl-none'
                                        }`}>
                                        {msg.text}
                                    </div>
                                    {msg.role === 'bot' && (
                                        <button
                                            onClick={() => speak(msg.text)}
                                            className="p-2 text-gray-400 hover:text-primary transition-colors bg-white rounded-full shadow-sm w-8 h-8 flex items-center justify-center"
                                        >
                                            <Volume2 size={14} />
                                        </button>
                                    )}
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm">
                                        <Loader2 size={16} className="animate-spin text-gray-400" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
                            <button
                                onClick={toggleListening}
                                className={`p-2 rounded-full transition-colors ${isListening ? 'bg-red-100 text-red-500 animate-pulse' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                            >
                                <Mic size={20} />
                            </button>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder={t('chat_placeholder')}
                                className="flex-1 bg-gray-100 rounded-full px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                            />
                            <button
                                onClick={() => handleSend()}
                                className="p-2 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors"
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 bg-gradient-to-r from-primary to-secondary rounded-full shadow-lg flex items-center justify-center text-white hover:scale-105 transition-transform"
            >
                {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
            </button>
        </div>
    );
}
