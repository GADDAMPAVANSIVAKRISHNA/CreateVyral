import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import {
  LayoutDashboard, User, Megaphone, DollarSign, BarChart3,
  Settings, Star, Users, TrendingUp, Eye, Instagram, Youtube, Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { base44 } from '@/api/base44Client';
import AnimatedGradientBg from '../components/ui/AnimatedGradientBg';
import GlassCard from '../components/ui/GlassCard';
import FusionBot from '../components/chatbot/FusionBot';
import FusionLogo from '../components/ui/FusionLogo';
import DashboardRequests from '../components/dashboard/DashboardRequests';
import DashboardEarnings from '../components/dashboard/DashboardEarnings';
import DashboardSettings from '../components/dashboard/DashboardSettings';
import DashboardAnalytics from '../components/dashboard/DashboardAnalytics';
import ProPopup from '../components/dashboard/ProPopup';
import ProfileUpload from '../components/dashboard/ProfileUpload';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartPieChart, Pie, Cell
} from 'recharts';

const engagementData = [
  { name: 'Mon', views: 4000, engagement: 2400 },
  { name: 'Tue', views: 3000, engagement: 1398 },
  { name: 'Wed', views: 5000, engagement: 3800 },
  { name: 'Thu', views: 2780, engagement: 3908 },
  { name: 'Fri', views: 6890, engagement: 4800 },
  { name: 'Sat', views: 8390, engagement: 3800 },
  { name: 'Sun', views: 7490, engagement: 4300 },
];

const audienceData = [
  { name: '18-24', value: 35 },
  { name: '25-34', value: 40 },
  { name: '35-44', value: 15 },
  { name: '45+', value: 10 },
];

const COLORS = ['#ec4899', '#8b5cf6', '#3b82f6', '#10b981'];

