import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Download, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CertificateGenerator({ userName, courseName, completionDate, onDownload }) {
  const certificateRef = useRef(null);
  const certificateId = `CV-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
  
  const formatDate = (date) => {
    const d = new Date(date);
    const day = d.getDate();
    const month = d.toLocaleString('default', { month: 'long' });
    const year = d.getFullYear();
    return `${day} - ${month} - ${year}`;
  };

  const handleDownload = async () => {
    // Create canvas from certificate
    const certificate = certificateRef.current;
    if (!certificate) return;

    // Use html2canvas-like approach with SVG
    const svgContent = `
      <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#0e7490;stop-opacity:1" />
            <stop offset="50%" style="stop-color:#db2777;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#7c3aed;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="800" height="600" fill="url(#bg)"/>
        <rect x="30" y="30" width="740" height="540" rx="20" fill="white" fill-opacity="0.95" stroke="#22d3ee" stroke-width="2"/>
        <text x="400" y="120" text-anchor="middle" font-family="Arial" font-size="32" font-weight="bold" fill="#0e7490">CreateVyral</text>
        <text x="400" y="145" text-anchor="middle" font-family="Arial" font-size="12" fill="#6b7280">WHERE IDEAS GO VIRAL</text>
        <text x="400" y="200" text-anchor="middle" font-family="Georgia" font-size="32" font-weight="bold" fill="#1f2937">CERTIFICATE OF COMPLETION</text>
        <text x="400" y="260" text-anchor="middle" font-family="Arial" font-size="14" fill="#6b7280">This certifies that</text>
        <text x="400" y="300" text-anchor="middle" font-family="Arial" font-size="14" fill="#374151">Course Name: ${courseName}</text>
        <text x="400" y="330" text-anchor="middle" font-family="Georgia" font-size="24" font-weight="bold" fill="#1f2937">${userName}</text>
        <text x="400" y="370" text-anchor="middle" font-family="Arial" font-size="14" fill="#374151">Completion Date: ${formatDate(completionDate)}</text>
        <text x="400" y="400" text-anchor="middle" font-family="Arial" font-size="12" fill="#6b7280">Certificate ID: ${certificateId}</text>
        <text x="250" y="480" text-anchor="middle" font-family="Brush Script MT, cursive" font-size="24" fill="#0e7490">cherryboppana</text>
        <text x="250" y="500" text-anchor="middle" font-family="Arial" font-size="10" fill="#6b7280">Signature: CEO, CreateVyral</text>
        <text x="550" y="480" text-anchor="middle" font-family="Brush Script MT, cursive" font-size="24" fill="#0e7490">cherryboppana</text>
        <text x="550" y="500" text-anchor="middle" font-family="Arial" font-size="10" fill="#6b7280">Signature: Head of CreateVyral</text>
        <text x="400" y="550" text-anchor="middle" font-family="Arial" font-size="12" font-weight="bold" fill="#0e7490">Certified by CreateVyral Learning</text>
      </svg>
    `;

    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `CreateVyral_Certificate_${courseName.replace(/\s+/g, '_')}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    if (onDownload) onDownload();
  };

  return (
    <div className="space-y-6">
      {/* Certificate Preview */}
      <div 
        ref={certificateRef}
        className="relative w-full max-w-3xl mx-auto aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, #0e7490 0%, #db2777 50%, #7c3aed 100%)'
        }}
      >
        <div className="absolute inset-6 bg-white/95 rounded-2xl border-2 border-cyan-400 p-8 flex flex-col items-center justify-center">
          {/* Logo */}
          <img 
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/692f0f1978791959e9444ac5/a976ca7d4_image.png"
            alt="CreateVyral"
            className="w-16 h-16 mb-2"
          />
          <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-pink-500 bg-clip-text text-transparent">CreateVyral</h3>
          <p className="text-xs text-gray-500 mb-4">WHERE IDEAS GO VIRAL</p>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-serif">
            CERTIFICATE OF COMPLETION
          </h1>

          <p className="text-gray-600 mb-2">This certifies that</p>
          <p className="text-gray-700 mb-1">Course Name: <span className="font-semibold">{courseName}</span></p>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{userName}</h2>
          
          <p className="text-gray-600 mb-1">Completion Date: {formatDate(completionDate)}</p>
          <p className="text-gray-500 text-sm mb-6">Certificate ID: {certificateId}</p>

          {/* Signatures */}
          <div className="flex justify-between w-full max-w-md mt-auto">
            <div className="text-center">
              <p className="font-script text-xl text-cyan-600 italic">cherryboppana</p>
              <p className="text-xs text-gray-500">Signature: CEO, CreateVyral</p>
            </div>
            <div className="text-center">
              <p className="font-script text-xl text-cyan-600 italic">cherryboppana</p>
              <p className="text-xs text-gray-500">Signature: Head of CreateVyral</p>
            </div>
          </div>

          <p className="text-cyan-600 font-semibold text-sm mt-4">Certified by CreateVyral Learning</p>

          {/* Badge */}
          <div className="absolute bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <Award className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>

      {/* Download Button */}
      <div className="flex justify-center">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={handleDownload}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Certificate
          </Button>
        </motion.div>
      </div>
    </div>
  );
}