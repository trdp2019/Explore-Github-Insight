import React from 'react';
import { Star, GitFork, Eye, Download, TrendingUp, Users, AlertCircle, Activity } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface RepoStatsProps {
  stars: number;
  forks: number;
  watchers?: number;
  downloads?: number;
  contributors?: number;
  trending?: boolean;
  compact?: boolean;
  issues?: number;
  activity?: 'high' | 'medium' | 'low';
}

const formatNumber = (num: number): string => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
};

const RepoStats: React.FC<RepoStatsProps> = ({
  stars,
  forks,
  watchers = 0,
  downloads = 0,
  contributors = 0,
  trending = false,
  compact = false,
  issues = 0,
  activity = 'medium'
}) => {
  const getActivityColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-green-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getActivityLabel = (level: string) => {
    switch (level) {
      case 'high': return 'Very Active';
      case 'medium': return 'Active';
      case 'low': return 'Quiet';
      default: return 'Unknown';
    }
  };

  const primaryStats = [
    { icon: Star, value: stars, label: 'Stars', color: 'text-yellow-500', bgColor: 'bg-yellow-50' },
    { icon: GitFork, value: forks, label: 'Forks', color: 'text-blue-500', bgColor: 'bg-blue-50' }
  ];

  const secondaryStats = [
    ...(watchers > 0 ? [{ icon: Eye, value: watchers, label: 'Watchers', color: 'text-green-500', bgColor: 'bg-green-50' }] : []),
    ...(downloads > 0 ? [{ icon: Download, value: downloads, label: 'Downloads', color: 'text-purple-500', bgColor: 'bg-purple-50' }] : []),
    ...(contributors > 0 ? [{ icon: Users, value: contributors, label: 'Contributors', color: 'text-indigo-500', bgColor: 'bg-indigo-50' }] : []),
    ...(issues > 0 ? [{ icon: AlertCircle, value: issues, label: 'Issues', color: 'text-orange-500', bgColor: 'bg-orange-50' }] : [])
  ];

  if (compact) {
    return (
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2 flex-wrap text-sm">
          {primaryStats.map(({ icon: Icon, value, color }) => (
            <div key={color} className={`flex items-center gap-1 ${color} flex-shrink-0`}>
              <Icon className="h-4 w-4 flex-shrink-0" />
              <span className="font-medium">{formatNumber(value)}</span>
            </div>
          ))}
          {issues > 0 && (
            <div className="flex items-center gap-1 text-orange-500 flex-shrink-0">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span className="font-medium">{issues}</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2 flex-shrink-0">
          {trending && (
            <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs whitespace-nowrap flex-shrink-0">
              <TrendingUp className="h-3 w-3 mr-1 flex-shrink-0" />
              Hot
            </Badge>
          )}
          <div className={`flex items-center gap-1 text-xs whitespace-nowrap flex-shrink-0 ${getActivityColor(activity)}`}>
            <Activity className="h-3 w-3 flex-shrink-0" />
            <span>{getActivityLabel(activity)}</span>
          </div>
        </div>
      </div>
    );
  }

  const allStats = [...primaryStats, ...secondaryStats];

  return (
    <div className="space-y-4">
      {/* Primary Stats - Always visible */}
      <div className="grid grid-cols-2 gap-3">
        {primaryStats.map(({ icon: Icon, value, label, color, bgColor }) => (
          <div key={label} className={`flex items-center space-x-2 p-3 ${bgColor} rounded-lg border`}>
            <Icon className={`h-5 w-5 ${color}`} />
            <div>
              <div className="font-bold text-lg">{formatNumber(value)}</div>
              <div className="text-xs text-gray-600 font-medium">{label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Secondary Stats - If available */}
      {secondaryStats.length > 0 && (
        <div className={`grid gap-2 ${
          secondaryStats.length === 1 ? 'grid-cols-1' :
          secondaryStats.length === 2 ? 'grid-cols-2' :
          'grid-cols-3'
        }`}>
          {secondaryStats.map(({ icon: Icon, value, label, color, bgColor }) => (
            <div key={label} className={`flex items-center space-x-2 p-2 ${bgColor} rounded-md`}>
              <Icon className={`h-4 w-4 ${color}`} />
              <div>
                <div className="font-semibold text-sm">{formatNumber(value)}</div>
                <div className="text-xs text-gray-500">{label}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Activity and Trending Badges */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        <div className={`flex items-center space-x-1 text-sm ${getActivityColor(activity)}`}>
          <Activity className="h-4 w-4" />
          <span className="font-medium">{getActivityLabel(activity)}</span>
        </div>
        
        {trending && (
          <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-green-200">
            <TrendingUp className="h-3 w-3 mr-1" />
            Trending Now
          </Badge>
        )}
      </div>
    </div>
  );
};

export default RepoStats;