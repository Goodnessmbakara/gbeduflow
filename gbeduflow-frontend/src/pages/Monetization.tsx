import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Target, Star, FileText, TrendingUp, Users, BarChart3, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';
import BoostedChallengeForm from '../components/forms/BoostedChallengeForm';
import FeaturedPlacementForm from '../components/forms/FeaturedPlacementForm';
import DeepDiveReportForm from '../components/forms/DeepDiveReportForm';

const Monetization: React.FC = () => {
  const [activeForm, setActiveForm] = useState<string | null>(null);

  const monetizationFeatures = [
    {
      id: 'boosted-challenges',
      title: 'Boosted Challenges',
      description: 'Amplify your challenges across selected campuses',
      icon: Target,
      color: 'accent-primary',
      price: 'From ₦2,500',
      features: ['Campus targeting', 'Enhanced visibility', 'Performance analytics', 'Real-time insights'],
      stats: { campaigns: 12, revenue: '₦180,000', reach: '45,000 students' },
    },
    {
      id: 'featured-placements',
      title: 'Featured Placements',
      description: 'Premium placement for DJs, promoters, and events',
      icon: Star,
      color: 'accent-secondary',
      price: 'From ₦15,000',
      features: ['Banner ads', 'Artist spotlights', 'Event promotion', 'DJ targeting'],
      stats: { campaigns: 8, revenue: '₦320,000', reach: '120,000 impressions' },
    },
    {
      id: 'deep-dive-reports',
      title: 'Deep Dive Reports',
      description: 'Comprehensive analytics and strategic insights',
      icon: FileText,
      color: 'chart-line-3',
      price: 'From ₦25,000',
      features: ['AEHI analysis', 'LDS trends', 'AEI clusters', 'Competitor insights'],
      stats: { reports: 5, revenue: '₦150,000', satisfaction: '98%' },
    },
  ];

  const recentCampaigns = [
    {
      id: '1',
      type: 'Boosted Challenge',
      title: 'Afrobeats Summer Challenge',
      status: 'active',
      budget: 25000,
      reach: 15000,
      startDate: '2024-01-15',
      endDate: '2024-01-22',
    },
    {
      id: '2',
      type: 'Featured Placement',
      title: 'Burna Boy Concert Promotion',
      status: 'completed',
      budget: 50000,
      reach: 45000,
      startDate: '2024-01-10',
      endDate: '2024-01-17',
    },
    {
      id: '3',
      type: 'Deep Dive Report',
      title: 'Wizkid Global Analysis',
      status: 'processing',
      budget: 35000,
      reach: 'PDF Report',
      startDate: '2024-01-20',
      endDate: '2024-01-25',
    },
  ];

  const handleFormComplete = (data: any) => {
    // Handle form completion - could save to store or API
    console.log('Form completed:', data);
    setActiveForm(null);
  };

  const handleFormCancel = () => {
    setActiveForm(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-accent-secondary bg-accent-secondary/10';
      case 'completed':
        return 'text-accent-primary bg-accent-primary/10';
      case 'processing':
        return 'text-accent-warning bg-accent-warning/10';
      case 'pending':
        return 'text-text-muted bg-bg-tertiary';
      default:
        return 'text-text-muted bg-bg-tertiary';
    }
  };

  if (activeForm) {
    switch (activeForm) {
      case 'boosted-challenges':
        return <BoostedChallengeForm onComplete={handleFormComplete} onCancel={handleFormCancel} />;
      case 'featured-placements':
        return <FeaturedPlacementForm onComplete={handleFormComplete} onCancel={handleFormCancel} />;
      case 'deep-dive-reports':
        return <DeepDiveReportForm onComplete={handleFormComplete} onCancel={handleFormCancel} />;
      default:
        return null;
    }
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            Monetization Hub
          </h1>
          <p className="text-text-secondary">
            Amplify your reach and unlock premium insights with our monetization features
          </p>
        </div>

        {/* Revenue Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card text-center"
          >
            <div className="w-12 h-12 bg-accent-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-6 h-6 text-accent-primary" />
            </div>
            <div className="text-2xl font-bold text-text-primary mb-1">
              ₦650,000
            </div>
            <div className="text-sm text-text-muted">Total Revenue</div>
            <div className="text-xs text-accent-secondary mt-1">
              +23% from last month
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card text-center"
          >
            <div className="w-12 h-12 bg-accent-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Target className="w-6 h-6 text-accent-secondary" />
            </div>
            <div className="text-2xl font-bold text-text-primary mb-1">
              25
            </div>
            <div className="text-sm text-text-muted">Active Campaigns</div>
            <div className="text-xs text-accent-secondary mt-1">
              8 new this week
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card text-center"
          >
            <div className="w-12 h-12 bg-chart-line-3/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-chart-line-3" />
            </div>
            <div className="text-2xl font-bold text-text-primary mb-1">
              210,000
            </div>
            <div className="text-sm text-text-muted">Total Reach</div>
            <div className="text-xs text-accent-secondary mt-1">
              Across all campaigns
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card text-center"
          >
            <div className="w-12 h-12 bg-accent-warning/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-accent-warning" />
            </div>
            <div className="text-2xl font-bold text-text-primary mb-1">
              94%
            </div>
            <div className="text-sm text-text-muted">Success Rate</div>
            <div className="text-xs text-accent-secondary mt-1">
              Campaign performance
            </div>
          </motion.div>
        </div>

        {/* Monetization Features */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-text-primary mb-6">
            Available Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {monetizationFeatures.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="card p-6 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${feature.color}/10`}>
                    <feature.icon className={`w-6 h-6 text-${feature.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-text-primary mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-text-secondary text-sm mb-3">
                      {feature.description}
                    </p>
                    <div className="text-lg font-bold text-accent-primary">
                      {feature.price}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  {feature.features.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-text-muted">
                      <div className="w-1.5 h-1.5 bg-accent-primary rounded-full" />
                      {item}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-4 text-center mb-6 py-4 border-t border-bg-tertiary">
                  <div>
                    <div className="text-lg font-bold text-text-primary">
                      {feature.stats.campaigns || feature.stats.reports}
                    </div>
                    <div className="text-xs text-text-muted">
                      {feature.stats.campaigns ? 'Campaigns' : 'Reports'}
                    </div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-accent-primary">
                      {feature.stats.revenue}
                    </div>
                    <div className="text-xs text-text-muted">Revenue</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-accent-secondary">
                      {feature.stats.reach || feature.stats.satisfaction}
                    </div>
                    <div className="text-xs text-text-muted">
                      {feature.stats.satisfaction ? 'Satisfaction' : 'Reach'}
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => setActiveForm(feature.id)}
                  className="w-full flex items-center justify-center gap-2"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Campaigns */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-text-primary">
              Recent Campaigns
            </h2>
            <Button
              variant="outline"
              onClick={() => window.location.hash = '#analytics'}
              className="flex items-center gap-2"
            >
              <BarChart3 className="w-4 h-4" />
              View Analytics
            </Button>
          </div>

          <div className="space-y-4">
            {recentCampaigns.map((campaign, index) => (
              <motion.div
                key={campaign.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card p-4 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-bg-tertiary rounded-lg flex items-center justify-center">
                      {campaign.type === 'Boosted Challenge' && <Target className="w-5 h-5 text-accent-primary" />}
                      {campaign.type === 'Featured Placement' && <Star className="w-5 h-5 text-accent-secondary" />}
                      {campaign.type === 'Deep Dive Report' && <FileText className="w-5 h-5 text-chart-line-3" />}
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-primary">
                        {campaign.title}
                      </h4>
                      <p className="text-sm text-text-muted">
                        {campaign.type} • {campaign.startDate} - {campaign.endDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-semibold text-text-primary">
                        ₦{campaign.budget.toLocaleString()}
                      </div>
                      <div className="text-sm text-text-muted">
                        {campaign.reach}
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                      {campaign.status}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card p-8 text-center bg-gradient-to-r from-accent-primary/5 to-accent-secondary/5 border border-accent-primary/20"
        >
          <h3 className="text-2xl font-bold text-text-primary mb-4">
            Ready to Amplify Your Reach?
          </h3>
          <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
            Join hundreds of artists, DJs, and promoters who are already using our monetization features to grow their audience and increase their impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => setActiveForm('boosted-challenges')}
              className="flex items-center gap-2"
            >
              <Target className="w-4 h-4" />
              Start with Challenges
            </Button>
            <Button
              variant="outline"
              onClick={() => setActiveForm('featured-placements')}
              className="flex items-center gap-2"
            >
              <Star className="w-4 h-4" />
              Try Featured Placement
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Monetization;
