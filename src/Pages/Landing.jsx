import React from 'react';
import { m } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AnimatedGradientBg from '@/components/ui/AnimatedGradientBg';
import FusionLogo from '@/components/ui/FusionLogo';
import { createPageUrl } from '@/utils';
import { ArrowRight, Star } from 'lucide-react';

const Landing = () => {
    return (
        <div className="h-screen w-screen text-white">
            <AnimatedGradientBg className="flex flex-col">
                <nav className="p-6 flex justify-between items-center">
                    <FusionLogo size={40} />
                    <div className="hidden md:flex gap-6 text-sm font-medium text-gray-300">
                        <Link to={createPageUrl('Home')} className="hover:text-white transition-colors">Home</Link>
                        <Link to={createPageUrl('Campaigns')} className="hover:text-white transition-colors">Campaigns</Link>
                        <Link to={createPageUrl('Courses')} className="hover:text-white transition-colors">Courses</Link>
                    </div>
                    <Link to={createPageUrl('Home')}>
                        <Button variant="ghost" className="text-white hover:bg-white/10">Login</Button>
                    </Link>
                </nav>

                <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
                    <m.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                            Create. Influence. Go Viral.
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-10">
                            The all-in-one platform for creators, influencers, and brands to collaborate, learn, and grow.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to={createPageUrl('Onboarding')}>
                                <Button size="lg" className="rounded-full px-8 py-6 text-lg bg-white text-black hover:bg-gray-100 gap-2">
                                    Start Now <ArrowRight className="w-5 h-5" />
                                </Button>
                            </Link>
                            <Link to={createPageUrl('Home')}>
                                <Button size="lg" variant="outline" className="rounded-full px-8 py-6 text-lg border-white/20 hover:bg-white/10 text-white">
                                    Explore Platform
                                </Button>
                            </Link>
                        </div>
                    </m.div>

                    <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="mt-16 flex items-center gap-8 opacity-70 grayscale hover:grayscale-0 transition-all duration-500"
                    >
                        {/* Placeholder logos */}
                        <div className="flex flex-col items-center">
                            <div className="font-bold text-xl">Trusted By</div>
                            <div className="flex gap-4 mt-2">
                                <Star className="w-6 h-6 text-yellow-500" />
                                <Star className="w-6 h-6 text-yellow-500" />
                                <Star className="w-6 h-6 text-yellow-500" />
                                <Star className="w-6 h-6 text-yellow-500" />
                                <Star className="w-6 h-6 text-yellow-500" />
                            </div>
                            <div className="text-sm mt-1">500+ Top Brands</div>
                        </div>
                    </m.div>
                </main>
            </AnimatedGradientBg>
        </div>
    );
};

export default Landing;
