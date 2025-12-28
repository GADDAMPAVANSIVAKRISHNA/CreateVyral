import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import {
  LayoutDashboard, User, Briefcase, DollarSign, BarChart3,
  Settings, Star, Clock, TrendingUp, MessageSquare, Eye
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

export default function CreatorDashboard() {
  const [creator, setCreator] = useState(null);
  const [requests, setRequests] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const user = await base44.auth.me();
    const creators = await base44.entities.Creator.filter({ user_email: user.email });
    if (creators.length > 0) {
      setCreator(creators[0]);
      const allRequests = await base44.entities.ServiceRequest.list();
      setRequests(allRequests.filter(r => r.creator_id === creators[0]?.id));
    }
  };

  const handleAvatarUpload = async (fileUrl) => {
    if (creator) {
      await base44.entities.Creator.update(creator.id, { avatar: fileUrl });
      await loadData();
    }
  };

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'requests', label: 'Requests', icon: Briefcase },
    { id: 'earnings', label: 'Earnings', icon: DollarSign },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
    ...(!creator?.is_pro ? [{ id: 'gopro', label: 'Go to Pro', icon: Star, isPro: true }] : []),
  ];

  if (!creator) {
    return (
      <AnimatedGradientBg className="min-h-screen flex items-center justify-center p-6">
        <GlassCard className="p-8 text-center max-w-md">
          <h2 className="text-xl font-bold mb-4">No Creator Profile Found</h2>
          <p className="text-gray-600 mb-4">Create your creator profile to access the dashboard.</p>
          <Link to={createPageUrl('CreatorOnboarding')}>
            <Button className="bg-gradient-to-r from-pink-500 to-rose-500">
              Create Profile
            </Button>
          </Link>
        </GlassCard>
      </AnimatedGradientBg>
    );
  }

  const completedRequests = requests.filter(r => r.status === 'completed');
  const totalEarnings = completedRequests.length * (creator?.pricing || 0);

  const stats = [
    { label: 'Total Earnings', value: `₹${totalEarnings.toLocaleString('en-IN')}`, icon: DollarSign, color: 'from-green-500 to-emerald-500' },
    { label: 'Orders Completed', value: creator?.orders_completed || completedRequests.length, icon: Briefcase, color: 'from-blue-500 to-indigo-500' },
    { label: 'Rating', value: creator?.rating?.toFixed(1) || '5.0', icon: Star, color: 'from-amber-500 to-orange-500' },
    { label: 'Response Rate', value: `${creator?.response_rate || 100}%`, icon: MessageSquare, color: 'from-purple-500 to-violet-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      <ProPopup isPro={creator?.is_pro} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="grid lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <GlassCard className="p-4" hover={false}>
                <div className="text-center mb-6">
                  <div className="mx-auto mb-3">
                    <ProfileUpload 
                      currentAvatar={creator.avatar}
                      onUploadSuccess={handleAvatarUpload}
                    />
                  </div>
                  <h3 className="font-bold text-gray-900">{creator.full_name}</h3>
                  <p className="text-sm text-gray-500 capitalize">{creator.role?.replace(/_/g, ' ')}</p>
                  {creator.is_pro && (
                    <Badge className="mt-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                      <Star className="w-3 h-3 mr-1" />
                      Pro
                    </Badge>
                  )}
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
                            ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white'
                            : 'text-gray-600 hover:bg-pink-50'
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

                  {/* Recent Requests Preview */}
                  <GlassCard className="p-6" hover={false}>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Requests</h3>
                    {requests.length > 0 ? (
                      <div className="space-y-3">
                        {requests.slice(0, 3).map((request, i) => (
                          <div key={i} className="p-4 bg-gray-50 rounded-xl flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-900">{request.service_type}</p>
                              <p className="text-sm text-gray-500">From: {request.client_email}</p>
                            </div>
                            <Badge className={
                              request.status === 'completed' ? 'bg-green-100 text-green-700' :
                              request.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                              'bg-yellow-100 text-yellow-700'
                            }>
                              {request.status?.replace(/_/g, ' ')}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">No requests yet — clients will contact you here.</p>
                      </div>
                    )}
                  </GlassCard>

                  {/* Analytics Preview */}
                  <GlassCard className="p-6" hover={false}>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Performance Analytics</h3>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="p-4 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl">
                        <div className="flex items-center gap-2 mb-2">
                          <Eye className="w-4 h-4 text-pink-500" />
                          <span className="text-sm text-gray-600">Profile Views</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{requests.length > 0 ? '1,234' : '0'}</p>
                        {requests.length > 0 && (
                          <div className="flex items-center gap-1 mt-1 text-green-600 text-sm">
                            <TrendingUp className="w-3 h-3" />
                            +12% this week
                          </div>
                        )}
                      </div>
                      <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                        <div className="flex items-center gap-2 mb-2">
                          <MessageSquare className="w-4 h-4 text-blue-500" />
                          <span className="text-sm text-gray-600">Inquiries</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{requests.length || '0'}</p>
                      </div>
                      <div className="p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="w-4 h-4 text-purple-500" />
                          <span className="text-sm text-gray-600">Avg Response</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{requests.length > 0 ? '2h' : '—'}</p>
                      </div>
                    </div>
                  </GlassCard>
                </>
              )}

              {activeTab === 'profile' && (
                <GlassCard className="p-6" hover={false}>
                  <h3 className="text-lg font-bold text-gray-900 mb-6">Profile Information</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm text-gray-500">Full Name</label>
                      <p className="font-medium text-gray-900">{creator.full_name}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Role</label>
                      <p className="font-medium text-gray-900 capitalize">{creator.role?.replace(/_/g, ' ')}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Location</label>
                      <p className="font-medium text-gray-900">{creator.location || 'Not specified'}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Starting Price</label>
                      <p className="font-medium text-gray-900">₹{creator.pricing?.toLocaleString('en-IN') || '0'}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Experience Level</label>
                      <p className="font-medium text-gray-900 capitalize">{creator.experience_level || 'Not specified'}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Response Rate</label>
                      <p className="font-medium text-gray-900">{creator.response_rate || 100}%</p>
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-sm text-gray-500">Bio</label>
                      <p className="font-medium text-gray-900">{creator.bio || 'No bio added'}</p>
                    </div>
                  </div>
                </GlassCard>
              )}

              {activeTab === 'requests' && (
                <DashboardRequests requests={requests} type="creator" />
              )}

              {activeTab === 'earnings' && (
                <DashboardEarnings 
                  totalEarnings={totalEarnings}
                  completedProjects={completedRequests.length}
                  pendingPayments={requests.filter(r => r.status === 'in_progress').length * (creator?.pricing || 0)}
                />
              )}

              {activeTab === 'analytics' && (
                <DashboardAnalytics 
                  profileViews={requests.length > 0 ? 1234 : 0}
                  inquiries={requests.length}
                  avgResponse={requests.length > 0 ? '2h' : null}
                  engagementRate={requests.length > 0 ? 78 : null}
                  hasData={requests.length > 0}
                />
              )}

              {activeTab === 'settings' && (
                <DashboardSettings 
                  profile={creator} 
                  type="creator" 
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