import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, DollarSign, Star, ArrowRight, Check } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';

interface Campus {
  id: string;
  name: string;
  location: string;
  studentCount: number;
  ldsScore: number;
  price: number;
}

interface BoostedChallengeFormProps {
  onComplete: (campaign: any) => void;
  onCancel: () => void;
}

const BoostedChallengeForm: React.FC<BoostedChallengeFormProps> = ({
  onComplete,
  onCancel,
}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: 0,
    duration: 7,
    selectedCampuses: [] as string[],
    targetAudience: 'all',
    priority: 'normal',
  });

  const campuses: Campus[] = [
    { id: '1', name: 'University of Lagos', location: 'Lagos', studentCount: 45000, ldsScore: 92, price: 5000 },
    { id: '2', name: 'University of Ibadan', location: 'Ibadan', studentCount: 35000, ldsScore: 88, price: 4000 },
    { id: '3', name: 'Covenant University', location: 'Ota', studentCount: 12000, ldsScore: 85, price: 3500 },
    { id: '4', name: 'Obafemi Awolowo University', location: 'Ile-Ife', studentCount: 30000, ldsScore: 82, price: 3000 },
    { id: '5', name: 'Ahmadu Bello University', location: 'Zaria', studentCount: 40000, ldsScore: 78, price: 2800 },
    { id: '6', name: 'University of Nigeria', location: 'Nsukka', studentCount: 25000, ldsScore: 75, price: 2500 },
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCampusToggle = (campusId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedCampuses: prev.selectedCampuses.includes(campusId)
        ? prev.selectedCampuses.filter(id => id !== campusId)
        : [...prev.selectedCampuses, campusId]
    }));
  };

  const calculateTotalCost = () => {
    return formData.selectedCampuses.reduce((total, campusId) => {
      const campus = campuses.find(c => c.id === campusId);
      return total + (campus?.price || 0);
    }, 0);
  };

  const getEstimatedReach = () => {
    return formData.selectedCampuses.reduce((total, campusId) => {
      const campus = campuses.find(c => c.id === campusId);
      return total + (campus?.studentCount || 0);
    }, 0);
  };

  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          Campaign Details
        </h3>
        <p className="text-text-secondary">
          Tell us about your boosted challenge campaign
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Campaign Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="e.g., 'Afrobeats Summer Challenge'"
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
            placeholder="Describe what makes this challenge special..."
            rows={4}
            className="input w-full resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
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
          Campus Targeting
        </h3>
        <p className="text-text-secondary">
          Select universities where you want to boost visibility
        </p>
      </div>

      <div className="space-y-3">
        {campuses.map((campus) => (
          <motion.div
            key={campus.id}
            whileHover={{ scale: 1.02 }}
            className={`p-4 rounded-lg border cursor-pointer transition-all ${
              formData.selectedCampuses.includes(campus.id)
                ? 'border-accent-primary bg-accent-primary/5'
                : 'border-bg-tertiary hover:border-accent-primary/50'
            }`}
            onClick={() => handleCampusToggle(campus.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                  formData.selectedCampuses.includes(campus.id)
                    ? 'border-accent-primary bg-accent-primary'
                    : 'border-bg-tertiary'
                }`}>
                  {formData.selectedCampuses.includes(campus.id) && (
                    <Check className="w-3 h-3 text-white" />
                  )}
                </div>
                <div>
                  <div className="font-semibold text-text-primary">
                    {campus.name}
                  </div>
                  <div className="text-sm text-text-muted">
                    {campus.location} • {campus.studentCount.toLocaleString()} students
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-accent-primary">
                  ₦{campus.price.toLocaleString()}
                </div>
                <div className="text-sm text-text-muted">
                  LDS: {campus.ldsScore}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
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
          Campaign Summary
        </h3>
        <p className="text-text-secondary">
          Review your campaign details and estimated impact
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h4 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-accent-primary" />
            Campaign Details
          </h4>
          <div className="space-y-3">
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
            Cost & Reach
          </h4>
          <div className="space-y-3">
            <div>
              <div className="text-sm text-text-muted">Total Cost</div>
              <div className="font-bold text-2xl text-accent-primary">
                ₦{calculateTotalCost().toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-sm text-text-muted">Estimated Reach</div>
              <div className="font-bold text-xl text-accent-secondary">
                {getEstimatedReach().toLocaleString()} students
              </div>
            </div>
            <div>
              <div className="text-sm text-text-muted">Selected Campuses</div>
              <div className="font-medium text-text-primary">
                {formData.selectedCampuses.length} universities
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="bg-accent-primary/5 border border-accent-primary/20 rounded-lg p-4">
        <h4 className="font-semibold text-text-primary mb-2 flex items-center gap-2">
          <Star className="w-5 h-5 text-accent-warning" />
          What You Get
        </h4>
        <ul className="text-sm text-text-secondary space-y-1">
          <li>• Enhanced visibility in selected campus feeds</li>
          <li>• Priority placement in challenge listings</li>
          <li>• Detailed analytics and performance tracking</li>
          <li>• Direct access to campus-specific insights</li>
        </ul>
      </div>
    </motion.div>
  );

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.title.trim() && formData.description.trim();
      case 2:
        return formData.selectedCampuses.length > 0;
      case 3:
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
            Create Boosted Challenge
          </h2>
          <button
            onClick={onCancel}
            className="text-text-muted hover:text-text-primary transition-colors"
          >
            ✕
          </button>
        </div>
        
        <div className="flex items-center space-x-4">
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= stepNumber
                  ? 'bg-accent-primary text-white'
                  : 'bg-bg-tertiary text-text-muted'
              }`}>
                {stepNumber}
              </div>
              {stepNumber < 3 && (
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

        <div className="flex justify-between mt-8 pt-6 border-t border-bg-tertiary">
          <Button
            variant="outline"
            onClick={() => step > 1 ? setStep(step - 1) : onCancel()}
          >
            {step > 1 ? 'Back' : 'Cancel'}
          </Button>
          
          <Button
            onClick={() => {
              if (step < 3) {
                setStep(step + 1);
              } else {
                onComplete({
                  ...formData,
                  totalCost: calculateTotalCost(),
                  estimatedReach: getEstimatedReach(),
                  id: Date.now().toString(),
                  createdAt: new Date().toISOString(),
                });
              }
            }}
            disabled={!canProceed()}
            className="flex items-center gap-2"
          >
            {step < 3 ? 'Next' : 'Create Campaign'}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default BoostedChallengeForm;
