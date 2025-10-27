import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Users, TrendingUp, MapPin } from 'lucide-react';

interface ClusterData {
  id: string;
  name: string;
  keywords: string[];
  artistCount: number;
  aeiScore: number;
  description: string;
  topCountries: string[];
  growthRate: number;
  color: string;
}

interface AEIClustersProps {
  data: ClusterData[];
  selectedCluster?: string;
  onClusterSelect?: (cluster: ClusterData) => void;
}

const AEIClusters: React.FC<AEIClustersProps> = ({
  data,
  selectedCluster,
  onClusterSelect,
}) => {
  const getClusterColor = (color: string) => {
    const colors = {
      blue: 'bg-accent-primary',
      green: 'bg-accent-secondary',
      purple: 'bg-purple-500',
      orange: 'bg-accent-warning',
      pink: 'bg-pink-500',
    };
    return colors[color as keyof typeof colors] || 'bg-accent-primary';
  };

  const getClusterIcon = (name: string) => {
    if (name.toLowerCase().includes('african')) return '🌍';
    if (name.toLowerCase().includes('diaspora')) return '✈️';
    if (name.toLowerCase().includes('mainstream')) return '🎵';
    if (name.toLowerCase().includes('underground')) return '🎤';
    if (name.toLowerCase().includes('global')) return '🌐';
    return '🎶';
  };

  return (
    <div className="card">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-text-primary mb-2 flex items-center gap-2">
          <Globe className="w-5 h-5 text-accent-primary" />
          Global Audience Clusters
        </h3>
        <p className="text-text-secondary text-sm">
          Audience Export Index (AEI) - Discover where your music resonates globally
        </p>
      </div>

      {/* Clusters Grid */}
      <div className="space-y-4">
        {data.map((cluster, index) => (
          <motion.div
            key={cluster.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => onClusterSelect?.(cluster)}
            className={`relative p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
              selectedCluster === cluster.id
                ? 'border-accent-primary bg-accent-primary/5'
                : 'border-bg-tertiary hover:border-accent-primary/50 hover:bg-bg-secondary'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-10 h-10 rounded-full ${getClusterColor(cluster.color)} flex items-center justify-center text-white font-bold`}>
                    {getClusterIcon(cluster.name)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary">
                      {cluster.name}
                    </h4>
                    <p className="text-sm text-text-muted">
                      {cluster.description}
                    </p>
                  </div>
                </div>

                {/* Keywords */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {cluster.keywords.slice(0, 5).map((keyword, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-bg-tertiary text-text-secondary text-xs rounded-full"
                    >
                      {keyword}
                    </span>
                  ))}
                  {cluster.keywords.length > 5 && (
                    <span className="px-2 py-1 bg-bg-tertiary text-text-muted text-xs rounded-full">
                      +{cluster.keywords.length - 5} more
                    </span>
                  )}
                </div>

                {/* Top Countries */}
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-text-muted" />
                  <span className="text-sm text-text-secondary">
                    Top: {cluster.topCountries.slice(0, 3).join(', ')}
                    {cluster.topCountries.length > 3 && ` +${cluster.topCountries.length - 3} more`}
                  </span>
                </div>
              </div>

              {/* Metrics */}
              <div className="text-right space-y-2">
                <div className="text-2xl font-bold text-accent-primary">
                  {cluster.aeiScore}
                </div>
                <div className="text-xs text-text-muted">AEI Score</div>
                <div className="flex items-center gap-1 text-xs text-accent-secondary">
                  <TrendingUp className="w-3 h-3" />
                  +{cluster.growthRate}%
                </div>
                <div className="flex items-center gap-1 text-xs text-text-muted">
                  <Users className="w-3 h-3" />
                  {cluster.artistCount} artists
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-3">
              <div className="w-full bg-bg-tertiary rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${getClusterColor(cluster.color)} transition-all duration-500`}
                  style={{ width: `${cluster.aeiScore}%` }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-6 pt-4 border-t border-bg-tertiary">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-xl font-bold text-accent-primary">
              {data.length}
            </div>
            <div className="text-xs text-text-muted">Clusters</div>
          </div>
          <div>
            <div className="text-xl font-bold text-accent-secondary">
              {Math.round(data.reduce((sum, d) => sum + d.aeiScore, 0) / data.length)}
            </div>
            <div className="text-xs text-text-muted">Avg AEI</div>
          </div>
          <div>
            <div className="text-xl font-bold text-chart-line-3">
              {data.reduce((sum, d) => sum + d.artistCount, 0)}
            </div>
            <div className="text-xs text-text-muted">Total Artists</div>
          </div>
          <div>
            <div className="text-xl font-bold text-accent-warning">
              {Math.round(data.reduce((sum, d) => sum + d.growthRate, 0) / data.length)}%
            </div>
            <div className="text-xs text-text-muted">Avg Growth</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AEIClusters;
