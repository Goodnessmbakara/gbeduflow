import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TrendData {
  date: string;
  aehScore: number;
  ldsScore: number;
  aeiScore: number;
}

interface TrendChartProps {
  data: TrendData[];
  type: 'aehi' | 'lds' | 'aei' | 'all';
  height?: number;
  showDots?: boolean;
  className?: string;
}

const TrendChart: React.FC<TrendChartProps> = ({
  data,
  type,
  height = 300,
  showDots = true,
  className = '',
}) => {
  const getChartConfig = () => {
    switch (type) {
      case 'aehi':
        return {
          dataKey: 'aehScore',
          color: '#3B82F6',
          name: 'AEHI Score',
        };
      case 'lds':
        return {
          dataKey: 'ldsScore',
          color: '#10B981',
          name: 'LDS Score',
        };
      case 'aei':
        return {
          dataKey: 'aeiScore',
          color: '#3A506B',
          name: 'AEI Score',
        };
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-bg-secondary border border-bg-tertiary rounded-lg p-3 shadow-lg">
          <p className="text-text-primary font-medium mb-2">
            {formatDate(label)}
          </p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-text-secondary text-sm">
                {entry.name}: {entry.value}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  if (type === 'all') {
    return (
      <div className={`card ${className}`}>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-text-primary mb-1">
            Score Trends
          </h3>
          <p className="text-sm text-text-secondary">
            Track all metrics over time
          </p>
        </div>
        <ResponsiveContainer width="100%" height={height}>
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey="date"
              tickFormatter={formatDate}
              stroke="#9CA3AF"
              fontSize={12}
            />
            <YAxis
              domain={[0, 100]}
              stroke="#9CA3AF"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="aehScore"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={showDots}
              name="AEHI"
            />
            <Line
              type="monotone"
              dataKey="ldsScore"
              stroke="#10B981"
              strokeWidth={2}
              dot={showDots}
              name="LDS"
            />
            <Line
              type="monotone"
              dataKey="aeiScore"
              stroke="#3A506B"
              strokeWidth={2}
              dot={showDots}
              name="AEI"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }

  const config = getChartConfig();
  if (!config) return null;

  return (
    <div className={`card ${className}`}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-text-primary mb-1">
          {config.name} Trend
        </h3>
        <p className="text-sm text-text-secondary">
          Performance over the last 30 days
        </p>
      </div>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            stroke="#9CA3AF"
            fontSize={12}
          />
          <YAxis
            domain={[0, 100]}
            stroke="#9CA3AF"
            fontSize={12}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey={config.dataKey}
            stroke={config.color}
            strokeWidth={3}
            dot={showDots}
            name={config.name}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendChart;
