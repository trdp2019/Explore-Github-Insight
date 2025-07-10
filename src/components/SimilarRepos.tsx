import React, { useState } from 'react';
import { Lightbulb, ExternalLink, Star, Code, GitFork } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface SimilarRepo {
  name: string;
  description: string;
  similarity: number;
  language: string;
  stars: number;
  category?: string;
  url: string;
  forks?: number;
}

interface SimilarReposProps {
  repos: SimilarRepo[];
  baseRepo: string;
  onViewAll?: () => void;
}

const SimilarRepos: React.FC<SimilarReposProps> = ({ repos, baseRepo, onViewAll }) => {
  const [hoveredRepo, setHoveredRepo] = useState<string | null>(null);

  if (repos.length === 0) return null;

  const handleRepoClick = (url: string) => {
    window.location.href = url;
  };

  const handleViewAll = () => {
    const searchUrl = `https://github.com/search?q=${encodeURIComponent(baseRepo)}&type=repositories`;
    window.location.href = searchUrl;
  };

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 transition-all duration-300 hover:shadow-lg">
      <CardHeader className="md:pb-6">
        <CardTitle className="flex items-center text-lg md:text-xl font-bold text-gray-800">
          <Lightbulb className="h-5 w-5 md:h-6 md:w-6 mr-2 text-blue-600" />
          Similar to "{baseRepo}"
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {repos.map((repo, index) => (
          <a
            key={repo.name}
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <div
              onMouseEnter={() => setHoveredRepo(repo.name)}
              onMouseLeave={() => setHoveredRepo(null)}
              className="p-4 md:p-5 bg-white rounded-lg border border-slate-200 hover:border-blue-200 hover:shadow-md transition-all duration-200 cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-2 md:mb-3">
                <h4 className="font-semibold text-gray-800 flex items-center gap-1 group-hover:text-blue-600 transition-colors">
                  {repo.name}
                  {hoveredRepo === repo.name && (
                    <ExternalLink className="h-4 w-4 inline-block text-blue-500" />
                  )}
                </h4>
                <Badge className="bg-blue-100 text-blue-700 text-xs md:text-sm font-medium transition-colors group-hover:bg-blue-200 group-hover:text-blue-800">
                  {repo.similarity}% match
                </Badge>
              </div>
              <p className="text-sm md:text-base text-gray-600 mb-3 line-clamp-2 group-hover:text-gray-700">
                {repo.description}
              </p>
              <div className="flex items-center justify-between text-xs md:text-sm">
                <div className="flex items-center space-x-3 md:space-x-4 text-gray-500">
                  <span className="flex items-center group-hover:text-amber-600 transition-colors">
                    <Star className="h-3.5 w-3.5 mr-1 text-amber-500" />
                    {(repo.stars / 1000).toFixed(1)}k
                  </span>
                  <span className="flex items-center group-hover:text-blue-600 transition-colors">
                    <Code className="h-3.5 w-3.5 mr-1" />
                    {repo.language}
                  </span>
                  {repo.forks && (
                    <span className="flex items-center group-hover:text-emerald-600 transition-colors">
                      <GitFork className="h-3.5 w-3.5 mr-1" />
                      {(repo.forks / 1000).toFixed(1)}k
                    </span>
                  )}
                </div>
                {repo.category && (
                  <Badge 
                    variant="outline" 
                    className="text-xs md:text-sm group-hover:bg-slate-100 transition-all duration-200"
                  >
                    {repo.category}
                  </Badge>
                )}
              </div>
            </div>
          </a>
        ))}
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleViewAll}
          className="w-full md:text-base hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-all duration-200"
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          View All Similar
        </Button>
      </CardContent>
    </Card>
  );
};

export default SimilarRepos;
