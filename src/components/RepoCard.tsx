import React from 'react';
import { ExternalLink, Calendar, Code2, Zap, GitFork, Star, AlertCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import RepoStats from './RepoStats';

interface RepoCardProps {
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  url: string;
  similarity?: number;
  trending?: boolean;
  lastUpdated?: string;
  topics?: string[];
  viewMode?: 'grid' | 'list';
  issues?: number;
  updatedAt?: string;
}

const RepoCard: React.FC<RepoCardProps> = ({
  name,
  description,
  stars,
  forks,
  language,
  url,
  similarity = 0,
  trending = false,
  lastUpdated,
  topics = [],
  viewMode = 'grid',
  issues,
  updatedAt
}) => {
  const getLanguageColor = (lang: string): string => {
    const colors: Record<string, string> = {
      JavaScript: 'bg-yellow-500',
      TypeScript: 'bg-blue-500',
      Python: 'bg-green-500',
      Java: 'bg-red-500',
      'C++': 'bg-purple-500',
      Go: 'bg-cyan-500',
      Rust: 'bg-orange-500',
      PHP: 'bg-indigo-500',
      Ruby: 'bg-red-400',
      Swift: 'bg-orange-400'
    };
    return colors[lang] || 'bg-gray-500';
  };

  const getSimilarityColor = (score: number): string => {
    if (score >= 80) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  const formatDate = (dateString?: string): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.ceil(diffDays / 30)} months ago`;
    return `${Math.ceil(diffDays / 365)} years ago`;
  };

  if (viewMode === 'list') {
    return (
      <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-purple-500">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                <div className="min-w-0 flex-shrink">
                  <h3 className="text-base sm:text-lg font-bold text-gray-800 group-hover:text-purple-600 transition-colors truncate">
                    {name}
                  </h3>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {trending && (
                    <Badge className="bg-gradient-to-r from-pink-100 to-purple-100 text-purple-700 border-purple-200 whitespace-nowrap flex-shrink-0">
                      <Zap className="h-3 w-3 mr-1 flex-shrink-0" />
                      Trending
                    </Badge>
                  )}
                  {similarity > 0 && (
                    <Badge className={`text-xs px-2 py-1 whitespace-nowrap flex-shrink-0 ${getSimilarityColor(similarity)}`}>
                      {similarity}% match
                    </Badge>
                  )}
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {description}
              </p>
              
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <div className={`w-3 h-3 rounded-full ${getLanguageColor(language)}`} />
                  <span>{language}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4" />
                  <span>{formatNumber(stars)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <GitFork className="h-4 w-4" />
                  <span>{formatNumber(forks)}</span>
                </div>
                {issues !== undefined && (
                  <div className="flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    <span>{issues} issues</span>
                  </div>
                )}
                {updatedAt && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{formatDate(updatedAt)}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button asChild size="sm" className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <a href={url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  View
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg bg-gradient-to-br from-white to-gray-50 h-full flex flex-col">
      <CardHeader className="pb-3 flex-shrink-0">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base sm:text-lg font-bold text-gray-800 group-hover:text-purple-600 transition-colors line-clamp-1 flex-1">
            {name}
          </CardTitle>
          {similarity > 0 && (
            <Badge className={`text-xs px-2 py-1 flex-shrink-0 whitespace-nowrap ${getSimilarityColor(similarity)}`}>
              {similarity}%
            </Badge>
          )}
        </div>
        
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center space-x-1 min-w-0 max-w-[60%]">
            <div className={`w-3 h-3 rounded-full flex-shrink-0 ${getLanguageColor(language)}`} />
            <span className="text-sm text-gray-600 font-medium truncate">{language}</span>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            {trending && (
              <Badge variant="secondary" className="bg-gradient-to-r from-pink-100 to-purple-100 text-purple-700 whitespace-nowrap flex-shrink-0">
                <Zap className="h-3 w-3 mr-1 flex-shrink-0" />
                Hot
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3 sm:space-y-4 flex-1 flex flex-col p-4 sm:p-6">
        <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed flex-1">
          {description}
        </p>
        
        {topics.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {topics.slice(0, 3).map((topic) => (
              <Badge key={topic} variant="outline" className="text-xs px-2 py-1">
                {topic}
              </Badge>
            ))}
            {topics.length > 3 && (
              <Badge variant="outline" className="text-xs px-2 py-1 text-gray-500">
                +{topics.length - 3}
              </Badge>
            )}
          </div>
        )}
        
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <RepoStats 
              stars={stars} 
              forks={forks} 
              trending={trending}
              compact
              issues={issues}
            />
          </div>
          
          {updatedAt && (
            <div className="flex items-center text-xs text-gray-500 flex-shrink-0 whitespace-nowrap">
              <Calendar className="h-3 w-3 mr-1 flex-shrink-0" />
              Updated {formatDate(updatedAt)}
            </div>
          )}
        </div>
        
        <Button 
          asChild 
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white mt-auto"
        >
          <a href={url} target="_blank" rel="noopener noreferrer">
            <Code2 className="h-4 w-4 mr-2" />
            View Repository
            <ExternalLink className="h-4 w-4 ml-2" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};

export default RepoCard;