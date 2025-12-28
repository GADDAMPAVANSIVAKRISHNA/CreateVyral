import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, User, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';

const FusionBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hi! I\'m FusionBot. I can help you find creators, search for courses, or answer questions about CreateVyral. How can I assist you today?' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const userMsg = { role: 'user', content: inputValue };
        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsLoading(true);

        try {
            let responseText = "I'm processing your request...";

            const lowerInput = userMsg.content.toLowerCase();
            if (lowerInput.includes('course')) responseText = "You can find our courses in the 'Courses' section. We offer courses on Instagram growth, video editing, and more.";
            else if (lowerInput.includes('creator') || lowerInput.includes('influencer')) responseText = "To search for creators, visit the 'Search' page. You can filter by category, platform, and price.";
            else if (lowerInput.includes('campaign')) responseText = "Brands can post new campaigns from the 'Campaigns' page. Influencers can browse and apply to them.";
            else if (lowerInput.includes('pricing') || lowerInput.includes('pro')) responseText = "Our Pro plan is currently ₹999/mo. It includes verified badge, priority support, and 0% commission fees.";
            else responseText = await base44.integrations.Core.InvokeLLM(userMsg.content) || "I'm still learning! Could you try asking about courses, creators, or campaigns?";

            setTimeout(() => {
                setMessages(prev => [...prev, { role: 'assistant', content: responseText }]);
                setIsLoading(false);
            }, 1000);

        } catch (error) {
            console.error("Bot Error:", error);
            setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble connecting right now." }]);
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col z-50 overflow-hidden font-sans"
                    >
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                    <Sparkles className="w-6 h-6 text-yellow-300" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">VyralRizz</h3>
                                    <p className="text-xs text-blue-100 flex items-center gap-1">
                                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> Online
                                    </p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 bg-gray-50/50 space-y-4">
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                                >
                                    <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-sm ${msg.role === 'user' ? 'bg-gray-200 text-gray-600' : 'bg-purple-100 text-purple-600'
                                        }`}>
                                        {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                                    </div>
                                    <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${msg.role === 'user'
                                            ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-tr-none'
                                            : 'bg-white border border-gray-100 text-gray-800 rounded-tl-none shadow-sm'
                                        }`}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex items-center gap-2 text-gray-400 text-sm ml-12">
                                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-100"></div>
                                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-200"></div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className="p-4 bg-white border-t border-gray-100">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Ask anything..."
                                    className="flex-1 bg-gray-100 text-gray-900 placeholder-gray-500 rounded-full px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-sm"
                                />
                                <Button
                                    onClick={handleSend}
                                    disabled={!inputValue.trim() || isLoading}
                                    size="icon"
                                    className="rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md disabled:opacity-50 disabled:shadow-none"
                                >
                                    <Send className="w-4 h-4 ml-0.5" />
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-2xl z-50 transition-all group"
            >
                <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
                {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-7 h-7" />}
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 text-[10px] items-center justify-center font-bold">1</span>
                    </span>
                )}
            </motion.button>
        </>
    );
};

export default FusionBot;
