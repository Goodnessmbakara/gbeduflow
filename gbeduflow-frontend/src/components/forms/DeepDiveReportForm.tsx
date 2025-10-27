import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, BarChart3, DollarSign, Check } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';

interface DeepDiveReportFormProps {
  onComplete: (report: any) => void;
  onCancel: () => void;
}

const DeepDiveReportForm: React.FC<DeepDiveReportFormProps> = ({
  onComplete,
  onCancel,
}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    artistId: '',
    reportType: 'comprehensive',
    timeRange: '90d',
    includeCompetitors: true,
    includePredictions: true,
    includeRecommendations: true,
    format: 'pdf',
    deliveryMethod: 'email',
  });

  const reportTypes = [
    {
      id: 'comprehensive',
      name: 'Comprehensive Report',
      description: 'Full analysis with all metrics and insights',
      price: 50000,
      features: ['AEHI Analysis', 'LDS Trends', 'AEI Clusters', 'Competitor Analysis', 'Predictions', 'Recommendations'],
      icon: '📊',
    },
    {
      id: 'aehi',
      name: 'AEHI Deep Dive',
      description: 'Focus on Afrobeats Economic Heat Index',
      price: 25000,
      features: ['AEHI Trends', 'Economic Impact', 'Market Analysis', 'Growth Projections'],
      icon: '🔥',
    },
    {
      id: 'lds',
      name: 'Campus Analysis',
      description: 'Local Demand Score across universities',
      price: 30000,
      features: ['Campus Heatmaps', 'Student Demographics', 'Geographic Trends', 'Campus Rankings'],
      icon: '🎓',
    },
    {
      id: 'aei',
      name: 'Global Export Analysis',
      description: 'Audience Export Index and international reach',
      price: 35000,
      features: ['Global Clusters', 'International Trends', 'Export Opportunities', 'Market Penetration'],
      icon: '🌍',
    },
  ];

  const timeRanges = [
    { id: '30d', name: '30 Days', price: 0 },
    { id: '90d', name: '90 Days', price: 0 },
    { id: '1y', name: '1 Year', price: 10000 },
    { id: 'all', name: 'All Time', price: 20000 },
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getSelectedReportType = () => {
    return reportTypes.find(type => type.id === formData.reportType);
  };

  const getSelectedTimeRange = () => {
    return timeRanges.find(range => range.id === formData.timeRange);
  };

  const calculateTotalCost = () => {
    const reportType = getSelectedReportType();
    const timeRange = getSelectedTimeRange();
    return (reportType?.price || 0) + (timeRange?.price || 0);
  };

  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          Select Artist
        </h3>
        <p className="text-text-secondary">
          Choose the artist for your deep dive report
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Artist Name
        </label>
        <input
          type="text"
          value={formData.artistId}
          onChange={(e) => handleInputChange('artistId', e.target.value)}
          placeholder="Enter artist name or select from list"
          className="input w-full"
        />
        <p className="text-xs text-text-muted mt-1">
          You can search for any artist in our database
        </p>
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
          Report Type
        </h3>
        <p className="text-text-secondary">
          Choose the type of analysis you need
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reportTypes.map((type) => (
          <motion.div
            key={type.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`p-6 rounded-lg border cursor-pointer transition-all ${
              formData.reportType === type.id
                ? 'border-accent-primary bg-accent-primary/5'
                : 'border-bg-tertiary hover:border-accent-primary/50'
            }`}
            onClick={() => handleInputChange('reportType', type.id)}
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
                <div className="space-y-2">
                  {type.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs text-text-muted">
                      <Check className="w-3 h-3" />
                      {feature}
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-lg font-bold text-accent-primary">
                  ₦{type.price.toLocaleString()}
                </div>
              </div>
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                formData.reportType === type.id
                  ? 'border-accent-primary bg-accent-primary'
                  : 'border-bg-tertiary'
              }`}>
                {formData.reportType === type.id && (
                  <Check className="w-3 h-3 text-white" />
                )}
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
          Time Range & Options
        </h3>
        <p className="text-text-secondary">
          Select the time period and additional options
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Time Range
            </label>
            <div className="space-y-2">
              {timeRanges.map((range) => (
                <div
                  key={range.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    formData.timeRange === range.id
                      ? 'border-accent-primary bg-accent-primary/5'
                      : 'border-bg-tertiary hover:border-accent-primary/50'
                  }`}
                  onClick={() => handleInputChange('timeRange', range.id)}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-text-primary">{range.name}</span>
                    {range.price > 0 && (
                      <span className="text-sm text-accent-primary">+₦{range.price.toLocaleString()}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Format
            </label>
            <select
              value={formData.format}
              onChange={(e) => handleInputChange('format', e.target.value)}
              className="input w-full"
            >
              <option value="pdf">PDF Document</option>
              <option value="excel">Excel Spreadsheet</option>
              <option value="both">Both Formats</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Additional Options
            </label>
            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.includeCompetitors}
                  onChange={(e) => handleInputChange('includeCompetitors', e.target.checked)}
                  className="w-4 h-4 text-accent-primary bg-bg-secondary border-bg-tertiary rounded focus:ring-accent-primary"
                />
                <span className="text-sm text-text-primary">Include Competitor Analysis</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.includePredictions}
                  onChange={(e) => handleInputChange('includePredictions', e.target.checked)}
                  className="w-4 h-4 text-accent-primary bg-bg-secondary border-bg-tertiary rounded focus:ring-accent-primary"
                />
                <span className="text-sm text-text-primary">Include Future Predictions</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.includeRecommendations}
                  onChange={(e) => handleInputChange('includeRecommendations', e.target.checked)}
                  className="w-4 h-4 text-accent-primary bg-bg-secondary border-bg-tertiary rounded focus:ring-accent-primary"
                />
                <span className="text-sm text-text-primary">Include Strategic Recommendations</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Delivery Method
            </label>
            <select
              value={formData.deliveryMethod}
              onChange={(e) => handleInputChange('deliveryMethod', e.target.value)}
              className="input w-full"
            >
              <option value="email">Email Download Link</option>
              <option value="dashboard">Dashboard Access</option>
              <option value="both">Both Methods</option>
            </select>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderStep4 = () => {
    const selectedReportType = getSelectedReportType();
    const selectedTimeRange = getSelectedTimeRange();
    const totalCost = calculateTotalCost();

    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-6"
      >
        <div>
          <h3 className="text-xl font-semibold text-text-primary mb-2">
            Review & Order
          </h3>
          <p className="text-text-secondary">
            Review your report configuration and place your order
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h4 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-accent-primary" />
              Report Details
            </h4>
            <div className="space-y-3">
              <div>
                <div className="text-sm text-text-muted">Artist</div>
                <div className="font-medium text-text-primary">{formData.artistId || 'Not specified'}</div>
              </div>
              <div>
                <div className="text-sm text-text-muted">Report Type</div>
                <div className="font-medium text-text-primary">{selectedReportType?.name}</div>
              </div>
              <div>
                <div className="text-sm text-text-muted">Time Range</div>
                <div className="font-medium text-text-primary">{selectedTimeRange?.name}</div>
              </div>
              <div>
                <div className="text-sm text-text-muted">Format</div>
                <div className="font-medium text-text-primary uppercase">{formData.format}</div>
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
                <span className="text-text-muted">Report Type</span>
                <span className="font-medium">₦{selectedReportType?.price.toLocaleString()}</span>
              </div>
              {selectedTimeRange && selectedTimeRange.price > 0 && (
                <div className="flex justify-between">
                  <span className="text-text-muted">Extended Time Range</span>
                  <span className="font-medium">₦{selectedTimeRange.price.toLocaleString()}</span>
                </div>
              )}
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
            <BarChart3 className="w-5 h-5 text-accent-warning" />
            What You'll Receive
          </h4>
          <ul className="text-sm text-text-secondary space-y-1">
            <li>• Professional PDF report with detailed analytics</li>
            <li>• Interactive charts and visualizations</li>
            <li>• Strategic recommendations and insights</li>
            <li>• Access to raw data (if requested)</li>
            <li>• 30-day support for questions and clarifications</li>
          </ul>
        </div>
      </motion.div>
    );
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.artistId.trim();
      case 2:
        return formData.reportType;
      case 3:
        return formData.timeRange;
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
            Order Deep Dive Report
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
                onComplete({
                  ...formData,
                  totalCost: calculateTotalCost(),
                  id: Date.now().toString(),
                  createdAt: new Date().toISOString(),
                });
              }
            }}
            disabled={!canProceed()}
            className="flex items-center gap-2"
          >
            {step < 4 ? 'Next' : 'Order Report'}
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default DeepDiveReportForm;
