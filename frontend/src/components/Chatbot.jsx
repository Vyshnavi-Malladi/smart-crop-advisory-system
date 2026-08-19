// import { useState, useRef, useEffect } from 'react';
// import { MessageSquare, Send, X, Mic, Loader2, Volume2 } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useTranslation } from 'react-i18next';
// import api from '../api';

// // Fixed syntax error and added i18n
// export default function Chatbot() {
//     const [isOpen, setIsOpen] = useState(false);
//     const [messages, setMessages] = useState([
//         { role: 'bot', text: 'Namaste! I am AgriBot. How can I help you today?' }
//     ]);
//     const [input, setInput] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const [isListening, setIsListening] = useState(false);
//     const messagesEndRef = useRef(null);
//     const { t } = useTranslation();

//     const scrollToBottom = () => {
//         messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     };

//     useEffect(() => {
//         scrollToBottom();
//     }, [messages]);

//     const handleSend = async (manualInput = null) => {
//         const userMsg = manualInput || input;
//         if (!userMsg.trim()) return;

//         setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
//         setInput('');
//         setIsLoading(true);

//         try {
//             const { data } = await api.post('/chatbot/ask', { question: userMsg });
//             const botResponse = data.answer || "I didn't get a clear response. Please try again.";

//             setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
//             setIsLoading(false);
//             speak(botResponse);
//         } catch (error) {
//             console.error(error);
//             const errorMsg = "Sorry, I'm having trouble connecting to the server.";
//             setMessages(prev => [...prev, { role: 'bot', text: errorMsg }]);
//             setIsLoading(false);
//             speak(errorMsg);
//         }
//     };

//     const recognitionRef = useRef(null);

//     const toggleListening = () => {
//         if (!('webkitSpeechRecognition' in window)) {
//             alert("Speech recognition not supported in this browser.");
//             return;
//         }

//         if (isListening) {
//             recognitionRef.current.stop();
//             setIsListening(false);
//             return;
//         }

//         const recognition = new window.webkitSpeechRecognition();
//         recognition.continuous = true; // Allow continuous dictation until stop
//         recognition.interimResults = true;
//         recognition.lang = 'en-US';

//         recognition.onstart = () => setIsListening(true);
//         recognition.onend = () => setIsListening(false);

//         recognition.onresult = (event) => {
//             let transcription = '';
//             for (let i = event.resultIndex; i < event.results.length; i++) {
//                 transcription += event.results[i][0].transcript;
//             }
//             setInput(prev => {
//                 // Determine if we append or replace based on context (simple replace/append logic)
//                 return transcription;
//             });
//         };

//         recognitionRef.current = recognition;
//         recognition.start();
//     };

//     const speak = (text) => {
//         if (!('speechSynthesis' in window)) return;
//         window.speechSynthesis.cancel(); // Stop previous
//         const utterance = new SpeechSynthesisUtterance(text);
//         // Try to select a female voice usually nicer
//         const voices = window.speechSynthesis.getVoices();
//         const preferredVoice = voices.find(v => v.name.includes('Google US English') || v.name.includes('Samantha'));
//         if (preferredVoice) utterance.voice = preferredVoice;

//         window.speechSynthesis.speak(utterance);
//     };

//     // Stop speech when closed
//     useEffect(() => {
//         if (!isOpen) {
//             window.speechSynthesis.cancel();
//         }
//     }, [isOpen]);

//     return (
//         <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
//             <AnimatePresence>
//                 {isOpen && (
//                     <motion.div
//                         initial={{ opacity: 0, scale: 0.9, y: 20 }}
//                         animate={{ opacity: 1, scale: 1, y: 0 }}
//                         exit={{ opacity: 0, scale: 0.9, y: 20 }}
//                         className="bg-white rounded-2xl shadow-2xl w-80 md:w-96 mb-4 overflow-hidden border border-gray-100"
//                     >
//                         {/* Header */}
//                         <div className="bg-gradient-to-r from-primary to-primary-dark p-4 flex justify-between items-center text-white">
//                             <div className="flex items-center gap-2">
//                                 <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
//                                     <MessageSquare size={16} />
//                                 </div>
//                                 <span className="font-bold">AgriBot</span>
//                             </div>
//                             <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded">
//                                 <X size={18} />
//                             </button>
//                         </div>

