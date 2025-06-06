'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Bell, Search, ArrowLeft, ListFilter, Search as SearchIcon } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useBreadcrumbStore } from '@/store/breadcrumbs';

import StarIcon from '../../../public/svgs/stars.svg';

type SearchItem = {
  id: number;
  title: string;
  type: 'Course' | 'Event' | string;
};

const mockData: SearchItem[] = [
  { id: 1, title: 'Women’s Health', type: 'Course' },
  { id: 2, title: 'Women’s Health Celebration', type: 'Event' },
  { id: 3, title: 'Women’s Health', type: 'Course' },
];

export default function DashboardHeader() {
  const router = useRouter();
  const title = useBreadcrumbStore(state => state.title);

  const handleBack = (): void => router.back();

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchItem[]>([]);

  useEffect(() => {
    if (query.trim()) {
      const filtered = mockData.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()),
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
  };

  return (
    <header className="relative flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <ArrowLeft className="w-4 h-4 text-[#858585] cursor-pointer" onClick={handleBack} />
        <h1 className="text-sm font-medium text-[#858585]">{title}</h1>
      </div>

      <div className="z-20 absolute left-0 right-0 top-0 bottom-0 m-auto w-full max-w-md transition-all duration-300 ease-in-out">
        <form
          role="search"
          aria-label="Site search"
          onSubmit={handleSubmit}
          className={`${results.length > 0 ? 'shadow-md' : ''} flex flex-col overflow-hidden bg-white border border-input transition-all duration-300 ease-in-out rounded-[20px]`}
        >
          <div className="flex items-center px-2 h-[30px] border-b">
            <Button
              size="icon"
              type="submit"
              variant="ghost"
              aria-label="Search"
              className="rounded-full w-[28px] text-muted-foreground hover:bg-transparent"
            >
              <Search className="h-3 w-4" />
            </Button>

            <Input
              name="search"
              type="search"
              value={query}
              placeholder="Search"
              aria-label="Search input"
              onChange={handleInputChange}
              className="flex-grow text-[#33333399] text-[12px] border-0 shadow-none text-sm placeholder:text-[#33333399] placeholder:font-medium px-1 focus-visible:ring-0"
            />

            <Button
              size="icon"
              type="button"
              variant="ghost"
              aria-label="Filter options"
              className="rounded-full text-muted-foreground hover:bg-transparent"
            >
              <ListFilter className="h-4 w-4" />
            </Button>
          </div>

          {results.length > 0 && (
            <div className="flex flex-col ">
              {results.map(item => (
                <div
                  key={item.id}
                  className="flex items-center justify-between px-4 py-3 hover:bg-gray-100 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-[36px] h-[36px] flex items-center justify-center bg-gray-100 rounded-[10px]">
                      <StarIcon className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-[#333333DE] font-medium text-[14px]">{item.title}</p>
                      <p className="text-[12px] text-[#33333399]">{item.type}</p>
                    </div>
                  </div>

                  <SearchIcon className="w-4 h-4 text-muted-foreground" />
                </div>
              ))}
            </div>
          )}
        </form>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5 text-[#333333]" />
        </Button>
      </div>
    </header>
  );
}
