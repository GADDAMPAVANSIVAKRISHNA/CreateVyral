export const createPageUrl = (pageName) => {
    switch (pageName) {
        case 'Home': return '/';
        case 'Landing': return '/landing';
        case 'Onboarding': return '/onboarding';
        case 'CreatorOnboarding': return '/onboarding/creator';
        case 'InfluencerOnboarding': return '/onboarding/influencer';
        case 'LearnerDashboard': return '/dashboard/learner';
        case 'CreatorDashboard': return '/dashboard/creator';
        case 'InfluencerDashboard': return '/dashboard/influencer';
        case 'PostCampaign': return '/campaign/new';
        case 'ProPlan': return '/pro';
        case 'Search': return '/search';
        case 'Courses': return '/courses';
        case 'Campaigns': return '/campaigns';
        case 'InfluencerProfile': return '/profile'; // simplified
        default: return '/';
    }
};
