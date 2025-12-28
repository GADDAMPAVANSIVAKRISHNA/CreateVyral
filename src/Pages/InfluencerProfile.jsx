import React, { useState } from 'react';
import { m } from 'framer-motion';
import { MapPin, Star, Instagram, Youtube, Users, Clock, Check, Share2, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { sampleInfluencers } from '@/components/data/sampleInfluencers';
import { useParams } from 'react-router-dom';

const InfluencerProfile = () => {
    // In a real app, use id to fetch
    const { id } = useParams();
    const profile = sampleInfluencers.find(i => i.id === Number(id)) || sampleInfluencers[0];

    const [activeTab, setActiveTab] = useState('portfolio');

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Cover Image */}
            <div className="h-64 md:h-80 bg-gray-300 relative overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=1600&h=400&fit=crop"
                    alt="Cover"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Profile Header */}
                <div className="relative -mt-20 md:-mt-24 mb-8 flex flex-col md:flex-row items-end gap-6">
                    <m.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white flex-shrink-0"
                    >
                        <img src={profile.image} alt={profile.name} className="w-full h-full object-cover" />
                    </m.div>

                    <div className="flex-1 pb-4 text-white md:text-gray-900 drop-shadow-md md:drop-shadow-none">
                        <h1 className="text-3xl font-bold">{profile.name}</h1>
                        <p className="text-lg opacity-90 md:text-gray-600 font-medium">{profile.role}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm">
                            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {profile.location}</span>
                            <span className="flex items-center gap-1 text-yellow-500"><Star className="w-4 h-4 fill-current" /> {profile.rating} ({profile.reviews} reviews)</span>
                        </div>
                    </div>

                    <div className="flex gap-3 pb-4">
                        <Button variant="outline" className="bg-white/10 md:bg-white text-white md:text-gray-900 border-white/20 md:border-gray-200">
                            <Share2 className="w-4 h-4 mr-2" /> Share
                        </Button>
                        <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                            Book Now
                        </Button>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Left Column: Stats & Info */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-4">Social Stats</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600">
                                            <Instagram className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-medium">Instagram</p>
                                            <p className="text-xs text-gray-500">Followers</p>
                                        </div>
                                    </div>
                                    <span className="font-bold text-lg">{profile.followers}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                                            <Youtube className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-medium">YouTube</p>
                                            <p className="text-xs text-gray-500">Subscribers</p>
                                        </div>
                                    </div>
                                    <span className="font-bold text-lg">10K</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-4">About</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                {profile.bio}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {profile.badges.map(badge => (
                                    <span key={badge} className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                                        {badge}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Portfolio & Services */}
                    <div className="md:col-span-2 space-y-6">
                        {/* Tabs */}
                        <div className="bg-white rounded-xl p-2 shadow-sm border border-gray-100 flex gap-2">
                            {['portfolio', 'services', 'reviews'].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === tab
                                            ? 'bg-purple-100 text-purple-700'
                                            : 'text-gray-500 hover:bg-gray-50'
                                        }`}
                                >
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </button>
                            ))}
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 min-h-[400px]">
                            {activeTab === 'portfolio' && (
                                <div className="grid grid-cols-2 gap-4">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="aspect-square rounded-lg bg-gray-200 overflow-hidden">
                                            <img
                                                src={`https://images.unsplash.com/photo-${1500000000000 + i}?w=400&h=400&fit=crop`}
                                                alt="Portfolio"
                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                            {activeTab === 'services' && (
                                <div className="space-y-4">
                                    <div className="border border-gray-100 rounded-lg p-4 hover:border-purple-200 transition-colors">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-bold">Instagram Reel</h4>
                                            <span className="font-bold text-purple-600">{profile.price}</span>
                                        </div>
                                        <p className="text-sm text-gray-500 mb-4">One 60-second reel showcasing your product/service with dedicated styling and editing.</p>
                                        <ul className="text-sm text-gray-500 space-y-2">
                                            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Story Share Included</li>
                                            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> 2 Revisions</li>
                                        </ul>
                                    </div>
                                    <div className="border border-gray-100 rounded-lg p-4 hover:border-purple-200 transition-colors">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-bold">Story Mention</h4>
                                            <span className="font-bold text-purple-600">₹2,000</span>
                                        </div>
                                        <p className="text-sm text-gray-500 mb-4">Dedicated story with link sticker and mention.</p>
                                        <ul className="text-sm text-gray-500 space-y-2">
                                            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Link Sticker</li>
                                        </ul>
                                    </div>
                                </div>
                            )}
                            {activeTab === 'reviews' && (
                                <div className="text-center text-gray-500 py-10">
                                    <Star className="w-12 h-12 mx-auto mb-4 text-gray-200" />
                                    <p>Reviews coming soon</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfluencerProfile;
