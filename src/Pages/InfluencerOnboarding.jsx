import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { 
  ArrowRight, ArrowLeft, Check, Upload,
  Instagram, Youtube, MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { base44 } from '@/api/base44Client';
import AnimatedGradientBg from '../components/ui/AnimatedGradientBg';
import GlassCard from '../components/ui/GlassCard';
import FusionLogo from '../components/ui/FusionLogo';

const categories = [
  { id: 'foodie', name: 'Foodie', emoji: '🍕' },
  { id: 'social_media', name: 'Social Media', emoji: '📱' },
  { id: 'trolls', name: 'Trolls', emoji: '😈' },
  { id: 'memes', name: 'Memes', emoji: '😂' },
  { id: 'fitness', name: 'Fitness', emoji: '💪' },
  { id: 'health', name: 'Health', emoji: '🌿' },
  { id: 'dancer', name: 'Dancer', emoji: '💃' },
  { id: 'singer', name: 'Singer', emoji: '🎤' },
  { id: 'youtuber', name: 'YouTuber', emoji: '🎬' },
  { id: 'parenting', name: 'Parenting', emoji: '👶' },
  { id: 'travel', name: 'Travel', emoji: '✈️' },
  { id: 'fashion_beauty', name: 'Fashion & Beauty', emoji: '💄' },
  { id: 'others', name: 'Others', emoji: '✨' },
];

const experienceLevels = [
  { id: 'beginner', name: 'Beginner', desc: 'Just starting out' },
  { id: 'intermediate', name: 'Intermediate', desc: '1-3 years experience' },
  { id: 'expert', name: 'Expert', desc: '3+ years experience' },
];

const calculatePrice = (followers) => {
  if (followers >= 1000000) return 500;
  if (followers >= 200000) return 250;
  if (followers >= 50000) return 100;
  if (followers >= 10000) return 50;
  return 20;
};

export default function InfluencerOnboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    category: '',
    instagram_handle: '',
    instagram_followers: '',
    youtube_handle: '',
    youtube_subscribers: '',
    tiktok_handle: '',
    location: '',
    experience_level: '',
    bio: '',
    sample_images: []
  });

  const updateForm = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files).slice(0, 5);
    const urls = [];
    
    for (const file of files) {
      const result = await base44.integrations.Core.UploadFile({ file });
      urls.push(result.file_url);
    }
    
    updateForm('sample_images', [...formData.sample_images, ...urls].slice(0, 5));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    const user = await base44.auth.me();
    const followers = parseInt(formData.instagram_followers) || 0;
    const price = calculatePrice(followers);
    
    await base44.entities.Influencer.create({
      ...formData,
      user_email: user.email,
      instagram_followers: followers,
      youtube_subscribers: parseInt(formData.youtube_subscribers) || 0,
      price: price
    });
    
    navigate(createPageUrl('InfluencerDashboard'));
  };

  const canProceed = () => {
    switch(step) {
      case 1: return formData.category;
      case 2: return formData.instagram_handle && formData.instagram_followers;
      case 3: return formData.full_name && formData.location && formData.experience_level;
      default: return true;
    }
  };

  return (
    <AnimatedGradientBg className="bg-gradient-to-br from-purple-50 via-white to-violet-50">
      <div className="min-h-screen py-8 px-4">
        {/* Header */}
        <div className="max-w-2xl mx-auto mb-8">
          <Link to={createPageUrl('Onboarding')}>
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/692f0f1978791959e9444ac5/a976ca7d4_image.png"
              alt="CreateVyral"
              className="w-12 h-12"
            />
          </Link>
        </div>

        {/* Progress */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                  s < step
                    ? 'bg-gradient-to-r from-purple-500 to-violet-500 text-white'
                    : s === step
                    ? 'bg-purple-100 text-purple-600 border-2 border-purple-500'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {s < step ? <Check className="w-5 h-5" /> : s}
              </div>
            ))}
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-violet-500"
              initial={{ width: 0 }}
              animate={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Steps */}
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {/* Step 1: Category */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <GlassCard className="p-8" hover={false}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">What's your niche?</h2>
                  <p className="text-gray-500 mb-6">Select your primary content category</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => updateForm('category', cat.id)}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                          formData.category === cat.id
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50/50'
                        }`}
                      >
                        <span className="text-2xl mb-2 block">{cat.emoji}</span>
                        <span className={`text-sm font-medium ${formData.category === cat.id ? 'text-purple-700' : 'text-gray-700'}`}>
                          {cat.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            )}

            {/* Step 2: Social Handles */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <GlassCard className="p-8" hover={false}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Social Presence</h2>
                  <p className="text-gray-500 mb-6">Connect your social media accounts</p>
                  
                  <div className="space-y-6">
                    <div className="p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl">
                      <div className="flex items-center gap-2 mb-3">
                        <Instagram className="w-5 h-5 text-pink-500" />
                        <span className="font-semibold">Instagram</span>
                        <span className="text-xs text-pink-600 bg-pink-100 px-2 py-0.5 rounded-full">Required</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label className="text-xs">Handle</Label>
                          <Input
                            value={formData.instagram_handle}
                            onChange={(e) => updateForm('instagram_handle', e.target.value)}
                            placeholder="@username"
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Followers</Label>
                          <Input
                            type="number"
                            value={formData.instagram_followers}
                            onChange={(e) => updateForm('instagram_followers', e.target.value)}
                            placeholder="10000"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-2 mb-3">
                        <Youtube className="w-5 h-5 text-red-500" />
                        <span className="font-semibold">YouTube</span>
                        <span className="text-xs text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">Optional</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label className="text-xs">Channel</Label>
                          <Input
                            value={formData.youtube_handle}
                            onChange={(e) => updateForm('youtube_handle', e.target.value)}
                            placeholder="Channel name"
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Subscribers</Label>
                          <Input
                            type="number"
                            value={formData.youtube_subscribers}
                            onChange={(e) => updateForm('youtube_subscribers', e.target.value)}
                            placeholder="5000"
                          />
                        </div>
                      </div>
                    </div>


                  </div>
                </GlassCard>
              </motion.div>
            )}

            {/* Step 3: Personal Info */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <GlassCard className="p-8" hover={false}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">About You</h2>
                  <p className="text-gray-500 mb-6">Tell brands about yourself</p>
                  
                  <div className="space-y-4">
                    <div>
                      <Label>Full Name</Label>
                      <Input
                        value={formData.full_name}
                        onChange={(e) => updateForm('full_name', e.target.value)}
                        placeholder="Your name"
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Location
                      </Label>
                      <Input
                        value={formData.location}
                        onChange={(e) => updateForm('location', e.target.value)}
                        placeholder="City, Country"
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label>Experience Level</Label>
                      <div className="grid grid-cols-3 gap-3 mt-2">
                        {experienceLevels.map((level) => (
                          <button
                            key={level.id}
                            onClick={() => updateForm('experience_level', level.id)}
                            className={`p-3 rounded-xl border-2 text-center transition-all ${
                              formData.experience_level === level.id
                                ? 'border-purple-500 bg-purple-50'
                                : 'border-gray-200 hover:border-purple-300'
                            }`}
                          >
                            <p className={`font-medium text-sm ${formData.experience_level === level.id ? 'text-purple-700' : 'text-gray-700'}`}>
                              {level.name}
                            </p>
                            <p className="text-xs text-gray-500">{level.desc}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label>Bio</Label>
                      <Textarea
                        value={formData.bio}
                        onChange={(e) => updateForm('bio', e.target.value)}
                        placeholder="Tell brands what makes you unique..."
                        className="mt-1 h-24"
                      />
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            )}

            {/* Step 4: Portfolio */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <GlassCard className="p-8" hover={false}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Best Work</h2>
                  <p className="text-gray-500 mb-6">Upload up to 5 sample images</p>
                  
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-purple-300 transition-colors">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="portfolio-upload"
                    />
                    <label htmlFor="portfolio-upload" className="cursor-pointer">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600 font-medium">Click to upload images</p>
                      <p className="text-sm text-gray-400 mt-1">PNG, JPG up to 10MB each</p>
                    </label>
                  </div>
                  
                  {formData.sample_images.length > 0 && (
                    <div className="grid grid-cols-5 gap-3 mt-4">
                      {formData.sample_images.map((url, i) => (
                        <img key={i} src={url} alt="" className="w-full aspect-square rounded-lg object-cover" />
                      ))}
                    </div>
                  )}

                  {/* Price Preview */}
                  <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl">
                    <p className="text-sm text-gray-600 mb-1">Your suggested price based on followers:</p>
                    <p className="text-3xl font-bold text-purple-600">
                      ${calculatePrice(parseInt(formData.instagram_followers) || 0)}
                      <span className="text-sm font-normal text-gray-500"> / collaboration</span>
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={() => setStep(s => s - 1)}
              disabled={step === 1}
              className="rounded-full"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            
            {step < 4 ? (
              <Button
                onClick={() => setStep(s => s + 1)}
                disabled={!canProceed()}
                className="rounded-full bg-gradient-to-r from-purple-500 to-violet-500"
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="rounded-full bg-gradient-to-r from-purple-500 to-violet-500"
              >
                {isSubmitting ? 'Creating Profile...' : 'Complete Setup'}
                <Check className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </AnimatedGradientBg>
  );
}