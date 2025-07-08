import React, { useState } from 'react';
import { Filter, X, Calendar, Code, Star, Users, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface FilterPanelProps {
  onFiltersChange: (filters: any) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ onFiltersChange, isOpen, onToggle }) => {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [minStars, setMinStars] = useState([0]);
  const [sortBy, setSortBy] = useState('stars');
  const [dateRange, setDateRange] = useState('any');
  const [languagesOpen, setLanguagesOpen] = useState(true);
  const [starsOpen, setStarsOpen] = useState(true);
  const [sortOpen, setSortOpen] = useState(true);
  const [dateOpen, setDateOpen] = useState(false);

  const languages = [
    'JavaScript', 'TypeScript', 'Python', 'Java', 'Go', 'Rust', 'C++', 'PHP', 'Ruby', 'Swift'
  ];

  const toggleLanguage = (lang: string) => {
    const updated = selectedLanguages.includes(lang)
      ? selectedLanguages.filter(l => l !== lang)
      : [...selectedLanguages, lang];
    setSelectedLanguages(updated);
    updateFilters({ languages: updated });
  };

  const updateFilters = (updates: any) => {
    onFiltersChange({
      languages: selectedLanguages,
      minStars: minStars[0],
      sortBy,
      dateRange,
      ...updates
    });
  };

  const clearFilters = () => {
    setSelectedLanguages([]);
    setMinStars([0]);
    setSortBy('stars');
    setDateRange('any');
    onFiltersChange({});
  };

  if (!isOpen) {
    return (
      <Button
        onClick={onToggle}
        variant="outline"
        className="fixed top-4 right-4 z-50 lg:hidden shadow-lg"
      >
        <Filter className="h-4 w-4 mr-2" />
        Filters
      </Button>
    );
  }

  return (
    <Card className="sticky top-4 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="flex items-center text-lg font-bold">
          <Filter className="h-5 w-5 mr-2 text-purple-600" />
          Filters
        </CardTitle>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear All
          </Button>
          <Button variant="ghost" size="sm" onClick={onToggle} className="lg:hidden">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Languages */}
        <Collapsible open={languagesOpen} onOpenChange={setLanguagesOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded-md">
            <h4 className="flex items-center font-semibold">
              <Code className="h-4 w-4 mr-2 text-blue-600" />
              Languages {selectedLanguages.length > 0 && `(${selectedLanguages.length})`}
            </h4>
            {languagesOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2">
            <div className="flex flex-wrap gap-2">
              {languages.map((lang) => (
                <Badge
                  key={lang}
                  variant={selectedLanguages.includes(lang) ? 'default' : 'outline'}
                  className="cursor-pointer hover:bg-purple-100 transition-colors"
                  onClick={() => toggleLanguage(lang)}
                >
                  {lang}
                </Badge>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Minimum Stars */}
        <Collapsible open={starsOpen} onOpenChange={setStarsOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded-md">
            <h4 className="flex items-center font-semibold">
              <Star className="h-4 w-4 mr-2 text-yellow-600" />
              Min Stars: {minStars[0] >= 1000 ? `${(minStars[0]/1000).toFixed(0)}k` : minStars[0]}
            </h4>
            {starsOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2">
            <Slider
              value={minStars}
              onValueChange={(value) => {
                setMinStars(value);
                updateFilters({ minStars: value[0] });
              }}
              max={10000}
              step={100}
              className="w-full"
            />
          </CollapsibleContent>
        </Collapsible>

        {/* Sort By */}
        <Collapsible open={sortOpen} onOpenChange={setSortOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded-md">
            <h4 className="flex items-center font-semibold">
              <Users className="h-4 w-4 mr-2 text-green-600" />
              Sort By
            </h4>
            {sortOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2">
            <Select value={sortBy} onValueChange={(value) => {
              setSortBy(value);
              updateFilters({ sortBy: value });
            }}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stars">Most Stars</SelectItem>
                <SelectItem value="forks">Most Forks</SelectItem>
                <SelectItem value="updated">Recently Updated</SelectItem>
                <SelectItem value="created">Recently Created</SelectItem>
              </SelectContent>
            </Select>
          </CollapsibleContent>
        </Collapsible>

        {/* Date Range */}
        <Collapsible open={dateOpen} onOpenChange={setDateOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded-md">
            <h4 className="flex items-center font-semibold">
              <Calendar className="h-4 w-4 mr-2 text-indigo-600" />
              Created
            </h4>
            {dateOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2">
            <Select value={dateRange} onValueChange={(value) => {
              setDateRange(value);
              updateFilters({ dateRange: value });
            }}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any time</SelectItem>
                <SelectItem value="week">Past week</SelectItem>
                <SelectItem value="month">Past month</SelectItem>
                <SelectItem value="year">Past year</SelectItem>
              </SelectContent>
            </Select>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};

export default FilterPanel;