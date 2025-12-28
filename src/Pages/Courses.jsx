import React, { useState } from 'react';
import { m } from 'framer-motion';
import { Search, BookOpen, Clock, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CourseCard from '@/components/cards/CourseCard';
import { sampleCourses, courseCategories } from '@/components/data/sampleCourses';

const Courses = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");

    const filteredCourses = sampleCourses.filter(course => {
        const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
        const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-gray-900 text-white py-16 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <m.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-5xl font-bold mb-4"
                    >
                        Master the Art of Content Creation
                    </m.h1>
                    <m.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-400 max-w-2xl mx-auto text-lg mb-8"
                    >
                        Learn from top creators and industry experts. Upgrade your skills to grow your influence and income.
                    </m.p>

                    <div className="max-w-xl mx-auto relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search for courses..."
                            className="w-full pl-10 pr-4 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Categories */}
            <div className="border-b border-gray-200 bg-white sticky top-16 md:top-20 z-40 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 overflow-x-auto no-scrollbar py-4">
                    <div className="flex gap-2 min-w-max">
                        {courseCategories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === cat
                                        ? 'bg-purple-600 text-white shadow-md'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Course Grid */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredCourses.map((course) => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>

                {filteredCourses.length === 0 && (
                    <div className="text-center py-20">
                        <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">No courses found</h3>
                        <p className="text-gray-500">Try adjusting your search filters.</p>
                    </div>
                )}
            </div>

            {/* Value Props */}
            <div className="bg-white py-16 border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-center">
                    <div className="p-6">
                        <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Users className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Expert Instructors</h3>
                        <p className="text-gray-500">Learn directly from creators who have built million-follower audiences.</p>
                    </div>
                    <div className="p-6">
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Clock className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Self-Paced Learning</h3>
                        <p className="text-gray-500">Watch anytime, anywhere. Lifetime access to all course materials.</p>
                    </div>
                    <div className="p-6">
                        <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Award className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Certificate of Completion</h3>
                        <p className="text-gray-500">Earn certificates to showcase your new skills to potential clients.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Courses;