//                         {/* Messages */}
//                         <div className="h-80 overflow-y-auto p-4 space-y-3 bg-gray-50">
//                             {messages.map((msg, idx) => (
//                                 <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
//                                     <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-primary text-white rounded-br-none' : 'bg-white text-gray-700 shadow-sm rounded-bl-none'
//                                         }`}>
//                                         {msg.text}
//                                     </div>
//                                     {msg.role === 'bot' && (
//                                         <button
//                                             onClick={() => speak(msg.text)}
//                                             className="p-2 text-gray-400 hover:text-primary transition-colors bg-white rounded-full shadow-sm w-8 h-8 flex items-center justify-center"
//                                         >
//                                             <Volume2 size={14} />
//                                         </button>
//                                     )}
//                                 </div>
//                             ))}
//                             {isLoading && (
//                                 <div className="flex justify-start">
//                                     <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm">
//                                         <Loader2 size={16} className="animate-spin text-gray-400" />
//                                     </div>
//                                 </div>
//                             )}
//                             <div ref={messagesEndRef} />
//                         </div>

//                         {/* Input */}
//                         <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
//                             <button
//                                 onClick={toggleListening}
//                                 className={`p-2 rounded-full transition-colors ${isListening ? 'bg-red-100 text-red-500 animate-pulse' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
//                             >
//                                 <Mic size={20} />
//                             </button>
//                             <input
//                                 type="text"
//                                 value={input}
//                                 onChange={(e) => setInput(e.target.value)}
//                                 onKeyPress={(e) => e.key === 'Enter' && handleSend()}
//                                 placeholder={t('chat_placeholder')}
//                                 className="flex-1 bg-gray-100 rounded-full px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
//                             />
//                             <button
//                                 onClick={() => handleSend()}
//                                 className="p-2 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors"
//                             >
//                                 <Send size={18} />
//                             </button>
//                         </div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>

//             <button
//                 onClick={() => setIsOpen(!isOpen)}
//                 className="w-14 h-14 bg-gradient-to-r from-primary to-secondary rounded-full shadow-lg flex items-center justify-center text-white hover:scale-105 transition-transform"
//             >
//                 {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
//             </button>
//         </div>
//     );
// }






// import { useState, useRef, useEffect } from 'react';
// import { MessageSquare, Send, X, Mic, Loader2, Volume2 } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useTranslation } from 'react-i18next';
// import api from '../api';

// export default function Chatbot() {

//     const { t, i18n } = useTranslation(); // initialize first

//     const [isOpen, setIsOpen] = useState(false);

//     const [messages, setMessages] = useState([]);

//     const [input, setInput] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const [isListening, setIsListening] = useState(false);

//     const messagesEndRef = useRef(null);
//     const recognitionRef = useRef(null);

//     // Set welcome message when language changes
//     useEffect(() => {
//         setMessages([
//             { role: 'bot', text: t('chat_welcome') }
//         ]);
//     }, [i18n.language]);

//     const scrollToBottom = () => {
//         messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     };

//     useEffect(() => {
//         scrollToBottom();
//     }, [messages]);

//     const handleSend = async (manualInput = null) => {

//         const userMsg = manualInput || input;

//         if (!userMsg.trim()) return;

//         setMessages(prev => [...prev, { role: 'user', text: userMsg }]);

//         setInput('');
//         setIsLoading(true);

//         try {

//             const { data } = await api.post('/chatbot/ask', {
//                 question: userMsg,
//                 language: i18n.language
//             });

//             const botResponse =
//                 data.answer || "I didn't get a clear response. Please try again.";

//             setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);

//             setIsLoading(false);

//             speak(botResponse);

//         } catch (error) {

//             console.error(error);

//             const errorMsg = "Sorry, I'm having trouble connecting to the server.";

//             setMessages(prev => [...prev, { role: 'bot', text: errorMsg }]);

//             setIsLoading(false);

//             speak(errorMsg);
//         }
//     };

//     const toggleListening = () => {

//         if (!('webkitSpeechRecognition' in window)) {
//             alert("Speech recognition not supported in this browser.");
//             return;
//         }

//         if (isListening) {
//             recognitionRef.current.stop();
//             setIsListening(false);
//             return;
//         }

//         const recognition = new window.webkitSpeechRecognition();

//         recognition.continuous = true;
//         recognition.interimResults = true;
//         recognition.lang = 'en-US';

//         recognition.onstart = () => setIsListening(true);
//         recognition.onend = () => setIsListening(false);

//         recognition.onresult = (event) => {

//             let transcription = '';

//             for (let i = event.resultIndex; i < event.results.length; i++) {
//                 transcription += event.results[i][0].transcript;
//             }

