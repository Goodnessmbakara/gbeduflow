import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, MapPin, Globe, TrendingUp, Filter } from 'lucide-react';
import LDSHeatmap from '../components/charts/LDSHeatmap';
import AEIClusters from '../components/charts/AEIClusters';
import AEHIScore from '../components/charts/AEHIScore';
import TrendChart from '../components/charts/TrendChart';

interface CampusData {
  id: string;
  name: string;
  location: string;
  ldsScore: number;
  artistCount: number;
  vibeChecks: number;
  coordinates: { x: number; y: number };
}

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

interface TrendData {
  date: string;
  aehScore: number;
  ldsScore: number;
  aeiScore: number;
}

const Analytics: React.FC = () => {
  const [selectedCampus, setSelectedCampus] = useState<CampusData | null>(null);
  const [selectedCluster, setSelectedCluster] = useState<ClusterData | null>(null);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  // Mock data for demonstration
  const campusData: CampusData[] = [
    { id: '1', name: 'University of Lagos', location: 'Lagos', ldsScore: 92, artistCount: 15, vibeChecks: 247, coordinates: { x: 0, y: 0 } },
    { id: '2', name: 'University of Ibadan', location: 'Ibadan', ldsScore: 88, artistCount: 12, vibeChecks: 189, coordinates: { x: 0, y: 0 } },
    { id: '3', name: 'Covenant University', location: 'Ota', ldsScore: 85, artistCount: 8, vibeChecks: 156, coordinates: { x: 0, y: 0 } },
    { id: '4', name: 'Obafemi Awolowo University', location: 'Ile-Ife', ldsScore: 82, artistCount: 10, vibeChecks: 134, coordinates: { x: 0, y: 0 } },
    { id: '5', name: 'Ahmadu Bello University', location: 'Zaria', ldsScore: 78, artistCount: 6, vibeChecks: 98, coordinates: { x: 0, y: 0 } },
    { id: '6', name: 'University of Nigeria', location: 'Nsukka', ldsScore: 75, artistCount: 7, vibeChecks: 87, coordinates: { x: 0, y: 0 } },
    { id: '7', name: 'Federal University of Technology', location: 'Akure', ldsScore: 72, artistCount: 5, vibeChecks: 76, coordinates: { x: 0, y: 0 } },
    { id: '8', name: 'University of Port Harcourt', location: 'Port Harcourt', ldsScore: 68, artistCount: 4, vibeChecks: 65, coordinates: { x: 0, y: 0 } },
  ];

  const clusterData: ClusterData[] = [
    {
      id: '1',
      name: 'African Diaspora',
      keywords: ['afrobeats', 'african', 'diaspora', 'global', 'urban'],
      artistCount: 25,
      aeiScore: 89,
      description: 'Global African music enthusiasts and diaspora communities',
      topCountries: ['USA', 'UK', 'Canada', 'Germany'],
      growthRate: 15.2,
      color: 'blue',
    },
    {
      id: '2',
      name: 'Mainstream Pop',
      keywords: ['pop', 'mainstream', 'radio', 'charts', 'commercial'],
      artistCount: 18,
      aeiScore: 82,
      description: 'Mainstream pop music listeners and radio audiences',
      topCountries: ['Nigeria', 'Ghana', 'South Africa', 'Kenya'],
      growthRate: 8.7,
      color: 'green',
    },
    {
      id: '3',
      name: 'Underground Scene',
      keywords: ['underground', 'alternative', 'indie', 'experimental', 'raw'],
      artistCount: 12,
      aeiScore: 76,
      description: 'Alternative and underground music communities',
      topCountries: ['Nigeria', 'Ghana', 'Togo', 'Benin'],
      growthRate: 22.1,
      color: 'purple',
    },
    {
      id: '4',
      name: 'Global Fusion',
      keywords: ['fusion', 'world', 'cross-cultural', 'experimental', 'collaborative'],
      artistCount: 8,
      aeiScore: 71,
      description: 'Cross-cultural music fusion and experimental sounds',
      topCountries: ['Brazil', 'Colombia', 'France', 'Netherlands'],
      growthRate: 18.5,
      color: 'orange',
    },
  ];

  const trendData: TrendData[] = [
    { date: '2024-01-01', aehScore: 75, ldsScore: 70, aeiScore: 80 },
    { date: '2024-01-08', aehScore: 78, ldsScore: 72, aeiScore: 82 },
    { date: '2024-01-15', aehScore: 82, ldsScore: 75, aeiScore: 85 },
    { date: '2024-01-22', aehScore: 85, ldsScore: 78, aeiScore: 87 },
    { date: '2024-01-29', aehScore: 88, ldsScore: 80, aeiScore: 89 },
    { date: '2024-02-05', aehScore: 90, ldsScore: 82, aeiScore: 91 },
    { date: '2024-02-12', aehScore: 92, ldsScore: 85, aeiScore: 93 },
    { date: '2024-02-19', aehScore: 89, ldsScore: 83, aeiScore: 90 },
    { date: '2024-02-26', aehScore: 91, ldsScore: 84, aeiScore: 92 },
    { date: '2024-03-05', aehScore: 93, ldsScore: 86, aeiScore: 94 },
  ];

  const overallAEHIScore = 89;
  const previousAEHIScore = 85;

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-text-secondary">
            Deep insights into Afrobeats economic energy and global reach
          </p>
        </div>

        {/* Time Range Filter */}
        <div className="flex items-center gap-4 mb-8">
          <Filter className="w-5 h-5 text-text-muted" />
          <div className="flex gap-2">
            {(['7d', '30d', '90d'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  timeRange === range
                    ? 'bg-accent-primary text-white'
                    : 'bg-bg-secondary text-text-secondary hover:bg-bg-tertiary'
                }`}
              >
                {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : '90 Days'}
              </button>
            ))}
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card text-center"
          >
            <div className="w-12 h-12 bg-accent-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-6 h-6 text-accent-primary" />
            </div>
            <div className="text-2xl font-bold text-text-primary mb-1">
              {overallAEHIScore}
            </div>
            <div className="text-sm text-text-muted">Overall AEHI</div>
            <div className="text-xs text-accent-secondary mt-1">
              +{overallAEHIScore - previousAEHIScore} from last period
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card text-center"
          >
            <div className="w-12 h-12 bg-accent-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6 text-accent-secondary" />
            </div>
            <div className="text-2xl font-bold text-text-primary mb-1">
              {campusData.length}
            </div>
            <div className="text-sm text-text-muted">Active Campuses</div>
            <div className="text-xs text-accent-secondary mt-1">
              {campusData.filter(c => c.ldsScore >= 70).length} hot zones
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card text-center"
          >
            <div className="w-12 h-12 bg-chart-line-3/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Globe className="w-6 h-6 text-chart-line-3" />
            </div>
            <div className="text-2xl font-bold text-text-primary mb-1">
              {clusterData.length}
            </div>
            <div className="text-sm text-text-muted">Global Clusters</div>
            <div className="text-xs text-accent-secondary mt-1">
              {clusterData.reduce((sum, c) => sum + c.artistCount, 0)} artists
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card text-center"
          >
            <div className="w-12 h-12 bg-accent-warning/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-accent-warning" />
            </div>
            <div className="text-2xl font-bold text-text-primary mb-1">
              {Math.round(clusterData.reduce((sum, c) => sum + c.growthRate, 0) / clusterData.length)}%
            </div>
            <div className="text-sm text-text-muted">Avg Growth</div>
            <div className="text-xs text-accent-secondary mt-1">
              Global expansion
            </div>
          </motion.div>
        </div>

        {/* Main Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* AEHI Score */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card text-center"
          >
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              Current AEHI Score
            </h3>
            <AEHIScore
              score={overallAEHIScore}
              previousScore={previousAEHIScore}
              size="lg"
              showTrend={true}
            />
            <div className="mt-4 text-sm text-text-secondary">
              Afrobeats Economic Heat Index
            </div>
          </motion.div>

          {/* Trend Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <TrendChart
              data={trendData}
              type="all"
              height={300}
              showDots={true}
            />
          </motion.div>
        </div>

        {/* LDS Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <LDSHeatmap
            data={campusData}
            onCampusSelect={setSelectedCampus}
          />
        </motion.div>

        {/* AEI Clusters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <AEIClusters
            data={clusterData}
            selectedCluster={selectedCluster?.id}
            onClusterSelect={setSelectedCluster}
          />
        </motion.div>

        {/* Selected Campus/Cluster Details */}
        {(selectedCampus || selectedCluster) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <div className="card">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                {selectedCampus ? 'Campus Details' : 'Cluster Details'}
              </h3>
              {selectedCampus && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm text-text-muted">Campus</div>
                    <div className="font-semibold text-text-primary">
                      {selectedCampus.name}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-text-muted">LDS Score</div>
                    <div className="font-semibold text-accent-primary">
                      {selectedCampus.ldsScore}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-text-muted">Artists</div>
                    <div className="font-semibold text-text-primary">
                      {selectedCampus.artistCount}
                    </div>
                  </div>
                </div>
              )}
              {selectedCluster && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm text-text-muted">Cluster</div>
                    <div className="font-semibold text-text-primary">
                      {selectedCluster.name}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-text-muted">AEI Score</div>
                    <div className="font-semibold text-accent-primary">
                      {selectedCluster.aeiScore}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-text-muted">Growth Rate</div>
                    <div className="font-semibold text-accent-secondary">
                      +{selectedCluster.growthRate}%
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Analytics;
