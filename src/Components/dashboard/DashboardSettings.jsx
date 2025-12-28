import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Lock, Bell, Globe, LogOut, Trash2, 
  Camera, DollarSign, Clock, Image, Instagram, Youtube, AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { base44 } from '@/api/base44Client';
import GlassCard from '../ui/GlassCard';

export default function DashboardSettings({ profile, type = 'creator', onUpdate }) {
  const [activeSection, setActiveSection] = useState('profile');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    bio: profile?.bio || '',
    location: profile?.location || '',
    pricing: profile?.pricing || profile?.price || 0,
    hourly_rate: profile?.hourly_rate || 0,
    delivery_time: profile?.delivery_time || '',
    instagram_handle: profile?.instagram_handle || '',
    instagram_followers: profile?.instagram_followers || 0,
    youtube_handle: profile?.youtube_handle || '',
    youtube_subscribers: profile?.youtube_subscribers || 0,
  });
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    marketing: false,
  });
  const [availability, setAvailability] = useState(true);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    if (type === 'creator') {
      await base44.entities.Creator.update(profile.id, formData);
    } else {
      await base44.entities.Influencer.update(profile.id, formData);
    }
    setSaving(false);
    onUpdate?.();
  };

  const handleLogout = () => {
    base44.auth.logout();
  };

  const handleDeleteAccount = async () => {
    // In a real app, this would delete the account
    setShowDeleteDialog(false);
    alert('Account deletion requested. Our team will process this within 48 hours.');
  };

  const sections = [
    { id: 'profile', label: 'Edit Profile', icon: User },
    { id: 'password', label: 'Update Password', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'availability', label: 'Availability', icon: Globe },
    ...(type === 'creator' ? [
      { id: 'pricing', label: 'Pricing & Rates', icon: DollarSign },
      { id: 'portfolio', label: 'Portfolio', icon: Image },
    ] : [
      { id: 'social', label: 'Social Handles', icon: Instagram },
    ]),
  ];

  return (
    <div className="grid md:grid-cols-4 gap-6">
      {/* Settings Navigation */}
      <GlassCard className="p-4 md:col-span-1" hover={false}>
        <nav className="space-y-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeSection === section.id
                  ? 'bg-gradient-to-r from-purple-500 to-violet-500 text-white'
                  : 'text-gray-600 hover:bg-purple-50'
              }`}
            >
              <section.icon className="w-5 h-5" />
              <span className="font-medium text-sm">{section.label}</span>
            </button>
          ))}
          
          <div className="border-t border-gray-200 my-4" />
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium text-sm">Logout</span>
          </button>
          
          <button
            onClick={() => setShowDeleteDialog(true)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all"
          >
            <Trash2 className="w-5 h-5" />
            <span className="font-medium text-sm">Delete Account</span>
          </button>
        </nav>
      </GlassCard>

      {/* Settings Content */}
      <div className="md:col-span-3">
        <AnimatePresence mode="wait">
          {activeSection === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <GlassCard className="p-6" hover={false}>
                <h3 className="text-lg font-bold text-gray-900 mb-6">Edit Profile</h3>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>Full Name</Label>
                      <Input
                        value={formData.full_name}
                        onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Location</Label>
                      <Input
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Bio</Label>
                    <Textarea
                      value={formData.bio}
                      onChange={(e) => setFormData({...formData, bio: e.target.value})}
                      className="mt-1"
                      rows={4}
                      placeholder="Tell clients about yourself..."
                    />
                  </div>
                  <Button onClick={handleSave} disabled={saving} className="bg-gradient-to-r from-purple-500 to-violet-500">
                    {saving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {activeSection === 'password' && (
            <motion.div
              key="password"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <GlassCard className="p-6" hover={false}>
                <h3 className="text-lg font-bold text-gray-900 mb-6">Update Password</h3>
                <div className="space-y-4 max-w-md">
                  <div>
                    <Label>Current Password</Label>
                    <Input type="password" className="mt-1" />
                  </div>
                  <div>
                    <Label>New Password</Label>
                    <Input type="password" className="mt-1" />
                  </div>
                  <div>
                    <Label>Confirm New Password</Label>
                    <Input type="password" className="mt-1" />
                  </div>
                  <Button className="bg-gradient-to-r from-purple-500 to-violet-500">
                    Update Password
                  </Button>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {activeSection === 'notifications' && (
            <motion.div
              key="notifications"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <GlassCard className="p-6" hover={false}>
                <h3 className="text-lg font-bold text-gray-900 mb-6">Notification Preferences</h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Email Notifications</p>
                      <p className="text-sm text-gray-500">Receive updates via email</p>
                    </div>
                    <Switch checked={notifications.email} onCheckedChange={(v) => setNotifications({...notifications, email: v})} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Push Notifications</p>
                      <p className="text-sm text-gray-500">Get notified about new requests</p>
                    </div>
                    <Switch checked={notifications.push} onCheckedChange={(v) => setNotifications({...notifications, push: v})} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Marketing Emails</p>
                      <p className="text-sm text-gray-500">Receive tips and promotions</p>
                    </div>
                    <Switch checked={notifications.marketing} onCheckedChange={(v) => setNotifications({...notifications, marketing: v})} />
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {activeSection === 'availability' && (
            <motion.div
              key="availability"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <GlassCard className="p-6" hover={false}>
                <h3 className="text-lg font-bold text-gray-900 mb-6">Availability Status</h3>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-900">Available for Work</p>
                    <p className="text-sm text-gray-500">
                      {availability ? 'You are visible to clients' : 'Your profile is hidden'}
                    </p>
                  </div>
                  <Switch checked={availability} onCheckedChange={setAvailability} />
                </div>
                <div className={`mt-4 p-4 rounded-xl ${availability ? 'bg-green-50' : 'bg-yellow-50'}`}>
                  <p className={`text-sm ${availability ? 'text-green-700' : 'text-yellow-700'}`}>
                    {availability 
                      ? '✓ Your profile is currently active and visible to potential clients.'
                      : '⚠ Your profile is hidden. Turn on availability to receive new requests.'}
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {activeSection === 'pricing' && type === 'creator' && (
            <motion.div
              key="pricing"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <GlassCard className="p-6" hover={false}>
                <h3 className="text-lg font-bold text-gray-900 mb-6">Pricing & Rates</h3>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>Starting Price (₹)</Label>
                      <Input
                        type="number"
                        value={formData.pricing}
                        onChange={(e) => setFormData({...formData, pricing: parseInt(e.target.value)})}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Hourly Rate (₹)</Label>
                      <Input
                        type="number"
                        value={formData.hourly_rate}
                        onChange={(e) => setFormData({...formData, hourly_rate: parseInt(e.target.value)})}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Average Delivery Time</Label>
                    <Input
                      value={formData.delivery_time}
                      onChange={(e) => setFormData({...formData, delivery_time: e.target.value})}
                      placeholder="e.g., 2-3 days"
                      className="mt-1"
                    />
                  </div>
                  <Button onClick={handleSave} disabled={saving} className="bg-gradient-to-r from-purple-500 to-violet-500">
                    {saving ? 'Saving...' : 'Save Pricing'}
                  </Button>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {activeSection === 'portfolio' && type === 'creator' && (
            <motion.div
              key="portfolio"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <GlassCard className="p-6" hover={false}>
                <h3 className="text-lg font-bold text-gray-900 mb-6">Portfolio Images</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {(profile?.sample_works || []).map((img, i) => (
                    <div key={i} className="aspect-square rounded-xl overflow-hidden bg-gray-100">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                  <button className="aspect-square rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:border-purple-400 hover:text-purple-400 transition-colors">
                    <Camera className="w-8 h-8 mb-2" />
                    <span className="text-sm">Add Image</span>
                  </button>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {activeSection === 'social' && type === 'influencer' && (
            <motion.div
              key="social"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <GlassCard className="p-6" hover={false}>
                <h3 className="text-lg font-bold text-gray-900 mb-6">Social Media Handles</h3>
                <div className="space-y-6">
                  <div className="p-4 bg-pink-50 rounded-xl">
                    <div className="flex items-center gap-2 mb-3">
                      <Instagram className="w-5 h-5 text-pink-500" />
                      <span className="font-semibold">Instagram</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>Handle</Label>
                        <Input
                          value={formData.instagram_handle}
                          onChange={(e) => setFormData({...formData, instagram_handle: e.target.value})}
                          placeholder="@username"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>Followers</Label>
                        <Input
                          type="number"
                          value={formData.instagram_followers}
                          onChange={(e) => setFormData({...formData, instagram_followers: parseInt(e.target.value)})}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-red-50 rounded-xl">
                    <div className="flex items-center gap-2 mb-3">
                      <Youtube className="w-5 h-5 text-red-500" />
                      <span className="font-semibold">YouTube</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>Channel</Label>
                        <Input
                          value={formData.youtube_handle}
                          onChange={(e) => setFormData({...formData, youtube_handle: e.target.value})}
                          placeholder="Channel name"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>Subscribers</Label>
                        <Input
                          type="number"
                          value={formData.youtube_subscribers}
                          onChange={(e) => setFormData({...formData, youtube_subscribers: parseInt(e.target.value)})}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label>Price per Collaboration (₹)</Label>
                    <Input
                      type="number"
                      value={formData.pricing}
                      onChange={(e) => setFormData({...formData, pricing: parseInt(e.target.value)})}
                      className="mt-1"
                    />
                  </div>

                  <Button onClick={handleSave} disabled={saving} className="bg-gradient-to-r from-purple-500 to-violet-500">
                    {saving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Delete Account Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="w-5 h-5" />
              Delete Account
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-600">
              Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteAccount}>
              Delete Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}