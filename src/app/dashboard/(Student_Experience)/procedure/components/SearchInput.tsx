import React, { useEffect, useRef, useState } from 'react';
import { Search } from 'lucide-react';

import { Input } from '@/components/ui/input';

const options = [
  'Competency List option1',
  'Competency List option2',
  'Competency List option3',
  'Competency List option4',
];

type SearchInputProps = {
  setOpen: (open: boolean) => void;
};

const SearchInput = ({ setOpen }: SearchInputProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [search, setSearch] = useState('');

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(search.toLowerCase()),
  );

  // ✅ Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setOpen]);

  return (
    <div
      ref={dropdownRef}
      className="absolute z-50 mt-2 w-[20rem] rounded-md border bg-white p-4 shadow-lg space-y-4"
    >
      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-9 bg-muted"
        />
      </div>

      <div className="space-y-2">
        {filteredOptions.map((item, index) => (
          <div
            key={index}
            className="text-sm cursor-pointer hover:bg-muted p-1 rounded"
            onClick={() => {
              console.log('Selected:', item);
              setOpen(false);
            }}
          >
            {item}
          </div>
        ))}
        {filteredOptions.length === 0 && (
          <p className="text-sm text-muted-foreground">No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchInput;
