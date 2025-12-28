import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Sparkles, Crown, Zap, Shield, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GlassCard from '../components/ui/GlassCard';
import confetti from 'canvas-confetti';
import { base44 } from '@/api/base44Client';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '../utils';

export default function ProPlan() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    detectUserRole();
  }, []);

  const detectUserRole = async () => {
    const user = await base44.auth.me();
    const creators = await base44.entities.Creator.filter({ user_email: user.email });
    const influencers = await base44.entities.Influencer.filter({ user_email: user.email });
    
    if (creators.length > 0) {
      setUserRole('creator');
    } else if (influencers.length > 0) {
      setUserRole('influencer');
    }
  };

  const benefits = [
    { icon: Zap, text: 'Get hired directly by clients' },
    { icon: Crown, text: 'Payment based on the value of your profile' },
    { icon: Clock, text: '24/7 priority support' },
    { icon: Shield, text: 'Exclusive premium features' },
    { icon: Sparkles, text: 'Increased visibility in search' },
    { icon: Check, text: 'Pro badge on your profile' },
  ];

  const handlePaymentSuccess = async () => {
    setIsProcessing(true);
    
    // Update Pro status in database
    const user = await base44.auth.me();
    
    if (userRole === 'creator') {
      const creators = await base44.entities.Creator.filter({ user_email: user.email });
      if (creators.length > 0) {
        await base44.entities.Creator.update(creators[0].id, { is_pro: true });
      }
    } else if (userRole === 'influencer') {
      const influencers = await base44.entities.Influencer.filter({ user_email: user.email });
      if (influencers.length > 0) {
        await base44.entities.Influencer.update(influencers[0].id, { is_pro: true });
      }
    }
    
    setTimeout(() => {
      setShowSuccess(true);
      setIsProcessing(false);
      
      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 250);
    }, 1500);
  };

  const handleGoToDashboard = () => {
    if (userRole === 'creator') {
      navigate(createPageUrl('CreatorDashboard'));
    } else if (userRole === 'influencer') {
      navigate(createPageUrl('InfluencerDashboard'));
    } else {
      navigate(createPageUrl('Home'));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {!showSuccess ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              {/* Header */}
              <div className="text-center mb-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.6 }}
                  className="inline-flex items-center gap-2 mb-4"
                >
                  <Crown className="w-8 h-8 text-purple-600" />
                  <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                    Go Pro
                  </h1>
                </motion.div>
                <p className="text-xl text-gray-600">Unlock premium opportunities and grow faster</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Benefits */}
                <GlassCard className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Pro Benefits</h3>
                  <div className="space-y-4">
                    {benefits.map((benefit, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shrink-0">
                          <benefit.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{benefit.text}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </GlassCard>

                {/* Payment */}
                <GlassCard className="p-8">
                  <div className="text-center mb-8">
                    <p className="text-gray-600 mb-2">One-time payment</p>
                    <div className="text-5xl font-bold text-gray-900 mb-1">₹1,500</div>
                    <p className="text-sm text-gray-500">Lifetime Pro Access</p>
                  </div>

                  {/* QR Code */}
                  <div className="bg-white p-6 rounded-2xl mb-6 flex justify-center">
                    <img 
                      src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/692f0f1978791959e9444ac5/b6cc6d4fe_WhatsAppImage2025-12-05at205616.jpeg"
                      alt="Payment QR Code"
                      className="w-64 h-64 object-contain"
                    />
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm text-gray-600 text-center">
                      Scan the QR code to make payment via UPI
                    </p>
                    
                    <Button
                      onClick={handlePaymentSuccess}
                      disabled={isProcessing}
                      className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:opacity-90 text-white py-6 text-lg font-semibold"
                    >
                      {isProcessing ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Sparkles className="w-5 h-5" />
                        </motion.div>
                      ) : (
                        <>
                          <Crown className="w-5 h-5 mr-2" />
                          I've Completed Payment
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-gray-500 text-center">
                      Click above after completing the payment
                    </p>
                  </div>
                </GlassCard>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ duration: 0.6, times: [0, 0.6, 1] }}
                className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 flex items-center justify-center"
              >
                <Crown className="w-16 h-16 text-white" />
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent"
              >
                🎉 Heyyy… you are INNNNN!! 🚀
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xl text-gray-600 mb-8"
              >
                Welcome to Pro! Your account has been upgraded.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Button
                  onClick={handleGoToDashboard}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-6 text-lg"
                >
                  Go to Dashboard
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}