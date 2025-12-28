import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '../utils';
import {
  ArrowRight, ArrowLeft, Check, Upload, Target,
  MapPin, Users, DollarSign, FileText, Image
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

const niches = [
  'Fashion & Beauty', 'Fitness', 'Travel', 'Food', 'Tech',
  'Gaming', 'Music', 'Dance', 'Comedy', 'Education', 'Lifestyle', 'Other'
];

const contentTypes = [
  { id: 'reel', name: 'Instagram Reel' },
  { id: 'post', name: 'Instagram Post' },
  { id: 'story', name: 'Instagram Story' },
  { id: 'youtube_video', name: 'YouTube Video' },
  { id: 'multiple', name: 'Multiple Formats' },
];

const followerRanges = [
  { id: '0-10k', name: 'Nano (0-10K)', desc: 'High engagement, niche audiences' },
  { id: '10k-50k', name: 'Micro (10K-50K)', desc: 'Strong community, affordable' },
  { id: '50k-200k', name: 'Mid (50K-200K)', desc: 'Good reach, quality content' },
  { id: '200k-1M', name: 'Macro (200K-1M)', desc: 'Large reach, professional' },
  { id: '1M+', name: 'Mega (1M+)', desc: 'Maximum exposure, celebrity' },
];

export default function PostCampaign() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    brand_name: '',
    description: '',
    niche: '',
    target_location: '',
    follower_range: '',
    content_type: '',
    budget: '',
    deadline: '',
    reference_images: []
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
    
    updateForm('reference_images', [...formData.reference_images, ...urls].slice(0, 5));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    const user = await base44.auth.me();
    
    await base44.entities.Campaign.create({
      ...formData,
      brand_email: user.email,
      budget: parseFloat(formData.budget) || 500,
      status: 'open',
      applications: []
    });
    
    navigate(createPageUrl('Campaigns'));
  };

  const canProceed = () => {
    switch(step) {
      case 1: return formData.title && formData.brand_name;
      case 2: return formData.niche && formData.content_type;
      case 3: return formData.follower_range && formData.target_location;
      case 4: return formData.budget;
      default: return true;
    }
  };

  return (
    <AnimatedGradientBg className="bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <div className="min-h-screen py-8 px-4">
        {/* Header */}
        <div className="max-w-2xl mx-auto mb-8">
          <FusionLogo size={40} />
        </div>

        {/* Progress */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                  s < step
                    ? 'bg-gradient-to-r from-indigo-500 to-blue-500 text-white'
                    : s === step
                    ? 'bg-indigo-100 text-indigo-600 border-2 border-indigo-500'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {s < step ? <Check className="w-5 h-5" /> : s}
              </div>
            ))}
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 to-blue-500"
              initial={{ width: 0 }}
              animate={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* Steps */}
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <GlassCard className="p-8" hover={false}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Campaign Basics</h2>
                  <p className="text-gray-500 mb-6">Tell us about your campaign</p>
                  
                  <div className="space-y-4">
                    <div>
                      <Label>Campaign Title</Label>
                      <Input
                        value={formData.title}
                        onChange={(e) => updateForm('title', e.target.value)}
                        placeholder="e.g., Summer Collection Launch"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Brand Name</Label>
                      <Input
                        value={formData.brand_name}
                        onChange={(e) => updateForm('brand_name', e.target.value)}
                        placeholder="Your brand or company name"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Campaign Description</Label>
                      <Textarea
                        value={formData.description}
                        onChange={(e) => updateForm('description', e.target.value)}
                        placeholder="Describe what you're looking for..."
                        className="mt-1 h-32"
                      />
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            )}

            {/* Step 2: Content Type */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <GlassCard className="p-8" hover={false}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Content Requirements</h2>
                  <p className="text-gray-500 mb-6">What type of content do you need?</p>
                  
                  <div className="space-y-6">
                    <div>
                      <Label>Niche / Industry</Label>
                      <Select value={formData.niche} onValueChange={(v) => updateForm('niche', v)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select niche" />
                        </SelectTrigger>
                        <SelectContent>
                          {niches.map((niche) => (
                            <SelectItem key={niche} value={niche}>{niche}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label className="mb-3 block">Content Type</Label>
                      <div className="grid grid-cols-2 gap-3">
                        {contentTypes.map((type) => (
                          <button
                            key={type.id}
                            onClick={() => updateForm('content_type', type.id)}
                            className={`p-4 rounded-xl border-2 text-left transition-all ${
                              formData.content_type === type.id
                                ? 'border-indigo-500 bg-indigo-50'
                                : 'border-gray-200 hover:border-indigo-300'
                            }`}
                          >
                            <span className={`font-medium ${formData.content_type === type.id ? 'text-indigo-700' : 'text-gray-700'}`}>
                              {type.name}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            )}

            {/* Step 3: Target Audience */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <GlassCard className="p-8" hover={false}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Target Audience</h2>
                  <p className="text-gray-500 mb-6">Define your ideal influencer</p>
                  
                  <div className="space-y-6">
                    <div>
                      <Label className="flex items-center gap-2 mb-3">
                        <Users className="w-4 h-4" />
                        Follower Range
                      </Label>
                      <div className="space-y-2">
                        {followerRanges.map((range) => (
                          <button
                            key={range.id}
                            onClick={() => updateForm('follower_range', range.id)}
                            className={`w-full p-4 rounded-xl border-2 text-left transition-all flex justify-between items-center ${
                              formData.follower_range === range.id
                                ? 'border-indigo-500 bg-indigo-50'
                                : 'border-gray-200 hover:border-indigo-300'
                            }`}
                          >
                            <div>
                              <p className={`font-medium ${formData.follower_range === range.id ? 'text-indigo-700' : 'text-gray-700'}`}>
                                {range.name}
                              </p>
                              <p className="text-sm text-gray-500">{range.desc}</p>
                            </div>
                            {formData.follower_range === range.id && (
                              <Check className="w-5 h-5 text-indigo-500" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <Label className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Target Location
                      </Label>
                      <Input
                        value={formData.target_location}
                        onChange={(e) => updateForm('target_location', e.target.value)}
                        placeholder="e.g., USA, Europe, Worldwide"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            )}

            {/* Step 4: Budget & Timeline */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <GlassCard className="p-8" hover={false}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Budget & Timeline</h2>
                  <p className="text-gray-500 mb-6">Set your campaign parameters</p>
                  
                  <div className="space-y-4">
                    <div>
                      <Label className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        Campaign Budget (USD)
                      </Label>
                      <Input
                        type="number"
                        value={formData.budget}
                        onChange={(e) => updateForm('budget', e.target.value)}
                        placeholder="500"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Campaign Deadline</Label>
                      <Input
                        type="date"
                        value={formData.deadline}
                        onChange={(e) => updateForm('deadline', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            )}

            {/* Step 5: References */}
            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <GlassCard className="p-8" hover={false}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Reference Images</h2>
                  <p className="text-gray-500 mb-6">Upload examples of content you like (optional)</p>
                  
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-indigo-300 transition-colors">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="reference-upload"
                    />
                    <label htmlFor="reference-upload" className="cursor-pointer">
                      <Image className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600 font-medium">Click to upload images</p>
                      <p className="text-sm text-gray-400 mt-1">Up to 5 images</p>
                    </label>
                  </div>
                  
                  {formData.reference_images.length > 0 && (
                    <div className="grid grid-cols-5 gap-3 mt-4">
                      {formData.reference_images.map((url, i) => (
                        <img key={i} src={url} alt="" className="w-full aspect-square rounded-lg object-cover" />
                      ))}
                    </div>
                  )}

                  {/* Preview */}
                  <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl">
                    <h4 className="font-bold text-gray-900 mb-2">Campaign Summary</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <p><span className="text-gray-500">Title:</span> {formData.title}</p>
                      <p><span className="text-gray-500">Brand:</span> {formData.brand_name}</p>
                      <p><span className="text-gray-500">Budget:</span> ${formData.budget}</p>
                      <p><span className="text-gray-500">Niche:</span> {formData.niche}</p>
                    </div>
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
            
            {step < 5 ? (
              <Button
                onClick={() => setStep(s => s + 1)}
                disabled={!canProceed()}
                className="rounded-full bg-gradient-to-r from-indigo-500 to-blue-500"
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="rounded-full bg-gradient-to-r from-indigo-500 to-blue-500"
              >
                {isSubmitting ? 'Posting...' : 'Post Campaign'}
                <Check className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </AnimatedGradientBg>
  );
}