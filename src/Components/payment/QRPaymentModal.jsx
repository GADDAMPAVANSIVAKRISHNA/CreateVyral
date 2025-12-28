import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Clock, Copy, Check, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';

export default function QRPaymentModal({ 
  isOpen, 
  onClose, 
  amount, 
  itemName,
  onPaymentComplete 
}) {
  const [paymentStatus, setPaymentStatus] = useState('pending'); // pending, verifying, success
  const [copied, setCopied] = useState(false);

  const upiId = "your-upi-id@phonepe"; // Replace with actual UPI ID

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePaymentDone = () => {
    setPaymentStatus('verifying');
    // Simulate verification (in production, verify with backend)
    setTimeout(() => {
      setPaymentStatus('success');
      setTimeout(() => {
        onPaymentComplete?.();
        onClose();
        setPaymentStatus('pending');
      }, 2000);
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        <AnimatePresence mode="wait">
          {paymentStatus === 'pending' && (
            <motion.div
              key="pending"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6"
            >
              {/* Header */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                  <Smartphone className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Scan & Pay</h2>
                <p className="text-gray-500 text-sm mt-1">
                  Scan the QR code with any UPI app
                </p>
              </div>

              {/* Amount */}
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4 mb-6 text-center">
                <p className="text-sm text-gray-600">Amount to Pay</p>
                <p className="text-3xl font-bold text-purple-600">₹{amount?.toLocaleString('en-IN')}</p>
                <p className="text-xs text-gray-500 mt-1">{itemName}</p>
              </div>

              {/* QR Code */}
              <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100 mb-6">
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/692f0f1978791959e9444ac5/7332e319b_WhatsAppImage2025-12-05at205616.jpeg"
                  alt="PhonePe QR Code"
                  className="w-full max-w-[250px] mx-auto rounded-xl"
                />
              </div>

              {/* UPI ID */}
              <div className="flex items-center justify-between bg-gray-50 rounded-xl p-3 mb-6">
                <div>
                  <p className="text-xs text-gray-500">UPI ID</p>
                  <p className="font-medium text-gray-900">{upiId}</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleCopyUPI}
                  className="text-purple-600"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>

              {/* Payment Done Button */}
              <Button 
                onClick={handlePaymentDone}
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:opacity-90 py-6 text-lg"
              >
                I've Made the Payment
              </Button>

              <p className="text-center text-xs text-gray-400 mt-4">
                Click above after completing payment via UPI app
              </p>
            </motion.div>
          )}

          {paymentStatus === 'verifying' && (
            <motion.div
              key="verifying"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="p-12 text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-20 h-20 mx-auto mb-6 border-4 border-purple-200 border-t-purple-600 rounded-full"
              />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Verifying Payment</h3>
              <p className="text-gray-500">Please wait while we confirm your payment...</p>
            </motion.div>
          )}

          {paymentStatus === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="p-12 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center"
              >
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </motion.div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Payment Successful!</h3>
              <p className="text-gray-500">Thank you for your payment</p>
              <p className="text-2xl font-bold text-green-600 mt-4">₹{amount?.toLocaleString('en-IN')}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}