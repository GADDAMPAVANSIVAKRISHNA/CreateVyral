import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Upload, Loader } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function ProfileUpload({ currentAvatar, onUploadSuccess }) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(currentAvatar);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setIsUploading(true);

    try {
      // Upload file
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      setPreviewUrl(file_url);
      
      // Call success callback
      if (onUploadSuccess) {
        await onUploadSuccess(file_url);
      }
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="relative inline-block">
      {/* Avatar */}
      <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold">
        {previewUrl ? (
          <img src={previewUrl} alt="Profile" className="w-full h-full object-cover" />
        ) : (
          <span>?</span>
        )}
      </div>

      {/* Upload button */}
      <motion.label
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center cursor-pointer shadow-lg border-2 border-white"
      >
        {isUploading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          >
            <Loader className="w-4 h-4 text-white" />
          </motion.div>
        ) : (
          <Plus className="w-4 h-4 text-white" />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={isUploading}
          className="hidden"
        />
      </motion.label>
    </div>
  );
}