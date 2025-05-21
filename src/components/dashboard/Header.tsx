import { Bell, Search, ListFilter } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useBreadcrumbStore } from '@/store/breadcrumbs';

export default function DashboardHeader() {
  const title = useBreadcrumbStore(state => state.title);

  return (
    <header className="flex justify-between items-center">
      <h1 className="text-sm font-medium text-[#858585]">{title}</h1>

      <form
        role="search"
        aria-label="Site search"
        className="flex items-center w-full max-w-md border border-input rounded-full px-2 py-0 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
      >
        <Button
          size="icon"
          type="submit"
          variant="ghost"
          aria-label="Search"
          className="rounded-full text-muted-foreground hover:bg-transparent"
        >
          <Search className="h-5 w-5" />
        </Button>

        <Input
          name="q"
          type="search"
          placeholder="Search"
          aria-label="Search input"
          className="flex-grow border-0 shadow-none text-base font-medium placeholder:text-muted-foreground px-2 focus-visible:ring-0"
        />

        <Button
          size="icon"
          type="button"
          variant="ghost"
          aria-label="Filter options"
          className="rounded-full text-muted-foreground hover:bg-transparent"
        >
          <ListFilter className="h-5 w-5" />
        </Button>
      </form>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Search className="h-5 w-5 text-[#333333]" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5 text-[#333333]" />
        </Button>
      </div>
    </header>
  );
}
