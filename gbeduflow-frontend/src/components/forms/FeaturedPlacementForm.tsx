import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, DollarSign, Target, ArrowRight, Check } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';

interface FeaturedPlacementFormProps {
  onComplete: (placement: any) => void;
  onCancel: () => void;
}

const FeaturedPlacementForm: React.FC<FeaturedPlacementFormProps> = ({
  onComplete,
  onCancel,
}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    type: 'banner',
    title: '',
    description: '',
    imageUrl: '',
    targetUrl: '',
    duration: 7,
    budget: 0,
    priority: 'normal',
    targetAudience: 'all',
  });

  const placementTypes = [
    {
      id: 'banner',
      name: 'Banner Ad',
      description: 'Prominent banner at top of pages',
      price: 15000,
      reach: 'High visibility',
      icon: '🎯',
    },
    {
      id: 'spotlight',
      name: 'Artist Spotlight',
      description: 'Featured artist showcase section',
      price: 25000,
      reach: 'Premium placement',
      icon: '⭐',
    },
    {
      id: 'event',
      name: 'Event Promotion',
      description: 'Promote concerts, shows, events',
      price: 20000,
      reach: 'Event-focused audience',
      icon: '🎵',
    },
    {
      id: 'dj',
      name: 'DJ/Radio Promotion',
      description: 'Target DJs and radio stations',
      price: 30000,
      reach: 'Industry professionals',
      icon: '🎧',
    },
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getSelectedType = () => {
    return placementTypes.find(type => type.id === formData.type);
  };

  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          Placement Type
        </h3>
        <p className="text-text-secondary">
          Choose the type of featured placement you want
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {placementTypes.map((type) => (
          <motion.div
            key={type.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`p-6 rounded-lg border cursor-pointer transition-all ${
              formData.type === type.id
                ? 'border-accent-primary bg-accent-primary/5'
                : 'border-bg-tertiary hover:border-accent-primary/50'
            }`}
            onClick={() => handleInputChange('type', type.id)}
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl">{type.icon}</div>
              <div className="flex-1">
                <h4 className="font-semibold text-text-primary mb-1">
                  {type.name}
                </h4>
                <p className="text-sm text-text-secondary mb-3">
                  {type.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold text-accent-primary">
                    ₦{type.price.toLocaleString()}
                  </div>
                  <div className="text-sm text-text-muted">
                    {type.reach}
                  </div>
                </div>
              </div>
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                formData.type === type.id
                  ? 'border-accent-primary bg-accent-primary'
                  : 'border-bg-tertiary'
              }`}>
                {formData.type === type.id && (
                  <Check className="w-3 h-3 text-white" />
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          Content Details
        </h3>
        <p className="text-text-secondary">
          Provide the content for your featured placement
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="Enter a compelling title"
            className="input w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Describe what you're promoting..."
            rows={3}
            className="input w-full resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Image URL
            </label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => handleInputChange('imageUrl', e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="input w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Target URL
            </label>
            <input
              type="url"
              value={formData.targetUrl}
              onChange={(e) => handleInputChange('targetUrl', e.target.value)}
              placeholder="https://example.com/landing"
              className="input w-full"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          Campaign Settings
        </h3>
        <p className="text-text-secondary">
          Configure duration, budget, and targeting
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Duration (days)
            </label>
            <select
              value={formData.duration}
              onChange={(e) => handleInputChange('duration', parseInt(e.target.value))}
              className="input w-full"
            >
              <option value={3}>3 days</option>
              <option value={7}>7 days</option>
              <option value={14}>14 days</option>
              <option value={30}>30 days</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Priority Level
            </label>
            <select
              value={formData.priority}
              onChange={(e) => handleInputChange('priority', e.target.value)}
              className="input w-full"
            >
              <option value="normal">Normal</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Target Audience
            </label>
            <select
              value={formData.targetAudience}
              onChange={(e) => handleInputChange('targetAudience', e.target.value)}
              className="input w-full"
            >
              <option value="all">All Users</option>
              <option value="students">Students Only</option>
              <option value="artists">Artists Only</option>
              <option value="industry">Industry Professionals</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Budget (₦)
            </label>
            <input
              type="number"
              value={formData.budget}
              onChange={(e) => handleInputChange('budget', parseInt(e.target.value) || 0)}
              placeholder="Enter your budget"
              className="input w-full"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderStep4 = () => {
    const selectedType = getSelectedType();
    const totalCost = selectedType ? selectedType.price * formData.duration : 0;

    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-6"
      >
        <div>
          <h3 className="text-xl font-semibold text-text-primary mb-2">
            Review & Confirm
          </h3>
          <p className="text-text-secondary">
            Review your featured placement details
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h4 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-accent-primary" />
              Placement Details
            </h4>
            <div className="space-y-3">
              <div>
                <div className="text-sm text-text-muted">Type</div>
                <div className="font-medium text-text-primary">{selectedType?.name}</div>
              </div>
              <div>
                <div className="text-sm text-text-muted">Title</div>
                <div className="font-medium text-text-primary">{formData.title}</div>
              </div>
              <div>
                <div className="text-sm text-text-muted">Duration</div>
                <div className="font-medium text-text-primary">{formData.duration} days</div>
              </div>
              <div>
                <div className="text-sm text-text-muted">Priority</div>
                <div className="font-medium text-text-primary capitalize">{formData.priority}</div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h4 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-accent-primary" />
              Cost Breakdown
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-text-muted">Base Price</span>
                <span className="font-medium">₦{selectedType?.price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Duration</span>
                <span className="font-medium">{formData.duration} days</span>
              </div>
              <div className="border-t border-bg-tertiary pt-3">
                <div className="flex justify-between">
                  <span className="font-semibold text-text-primary">Total Cost</span>
                  <span className="font-bold text-xl text-accent-primary">
                    ₦{totalCost.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="bg-accent-primary/5 border border-accent-primary/20 rounded-lg p-4">
          <h4 className="font-semibold text-text-primary mb-2 flex items-center gap-2">
            <Target className="w-5 h-5 text-accent-warning" />
            What You Get
          </h4>
          <ul className="text-sm text-text-secondary space-y-1">
            <li>• Premium placement in selected sections</li>
            <li>• Enhanced visibility and click-through rates</li>
            <li>• Detailed performance analytics</li>
            <li>• Priority customer support</li>
          </ul>
        </div>
      </motion.div>
    );
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.type;
      case 2:
        return formData.title.trim() && formData.description.trim();
      case 3:
        return formData.duration > 0;
      case 4:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-text-primary">
            Create Featured Placement
          </h2>
          <button
            onClick={onCancel}
            className="text-text-muted hover:text-text-primary transition-colors"
          >
            ✕
          </button>
        </div>
        
        <div className="flex items-center space-x-4">
          {[1, 2, 3, 4].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= stepNumber
                  ? 'bg-accent-primary text-white'
                  : 'bg-bg-tertiary text-text-muted'
              }`}>
                {stepNumber}
              </div>
              {stepNumber < 4 && (
                <div className={`w-12 h-0.5 mx-2 ${
                  step > stepNumber ? 'bg-accent-primary' : 'bg-bg-tertiary'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <Card className="p-8">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}

        <div className="flex justify-between mt-8 pt-6 border-t border-bg-tertiary">
          <Button
            variant="outline"
            onClick={() => step > 1 ? setStep(step - 1) : onCancel()}
          >
            {step > 1 ? 'Back' : 'Cancel'}
          </Button>
          
          <Button
            onClick={() => {
              if (step < 4) {
                setStep(step + 1);
              } else {
                const selectedType = getSelectedType();
                onComplete({
                  ...formData,
                  totalCost: selectedType ? selectedType.price * formData.duration : 0,
                  id: Date.now().toString(),
                  createdAt: new Date().toISOString(),
                });
              }
            }}
            disabled={!canProceed()}
            className="flex items-center gap-2"
          >
            {step < 4 ? 'Next' : 'Create Placement'}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default FeaturedPlacementForm;
