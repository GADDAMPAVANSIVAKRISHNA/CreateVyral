import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from './utils';
import { m, AnimatePresence } from 'framer-motion';
import {
    Menu, X, Search, ChevronDown, User, LogOut,
    Home, BookOpen, Briefcase, Users, Settings
} from 'lucide-react';
import PromoBanner from './components/promo/PromoBanner';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { base44 } from '@/api/base44Client';
import FusionLogo from './components/ui/FusionLogo';
import FusionBot from './components/chatbot/FusionBot';

const navLinks = [
    { name: 'Home', page: 'Home' },
    { name: 'Courses', page: 'Courses' },
    { name: 'Campaigns', page: 'Campaigns' },
    { name: 'Search', page: 'Search' },
];

const noLayoutPages = ['Landing', 'Onboarding', 'CreatorOnboarding', 'InfluencerOnboarding'];

const hasBannerPages = ['Home', 'Search', 'Courses', 'Campaigns'];

export default function Layout({ children, currentPageName }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [user, setUser] = useState(null);

    const loadUser = async () => {
        const isAuth = await base44.auth.isAuthenticated();
        if (isAuth) {
            const userData = await base44.auth.me();
            setUser(userData);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        loadUser();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        base44.auth.logout();
    };

    // No layout for certain pages
    if (noLayoutPages.includes(currentPageName)) {
        return <>{children}</>;
    }

    const showPromoBanner = hasBannerPages.includes(currentPageName);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
            {/* Promo Banner */}
            {showPromoBanner && <PromoBanner />}

            {/* Header */}
            <m.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? 'bg-white/90 backdrop-blur-xl shadow-lg border-b border-white/50'
                    : 'bg-white/80 backdrop-blur-lg'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between h-16 md:h-20">
                        {/* Logo */}
                        <Link to={createPageUrl('Home')}>
                            <FusionLogo size={36} />
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.page}
                                    to={createPageUrl(link.page)}
                                    className={`text-sm font-medium transition-colors ${currentPageName === link.page
                                        ? 'text-purple-600'
                                        : 'text-gray-600 hover:text-purple-600'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>

                        {/* Right Side */}
                        <div className="flex items-center gap-3">
                            <Link to={createPageUrl('Search')} className="hidden md:block">
                                <Button variant="ghost" size="icon" className="rounded-full">
                                    <Search className="w-5 h-5" />
                                </Button>
                            </Link>

                            {user ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="rounded-full gap-2">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 flex items-center justify-center text-white text-sm font-bold">
                                                {user.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
                                            </div>
                                            <ChevronDown className="w-4 h-4 hidden md:block" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56">
                                        <div className="px-3 py-2">
                                            <p className="font-medium">{user.full_name || 'User'}</p>
                                            <p className="text-sm text-gray-500">{user.email}</p>
                                        </div>
                                        <DropdownMenuSeparator />
                                        <Link to={createPageUrl('CreatorDashboard')}>
                                            <DropdownMenuItem>
                                                <Briefcase className="w-4 h-4 mr-2" />
                                                Creator Dashboard
                                            </DropdownMenuItem>
                                        </Link>
                                        <Link to={createPageUrl('InfluencerDashboard')}>
                                            <DropdownMenuItem>
                                                <Users className="w-4 h-4 mr-2" />
                                                Influencer Dashboard
                                            </DropdownMenuItem>
                                        </Link>
                                        <Link to={createPageUrl('Courses')}>
                                            <DropdownMenuItem>
                                                <BookOpen className="w-4 h-4 mr-2" />
                                                My Courses
                                            </DropdownMenuItem>
                                        </Link>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                                            <LogOut className="w-4 h-4 mr-2" />
                                            Logout
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Link to={createPageUrl('Onboarding')}>
                                        <Button className="rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:opacity-90">
                                            Get Started
                                        </Button>
                                    </Link>
                                </div>
                            )}

                            {/* Mobile Menu Button */}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="md:hidden rounded-full"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <m.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100"
                        >
                            <nav className="max-w-7xl mx-auto px-4 py-4 space-y-2">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.page}
                                        to={createPageUrl(link.page)}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`block px-4 py-3 rounded-xl font-medium transition-colors ${currentPageName === link.page
                                            ? 'bg-purple-100 text-purple-600'
                                            : 'text-gray-600 hover:bg-gray-100'
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </nav>
                        </m.div>
                    )}
                </AnimatePresence>
            </m.header>

            {/* Main Content */}
            <main>
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8 mb-12">
                        <div className="md:col-span-2">
                            <div className="flex items-center gap-3 mb-4">
                                <img
                                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/692f0f1978791959e9444ac5/a976ca7d4_image.png"
                                    alt="CreateVyral"
                                    className="w-10 h-10"
                                />
                                <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">CreateVyral</span>
                            </div>
                            <p className="text-gray-400 max-w-sm">
                                Where Influence Becomes Impact.
                                The #1 platform connecting brands with creators and influencers.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">Platform</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><Link to={createPageUrl('Search')} className="hover:text-white transition-colors">Find Creators</Link></li>
                                <li><Link to={createPageUrl('Campaigns')} className="hover:text-white transition-colors">Campaigns</Link></li>
                                <li><Link to={createPageUrl('Courses')} className="hover:text-white transition-colors">Courses</Link></li>
                                <li><Link to={createPageUrl('PostCampaign')} className="hover:text-white transition-colors">Post Campaign</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">Get Started</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><Link to={createPageUrl('CreatorOnboarding')} className="hover:text-white transition-colors">Join as Creator</Link></li>
                                <li><Link to={createPageUrl('InfluencerOnboarding')} className="hover:text-white transition-colors">Become Influencer</Link></li>
                                <li><Link to={createPageUrl('Courses')} className="hover:text-white transition-colors">Learn Skills</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-gray-500 text-sm">
                            © 2025 CreateVyral. All rights reserved.
                        </p>

                        <div className="flex items-center gap-6">
                            <div className="flex gap-4">
                                <a
                                    href="https://www.instagram.com/createvyral.in/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                </a>
                                <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-gray-800 hover:bg-red-600 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                    </svg>
                                </a>
                                <a
                                    href="https://calendly.com/influencefusion1/30min?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGn1UACU2x03ps49EnJySI_jjZniTeOxfVxXwbtKIiya8sH9j215RD67P0nv0E_aem_TqZVJG1boxNIr8Ers3w1mQ&month=2025-12"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <div className="flex gap-6 text-sm text-gray-500">
                            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
                            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
                            <span className="hover:text-white cursor-pointer transition-colors">Contact</span>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Chatbot */}
            <FusionBot />
        </div>
    );
}
