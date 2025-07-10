import React, { useState } from 'react';
import { TrendingUp, Flame, Star, Clock, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface TrendingRepo {
  name: string;
  description: string;
  stars: number;
  growth: string;
  language: string;
  category: string;
  url: string;
}

const TrendingSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isHovering, setIsHovering] = useState<string | null>(null);

  const trendingRepos: TrendingRepo[] = [
    {
      name: 'shadcn/ui',
      description: 'Beautifully designed components built with Radix UI and Tailwind CSS.',
      stars: 45000,
      growth: '+2.3k this week',
      language: 'TypeScript',
      category: 'Frontend',
      url: 'https://github.com/shadcn/ui'
    },
    {
      name: 'microsoft/playwright',
      description: 'Framework for Web Testing and Automation',
      stars: 52000,
      growth: '+1.8k this week',
      language: 'TypeScript',
      category: 'DevTools',
      url: 'https://github.com/microsoft/playwright'
    },
    {
      name: 'vercel/next.js',
      description: 'The React Framework for the Web',
      stars: 118000,
      growth: '+1.5k this week',
      language: 'JavaScript',
      category: 'Framework',
      url: 'https://github.com/vercel/next.js'
    },
    {
      name: 'langchain-ai/langchain',
      description: 'Building applications with LLMs through composability',
      stars: 65000,
      growth: '+3.2k this week',
      language: 'Python',
      category: 'AI/ML',
      url: 'https://github.com/langchain-ai/langchain'
    }
  ];

  const categories = ['All', 'Frontend', 'Backend', 'DevTools', 'AI/ML', 'Mobile'];

  const filteredRepos = selectedCategory === 'All'
    ? trendingRepos
    : trendingRepos.filter(repo => repo.category === selectedCategory);

  const handleRepoClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card className="bg-gradient-to-br from-slate-50 to-blue-50 border-slate-200 transition-all duration-300">
      <CardHeader className="space-y-4 pb-4 md:pb-6">
        <CardTitle className="flex items-center text-xl md:text-2xl font-semibold text-slate-800">
          <Flame className="h-6 w-6 mr-2 text-blue-500" />
          Trending This Week
        </CardTitle>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === selectedCategory ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={`text-xs md:text-sm transition-all duration-200 ${category === selectedCategory ? 'bg-blue-600 hover:bg-blue-700 scale-105' : 'hover:bg-slate-100 hover:scale-105'}`}
            >
              {category}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="space-y-3 md:space-y-4">
        {filteredRepos.map((repo, index) => (
          <div
            key={repo.name}
            onClick={() => handleRepoClick(repo.url)}
            onMouseEnter={() => setIsHovering(repo.name)}
            onMouseLeave={() => setIsHovering(null)}
            className="group flex items-start gap-3 p-3 md:p-4 bg-white/80 rounded-xl border border-slate-200 hover:shadow-lg hover:border-blue-200 transition-all duration-200 cursor-pointer"
          >
            <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center text-white font-semibold text-sm md:text-base">
              {index + 1}
            </div>
            <div className="flex-1 min-w-0 space-y-2 md:space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="font-semibold text-slate-800 truncate hover:text-blue-600 transition-colors flex items-center gap-1">
                  {repo.name}
                  {isHovering === repo.name && (
                    <ExternalLink className="h-4 w-4 inline-block text-blue-500" />
                  )}
                </h4>
                <Badge variant="secondary" className="text-xs md:text-sm bg-slate-100 text-slate-700 group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors flex-shrink-0">
                  {repo.category}
                </Badge>
              </div>
              <p className="text-sm md:text-base text-slate-600 line-clamp-2 group-hover:text-slate-700">
                {repo.description}
              </p>
              <div className="flex items-center justify-between text-xs md:text-sm flex-wrap gap-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="flex items-center text-slate-700 flex-shrink-0 group-hover:text-amber-600 transition-colors">
                    <Star className="h-3.5 w-3.5 mr-1 text-amber-500" />
                    {(repo.stars / 1000).toFixed(1)}k
                  </span>
                  <span className="text-slate-600 flex-shrink-0 group-hover:text-slate-800">{repo.language}</span>
                </div>
                <div className="flex items-center text-emerald-600 font-medium flex-shrink-0 group-hover:text-emerald-700">
                  <TrendingUp className="h-3.5 w-3.5 mr-1" />
                  {repo.growth}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <Button 
          variant="outline" 
          onClick={() => window.location.href = 'https://github.com/trending'}
          className="w-full border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-all duration-200 md:text-base"
        >
          <Clock className="h-4 w-4 mr-2" />
          View All Trending
        </Button>
      </CardContent>
    </Card>
  );
};

export default TrendingSection;
