import React from 'react';
import { TrendingUp, Flame, Star, Clock } from 'lucide-react';
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
}

const TrendingSection: React.FC = () => {
  const trendingRepos: TrendingRepo[] = [
    {
      name: 'shadcn/ui',
      description: 'Beautifully designed components built with Radix UI and Tailwind CSS.',
      stars: 45000,
      growth: '+2.3k this week',
      language: 'TypeScript',
      category: 'UI Library'
    },
    {
      name: 'microsoft/playwright',
      description: 'Framework for Web Testing and Automation',
      stars: 52000,
      growth: '+1.8k this week',
      language: 'TypeScript',
      category: 'Testing'
    },
    {
      name: 'vercel/next.js',
      description: 'The React Framework for the Web',
      stars: 118000,
      growth: '+1.5k this week',
      language: 'JavaScript',
      category: 'Framework'
    }
  ];

  const categories = ['All', 'Frontend', 'Backend', 'DevTools', 'AI/ML', 'Mobile'];

  return (
    <Card className="bg-gradient-to-br from-slate-50 to-blue-50 border-slate-200">
      <CardHeader className="space-y-4 pb-4">
        <CardTitle className="flex items-center text-xl font-semibold text-slate-800">
          <Flame className="h-6 w-6 mr-2 text-blue-500" />
          Trending This Week
        </CardTitle>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === 'All' ? 'default' : 'outline'}
              size="sm"
              className={`text-xs ${category === 'All' ? 'bg-blue-600 hover:bg-blue-700' : 'hover:bg-slate-100'}`}
            >
              {category}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {trendingRepos.map((repo, index) => (
          <div
            key={repo.name}
            className="group flex items-start gap-3 p-3 bg-white/80 rounded-xl border border-slate-200 hover:shadow-md transition-all duration-200"
          >
            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
              {index + 1}
            </div>
            <div className="flex-1 min-w-0 space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="font-semibold text-slate-800 truncate hover:text-blue-600 transition-colors">{repo.name}</h4>
                <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-700 group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors flex-shrink-0">
                  {repo.category}
                </Badge>
              </div>
              <p className="text-sm text-slate-600 line-clamp-2 group-hover:text-slate-700">
                {repo.description}
              </p>
              <div className="flex items-center justify-between text-xs flex-wrap gap-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="flex items-center text-slate-700 flex-shrink-0">
                    <Star className="h-3.5 w-3.5 mr-1 text-amber-500" />
                    {(repo.stars / 1000).toFixed(1)}k
                  </span>
                  <span className="text-slate-600 flex-shrink-0">{repo.language}</span>
                </div>
                <div className="flex items-center text-emerald-600 font-medium flex-shrink-0">
                  <TrendingUp className="h-3.5 w-3.5 mr-1" />
                  {repo.growth}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <Button 
          variant="outline" 
          className="w-full border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
        >
          <Clock className="h-4 w-4 mr-2" />
          View All Trending
        </Button>
      </CardContent>
    </Card>
  );
};

export default TrendingSection;