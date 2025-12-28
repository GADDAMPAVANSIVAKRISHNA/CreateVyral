import React from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CourseCard = ({ course }) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 flex flex-col h-full hover:shadow-lg transition-all"
        >
            <div className="relative aspect-video overflow-hidden">
                <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded backdrop-blur-sm flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" /> {course.rating}
                </div>
            </div>

            <div className="p-4 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
                        {course.category}
                    </span>
                    <span className="text-xs text-gray-500">{course.level}</span>
                </div>

                <h3 className="font-bold text-lg mb-1 leading-tight line-clamp-2">{course.title}</h3>
                <p className="text-sm text-gray-500 mb-3">{course.instructor}</p>

                <div className="flex items-center gap-4 text-xs text-gray-400 mb-4 mt-auto">
                    <div className="flex items-center gap-1">
                        <PlayCircle className="w-3 h-3" /> {course.lessons} Lessons
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {course.duration}
                    </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                    <div className="font-bold text-lg">{course.price}</div>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">Enroll</Button>
                </div>
            </div>
        </motion.div>
    );
};

export default CourseCard;
