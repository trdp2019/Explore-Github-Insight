import React from 'react';
import { Lightbulb, ExternalLink, Star, Code } from 'lucide-react';
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
}

interface SimilarReposProps {
  repos: SimilarRepo[];
  baseRepo: string;
}

const SimilarRepos: React.FC<SimilarReposProps> = ({ repos, baseRepo }) => {
  if (repos.length === 0) return null;

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center text-lg font-bold text-gray-800">
          <Lightbulb className="h-5 w-5 mr-2 text-blue-600" />
          Similar to "{baseRepo}"
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {repos.map((repo, index) => (
          <div key={repo.name} className="p-4 bg-white rounded-lg border hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-semibold text-gray-800">{repo.name}</h4>
              <Badge className="bg-blue-100 text-blue-700 text-xs">
                {repo.similarity}% match
              </Badge>
            </div>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{repo.description}</p>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-3 text-gray-500">
                <span className="flex items-center">
                  <Star className="h-3 w-3 mr-1 text-yellow-500" />
                  {(repo.stars / 1000).toFixed(1)}k
                </span>
                <span className="flex items-center">
                  <Code className="h-3 w-3 mr-1" />
                  {repo.language}
                </span>
              </div>
              {repo.category && (
                <Badge variant="outline" className="text-xs">
                  {repo.category}
                </Badge>
              )}
            </div>
          </div>
        ))}
        <Button variant="outline" size="sm" className="w-full">
          <ExternalLink className="h-4 w-4 mr-2" />
          View All Similar
        </Button>
      </CardContent>
    </Card>
  );
};

export default SimilarRepos;