//             setInput(transcription);
//         };

//         recognitionRef.current = recognition;

//         recognition.start();
//     };

//     const speak = (text) => {

//         if (!('speechSynthesis' in window)) return;

//         window.speechSynthesis.cancel();

//         const utterance = new SpeechSynthesisUtterance(text);

//         const voices = window.speechSynthesis.getVoices();

//         const preferredVoice = voices.find(
//             v => v.name.includes('Google US English') || v.name.includes('Samantha')
//         );

//         if (preferredVoice) utterance.voice = preferredVoice;

//         window.speechSynthesis.speak(utterance);
//     };

//     useEffect(() => {
//         if (!isOpen) {
//             window.speechSynthesis.cancel();
//         }
//     }, [isOpen]);

//     return (
//         <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">

//             <AnimatePresence>

//                 {isOpen && (

//                     <motion.div
//                         initial={{ opacity: 0, scale: 0.9, y: 20 }}
//                         animate={{ opacity: 1, scale: 1, y: 0 }}
//                         exit={{ opacity: 0, scale: 0.9, y: 20 }}
//                         className="bg-white rounded-2xl shadow-2xl w-80 md:w-96 mb-4 overflow-hidden border border-gray-100"
//                     >

//                         {/* Header */}

//                         <div className="bg-gradient-to-r from-primary to-primary-dark p-4 flex justify-between items-center text-white">

//                             <div className="flex items-center gap-2">

//                                 <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
//                                     <MessageSquare size={16} />
//                                 </div>

//                                 <span className="font-bold">AgriBot</span>

//                             </div>

//                             <button
//                                 onClick={() => setIsOpen(false)}
//                                 className="hover:bg-white/20 p-1 rounded"
//                             >
//                                 <X size={18} />
//                             </button>

//                         </div>

//                         {/* Messages */}

//                         <div className="h-80 overflow-y-auto p-4 space-y-3 bg-gray-50">

//                             {messages.map((msg, idx) => (

//                                 <div
//                                     key={idx}
//                                     className={`flex ${msg.role === 'user'
//                                             ? 'justify-end'
//                                             : 'justify-start'
//                                         }`}
//                                 >

//                                     <div
//                                         className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user'
//                                                 ? 'bg-primary text-white rounded-br-none'
//                                                 : 'bg-white text-gray-700 shadow-sm rounded-bl-none'
//                                             }`}
//                                     >
//                                         {msg.text}
//                                     </div>

//                                     {msg.role === 'bot' && (
//                                         <button
//                                             onClick={() => speak(msg.text)}
//                                             className="p-2 text-gray-400 hover:text-primary transition-colors bg-white rounded-full shadow-sm w-8 h-8 flex items-center justify-center"
//                                         >
//                                             <Volume2 size={14} />
//                                         </button>
//                                     )}

//                                 </div>

//                             ))}

//                             {isLoading && (

//                                 <div className="flex justify-start">

//                                     <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm">
//                                         <Loader2 size={16} className="animate-spin text-gray-400" />
//                                     </div>

//                                 </div>

//                             )}

//                             <div ref={messagesEndRef} />

//                         </div>

//                         {/* Input */}

//                         <div className="p-3 bg-white border-t border-gray-100 flex gap-2">

//                             <button
//                                 onClick={toggleListening}
//                                 className={`p-2 rounded-full transition-colors ${
//                                     isListening
//                                         ? 'bg-red-100 text-red-500 animate-pulse'
//                                         : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
//                                 }`}
//                             >
//                                 <Mic size={20} />
//                             </button>

//                             <input
//                                 type="text"
//                                 value={input}
//                                 onChange={(e) => setInput(e.target.value)}
//                                 onKeyPress={(e) => e.key === 'Enter' && handleSend()}
//                                 placeholder={t('chat_placeholder')}
//                                 className="flex-1 bg-gray-100 rounded-full px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
//                             />

//                             <button
//                                 onClick={() => handleSend()}
//                                 className="p-2 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors"
//                             >
//                                 <Send size={18} />
//                             </button>

//                         </div>

//                     </motion.div>

//                 )}

//             </AnimatePresence>

//             <button
//                 onClick={() => setIsOpen(!isOpen)}
//                 className="w-14 h-14 bg-gradient-to-r from-primary to-secondary rounded-full shadow-lg flex items-center justify-center text-white hover:scale-105 transition-transform"
//             >
//                 {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
//             </button>

