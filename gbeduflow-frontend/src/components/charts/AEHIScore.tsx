import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface AEHIScoreProps {
  score: number;
  previousScore?: number;
  size?: 'sm' | 'md' | 'lg';
  showTrend?: boolean;
  className?: string;
}

const AEHIScore: React.FC<AEHIScoreProps> = ({
  score,
  previousScore,
  size = 'md',
  showTrend = true,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-16 h-16 text-lg',
    md: 'w-24 h-24 text-2xl',
    lg: 'w-32 h-32 text-3xl',
  };

  const strokeWidth = size === 'sm' ? 4 : size === 'md' ? 6 : 8;
  const radius = size === 'sm' ? 24 : size === 'md' ? 36 : 48;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getScoreColor = (score: number) => {
    if (score >= 90) return '#10B981'; // green
    if (score >= 70) return '#3B82F6'; // blue
    if (score >= 50) return '#F59E0B'; // yellow
    if (score >= 30) return '#F97316'; // orange
    return '#EF4444'; // red
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Fire 🔥';
    if (score >= 70) return 'Hot';
    if (score >= 50) return 'Warm';
    if (score >= 30) return 'Cool';
    return 'Cold';
  };

  const getTrendIcon = () => {
    if (!previousScore) return null;
    const diff = score - previousScore;
    if (diff > 0) return <TrendingUp className="w-4 h-4 text-accent-secondary" />;
    if (diff < 0) return <TrendingDown className="w-4 h-4 text-red-400" />;
    return <Minus className="w-4 h-4 text-text-muted" />;
  };

  const getTrendText = () => {
    if (!previousScore) return null;
    const diff = score - previousScore;
    if (diff > 0) return `+${diff.toFixed(1)}`;
    if (diff < 0) return diff.toFixed(1);
    return '0.0';
  };

  const getTrendColor = () => {
    if (!previousScore) return 'text-text-muted';
    const diff = score - previousScore;
    if (diff > 0) return 'text-accent-secondary';
    if (diff < 0) return 'text-red-400';
    return 'text-text-muted';
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative">
        <svg
          className={`${sizeClasses[size]} transform -rotate-90`}
          viewBox={`0 0 ${(radius + strokeWidth) * 2} ${(radius + strokeWidth) * 2}`}
        >
          {/* Background circle */}
          <circle
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            className="text-bg-tertiary"
          />
          {/* Progress circle */}
          <motion.circle
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
            r={radius}
            stroke={getScoreColor(score)}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        </svg>

        {/* Score text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            className="text-center"
          >
            <div className="font-bold text-text-primary">
              {Math.round(score)}
            </div>
            <div className="text-xs text-text-muted">
              AEHI
            </div>
          </motion.div>
        </div>
      </div>

      {/* Score label */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-2 text-center"
      >
        <div className="text-sm font-medium text-text-primary">
          {getScoreLabel(score)}
        </div>
        {showTrend && previousScore && (
          <div className={`flex items-center justify-center gap-1 text-xs ${getTrendColor()}`}>
            {getTrendIcon()}
            <span>{getTrendText()}</span>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AEHIScore;
