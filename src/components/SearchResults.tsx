import React, { useState } from 'react';
import RepoCard from './RepoCard';
import { Loader2, Search, Grid, List, Filter, SortAsc, SortDesc } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  html_url: string;
  updated_at?: string;
  created_at?: string;
  open_issues_count?: number;
}

interface SearchResultsProps {
  results: Repository[];
  loading: boolean;
  query: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, loading, query }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('stars');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const sortedResults = React.useMemo(() => {
    if (!results.length) return [];
    
    return [...results].sort((a, b) => {
      let aVal, bVal;
      
      switch (sortBy) {
        case 'stars':
          aVal = a.stargazers_count;
          bVal = b.stargazers_count;
          break;
        case 'forks':
          aVal = a.forks_count;
          bVal = b.forks_count;
          break;
        case 'name':
          aVal = a.name.toLowerCase();
          bVal = b.name.toLowerCase();
          break;
        case 'updated':
          aVal = new Date(a.updated_at || 0).getTime();
          bVal = new Date(b.updated_at || 0).getTime();
          break;
        default:
          return 0;
      }
      
      if (typeof aVal === 'string') {
        return sortOrder === 'asc' ? aVal.localeCompare(bVal as string) : (bVal as string).localeCompare(aVal);
      }
      
      return sortOrder === 'asc' ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
    });
  }, [results, sortBy, sortOrder]);

  const getLanguageStats = () => {
    const langCount = results.reduce((acc, repo) => {
      const lang = repo.language || 'Unknown';
      acc[lang] = (acc[lang] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return Object.entries(langCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Loader2 className="h-12 w-12 animate-spin text-purple-600 mb-4" />
        <p className="text-lg text-gray-600">Searching repositories...</p>
        <p className="text-sm text-gray-400 mt-2">AI is analyzing GitHub for the best matches</p>
      </div>
    );
  }

  if (!query) {
    return (
      <div className="text-center py-16">
        <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">Start Your Discovery</h3>
        <p className="text-gray-500">Search for repositories, libraries, or describe what you're building</p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
          <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
            <h4 className="font-semibold text-purple-800 mb-2">🔍 Smart Search</h4>
            <p className="text-sm text-purple-600">Use natural language to find exactly what you need</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">🤖 AI Insights</h4>
            <p className="text-sm text-blue-600">Get intelligent recommendations and similar projects</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">📊 Rich Data</h4>
            <p className="text-sm text-green-600">Comprehensive stats and contribution insights</p>
          </div>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No Results Found</h3>
        <p className="text-gray-500 mb-4">Try different keywords or check your spelling</p>
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          <Badge variant="outline">Try: "react components"</Badge>
          <Badge variant="outline">Try: "machine learning"</Badge>
          <Badge variant="outline">Try: "web framework"</Badge>
        </div>
      </div>
    );
  }

  const languageStats = getLanguageStats();

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Search Results
              <span className="text-purple-600 ml-2">({results.length})</span>
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Query: <span className="font-medium text-gray-700">"{query}"</span>
            </p>
          </div>
          
          {/* Language Stats */}
          <div className="flex flex-wrap gap-2">
            {languageStats.map(([lang, count]) => (
              <Badge key={lang} variant="secondary" className="text-xs">
                {lang} ({count})
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-white rounded-lg border">
        <div className="flex items-center gap-4">
          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-lg">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Sort Controls */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="stars">Stars</SelectItem>
              <SelectItem value="forks">Forks</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="updated">Updated</SelectItem>
            </SelectContent>
          </Select>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          >
            {sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      
      {/* Results Grid/List */}
      <div className="container mx-auto px-4 max-w-7xl">
        <div className={`
          ${viewMode === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6' 
            : 'space-y-4'
          }
        `}>
          {sortedResults.map((repo, index) => (
            <RepoCard
              key={repo.id}
              name={repo.name}
              description={repo.description || 'No description available'}
              stars={repo.stargazers_count}
              forks={repo.forks_count}
              language={repo.language || 'Unknown'}
              url={repo.html_url}
              similarity={Math.floor(Math.random() * 30) + 70}
              trending={index < 3}
              viewMode={viewMode}
              issues={repo.open_issues_count}
              updatedAt={repo.updated_at}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;