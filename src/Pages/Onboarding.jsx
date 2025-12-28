import React from 'react';
import { m } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import FusionLogo from '@/components/ui/FusionLogo';
import { Camera, Users, BookOpen, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const RoleCard = ({ title, icon, description, link, delay }) => {
    const IconComp = icon;
    return (
        <Link to={link} className="block w-full">
            <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all cursor-pointer h-full flex flex-col items-center text-center group"
            >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-purple-500/50 transition-all">
                    <IconComp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
                <p className="text-gray-300 mb-6">{description}</p>
                <div className="mt-auto">
                    <Button variant="ghost" className="text-white group-hover:bg-white/10 rounded-full gap-2">
                        Get Started <ArrowRight className="w-4 h-4" />
                    </Button>
                </div>
            </m.div>
        </Link>
    );
};

const Onboarding = () => {
    return (
        <div className="min-h-screen bg-slate-900 flex flex-col">
            <div className="p-6">
                <Link to={createPageUrl('Home')}>
                    <FusionLogo size={32} />
                </Link>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
                <m.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Choose Your Path</h1>
                    <p className="text-xl text-gray-400">How do you want to use CreateVyral?</p>
                </m.div>

                <div className="grid md:grid-cols-3 gap-6 max-w-6xl w-full">
                    <RoleCard
                        title="Creator"
                        icon={Camera}
                        description="I create content and want to offer my services to brands."
                        link={createPageUrl('CreatorOnboarding')}
                        delay={0.1}
                    />
                    <RoleCard
                        title="Influencer"
                        icon={Users}
                        description="I have an audience and want to collaborate on campaigns."
                        link={createPageUrl('InfluencerOnboarding')}
                        delay={0.2}
                    />
                    <RoleCard
                        title="Learner"
                        icon={BookOpen}
                        description="I want to learn new skills and grow my career."
                        link={createPageUrl('Courses')} // Direct to courses for learners for now
                        delay={0.3}
                    />
                </div>
                <div className="mt-12 text-center text-gray-500">
                    Already have an account? <Link to={createPageUrl('Home')} className="text-purple-400 hover:text-purple-300">Login here</Link>
                </div>
            </div>
        </div>
    );
};

export default Onboarding;
