import React, { useState } from 'react';
import { m } from 'framer-motion';
import { Plus, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CampaignCard from '@/components/cards/CampaignCard';
import { sampleCampaigns } from '@/components/data/sampleCampaigns';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const Campaigns = () => {
  const [filter, setFilter] = useState('All');

  const filteredCampaigns = filter === 'All'
    ? sampleCampaigns
    : sampleCampaigns.filter(c => c.niche === filter);

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-8">
      <div className="max-w-4xl mx-auto px-4">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Active Campaigns</h1>
            <p className="text-gray-500">Find sponsorships and collaborations matching your niche.</p>
          </div>
          <Link to={createPageUrl('PostCampaign')}>
            <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-lg shadow-purple-200">
              <Plus className="w-4 h-4 mr-2" /> Post a Campaign
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex items-center gap-4 overflow-x-auto no-scrollbar">
          <span className="flex items-center gap-1 text-sm font-semibold text-gray-500 mr-2">
            <Filter className="w-4 h-4" /> Filter:
          </span>
          {['All', 'Fashion', 'Technology', 'Food', 'Travel', 'Lifestyle'].map(category => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${filter === category
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="space-y-4">
          {filteredCampaigns.map((campaign, index) => (
            <m.div
              key={campaign.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <CampaignCard campaign={campaign} />
            </m.div>
          ))}

          {filteredCampaigns.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-200">
              <p className="text-gray-500">No campaigns found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Campaigns;
