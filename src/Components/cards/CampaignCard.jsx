import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, DollarSign, Instagram, Youtube, Layout } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PlatformIcon = ({ platform }) => {
    switch (platform) {
        case 'Instagram': return <Instagram className="w-4 h-4 text-pink-600" />;
        case 'YouTube': return <Youtube className="w-4 h-4 text-red-600" />;
        default: return <Layout className="w-4 h-4 text-gray-600" />;
    }
};

const CampaignCard = ({ campaign }) => {
    return (
        <motion.div
            whileHover={{ y: -2 }}
            className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:border-purple-200 transition-all flex flex-col sm:flex-row gap-5"
        >
            <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                <img src={campaign.brandLogo} alt={campaign.brand} className="w-full h-full object-cover" />
            </div>

            <div className="flex-1">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-bold text-lg text-gray-900">{campaign.title}</h3>
                        <p className="text-sm text-gray-500 mb-2">{campaign.brand}</p>
                    </div>
                    <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                        <DollarSign className="w-3 h-3" /> {campaign.budget}
                    </div>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{campaign.description}</p>

                <div className="flex flex-wrap gap-3 mb-4">
                    <div className="flex items-center gap-1.5 text-xs bg-gray-50 px-2 py-1 rounded border border-gray-100">
                        <PlatformIcon platform={campaign.platform} /> {campaign.platform}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs bg-gray-50 px-2 py-1 rounded border border-gray-100">
                        <span className="font-medium text-gray-500">Type:</span> {campaign.type}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs bg-gray-50 px-2 py-1 rounded border border-gray-100">
                        <Calendar className="w-3 h-3 text-gray-400" /> {campaign.deadline}
                    </div>
                </div>
            </div>

            <div className="flex flex-col justify-center gap-2 min-w-[120px]">
                <Button className="w-full bg-black hover:bg-gray-800 text-white">Apply Now</Button>
                <p className="text-xs text-center text-gray-400">{campaign.applicants} applied</p>
            </div>
        </motion.div>
    );
};

export default CampaignCard;
