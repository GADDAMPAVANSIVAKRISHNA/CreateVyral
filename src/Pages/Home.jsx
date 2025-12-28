import React, { useState, useMemo } from 'react';
import { m } from 'framer-motion';
import { Search, Filter, ArrowRight, TrendingUp, Users, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CreatorCard from '@/components/cards/CreatorCard';
import { sampleInfluencers, categories } from '@/components/data/sampleInfluencers';
import { createPageUrl } from '@/utils';
import { Link } from 'react-router-dom';

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const creators = useMemo(() => {
        let filtered = sampleInfluencers;
        if (selectedCategory !== 'All') {
            filtered = filtered.filter(c => c.category === selectedCategory);
        }
        if (searchTerm) {
            filtered = filtered.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        return filtered;
    }, [searchTerm, selectedCategory]);

    return (
        <div className="pb-20">
            {/* Hero Section */}
            <section className="relative px-4 pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-0 left-0 -ml-20 -mt-20 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <m.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6"
                    >
                        Find the Perfect <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Influencer</span> for Your Brand
                    </m.h1>
                    <m.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto"
                    >
                        Connect with top-rated creators, manage campaigns, and grow your brand with CreateVyral.
                    </m.p>

                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-lg mx-auto"
                    >
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search by name, category, or platform..."
                                className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Button className="w-full md:w-auto rounded-full px-8 py-6 bg-gray-900 hover:bg-gray-800 text-white">
                            Search
                        </Button>
                    </m.div>
                </div>
            </section>

            {/* Stats / Categories */}
            <section className="max-w-7xl mx-auto px-4 mb-16">
                <div className="flex overflow-x-auto pb-4 gap-2 no-scrollbar">
                    <Button
                        variant={selectedCategory === 'All' ? 'default' : 'outline'}
                        onClick={() => setSelectedCategory('All')}
                        className="rounded-full whitespace-nowrap"
                    >
                        All
                    </Button>
                    {categories.map(cat => (
                        <Button
                            key={cat}
                            variant={selectedCategory === cat ? 'default' : 'outline'}
                            onClick={() => setSelectedCategory(cat)}
                            className="rounded-full whitespace-nowrap"
                        >
                            {cat}
                        </Button>
                    ))}
                </div>
            </section>

            {/* Featured Creators */}
            <section className="max-w-7xl mx-auto px-4 mb-20">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <TrendingUp className="text-purple-600" /> Featured Creators
                    </h2>
                    <Link to={createPageUrl('Search')} className="text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1">
                        View All <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {creators.map((creator) => (
                        <CreatorCard key={creator.id} creator={creator} />
                    ))}
                </div>
            </section>

            {/* Promo Section */}
            <section className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white py-16 mb-20">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="max-w-xl">
                        <h2 className="text-3xl font-bold mb-4">Ready to take your brand viral?</h2>
                        <p className="text-indigo-200 mb-8 text-lg">
                            Join thousands of brands and creators on CreateVyral. Start your first campaign today.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Button className="bg-white text-indigo-900 hover:bg-indigo-50 rounded-full px-8 py-6 font-bold">
                                Post a Campaign
                            </Button>
                            <Button variant="outline" className="border-white text-white hover:bg-white/10 rounded-full px-8 py-6">
                                Learn More
                            </Button>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-32 h-32 bg-white/10 backdrop-blur-lg rounded-2xl flex flex-col items-center justify-center p-4 border border-white/20">
                            <Users className="w-8 h-8 mb-2 text-pink-400" />
                            <span className="text-2xl font-bold">10K+</span>
                            <span className="text-xs text-indigo-200">Influencers</span>
                        </div>
                        <div className="w-32 h-32 bg-white/10 backdrop-blur-lg rounded-2xl flex flex-col items-center justify-center p-4 border border-white/20">
                            <Video className="w-8 h-8 mb-2 text-cyan-400" />
                            <span className="text-2xl font-bold">50K+</span>
                            <span className="text-xs text-indigo-200">Campaigns</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
