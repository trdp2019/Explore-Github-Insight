import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import Hero from './Hero';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import SimilarRepos from './SimilarRepos';
import TrendingSection from './TrendingSection';
import FilterPanel from './FilterPanel';

interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  html_url: string;
  topics?: string[];
  updated_at?: string;
}

const AppLayout: React.FC = () => {
  const [searchResults, setSearchResults] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<any>({});
  const [showFilters, setShowFilters] = useState(false);
  const isMobile = useIsMobile();

  const handleSearch = async (query: string) => {
    setLoading(true);
    setSearchQuery(query);
    
    try {
      let searchUrl = `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}`;
      
      // Apply filters
      if (filters.languages?.length > 0) {
        searchUrl += `+language:${filters.languages.join('+language:')}`;
      }
      if (filters.minStars > 0) {
        searchUrl += `+stars:>=${filters.minStars}`;
      }
      if (filters.dateRange && filters.dateRange !== 'any') {
        const date = new Date();
        if (filters.dateRange === 'week') date.setDate(date.getDate() - 7);
        else if (filters.dateRange === 'month') date.setMonth(date.getMonth() - 1);
        else if (filters.dateRange === 'year') date.setFullYear(date.getFullYear() - 1);
        searchUrl += `+created:>=${date.toISOString().split('T')[0]}`;
      }
      
      const sortBy = filters.sortBy || 'stars';
      searchUrl += `&sort=${sortBy}&order=desc&per_page=12`;
      
      const response = await fetch(searchUrl);
      const data = await response.json();
      setSearchResults(data.items || []);
    } catch (error) {
      console.error('Search failed:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
    if (searchQuery) {
      handleSearch(searchQuery);
    }
  };

  // Mock similar repos with enhanced data
  const mockSimilarRepos = searchResults.length > 0 ? [
    { 
      name: 'react-query', 
      description: 'Powerful data synchronization for React', 
      similarity: 85, 
      language: 'TypeScript', 
      stars: 35000,
      category: 'State Management'
    },
    { 
      name: 'swr', 
      description: 'Data fetching with cache, revalidation', 
      similarity: 78, 
      language: 'TypeScript', 
      stars: 25000,
      category: 'Data Fetching'
    },
    { 
      name: 'apollo-client', 
      description: 'Comprehensive GraphQL client', 
      similarity: 72, 
      language: 'TypeScript', 
      stars: 18000,
      category: 'GraphQL'
    }
  ] : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Hero />
      
      <div className="relative -mt-16 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-6 sm:p-8 mb-8 border border-slate-100">
            <SearchBar onSearch={handleSearch} loading={loading} />
          </div>
          
          <div className={`grid gap-8 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-4'}`}>
            {/* Filters - Desktop Sidebar */}
            {!isMobile && (
              <div className="lg:col-span-1">
                <FilterPanel 
                  onFiltersChange={handleFiltersChange}
                  isOpen={true}
                  onToggle={() => {}}
                />
              </div>
            )}
            
            {/* Main Content */}
            <div className={`${isMobile ? 'col-span-1' : 'lg:col-span-3'} space-y-6`}>
              <SearchResults 
                results={searchResults}
                loading={loading}
                query={searchQuery}
              />
              {searchQuery && (
                <SimilarRepos 
                  repos={mockSimilarRepos}
                  baseRepo={searchQuery}
                />
              )}
            </div>
            
            {/* Sidebar */}
            <div className={`${isMobile ? 'col-span-1' : 'lg:col-span-1'} space-y-6`}>
              {!searchQuery && <TrendingSection />}
            </div>
          </div>
          
          {/* Mobile Filters */}
          {isMobile && (
            <FilterPanel 
              onFiltersChange={handleFiltersChange}
              isOpen={showFilters}
              onToggle={() => setShowFilters(!showFilters)}
            />
          )}
        </div>
      </div>
      
      <footer className="mt-24 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white py-16">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold mb-4">Built for Developers, by Developers</h3>
            <p className="text-slate-200 text-lg">
              Discover, analyze, and contribute to the open source ecosystem with AI-powered insights.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-300 mb-8">
              <span className="flex items-center gap-2">🚀 Fast Search</span>
              <span className="flex items-center gap-2">🤖 AI Recommendations</span>
              <span className="flex items-center gap-2">📊 Trend Analysis</span>
              <span className="flex items-center gap-2">💡 Smart Suggestions</span>
            </div>
            <div className="text-sm text-slate-200 font-medium">
              Made with ❤️ by{' '}
              <a
                href="https://googleit.in"
                className="underline hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                TRIDIP
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
