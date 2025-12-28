import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Zap, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CreatorCard = ({ creator }) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
        >
            <div className="relative h-48 overflow-hidden">
                <img
                    src={creator.image}
                    alt={creator.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-3 right-3 flex flex-col gap-2">
                    {creator.isTopCreator && (
                        <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                            <Award className="w-3 h-3" /> Top Creator
                        </span>
                    )}
                    {creator.respondsFast && (
                        <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                            <Zap className="w-3 h-3" /> Responds Fast
                        </span>
                    )}
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <div className="flex items-center gap-1 text-white">
                        <MapPin className="w-3 h-3" />
                        <span className="text-xs">{creator.location}</span>
                    </div>
                </div>
            </div>

            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="font-bold text-lg text-gray-900 line-clamp-1">{creator.name}</h3>
                        <p className="text-sm text-gray-500">{creator.role}</p>
                    </div>
                    <div className="flex items-center bg-gray-50 px-2 py-1 rounded-md">
                        <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500 mr-1" />
                        <span className="font-bold text-sm">{creator.rating}</span>
                        <span className="text-xs text-gray-400 ml-1">({creator.reviews})</span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                    {creator.badges.map((badge, index) => (
                        <span key={index} className="text-xs bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full border border-purple-100">
                            {badge}
                        </span>
                    ))}
                </div>

                <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                    <div>
                        <p className="text-xs text-gray-400 uppercase font-semibold">Starting at</p>
                        <p className="font-bold text-lg text-gray-900">{creator.price}</p>
                    </div>
                    <Link to={`/profile`}>
                        <Button size="sm" className="rounded-full bg-black text-white hover:bg-gray-800">
                            View Profile
                        </Button>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default CreatorCard;
