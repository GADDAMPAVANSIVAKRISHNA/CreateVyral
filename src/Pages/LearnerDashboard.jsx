import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import {
  LayoutDashboard, BookOpen, Award, Clock, Star,
  Play, CheckCircle, Trophy, Target, TrendingUp, Download, MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { base44 } from '@/api/base44Client';
import AnimatedGradientBg from '../components/ui/AnimatedGradientBg';
import GlassCard from '../components/ui/GlassCard';

import { sampleCourses } from '../components/data/sampleCourses';
import ReviewForm from '../components/reviews/ReviewForm';

export default function LearnerDashboard() {
  const [enrollments, setEnrollments] = useState([]);
  const [user, setUser] = useState(null);
  const [userReviews, setUserReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const userData = await base44.auth.me();
    setUser(userData);
    
    const [enrollmentsData, reviewsData] = await Promise.all([
      base44.entities.Enrollment.filter({ user_email: userData.email }),
      base44.entities.Review.filter({ user_email: userData.email })
    ]);
    setEnrollments(enrollmentsData);
    setUserReviews(reviewsData);
  };

  const hasReviewedCourse = (courseId) => {
    return userReviews.some(r => r.course_id === courseId);
  };

  const handleReviewSubmitted = () => {
    loadData();
    setShowReviewForm(null);
  };

  const getCourseDetails = (courseId) => {
    return sampleCourses.find(c => c.id === courseId) || {};
  };

  const enrolledCourses = enrollments.map(enrollment => ({
    ...enrollment,
    course: getCourseDetails(enrollment.course_id)
  }));

  const completedCourses = enrollments.filter(e => e.is_completed).length;
  const inProgressCourses = enrollments.filter(e => !e.is_completed && e.progress > 0).length;
  const certificates = enrollments.filter(e => e.is_completed).length;

  const stats = [
    { label: 'Enrolled Courses', value: enrollments.length, icon: BookOpen, color: 'from-blue-500 to-indigo-500' },
    { label: 'Completed', value: completedCourses, icon: CheckCircle, color: 'from-green-500 to-emerald-500' },
    { label: 'In Progress', value: inProgressCourses, icon: Clock, color: 'from-amber-500 to-orange-500' },
    { label: 'Certificates', value: certificates, icon: Award, color: 'from-purple-500 to-violet-500' },
  ];

  const formatPrice = (price) => `₹${price?.toLocaleString('en-IN') || '0'}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.full_name?.split(' ')[0] || 'Learner'}!
            </h1>
            <p className="text-gray-600">Track your progress and continue learning</p>
          </motion.div>

          {/* Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, i) => (
              <GlassCard key={i} className="p-5" delay={i * 0.1}>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </GlassCard>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Continue Learning */}
              <GlassCard className="p-6" hover={false}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Continue Learning</h3>
                  <Link to={createPageUrl('Courses')}>
                    <Button variant="ghost" size="sm">View All</Button>
                  </Link>
                </div>
                
                {enrolledCourses.length > 0 ? (
                  <div className="space-y-4">
                    {enrolledCourses.filter(e => !e.is_completed).slice(0, 3).map((enrollment, i) => (
                      <Link key={i} to={createPageUrl(`CourseDetail?id=${enrollment.course_id}`)}>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                        >
                          <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
                            <img
                              src={enrollment.course?.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200'}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 truncate">
                              {enrollment.course?.title || 'Course'}
                            </h4>
                            <p className="text-sm text-gray-500 mb-2">
                              {enrollment.course?.instructor}
                            </p>
                            <div className="flex items-center gap-3">
                              <Progress value={enrollment.progress || 0} className="flex-1 h-2" />
                              <span className="text-sm font-medium text-blue-600">
                                {Math.round(enrollment.progress || 0)}%
                              </span>
                            </div>
                          </div>
                          <Button size="sm" className="shrink-0 bg-gradient-to-r from-blue-500 to-indigo-500">
                            <Play className="w-4 h-4" />
                          </Button>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 mb-4">You haven't enrolled in any courses yet</p>
                    <Link to={createPageUrl('Courses')}>
                      <Button className="bg-gradient-to-r from-blue-500 to-indigo-500">
                        Browse Courses
                      </Button>
                    </Link>
                  </div>
                )}
              </GlassCard>

              {/* My Certificates */}
              <GlassCard className="p-6" hover={false}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">My Certificates</h3>
                </div>
                
                {enrolledCourses.filter(e => e.is_completed).length > 0 ? (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {enrolledCourses.filter(e => e.is_completed).map((enrollment, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="relative p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-100 overflow-hidden"
                      >
                        {/* Certificate Preview */}
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-16 h-12 rounded-lg overflow-hidden shrink-0 bg-gradient-to-br from-purple-200 to-violet-200 flex items-center justify-center">
                            <Award className="w-6 h-6 text-purple-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-900 truncate">{enrollment.course?.title}</p>
                            <p className="text-xs text-gray-500">
                              Completed on {new Date(enrollment.enrolled_date).toLocaleDateString('en-IN', { 
                                day: 'numeric', 
                                month: 'short', 
                                year: 'numeric' 
                              })}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Link to={createPageUrl(`CourseDetail?id=${enrollment.course_id}`)} className="flex-1">
                            <Button size="sm" variant="outline" className="w-full">
                              <Download className="w-4 h-4 mr-2" />
                              Certificate
                            </Button>
                          </Link>
                          {!hasReviewedCourse(enrollment.course_id) && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => setShowReviewForm(enrollment.course_id)}
                              className="flex-1"
                            >
                              <MessageSquare className="w-4 h-4 mr-2" />
                              Review
                            </Button>
                          )}
                        </div>

                        {/* Review Form Modal */}
                        {showReviewForm === enrollment.course_id && (
                          <div className="mt-4 pt-4 border-t border-purple-200">
                            <ReviewForm
                              courseId={enrollment.course_id}
                              userName={user?.full_name}
                              userEmail={user?.email}
                              onReviewSubmitted={handleReviewSubmitted}
                            />
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Trophy className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">Complete courses to earn certificates</p>
                  </div>
                )}
              </GlassCard>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Learning Goals */}
              <GlassCard className="p-6" hover={false}>
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-500" />
                  Learning Goals
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Weekly study time</span>
                      <span className="text-sm font-medium">5/10 hours</span>
                    </div>
                    <Progress value={50} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Courses this month</span>
                      <span className="text-sm font-medium">{enrollments.length}/3</span>
                    </div>
                    <Progress value={(enrollments.length / 3) * 100} className="h-2" />
                  </div>
                </div>
              </GlassCard>

              {/* Achievements */}
              <GlassCard className="p-6" hover={false}>
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-500" />
                  Achievements
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className={`text-center p-3 rounded-xl ${enrollments.length > 0 ? 'bg-amber-50' : 'bg-gray-100 opacity-50'}`}>
                    <div className="text-2xl mb-1">🎯</div>
                    <p className="text-xs text-gray-600">First Course</p>
                  </div>
                  <div className={`text-center p-3 rounded-xl ${completedCourses >= 1 ? 'bg-green-50' : 'bg-gray-100 opacity-50'}`}>
                    <div className="text-2xl mb-1">🔥</div>
                    <p className="text-xs text-gray-600">Completed</p>
                  </div>
                  <div className={`text-center p-3 rounded-xl ${completedCourses >= 5 ? 'bg-purple-50' : 'bg-gray-100 opacity-50'}`}>
                    <div className="text-2xl mb-1">🏆</div>
                    <p className="text-xs text-gray-600">5 Courses</p>
                  </div>
                </div>
              </GlassCard>

              {/* Recommended */}
              <GlassCard className="p-6" hover={false}>
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  Recommended
                </h3>
                <Link to={createPageUrl('Courses')}>
                  <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl hover:from-blue-100 hover:to-indigo-100 transition-colors">
                    <p className="font-medium text-gray-900">Explore new courses</p>
                    <p className="text-sm text-gray-500">Find your next skill to master</p>
                  </div>
                </Link>
              </GlassCard>
            </div>
          </div>
      </div>

    </div>
  );
}