//         </div>
//     );
// }












// src/components/Chatbot.jsx

import {
  useState,
  useRef,
  useEffect
} from "react";

import {
  MessageSquare,
  Send,
  X,
  Mic,
  Loader2,
  Volume2,
  Sprout,
  Sparkles,
  Bot
} from "lucide-react";

import {
  motion,
  AnimatePresence
} from "framer-motion";

import {
  useTranslation
} from "react-i18next";

import api from "../api";


export default function Chatbot() {

  const { t, i18n } =
    useTranslation();


  // ==========================================================
  // STATE
  // ==========================================================

  const [isOpen, setIsOpen] =
    useState(false);

  const [messages, setMessages] =
    useState([]);

  const [input, setInput] =
    useState("");

  const [isLoading, setIsLoading] =
    useState(false);

  const [isListening, setIsListening] =
    useState(false);


  // ==========================================================
  // REFS
  // ==========================================================

  const messagesEndRef =
    useRef(null);

  const recognitionRef =
    useRef(null);

  const inputRef =
    useRef(null);


  // ==========================================================
  // WELCOME MESSAGE
  // ==========================================================

  useEffect(() => {

    setMessages([
      {
        role: "bot",
        text: t(
          "chat_welcome",
          "Hello! 👋 I'm AgriBot. How can I help you with your farm today?"
        )
      }
    ]);

  }, [i18n.language, t]);


  // ==========================================================
  // SCROLL TO BOTTOM
  // ==========================================================

  const scrollToBottom = () => {

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });

  };


  useEffect(() => {

    scrollToBottom();

  }, [messages]);


  // ==========================================================
  // OPEN CHAT
  // ==========================================================

  const openChat = () => {

    setIsOpen(true);

    setTimeout(() => {

      inputRef.current?.focus();

    }, 350);

  };


  // ==========================================================
  // OPEN CHATBOT FROM SIDEBAR
  //
  // Help → Chatbot
  // ==========================================================

  useEffect(() => {

    const handleSidebarChatbot = () => {

      openChat();

    };


    window.addEventListener(
      "farmxpert:open-chatbot",
      handleSidebarChatbot
    );


    return () => {

      window.removeEventListener(
        "farmxpert:open-chatbot",
        handleSidebarChatbot
      );

    };

  }, []);


  // ==========================================================
  // CLOSE CHAT
  // ==========================================================

  const closeChat = () => {

    setIsOpen(false);

    window.speechSynthesis?.cancel();

  };


  // ==========================================================
  // SEND MESSAGE
  // ==========================================================

  const handleSend = async (
    manualInput = null
  ) => {

    const userMsg =
      manualInput !== null
        ? manualInput
        : input;


    if (!userMsg.trim()) {
      return;
    }


    const cleanMessage =
      userMsg.trim();


    // Add user message

    setMessages(
      previous => [
        ...previous,

        {
          role: "user",
          text: cleanMessage
        }
      ]
    );


    setInput("");

    setIsLoading(true);


    try {

      const { data } =
        await api.post(
          "/chatbot/ask",
          {
            question:
              cleanMessage,

            language:
              i18n.language
          }
        );


      const botResponse =
        data?.answer ||
        t(
          "chatbot.fallback",
          "I couldn't get a clear response. Please try again."
        );


      setMessages(
        previous => [
          ...previous,

          {
            role: "bot",
            text: botResponse
          }
        ]
      );


      speak(botResponse);


    } catch (error) {

      console.error(
        "Chatbot error:",
        error
      );


      const errorMsg =
        t(
          "chatbot.connectionError",
          "Sorry, I'm having trouble connecting to the server."
        );


      setMessages(
        previous => [
          ...previous,

          {
            role: "bot",
            text: errorMsg
          }
        ]
      );


      speak(errorMsg);


    } finally {

      setIsLoading(false);


      setTimeout(() => {

        inputRef.current?.focus();

      }, 100);

    }

  };


  // ==========================================================
  // SUGGESTED QUESTIONS
  // ==========================================================

  const suggestedQuestions = [

    t(
      "chatbot.suggestions.weather",
      "What is the weather today?"
    ),

    t(
      "chatbot.suggestions.crop",
      "Which crop should I grow?"
    ),

    t(
      "chatbot.suggestions.disease",
      "How can I protect my crop?"
    )

  ];


  // ==========================================================
  // VOICE INPUT
  // ==========================================================

  const toggleListening = () => {

    if (
      !(
        "webkitSpeechRecognition"
        in window
      )
    ) {

      alert(
        t(
          "chatbot.speechNotSupported",
          "Speech recognition is not supported in this browser."
        )
      );

      return;

    }


    if (isListening) {

      recognitionRef.current?.stop();

      setIsListening(false);

      return;

    }


    const recognition =
      new window.webkitSpeechRecognition();


    recognition.continuous =
      false;

    recognition.interimResults =
      true;


    // ========================================================
    // LANGUAGE
    // ========================================================

    if (
      i18n.language === "te"
    ) {

      recognition.lang =
        "te-IN";

    } else if (
      i18n.language === "hi"
    ) {

      recognition.lang =
        "hi-IN";

    } else {

      recognition.lang =
        "en-IN";

    }


    recognition.onstart =
      () => {

        setIsListening(true);

      };


    recognition.onend =
      () => {

        setIsListening(false);

      };


    recognition.onerror =
      () => {

        setIsListening(false);

      };


    recognition.onresult =
      (event) => {

        let transcription =
          "";


        for (
          let i = event.resultIndex;
          i < event.results.length;
          i++
        ) {

          transcription +=
            event.results[i][0].transcript;

        }


        setInput(
          transcription
        );

      };


    recognitionRef.current =
      recognition;


    recognition.start();

  };


  // ==========================================================
  // TEXT TO SPEECH
  // ==========================================================

  const speak = (
    text
  ) => {

    if (
      !("speechSynthesis" in window)
    ) {

      return;

    }


    window.speechSynthesis.cancel();


    const utterance =
      new SpeechSynthesisUtterance(
        text
      );


    // ========================================================
    // LANGUAGE
    // ========================================================

    if (
      i18n.language === "te"
    ) {

      utterance.lang =
        "te-IN";

    } else if (
      i18n.language === "hi"
    ) {

      utterance.lang =
        "hi-IN";

    } else {

      utterance.lang =
        "en-IN";

    }


    const voices =
      window.speechSynthesis.getVoices();


    const preferredVoice =
      voices.find(
        voice => {

          if (
            i18n.language === "te"
          ) {

            return voice.lang
              ?.toLowerCase()
              .includes("te");

          }


          if (
            i18n.language === "hi"
          ) {

            return voice.lang
              ?.toLowerCase()
              .includes("hi");

          }


          return (
            voice.lang
              ?.toLowerCase()
              .includes("en-in") ||
            voice.lang
              ?.toLowerCase()
              .includes("en-us")
          );

        }
      );


    if (
      preferredVoice
    ) {

      utterance.voice =
        preferredVoice;

    }


    utterance.rate =
      0.95;

    utterance.pitch =
      1;


    window.speechSynthesis.speak(
      utterance
    );

  };


  // ==========================================================
  // STOP SPEECH WHEN CLOSED
  // ==========================================================

  useEffect(() => {

    if (!isOpen) {

      window.speechSynthesis?.cancel();

    }

  }, [isOpen]);


  // ==========================================================
  // CLEANUP
  // ==========================================================

  useEffect(() => {

    return () => {

      recognitionRef.current?.stop();

      window.speechSynthesis?.cancel();

    };

  }, []);


  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <div
      className="
        fixed
        bottom-6
        right-6
        z-[999]
        flex
        flex-col
        items-end
      "
    >

      {/* ====================================================
          CHAT WINDOW
          ==================================================== */}

      <AnimatePresence>

        {isOpen && (

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.92,
              y: 20
            }}

            animate={{
              opacity: 1,
              scale: 1,
              y: 0
            }}

            exit={{
              opacity: 0,
              scale: 0.92,
              y: 20
            }}

            transition={{
              duration: 0.22,
              ease: "easeOut"
            }}

            className="
              mb-4
              w-[calc(100vw-32px)]
              max-w-[390px]
              overflow-hidden
              rounded-[24px]
              border
              border-[#dfe9e3]
              bg-white
              shadow-[0_20px_60px_rgba(25,60,42,0.18)]
            "
          >

            {/* ==================================================
                HEADER
                ================================================== */}

            <div
              className="
                relative
                overflow-hidden
                bg-gradient-to-br
                from-[#087443]
                via-[#0a8950]
                to-[#075c36]
                px-5
                py-4
                text-white
              "
            >

              {/* Decorative circle */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-8
                  -top-10
                  h-28
                  w-28
                  rounded-full
                  bg-white/10
                "
              />


              <div
                className="
                  pointer-events-none
                  absolute
                  -bottom-12
                  right-16
                  h-24
                  w-24
                  rounded-full
                  bg-white/5
                "
              />


              <div
                className="
                  relative
                  flex
                  items-center
                  justify-between
                "
              >

                {/* Bot information */}

                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >

                  <div
                    className="
                      relative
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-[14px]
                      bg-white/15
                      ring-1
                      ring-white/20
                      backdrop-blur-sm
                    "
                  >

                    <Sprout
                      size={22}
                      strokeWidth={2.2}
                    />


                    <span
                      className="
                        absolute
                        bottom-0.5
                        right-0.5
                        h-3
                        w-3
                        rounded-full
                        border-2
                        border-[#087443]
                        bg-[#8ee35f]
                      "
                    />

                  </div>


                  <div>

                    <div
                      className="
                        flex
                        items-center
                        gap-1.5
                      "
                    >

                      <h3
                        className="
                          text-[16px]
                          font-bold
                          tracking-[-0.2px]
                        "
                      >
                        AgriBot
                      </h3>


                      <Sparkles
                        size={13}
                        className="text-[#d7f7b9]"
                      />

                    </div>


                    <div
                      className="
                        mt-0.5
                        flex
                        items-center
                        gap-1.5
                        text-[11px]
                        text-white/75
                      "
                    >

                      <span
                        className="
                          h-1.5
                          w-1.5
                          rounded-full
                          bg-[#a6ec73]
                        "
                      />

                      {t(
                        "chatbot.online",
                        "Online • Ready to help"
                      )}

                    </div>

                  </div>

                </div>


                {/* Close button */}

                <button
                  type="button"
                  onClick={
                    closeChat
                  }

                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-lg
                    text-white/80
                    transition
                    hover:bg-white/15
                    hover:text-white
                  "

                  aria-label={
                    t(
                      "chatbot.close",
                      "Close chatbot"
                    )
                  }
                >

                  <X
                    size={18}
                  />

                </button>

              </div>

            </div>


            {/* ==================================================
                CHAT BODY
                ================================================== */}

            <div
              className="
                h-[360px]
                overflow-y-auto
                bg-[#f5f8f6]
                px-4
                py-4
                [scrollbar-width:thin]
                [scrollbar-color:#c8d8ce_transparent]
              "
            >

              {/* Intro */}

              {messages.length === 1 &&
                messages[0]?.role === "bot" && (

                  <div
                    className="
                      mb-4
                      text-center
                    "
                  >

                    <div
                      className="
                        mx-auto
                        mb-2
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        bg-[#e5f3eb]
                        text-[#087443]
                      "
                    >

                      <Bot
                        size={18}
                      />

                    </div>


                    <p
                      className="
                        text-[11px]
                        text-gray-400
                      "
                    >

                      {t(
                        "chatbot.askAnything",
                        "Ask me anything about your farm"
                      )}

                    </p>

                  </div>

                )}


              {/* ==================================================
                  MESSAGES
                  ================================================== */}

              <div
                className="
                  space-y-3
                "
              >

                {messages.map(
                  (
                    msg,
                    idx
                  ) => (

                    <motion.div
                      key={idx}

                      initial={{
                        opacity: 0,
                        y: 8
                      }}

                      animate={{
                        opacity: 1,
                        y: 0
                      }}

                      transition={{
                        duration: 0.18
                      }}

                      className={`
                        flex
                        items-end
                        gap-2
                        ${
                          msg.role === "user"
                            ? "justify-end"
                            : "justify-start"
                        }
                      `}
                    >

                      {/* Bot avatar */}

                      {msg.role === "bot" && (

                        <div
                          className="
                            mb-1
                            flex
                            h-7
                            w-7
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-[#e3f2e9]
                            text-[#087443]
                          "
                        >

                          <Sprout
                            size={14}
                          />

                        </div>

                      )}


                      <div
                        className={`
                          group
                          flex
                          max-w-[78%]
                          items-end
                          gap-1.5
                          ${
                            msg.role === "user"
                              ? "flex-row-reverse"
                              : "flex-row"
                          }
                        `}
                      >

                        <div
                          className={`
                            px-3.5
                            py-2.5
                            text-[13px]
                            leading-[1.45]

                            ${
                              msg.role === "user"
                                ? `
                                  rounded-[18px]
                                  rounded-br-[5px]
                                  bg-[#087443]
                                  text-white
                                  shadow-[0_3px_10px_rgba(8,116,67,0.15)]
                                `
                                : `
                                  rounded-[18px]
                                  rounded-bl-[5px]
                                  border
                                  border-[#e5ebe7]
                                  bg-white
                                  text-[#3e4d46]
                                  shadow-[0_2px_8px_rgba(20,50,35,0.04)]
                                `
                            }
                          `}
                        >

                          {msg.text}

                        </div>


                        {/* Speak */}

                        {msg.role === "bot" && (

                          <button
                            type="button"

                            onClick={() =>
                              speak(
                                msg.text
                              )
                            }

                            className="
                              flex
                              h-7
                              w-7
                              shrink-0
                              items-center
                              justify-center
                              rounded-full
                              border
                              border-[#e3ebe6]
                              bg-white
                              text-gray-400
                              opacity-0
                              shadow-sm
                              transition-all
                              hover:text-[#087443]
                              group-hover:opacity-100
                            "

                            title={
                              t(
                                "chatbot.listen",
                                "Listen"
                              )
                            }
                          >

                            <Volume2
                              size={13}
                            />

                          </button>

                        )}

                      </div>

                    </motion.div>

                  )
                )}


                {/* Loading */}

                {isLoading && (

                  <div
                    className="
                      flex
                      items-end
                      gap-2
                    "
                  >

                    <div
                      className="
                        flex
                        h-7
                        w-7
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-[#e3f2e9]
                        text-[#087443]
                      "
                    >

                      <Sprout
                        size={14}
                      />

                    </div>


                    <div
                      className="
                        flex
                        items-center
                        gap-1.5
                        rounded-[18px]
                        rounded-bl-[5px]
                        border
                        border-[#e5ebe7]
                        bg-white
                        px-4
                        py-3
                        shadow-sm
                      "
                    >

                      <span
                        className="
                          h-1.5
                          w-1.5
                          animate-bounce
                          rounded-full
                          bg-[#087443]
                        "
                      />

                      <span
                        className="
                          h-1.5
                          w-1.5
                          animate-bounce
                          rounded-full
                          bg-[#087443]
                          [animation-delay:120ms]
                        "
                      />

                      <span
                        className="
                          h-1.5
                          w-1.5
                          animate-bounce
                          rounded-full
                          bg-[#087443]
                          [animation-delay:240ms]
                        "
                      />

                    </div>

                  </div>

                )}


                <div
                  ref={
                    messagesEndRef
                  }
                />

              </div>


              {/* ==================================================
                  SUGGESTIONS
                  ================================================== */}

              {messages.length === 1 &&
                !isLoading && (

                  <div
                    className="
                      mt-5
                    "
                  >

                    <p
                      className="
                        mb-2
                        px-1
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.08em]
                        text-gray-400
                      "
                    >

                      {t(
                        "chatbot.tryAsking",
                        "Try asking"
                      )}

                    </p>


                    <div
                      className="
                        flex
                        flex-wrap
                        gap-2
                      "
                    >

                      {suggestedQuestions.map(
                        (
                          question,
                          index
                        ) => (

                          <button
                            key={
                              index
                            }

                            type="button"

                            onClick={() =>
                              handleSend(
                                question
                              )
                            }

                            className="
                              rounded-full
                              border
                              border-[#dce8e1]
                              bg-white
                              px-3
                              py-2
                              text-left
                              text-[11px]
                              font-medium
                              text-[#4a5c53]
                              shadow-sm
                              transition-all
                              hover:border-[#9bc7ad]
                              hover:bg-[#f0f8f3]
                              hover:text-[#087443]
                            "
                          >

                            {question}

                          </button>

                        )
                      )}

                    </div>

                  </div>

                )}

            </div>


            {/* ==================================================
                INPUT AREA
                ================================================== */}

            <div
              className="
                border-t
                border-[#e8eeea]
                bg-white
                p-3
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-2
                  rounded-[16px]
                  border
                  border-[#dfe8e2]
                  bg-[#f8faf9]
                  p-1.5
                  transition-all
                  focus-within:border-[#8dc5a4]
                  focus-within:bg-white
                  focus-within:ring-4
                  focus-within:ring-[#087443]/8
                "
              >

                {/* Microphone */}

                <button
                  type="button"

                  onClick={
                    toggleListening
                  }

                  disabled={
                    isLoading
                  }

                  className={`
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    transition-all

                    ${
                      isListening
                        ? `
                          bg-red-100
                          text-red-500
                          animate-pulse
                        `
                        : `
                          text-gray-400
                          hover:bg-[#e9f3ed]
                          hover:text-[#087443]
                        `
                    }
                  `}

                  title={
                    t(
                      "chatbot.voice",
                      "Voice input"
                    )
                  }
                >

                  <Mic
                    size={18}
                  />

                </button>


                {/* Input */}

                <input
                  ref={
                    inputRef
                  }

                  type="text"

                  value={
                    input
                  }

                  onChange={
                    (e) =>
                      setInput(
                        e.target.value
                      )
                  }

                  onKeyDown={
                    (e) => {

                      if (
                        e.key ===
                        "Enter"
                      ) {

                        e.preventDefault();

                        handleSend();

                      }

                    }
                  }

                  placeholder={
                    t(
                      "chat_placeholder",
                      "Ask AgriBot..."
                    )
                  }

                  disabled={
                    isLoading
                  }

                  className="
                    min-w-0
                    flex-1
                    bg-transparent
                    px-1
                    text-[13px]
                    text-[#293a32]
                    outline-none
                    placeholder:text-gray-400
                    disabled:opacity-50
                  "
                />


                {/* Send */}

                <button
                  type="button"

                  onClick={() =>
                    handleSend()
                  }

                  disabled={
                    !input.trim() ||
                    isLoading
                  }

                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#087443]
                    text-white
                    shadow-[0_3px_8px_rgba(8,116,67,0.18)]
                    transition-all
                    hover:bg-[#076538]
                    hover:shadow-[0_4px_12px_rgba(8,116,67,0.24)]
                    disabled:cursor-not-allowed
                    disabled:bg-[#c9d7ce]
                    disabled:shadow-none
                  "
                >

                  {isLoading ? (

                    <Loader2
                      size={17}
                      className="animate-spin"
                    />

                  ) : (

                    <Send
                      size={16}
                    />

                  )}

                </button>

              </div>


              {/* Footer */}

              <div
                className="
                  mt-2
                  flex
                  items-center
                  justify-center
                  gap-1
                  text-[9px]
                  text-gray-400
                "
              >

                <Sparkles
                  size={9}
                />

                {t(
                  "chatbot.powered",
                  "Powered by FarmXpert AI"
                )}

              </div>

            </div>

          </motion.div>

        )}

      </AnimatePresence>


      {/* ======================================================
          FLOATING BUTTON
          ====================================================== */}

      <div
        className="
          flex
          items-center
          gap-2
        "
      >

        {/* Label */}

        <AnimatePresence>

          {!isOpen && (

            <motion.div
              initial={{
                opacity: 0,
                x: 8
              }}

              animate={{
                opacity: 1,
                x: 0
              }}

              exit={{
                opacity: 0,
                x: 8
              }}

              className="
                hidden
                rounded-full
                border
                border-[#dce9e1]
                bg-white
                px-3.5
                py-2
                text-[11px]
                font-semibold
                text-[#315044]
                shadow-[0_5px_18px_rgba(20,50,35,0.10)]
                sm:block
              "
            >

              {t(
                "chatbot.askAgriBot",
                "Ask AgriBot"
              )}

            </motion.div>

          )}

        </AnimatePresence>


        {/* Main Button */}

        <motion.button
          type="button"

          onClick={() =>
            isOpen
              ? closeChat()
              : openChat()
          }

          whileHover={{
            scale: 1.05
          }}

          whileTap={{
            scale: 0.95
          }}

          className="
            relative
            flex
            h-[58px]
            w-[58px]
            items-center
            justify-center
            rounded-full
            bg-gradient-to-br
            from-[#0a9552]
            via-[#087443]
            to-[#075d37]
            text-white
            shadow-[0_10px_30px_rgba(8,116,67,0.28)]
            ring-4
            ring-white
          "

          aria-label={
            isOpen
              ? t(
                  "chatbot.close",
                  "Close chatbot"
                )
              : t(
                  "chatbot.open",
                  "Open AgriBot"
                )
          }
        >

          {/* Pulse */}

          {!isOpen && (

            <span
              className="
                absolute
                inset-0
                animate-ping
                rounded-full
                bg-[#087443]/20
              "
            />

          )}


          {/* Icon */}

          <span
            className="
              relative
              z-10
            "
          >

            {isOpen ? (

              <X
                size={25}
                strokeWidth={2.2}
              />

            ) : (

              <MessageSquare
                size={25}
                strokeWidth={2.2}
              />

            )}

          </span>

        </motion.button>

      </div>

    </div>

  );

}