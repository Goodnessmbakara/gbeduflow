import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Music } from 'lucide-react';
import ArtistOnboardingForm from '../components/forms/ArtistOnboardingForm';

const ArtistRegistration: React.FC = () => {
  const handleComplete = () => {
    // Redirect to dashboard or show success message
    window.location.href = '#dashboard';
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors duration-200 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-accent-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Music className="w-8 h-8 text-accent-primary" />
            </div>
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              Register as an Artist
            </h1>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Join GbeduFlow to track your AEHI score, connect with fans, and discover 
              your global audience potential. It's free and takes just a few minutes.
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center"
          >
            <div className="w-12 h-12 bg-accent-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              Track Your AEHI Score
            </h3>
            <p className="text-text-secondary text-sm">
              Monitor your Afrobeats Economic Heat Index and see how you rank among other artists
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <div className="w-12 h-12 bg-accent-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎓</span>
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              Campus Connection
            </h3>
            <p className="text-text-secondary text-sm">
              See which universities are buzzing with your music and connect with student fans
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <div className="w-12 h-12 bg-chart-line-3/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🌍</span>
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              Global Insights
            </h3>
            <p className="text-text-secondary text-sm">
              Discover your audience clusters worldwide and identify export opportunities
            </p>
          </motion.div>
        </div>

        {/* Registration Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <ArtistOnboardingForm onComplete={handleComplete} />
        </motion.div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-text-muted text-sm">
            By registering, you agree to our{' '}
            <a href="/terms" className="text-accent-primary hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy" className="text-accent-primary hover:underline">
              Privacy Policy
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ArtistRegistration;
