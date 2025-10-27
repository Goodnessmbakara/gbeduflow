import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, TrendingUp, Users } from 'lucide-react';

interface CampusData {
  id: string;
  name: string;
  location: string;
  ldsScore: number;
  artistCount: number;
  vibeChecks: number;
  coordinates: { x: number; y: number };
}

interface LDSHeatmapProps {
  data: CampusData[];
  selectedCampus?: string;
  onCampusSelect?: (campus: CampusData) => void;
}

const LDSHeatmap: React.FC<LDSHeatmapProps> = ({
  data,
  onCampusSelect,
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-accent-secondary text-white';
    if (score >= 70) return 'bg-accent-primary text-white';
    if (score >= 50) return 'bg-accent-warning text-white';
    if (score >= 30) return 'bg-orange-500 text-white';
    return 'bg-bg-tertiary text-text-muted';
  };

  const getScoreIntensity = (score: number) => {
    return Math.max(0.3, score / 100);
  };


  return (
    <div className="card">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-text-primary mb-2 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-accent-primary" />
          Campus Heat Map
        </h3>
        <p className="text-text-secondary text-sm">
          Local Demand Score (LDS) across universities - darker colors indicate higher activity
        </p>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-bg-tertiary rounded"></div>
            <span className="text-xs text-text-muted">Low (0-30)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-500 rounded"></div>
            <span className="text-xs text-text-muted">Medium (30-50)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-accent-warning rounded"></div>
            <span className="text-xs text-text-muted">High (50-70)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-accent-primary rounded"></div>
            <span className="text-xs text-text-muted">Very High (70-90)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-accent-secondary rounded"></div>
            <span className="text-xs text-text-muted">Fire (90+)</span>
          </div>
        </div>
        <div className="text-sm text-text-muted">
          {data.length} campuses
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {data.map((campus, index) => (
          <motion.div
            key={campus.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onCampusSelect?.(campus)}
            className={`relative p-4 rounded-lg cursor-pointer transition-all duration-200 ${getScoreColor(campus.ldsScore)} hover:shadow-lg`}
            style={{
              opacity: getScoreIntensity(campus.ldsScore),
            }}
          >
            <div className="space-y-2">
              <div className="font-semibold text-sm truncate">
                {campus.name}
              </div>
              <div className="text-xs opacity-80">
                {campus.location}
              </div>
              <div className="flex items-center justify-between">
                <div className="text-lg font-bold">
                  {campus.ldsScore}
                </div>
                <div className="text-xs opacity-80">
                  LDS
                </div>
              </div>
              <div className="flex items-center justify-between text-xs opacity-80">
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {campus.artistCount}
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {campus.vibeChecks}
                </div>
              </div>
            </div>

            {/* Hover Effect */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-200" />
          </motion.div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 pt-4 border-t border-bg-tertiary">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-accent-primary">
              {Math.round(data.reduce((sum, d) => sum + d.ldsScore, 0) / data.length)}
            </div>
            <div className="text-xs text-text-muted">Avg LDS</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-accent-secondary">
              {data.filter(d => d.ldsScore >= 70).length}
            </div>
            <div className="text-xs text-text-muted">Hot Campuses</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-chart-line-3">
              {data.reduce((sum, d) => sum + d.vibeChecks, 0)}
            </div>
            <div className="text-xs text-text-muted">Total Checks</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LDSHeatmap;
