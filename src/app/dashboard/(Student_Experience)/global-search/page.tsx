'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Search } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

interface FilterValue {
  [key: string]: string;
}

interface SearchResult {
  id: string;
  title: string;
  year: string;
  description: string;
}

const filters = [
  {
    label: 'Institution',
    placeholder: 'All Institutions',
    key: 'institution',
  },
  {
    label: 'Academic Year',
    placeholder: 'All Institutions',
    key: 'academicYear',
  },
  {
    label: 'Curriculum',
    placeholder: 'All',
    key: 'curriculum',
  },
  {
    label: 'Course / Rotation',
    placeholder: 'All',
    key: 'course',
  },
  {
    label: 'Session',
    placeholder: 'All',
    key: 'session',
  },
  {
    label: 'Events',
    placeholder: 'All',
    key: 'events',
  },
  {
    label: 'Locations',
    placeholder: 'All',
    key: 'locations',
  },
];

const MOCK_SEARCH_RESULTS: SearchResult[] = [
  {
    id: '1',
    title: "Women's Health",
    year: '2nd Year Course',
    description:
      'To perform a comprehensive history and physical examination with special emphasis on mental status, mobility, medications and functional status.',
  },
  {
    id: '2',
    title: "Women's Health",
    year: '2nd Year Course',
    description:
      'To perform a comprehensive history and physical examination with special emphasis on mental status, mobility, medications and functional status.',
  },
  {
    id: '3',
    title: "Women's Health",
    year: '2nd Year Course',
    description:
      'To perform a comprehensive history and physical examination with special emphasis on mental status, mobility, medications and functional status.',
  },
];

const fetchSearchResults = async (searchTerm: string, filters: FilterValue, sortBy: string) => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  let results = [...MOCK_SEARCH_RESULTS];

  if (searchTerm) {
    results = results.filter(
      result =>
        result.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        result.description.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }

  if (sortBy === 'name') {
    results.sort((a, b) => a.title.localeCompare(b.title));
  }

  return results;
};

export default function GlobalSearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterValues, setFilterValues] = useState<FilterValue>({});
  const [sortBy, setSortBy] = useState('relevance');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  const { data: searchResults, isLoading } = useQuery({
    queryKey: ['search', debouncedSearchTerm, filterValues, sortBy],
    queryFn: () => fetchSearchResults(debouncedSearchTerm, filterValues, sortBy),
    enabled: !!debouncedSearchTerm,
  });

  const handleSearch = () => {
    setDebouncedSearchTerm(searchTerm);
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilterValues(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left Sidebar - Filters */}
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-4">DIRECTORY SEARCH</h2>
            <div className="space-y-4">
              <div className="space-y-4">
                <div className="relative">
                  <div className="relative w-[240px]">
                    <Input
                      type="search"
                      placeholder="Search"
                      className="w-full rounded-full pr-10 shadow-none"
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleSearch()}
                    />
                    <Search className="h-4 w-4 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                  </div>
                  <Button className="mt-2 bg-[#364699] rounded-full" onClick={handleSearch}>
                    Search
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">FILTER:</h3>

            <div className="space-y-4">
              {filters.map(filter => (
                <div key={filter.key}>
                  <label className="text-sm text-gray-600 font-semibold">{filter.label}</label>
                  <Select onValueChange={value => handleFilterChange(filter.key, value)}>
                    <SelectTrigger className="w-[240px] rounded-full shadow-none">
                      <SelectValue placeholder={filter.placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{filter.placeholder}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Content - Search Results */}
        <div className="md:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">SEARCH RESULTS ({searchResults?.length || 0})</h2>
            <div className="flex items-center gap-2">
              <h1 className="text-sm text-gray-600 font-semibold">Sort by:</h1>
              <Select defaultValue="relevance" onValueChange={setSortBy}>
                <SelectTrigger className="w-[240px] border-none shadow-none">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            {isLoading ? (
              <div>Loading...</div>
            ) : searchResults?.length ? (
              searchResults.map((result: SearchResult) => (
                <Card
                  key={result.id}
                  className="p-4 shadow-none border-0 border-b border-gray-200 last:border-b-0 rounded-none"
                >
                  <div className="flex items-start gap-4">
                    <div className="h-8 w-8 bg-gray-100 rounded-md flex items-center justify-center">
                      <Image
                        src="/hotel_class.svg"
                        alt="Class icon"
                        width={16}
                        height={16}
                        className="text-gray-500"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{result.title}</h3>
                      <p className="text-sm text-gray-500">{result.year}</p>
                      <p className="text-sm text-gray-600 mt-2">{result.description}</p>
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm" className="rounded-full">
                          Course
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-full">
                          Schedule
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center text-gray-500">No results found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
