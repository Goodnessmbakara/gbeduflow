import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import GoogleAuthButton from './GoogleAuthButton';
import UniversitySelector from './UniversitySelector';
import { useAuthStore } from '../../stores/authStore';

interface University {
  id: string;
  name: string;
  location: string;
  country: string;
}

const StudentOnboarding: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const { updateUser } = useAuthStore();

  const handleGoogleSuccess = () => {
    setStep(2);
  };

  const handleUniversitySelect = (university: University) => {
    setSelectedUniversity(university);
  };

  const handleComplete = () => {
    if (selectedUniversity) {
      updateUser({
        university: selectedUniversity.name,
      });
      setIsComplete(true);
    }
  };

  const steps = [
    { id: 1, title: 'Sign In', description: 'Connect with your Google account' },
    { id: 2, title: 'University', description: 'Select your university' },
    { id: 3, title: 'Complete', description: 'You\'re all set!' },
  ];

  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto text-center"
      >
        <div className="w-16 h-16 bg-accent-secondary rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-text-primary mb-4">
          Welcome to GbeduFlow!
        </h2>
        <p className="text-text-secondary mb-8">
          You're now ready to discover and hype the next Afrobeats stars. 
          Start exploring artists and submitting your vibe checks!
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.location.href = '/dashboard'}
          className="btn btn-primary w-full"
        >
          Go to Dashboard
          <ArrowRight className="w-4 h-4 ml-2" />
        </motion.button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((stepItem, index) => (
          <div key={stepItem.id} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= stepItem.id
                  ? 'bg-accent-primary text-white'
                  : 'bg-bg-tertiary text-text-muted'
              }`}
            >
              {step > stepItem.id ? (
                <Check className="w-4 h-4" />
              ) : (
                stepItem.id
              )}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-12 h-0.5 mx-2 ${
                  step > stepItem.id ? 'bg-accent-primary' : 'bg-bg-tertiary'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        {step === 1 && (
          <div className="text-center space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-2">
                Welcome to GbeduFlow
              </h2>
              <p className="text-text-secondary">
                Sign in to start discovering and rating Nigerian artists
              </p>
            </div>
            <GoogleAuthButton onSuccess={handleGoogleSuccess} />
            <p className="text-sm text-text-muted">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-text-primary mb-2">
                Select Your University
              </h2>
              <p className="text-text-secondary">
                This helps us show you artists popular on your campus
              </p>
            </div>
            <UniversitySelector
              onSelect={handleUniversitySelect}
              selectedUniversity={selectedUniversity}
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleComplete}
              disabled={!selectedUniversity}
              className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Complete Setup
              <ArrowRight className="w-4 h-4 ml-2" />
            </motion.button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default StudentOnboarding;
