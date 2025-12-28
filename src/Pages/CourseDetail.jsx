import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import {
  Play, Clock, Users, Star, CheckCircle, Lock,
  Award, BookOpen, ArrowLeft, CreditCard, AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { base44 } from '@/api/base44Client';
import AnimatedGradientBg from '../components/ui/AnimatedGradientBg';
import GlassCard from '../components/ui/GlassCard';
import FusionBot from '../components/chatbot/FusionBot';
import CertificateGenerator from '../components/certificate/CertificateGenerator';
import QRPaymentModal from '../components/payment/QRPaymentModal';
import ReviewForm from '../components/reviews/ReviewForm';
import ReviewList from '../components/reviews/ReviewList';
import ReviewSummary from '../components/reviews/ReviewSummary';
import { sampleCourses } from '../components/data/sampleCourses';

export default function CourseDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const courseId = urlParams.get('id');
  
  const [course, setCourse] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [user, setUser] = useState(null);
  const [showPaymentRequired, setShowPaymentRequired] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [hasReviewed, setHasReviewed] = useState(false);

  useEffect(() => {
    loadCourse();
    loadUser();
    loadReviews();
  }, [courseId]);

  const loadReviews = async () => {
    const reviewsData = await base44.entities.Review.filter({ course_id: courseId });
    setReviews(reviewsData);
  };

  const loadCourse = () => {
    const foundCourse = sampleCourses.find(c => c.id === courseId);
    if (foundCourse) {
      setCourse(foundCourse);
    }
  };

  const loadUser = async () => {
    const userData = await base44.auth.me();
    setUser(userData);
    checkEnrollment(userData.email);
    checkUserReview(userData.email);
  };

  const checkUserReview = async (email) => {
    const userReviews = await base44.entities.Review.filter({
      user_email: email,
      course_id: courseId
    });
    setHasReviewed(userReviews.length > 0);
  };

  const handleReviewSubmitted = () => {
    loadReviews();
    setHasReviewed(true);
  };

  const avgRating = reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) 
    : course?.rating;

  const checkEnrollment = async (email) => {
    const enrollments = await base44.entities.Enrollment.filter({
      user_email: email,
      course_id: courseId
    });
    if (enrollments.length > 0) {
      setEnrollment(enrollments[0]);
    }
  };

  const handleEnrollClick = () => {
    if (!enrollment) {
      setShowPaymentDialog(true);
    }
  };

  const handlePaymentComplete = async () => {
    const newEnrollment = await base44.entities.Enrollment.create({
      user_email: user.email,
      course_id: courseId,
      progress: 0,
      completed_modules: [],
      enrolled_date: new Date().toISOString().split('T')[0]
    });
    
    setEnrollment(newEnrollment);
  };

  const completeModule = async (moduleIndex) => {
    if (!enrollment) {
      setShowPaymentRequired(true);
      return;
    }
    
    const completedModules = [...(enrollment.completed_modules || [])];
    if (!completedModules.includes(moduleIndex)) {
      completedModules.push(moduleIndex);
    }
    
    const progress = (completedModules.length / course.modules.length) * 100;
    const isCompleted = progress >= 100;
    
    await base44.entities.Enrollment.update(enrollment.id, {
      completed_modules: completedModules,
      progress,
      is_completed: isCompleted
    });
    
    setEnrollment(prev => ({
      ...prev,
      completed_modules: completedModules,
      progress,
      is_completed: isCompleted
    }));
  };

  const formatPrice = (price) => {
    return `₹${price?.toLocaleString('en-IN') || '0'}`;
  };

  if (!course) {
    return (
      <AnimatedGradientBg className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">Loading course...</p>
        </div>
      </AnimatedGradientBg>
    );
  }

  const progress = enrollment?.progress || 0;
  const isModuleCompleted = (index) => enrollment?.completed_modules?.includes(index);

  return (
    <AnimatedGradientBg className="bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <Link to={createPageUrl('Courses')}>
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Courses
            </Button>
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Video Player */}
              <GlassCard className="overflow-hidden" hover={false}>
                <div className="relative aspect-video bg-gray-900">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  {enrollment ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-2xl"
                      >
                        <Play className="w-8 h-8 text-purple-600 ml-1" />
                      </motion.button>
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <div className="text-center text-white">
                        <Lock className="w-12 h-12 mx-auto mb-2" />
                        <p>Enroll to access this course</p>
                      </div>
                    </div>
                  )}
                </div>
                
                {enrollment && (
                  <div className="p-4 border-t">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Course Progress</span>
                      <span className="text-sm font-bold text-purple-600">{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                )}
              </GlassCard>

              {/* Description */}
              <GlassCard className="p-6" hover={false}>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{course.title}</h1>
                <p className="text-gray-600 mb-4">by {course.instructor}</p>
                <p className="text-gray-600 leading-relaxed">{course.description}</p>
              </GlassCard>

              {/* Skill Outcomes */}
              <GlassCard className="p-6" hover={false}>
                <h2 className="text-xl font-bold text-gray-900 mb-4">What You'll Learn</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {course.skill_outcomes?.map((skill, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-gray-600">{skill}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>

              {/* Modules */}
              <GlassCard className="p-6" hover={false}>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Course Content</h2>
                <div className="space-y-2">
                  {course.modules?.map((module, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        isModuleCompleted(i)
                          ? 'border-green-200 bg-green-50'
                          : enrollment
                          ? 'border-gray-200 hover:border-purple-300 cursor-pointer'
                          : 'border-gray-200 opacity-60'
                      }`}
                      onClick={() => enrollment && !isModuleCompleted(i) && completeModule(i)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {isModuleCompleted(i) ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : enrollment ? (
                            <Play className="w-5 h-5 text-purple-500" />
                          ) : (
                            <Lock className="w-5 h-5 text-gray-400" />
                          )}
                          <div>
                            <p className="font-medium text-gray-900">{module.title}</p>
                            <p className="text-sm text-gray-500">{module.duration}</p>
                          </div>
                        </div>
                        {enrollment && !isModuleCompleted(i) && (
                          <Button size="sm" variant="outline">
                            Mark Complete
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>

              {/* Reviews Section */}
              <ReviewSummary reviews={reviews} />
              
              {/* Review Form - only show for enrolled users who completed and haven't reviewed */}
              {enrollment?.is_completed && !hasReviewed && (
                <ReviewForm
                  courseId={courseId}
                  userName={user?.full_name}
                  userEmail={user?.email}
                  onReviewSubmitted={handleReviewSubmitted}
                />
              )}

              {/* Reviews List */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Reviews</h2>
                <ReviewList reviews={reviews} />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Enroll Card */}
              <GlassCard className="p-6 sticky top-24" hover={false}>
                <div className="text-center mb-6">
                  <p className="text-4xl font-bold text-gray-900 mb-1">{formatPrice(course.price)}</p>
                  <Badge className="capitalize">{course.tier} Course</Badge>
                </div>

                {!enrollment ? (
                  <Button
                    onClick={handleEnrollClick}
                    className="w-full h-12 bg-gradient-to-r from-blue-500 to-indigo-500 text-lg"
                  >
                    <CreditCard className="w-5 h-5 mr-2" />
                    Enroll Now
                  </Button>
                ) : enrollment.is_completed ? (
                  <Button
                    onClick={() => setShowCertificate(true)}
                    className="w-full h-12 bg-gradient-to-r from-green-500 to-emerald-500 text-lg"
                  >
                    <Award className="w-5 h-5 mr-2" />
                    Get Certificate
                  </Button>
                ) : (
                  <Button className="w-full h-12 bg-gradient-to-r from-purple-500 to-violet-500 text-lg">
                    <Play className="w-5 h-5 mr-2" />
                    Continue Learning
                  </Button>
                )}

                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Clock className="w-5 h-5 text-purple-500" />
                    <span>{course.total_duration} total length</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <BookOpen className="w-5 h-5 text-purple-500" />
                    <span>{course.modules?.length || 10} modules</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Users className="w-5 h-5 text-purple-500" />
                    <span>{course.students_enrolled?.toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <span>{avgRating} rating ({reviews.length} reviews)</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Award className="w-5 h-5 text-purple-500" />
                    <span>Certificate included</span>
                  </div>
                </div>
              </GlassCard>

              {/* Instructor */}
              <GlassCard className="p-6" hover={false}>
                <h3 className="font-bold text-gray-900 mb-4">Instructor</h3>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-xl font-bold">
                    {course.instructor?.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{course.instructor}</p>
                    <p className="text-sm text-gray-500">Professional Instructor</p>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>

        {/* QR Payment Modal */}
        <QRPaymentModal
          isOpen={showPaymentDialog}
          onClose={() => setShowPaymentDialog(false)}
          amount={course?.price}
          itemName={course?.title}
          onPaymentComplete={handlePaymentComplete}
        />

        {/* Payment Required Dialog */}
        <Dialog open={showPaymentRequired} onOpenChange={setShowPaymentRequired}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-500" />
                Enrollment Required
              </DialogTitle>
              <DialogDescription>
                Please enroll in this course to access the content.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Button
                onClick={() => {
                  setShowPaymentRequired(false);
                  setShowPaymentDialog(true);
                }}
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-500"
              >
                Enroll Now - {formatPrice(course?.price)}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Certificate Dialog */}
        <Dialog open={showCertificate} onOpenChange={setShowCertificate}>
          <DialogContent className="sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle>Your Certificate</DialogTitle>
              <DialogDescription>
                Congratulations on completing the course!
              </DialogDescription>
            </DialogHeader>
            <CertificateGenerator
              userName={user?.full_name || user?.email || 'Student'}
              courseName={course?.title || 'Course'}
              completionDate={new Date().toISOString()}
              onDownload={() => setShowCertificate(false)}
            />
          </DialogContent>
        </Dialog>

        <FusionBot />
      </div>
    </AnimatedGradientBg>
  );
}