export default function InfluencerDashboard() {
  const [influencer, setInfluencer] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const user = await base44.auth.me();
    const influencers = await base44.entities.Influencer.filter({ user_email: user.email });
    if (influencers.length > 0) {
      setInfluencer(influencers[0]);
    }
    const allCampaigns = await base44.entities.Campaign.list();
    setCampaigns(allCampaigns);
  };

  const handleAvatarUpload = async (fileUrl) => {
    if (influencer) {
      await base44.entities.Influencer.update(influencer.id, { avatar: fileUrl });
      await loadData();
    }
  };

  const formatFollowers = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
    return num || 0;
  };

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'campaigns', label: 'Campaign Requests', icon: Megaphone },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'pricing', label: 'Pricing', icon: DollarSign },
    { id: 'settings', label: 'Settings', icon: Settings },
    ...(!influencer?.is_pro ? [{ id: 'gopro', label: 'Go to Pro', icon: Star, isPro: true }] : []),
  ];

  if (!influencer) {
    return (
      <AnimatedGradientBg className="min-h-screen flex items-center justify-center p-6">
        <GlassCard className="p-8 text-center max-w-md">
          <h2 className="text-xl font-bold mb-4">No Influencer Profile Found</h2>
          <p className="text-gray-600 mb-4">Create your influencer profile to access the dashboard.</p>
          <Link to={createPageUrl('InfluencerOnboarding')}>
            <Button className="bg-gradient-to-r from-purple-500 to-violet-500">
              Create Profile
            </Button>
          </Link>
        </GlassCard>
      </AnimatedGradientBg>
    );
  }

  const stats = [
    { label: 'Total Followers', value: formatFollowers(influencer.instagram_followers), icon: Users, color: 'from-pink-500 to-rose-500' },
    { label: 'Engagement Rate', value: `${influencer.engagement_rate || 4.5}%`, icon: Activity, color: 'from-purple-500 to-violet-500' },
    { label: 'Profile Rating', value: influencer.rating?.toFixed(1) || '5.0', icon: Star, color: 'from-amber-500 to-orange-500' },
    { label: 'Starting Price', value: `₹${(influencer.price || 0).toLocaleString('en-IN')}`, icon: DollarSign, color: 'from-green-500 to-emerald-500' },
  ];

  const openCampaigns = campaigns.filter(c => c.status === 'open');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-violet-50">
      <ProPopup isPro={influencer?.is_pro} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="grid lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <GlassCard className="p-4" hover={false}>
                <div className="text-center mb-6">
                  <div className="mx-auto mb-3">
                    <ProfileUpload 
                      currentAvatar={influencer.avatar}
                      onUploadSuccess={handleAvatarUpload}
                    />
                  </div>
                  <h3 className="font-bold text-gray-900">{influencer.full_name}</h3>
                  <p className="text-sm text-gray-500 capitalize">{influencer.category?.replace(/_/g, ' ')}</p>
                  {influencer.is_pro && (
                    <Badge className="mt-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                      <Star className="w-3 h-3 mr-1" />
                      Pro
                    </Badge>
                  )}
                  <div className="flex items-center justify-center gap-3 mt-3">
                    {influencer.instagram_handle && (
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Instagram className="w-4 h-4 text-pink-500" />
                        {formatFollowers(influencer.instagram_followers)}
                      </div>
                    )}
                    {influencer.youtube_subscribers > 0 && (
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Youtube className="w-4 h-4 text-red-500" />
                        {formatFollowers(influencer.youtube_subscribers)}
                      </div>
                    )}
                  </div>
                </div>

                <nav className="space-y-1">
                  {menuItems.map((item) => {
                    if (item.id === 'gopro') {
                      return (
                        <Link key={item.id} to={createPageUrl('ProPlan')}>
                          <button
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90"
                          >
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium">{item.label}</span>
                          </button>
                        </Link>
                      );
                    }
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                          activeTab === item.id
                            ? 'bg-gradient-to-r from-purple-500 to-violet-500 text-white'
                            : 'text-gray-600 hover:bg-purple-50'
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </GlassCard>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {activeTab === 'overview' && (
                <>
                  {/* Stats */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    {stats.map((stat, i) => (
                      <GlassCard key={i} className="p-4 sm:p-5" delay={i * 0.1}>
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                          <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </div>
                        <p className="text-xs sm:text-sm text-gray-500">{stat.label}</p>
                        <p className="text-lg sm:text-2xl font-bold text-gray-900">{stat.value}</p>
                      </GlassCard>
                    ))}
                  </div>

                  {/* Engagement Chart */}
                  <GlassCard className="p-6" hover={false}>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Weekly Engagement</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={engagementData}>
                          <defs>
                            <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                          <XAxis dataKey="name" stroke="#888" />
                          <YAxis stroke="#888" />
                          <Tooltip />
                          <Area type="monotone" dataKey="views" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorViews)" strokeWidth={2} />
                          <Area type="monotone" dataKey="engagement" stroke="#ec4899" fillOpacity={1} fill="url(#colorEngagement)" strokeWidth={2} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </GlassCard>

                  {/* Audience & Campaigns */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <GlassCard className="p-6" hover={false}>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Audience Demographics</h3>
                      <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartPieChart>
                            <Pie
                              data={audienceData}
                              cx="50%"
                              cy="50%"
                              innerRadius={50}
                              outerRadius={80}
                              paddingAngle={5}
                              dataKey="value"
                            >
                              {audienceData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </RechartPieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="flex flex-wrap justify-center gap-4 mt-4">
                        {audienceData.map((item, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                            <span>{item.name}: {item.value}%</span>
                          </div>
                        ))}
                      </div>
                    </GlassCard>

                    <GlassCard className="p-6" hover={false}>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Available Campaigns</h3>
                      {openCampaigns.length > 0 ? (
                        <div className="space-y-3">
                          {openCampaigns.slice(0, 3).map((campaign, i) => (
                            <div key={i} className="p-3 bg-purple-50 rounded-xl">
                              <p className="font-medium text-gray-900">{campaign.title}</p>
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-sm text-gray-500">{campaign.brand_name}</span>
                                <span className="text-sm font-bold text-purple-600">₹{campaign.budget?.toLocaleString('en-IN')}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <Megaphone className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                          <p className="text-gray-500">No campaigns available yet</p>
                        </div>
                      )}
                      <Link to={createPageUrl('Campaigns')}>
                        <Button variant="outline" className="w-full mt-4">
                          View All Campaigns
                        </Button>
                      </Link>
                    </GlassCard>
                  </div>
                </>
              )}

              {activeTab === 'campaigns' && (
                <DashboardRequests 
                  requests={campaigns.filter(c => c.applications?.some(a => a.influencer_id === influencer.id))} 
                  type="influencer" 
                />
              )}

              {activeTab === 'profile' && (
                <GlassCard className="p-6" hover={false}>
                  <h3 className="text-lg font-bold text-gray-900 mb-6">Profile Information</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm text-gray-500">Full Name</label>
                      <p className="font-medium text-gray-900">{influencer.full_name}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Category</label>
                      <p className="font-medium text-gray-900 capitalize">{influencer.category?.replace(/_/g, ' ')}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Location</label>
                      <p className="font-medium text-gray-900">{influencer.location || 'Not specified'}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Experience</label>
                      <p className="font-medium text-gray-900 capitalize">{influencer.experience_level || 'Not specified'}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Instagram</label>
                      <p className="font-medium text-gray-900">{influencer.instagram_handle || 'Not connected'}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Price per Collab</label>
                      <p className="font-medium text-gray-900">₹{(influencer.price || 0).toLocaleString('en-IN')}</p>
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-sm text-gray-500">Bio</label>
                      <p className="font-medium text-gray-900">{influencer.bio || 'No bio added'}</p>
                    </div>
                  </div>
                </GlassCard>
              )}

              {activeTab === 'analytics' && (
                <DashboardAnalytics 
                  profileViews={influencer.instagram_followers ? 2456 : 0}
                  inquiries={campaigns.filter(c => c.applications?.some(a => a.influencer_id === influencer.id)).length}
                  avgResponse={influencer.instagram_followers ? '1h' : null}
                  engagementRate={influencer.engagement_rate || null}
                  hasData={!!influencer.instagram_followers}
                />
              )}

              {activeTab === 'pricing' && (
                <DashboardEarnings 
                  totalEarnings={0}
                  completedProjects={0}
                  pendingPayments={0}
                />
              )}

              {activeTab === 'settings' && (
                <DashboardSettings 
                  profile={influencer} 
                  type="influencer" 
                  onUpdate={loadData}
                />
              )}
            </div>
          </div>
        </div>
        <FusionBot />
    </div>
  );
}