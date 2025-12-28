import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout';
import Home from './Pages/Home';
import Landing from './Pages/Landing';
import Onboarding from './Pages/Onboarding';
import CreatorOnboarding from './Pages/CreatorOnboarding';
import InfluencerOnboarding from './Pages/InfluencerOnboarding';
import LearnerDashboard from './Pages/LearnerDashboard';
import CreatorDashboard from './Pages/CreatorDashboard';
import InfluencerDashboard from './Pages/InfluencerDashboard';
import PostCampaign from './Pages/PostCampaign';
import ProPlan from './Pages/ProPlan';
import Search from './Pages/Search';
import InfluencerProfile from './Pages/InfluencerProfile';
import Courses from './Pages/Courses';
import Campaigns from './Pages/Campaigns';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout currentPageName="Home"><Home /></Layout>} />
        <Route path="/landing" element={<Layout currentPageName="Landing"><Landing /></Layout>} />
        <Route path="/onboarding" element={<Layout currentPageName="Onboarding"><Onboarding /></Layout>} />
        <Route path="/onboarding/creator" element={<Layout currentPageName="CreatorOnboarding"><CreatorOnboarding /></Layout>} />
        <Route path="/onboarding/influencer" element={<Layout currentPageName="InfluencerOnboarding"><InfluencerOnboarding /></Layout>} />
        <Route path="/dashboard/learner" element={<Layout currentPageName="LearnerDashboard"><LearnerDashboard /></Layout>} />
        <Route path="/dashboard/creator" element={<Layout currentPageName="CreatorDashboard"><CreatorDashboard /></Layout>} />
        <Route path="/dashboard/influencer" element={<Layout currentPageName="InfluencerDashboard"><InfluencerDashboard /></Layout>} />
        <Route path="/campaign/new" element={<Layout currentPageName="PostCampaign"><PostCampaign /></Layout>} />
        <Route path="/pro" element={<Layout currentPageName="ProPlan"><ProPlan /></Layout>} />
        <Route path="/search" element={<Layout currentPageName="Search"><Search /></Layout>} />
        <Route path="/profile" element={<Layout currentPageName="InfluencerProfile"><InfluencerProfile /></Layout>} />
        <Route path="/courses" element={<Layout currentPageName="Courses"><Courses /></Layout>} />
        <Route path="/campaigns" element={<Layout currentPageName="Campaigns"><Campaigns /></Layout>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
