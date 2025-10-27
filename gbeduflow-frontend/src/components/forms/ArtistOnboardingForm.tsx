import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Music, Video, Instagram, ArrowRight, Check } from 'lucide-react';
import { useArtistStore } from '../../stores/artistStore';

interface ArtistOnboardingFormProps {
  onComplete?: (artist: any) => void;
}

const ArtistOnboardingForm: React.FC<ArtistOnboardingFormProps> = ({
  onComplete,
}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    youtubeUrl: '',
    tiktokUrl: '',
    instagramUrl: '',
    bio: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addArtist } = useArtistStore();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newArtist = {
        id: Date.now().toString(),
        name: formData.name,
        youtubeUrl: formData.youtubeUrl,
        tiktokUrl: formData.tiktokUrl,
        instagramUrl: formData.instagramUrl,
        aehScore: 0,
        ldsScore: 0,
        aeiScore: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      addArtist(newArtist);
      onComplete?.(newArtist);
    } catch (error) {
      console.error('Error creating artist:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { id: 1, title: 'Basic Info', description: 'Tell us about yourself' },
    { id: 2, title: 'Social Links', description: 'Add your social media' },
    { id: 3, title: 'Review', description: 'Review and submit' },
  ];

  const isStepValid = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return formData.name.trim() !== '';
      case 2:
        return formData.youtubeUrl.trim() !== '' || formData.tiktokUrl.trim() !== '';
      case 3:
        return formData.name.trim() !== '' && 
               (formData.youtubeUrl.trim() !== '' || formData.tiktokUrl.trim() !== '');
      default:
        return false;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((stepItem, index) => (
          <div key={stepItem.id} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= stepItem.id
                  ? 'bg-accent-primary text-white'
                  : 'bg-bg-tertiary text-text-muted'
              }`}
            >
              {step > stepItem.id ? (
                <Check className="w-5 h-5" />
              ) : (
                stepItem.id
              )}
            </div>
            <div className="ml-3">
              <div className="text-sm font-medium text-text-primary">
                {stepItem.title}
              </div>
              <div className="text-xs text-text-muted">
                {stepItem.description}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-16 h-0.5 mx-4 ${
                  step > stepItem.id ? 'bg-accent-primary' : 'bg-bg-tertiary'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Form Content */}
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="card space-y-6"
      >
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-2">
                Basic Information
              </h2>
              <p className="text-text-secondary">
                Let's start with your basic details
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="label block mb-2">
                  Artist Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your stage name"
                  className="input w-full"
                />
              </div>

              <div>
                <label className="label block mb-2">
                  Bio
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  placeholder="Tell us about your music style and background..."
                  rows={4}
                  className="input w-full resize-none"
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-2">
                Social Media Links
              </h2>
              <p className="text-text-secondary">
                Add your social media profiles to help us track your growth
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="label block mb-2 flex items-center gap-2">
                  <Video className="w-4 h-4" />
                  YouTube URL *
                </label>
                <input
                  type="url"
                  value={formData.youtubeUrl}
                  onChange={(e) => handleInputChange('youtubeUrl', e.target.value)}
                  placeholder="https://youtube.com/@yourchannel"
                  className="input w-full"
                />
              </div>

              <div>
                <label className="label block mb-2 flex items-center gap-2">
                  <Music className="w-4 h-4" />
                  TikTok URL
                </label>
                <input
                  type="url"
                  value={formData.tiktokUrl}
                  onChange={(e) => handleInputChange('tiktokUrl', e.target.value)}
                  placeholder="https://tiktok.com/@yourusername"
                  className="input w-full"
                />
              </div>

              <div>
                <label className="label block mb-2 flex items-center gap-2">
                  <Instagram className="w-4 h-4" />
                  Instagram URL
                </label>
                <input
                  type="url"
                  value={formData.instagramUrl}
                  onChange={(e) => handleInputChange('instagramUrl', e.target.value)}
                  placeholder="https://instagram.com/yourusername"
                  className="input w-full"
                />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-2">
                Review Your Information
              </h2>
              <p className="text-text-secondary">
                Please review your details before submitting
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-bg-primary rounded-lg">
                <h3 className="font-semibold text-text-primary mb-2">Basic Info</h3>
                <p className="text-text-secondary">Name: {formData.name}</p>
                {formData.bio && (
                  <p className="text-text-secondary mt-2">Bio: {formData.bio}</p>
                )}
              </div>

              <div className="p-4 bg-bg-primary rounded-lg">
                <h3 className="font-semibold text-text-primary mb-2">Social Links</h3>
                {formData.youtubeUrl && (
                  <p className="text-text-secondary">YouTube: {formData.youtubeUrl}</p>
                )}
                {formData.tiktokUrl && (
                  <p className="text-text-secondary">TikTok: {formData.tiktokUrl}</p>
                )}
                {formData.instagramUrl && (
                  <p className="text-text-secondary">Instagram: {formData.instagramUrl}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 border-t border-bg-tertiary">
          <button
            onClick={handleBack}
            disabled={step === 1}
            className="btn btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Back
          </button>

          {step < 3 ? (
            <button
              onClick={handleNext}
              disabled={!isStepValid(step)}
              className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!isStepValid(step) || isSubmitting}
              className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Submit Application
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ArtistOnboardingForm;
