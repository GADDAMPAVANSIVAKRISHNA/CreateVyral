import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { 
  ArrowRight, ArrowLeft, Camera, Video, Palette, 
  Mic, FileText, Image, Upload, Check, Globe, DollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { base44 } from '@/api/base44Client';
import AnimatedGradientBg from '../components/ui/AnimatedGradientBg';
import GlassCard from '../components/ui/GlassCard';
import FusionLogo from '../components/ui/FusionLogo';

const roles = [
  { id: 'photographer', name: 'Photographer', icon: Camera },
  { id: 'video_editor', name: 'Video Editor', icon: Video },
  { id: 'graphic_designer', name: 'Graphic Designer', icon: Palette },
  { id: 'videographer', name: 'Videographer', icon: Video },
  { id: 'thumbnail_artist', name: 'Thumbnail Artist', icon: Image },
  { id: 'social_media_manager', name: 'Social Media Manager', icon: Globe },
  { id: 'content_writer', name: 'Content Writer', icon: FileText },
  { id: 'voice_artist', name: 'Voice Artist', icon: Mic },
  { id: 'vfx_editor', name: 'VFX Editor', icon: Video },
];

const experienceLevels = [
  { id: 'beginner', name: 'Beginner', desc: '0-1 years' },
  { id: 'intermediate', name: 'Intermediate', desc: '2-4 years' },
  { id: 'expert', name: 'Expert', desc: '5+ years' },
];

export default function CreatorOnboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    role: '',
    experience_level: '',
    bio: '',
    location: '',
    pricing: '',
    sample_works: [],
    social_links: {
      instagram: '',
      youtube: '',
      twitter: '',
      portfolio: ''
    }
  });

  const updateForm = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateSocialLinks = (platform, value) => {
    setFormData(prev => ({
      ...prev,
      social_links: { ...prev.social_links, [platform]: value }
    }));
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files).slice(0, 5);
    const urls = [];
    
    for (const file of files) {
      const result = await base44.integrations.Core.UploadFile({ file });
      urls.push(result.file_url);
    }
    
    updateForm('sample_works', [...formData.sample_works, ...urls].slice(0, 5));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    const user = await base44.auth.me();
    
    await base44.entities.Creator.create({
      ...formData,
      user_email: user.email,
      pricing: parseFloat(formData.pricing) || 50
    });
    
    navigate(createPageUrl('CreatorDashboard'));
  };

  const canProceed = () => {
    switch(step) {
      case 1: return formData.role;
      case 2: return formData.experience_level;
      case 3: return formData.full_name && formData.location;
      case 4: return formData.pricing;
      default: return true;
    }
  };

  return (
    <AnimatedGradientBg className="bg-gradient-to-br from-pink-50 via-white to-rose-50">
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

        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                  s < step
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white'
                    : s === step
                    ? 'bg-pink-100 text-pink-600 border-2 border-pink-500'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {s < step ? <Check className="w-5 h-5" /> : s}
              </div>
            ))}
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-pink-500 to-rose-500"
              initial={{ width: 0 }}
              animate={{ width: `${(step / 5) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Form Steps */}
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {/* Step 1: Role Selection */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <GlassCard className="p-8" hover={false}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">What's your creative role?</h2>
                  <p className="text-gray-500 mb-6">Choose your primary skill</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {roles.map((role) => (
                      <button
                        key={role.id}
                        onClick={() => updateForm('role', role.id)}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                          formData.role === role.id
                            ? 'border-pink-500 bg-pink-50'
                            : 'border-gray-200 hover:border-pink-300 hover:bg-pink-50/50'
                        }`}
                      >
                        <role.icon className={`w-6 h-6 mb-2 ${formData.role === role.id ? 'text-pink-500' : 'text-gray-400'}`} />
                        <span className={`text-sm font-medium ${formData.role === role.id ? 'text-pink-700' : 'text-gray-700'}`}>
                          {role.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            )}

            {/* Step 2: Experience */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <GlassCard className="p-8" hover={false}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Experience Level</h2>
                  <p className="text-gray-500 mb-6">How long have you been working in this field?</p>
                  
                  <div className="space-y-3">
                    {experienceLevels.map((level) => (
                      <button
                        key={level.id}
                        onClick={() => updateForm('experience_level', level.id)}
                        className={`w-full p-4 rounded-xl border-2 transition-all duration-300 flex items-center justify-between ${
                          formData.experience_level === level.id
                            ? 'border-pink-500 bg-pink-50'
                            : 'border-gray-200 hover:border-pink-300'
                        }`}
                      >
                        <div className="text-left">
                          <p className={`font-semibold ${formData.experience_level === level.id ? 'text-pink-700' : 'text-gray-700'}`}>
                            {level.name}
                          </p>
                          <p className="text-sm text-gray-500">{level.desc}</p>
                        </div>
                        {formData.experience_level === level.id && (
                          <Check className="w-5 h-5 text-pink-500" />
                        )}
                      </button>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            )}

            {/* Step 3: Basic Info */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <GlassCard className="p-8" hover={false}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Tell us about yourself</h2>
                  <p className="text-gray-500 mb-6">Basic information for your profile</p>
                  
                  <div className="space-y-4">
                    <div>
                      <Label>Full Name</Label>
                      <Input
                        value={formData.full_name}
                        onChange={(e) => updateForm('full_name', e.target.value)}
                        placeholder="John Doe"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Location</Label>
                      <Input
                        value={formData.location}
                        onChange={(e) => updateForm('location', e.target.value)}
                        placeholder="New York, USA"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Bio</Label>
                      <Textarea
                        value={formData.bio}
                        onChange={(e) => updateForm('bio', e.target.value)}
                        placeholder="Tell clients about your work and experience..."
                        className="mt-1 h-24"
                      />
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            )}

            {/* Step 4: Pricing & Portfolio */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <GlassCard className="p-8" hover={false}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Pricing & Portfolio</h2>
                  <p className="text-gray-500 mb-6">Set your rates and showcase your work</p>
                  
                  <div className="space-y-6">
                    <div>
                      <Label className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        Starting Price (USD)
                      </Label>
                      <Input
                        type="number"
                        value={formData.pricing}
                        onChange={(e) => updateForm('pricing', e.target.value)}
                        placeholder="50"
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label className="mb-2 block">Upload Sample Works (up to 5)</Label>
                      <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-pink-300 transition-colors">
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                          id="portfolio-upload"
                        />
                        <label htmlFor="portfolio-upload" className="cursor-pointer">
                          <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-500">Click to upload images</p>
                        </label>
                      </div>
                      {formData.sample_works.length > 0 && (
                        <div className="flex gap-2 mt-3 flex-wrap">
                          {formData.sample_works.map((url, i) => (
                            <img key={i} src={url} alt="" className="w-16 h-16 rounded-lg object-cover" />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            )}

            {/* Step 5: Social Links */}
            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <GlassCard className="p-8" hover={false}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Social Links</h2>
                  <p className="text-gray-500 mb-6">Connect your social profiles (optional)</p>
                  
                  <div className="space-y-4">
                    <div>
                      <Label>Instagram</Label>
                      <Input
                        value={formData.social_links.instagram}
                        onChange={(e) => updateSocialLinks('instagram', e.target.value)}
                        placeholder="@username"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>YouTube</Label>
                      <Input
                        value={formData.social_links.youtube}
                        onChange={(e) => updateSocialLinks('youtube', e.target.value)}
                        placeholder="Channel URL"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Twitter</Label>
                      <Input
                        value={formData.social_links.twitter}
                        onChange={(e) => updateSocialLinks('twitter', e.target.value)}
                        placeholder="@username"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Portfolio Website</Label>
                      <Input
                        value={formData.social_links.portfolio}
                        onChange={(e) => updateSocialLinks('portfolio', e.target.value)}
                        placeholder="https://yourwebsite.com"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
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
            
            {step < 5 ? (
              <Button
                onClick={() => setStep(s => s + 1)}
                disabled={!canProceed()}
                className="rounded-full bg-gradient-to-r from-pink-500 to-rose-500"
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="rounded-full bg-gradient-to-r from-pink-500 to-rose-500"
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