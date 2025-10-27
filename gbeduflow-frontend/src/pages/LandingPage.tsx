import React from 'react';
import { motion } from 'framer-motion';
import { Play, TrendingUp, Users, BarChart3, ArrowRight, Star } from 'lucide-react';

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: TrendingUp,
      title: 'Afrobeats Economic Heat Index',
      description: 'Real-time measurement of grassroots energy and export potential for Nigerian artists.',
    },
    {
      icon: Users,
      title: 'Campus Demand Tracking',
      description: 'See which artists are buzzing on campuses across Nigeria and beyond.',
    },
    {
      icon: BarChart3,
      title: 'Global Audience Insights',
      description: 'Discover emerging audience clusters and export opportunities worldwide.',
    },
  ];

  const stats = [
    { label: 'Artists Tracked', value: '500+' },
    { label: 'Campus Partners', value: '25+' },
    { label: 'Countries Reached', value: '15+' },
    { label: 'Data Points', value: '1M+' },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-text-primary leading-tight">
                  The Data Nerve Center of{' '}
                  <span className="text-accent-primary">Nigerian Music</span>
                </h1>
                <p className="text-xl text-text-secondary leading-relaxed max-w-2xl">
                  Quantify grassroots economic energy and export potential of Afrobeats artists 
                  through AI-driven insights and student-generated hype data.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.location.hash = '#onboarding'}
                  className="btn btn-primary text-lg px-8 py-4 flex items-center gap-2"
                >
                  <Play className="h-5 w-5" />
                  Get Started
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.location.hash = '#artists/register'}
                  className="btn btn-outline text-lg px-8 py-4 flex items-center gap-2"
                >
                  Add Artist
                  <ArrowRight className="h-5 w-5" />
                </motion.button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-6 pt-8">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-accent-primary border-2 border-bg-primary"
                      />
                    ))}
                  </div>
                  <span className="text-text-secondary text-sm">
                    Trusted by 500+ students
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-accent-warning text-accent-warning" />
                  ))}
                  <span className="text-text-secondary text-sm ml-2">4.9/5 rating</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Visual */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="card p-8 space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-text-primary mb-2">
                    AEHI Dashboard
                  </h3>
                  <p className="text-text-secondary">
                    Real-time artist performance metrics
                  </p>
                </div>

                {/* Mock AEHI Score */}
                <div className="flex justify-center">
                  <div className="relative w-32 h-32">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        className="text-bg-tertiary"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray="251.2"
                        strokeDashoffset="75.36"
                        className="text-accent-primary"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold text-accent-primary">70</span>
                    </div>
                  </div>
                </div>

                {/* Mock Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent-secondary">85</div>
                    <div className="text-sm text-text-muted">LDS Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-chart-line-3">55</div>
                    <div className="text-sm text-text-muted">AEI Score</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Powered by Innovation
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Three core metrics that revolutionize how we understand and measure 
              the economic impact of Nigerian music.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="card text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-accent-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="h-8 w-8 text-accent-primary" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-4">
                  {feature.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl lg:text-5xl font-bold text-accent-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-text-secondary">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto space-y-8"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary">
              Ready to Discover the Next Afrobeats Star?
            </h2>
            <p className="text-xl text-text-secondary">
              Join thousands of students, artists, and industry professionals 
              who are already using GbeduFlow to shape the future of Nigerian music.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.hash = '#onboarding'}
                className="btn btn-primary text-lg px-8 py-4"
              >
                Start Your Journey
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.hash = '#artists/register'}
                className="btn btn-outline text-lg px-8 py-4"
              >
                Add Your Artist
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
