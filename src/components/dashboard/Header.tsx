import { Bell, Search, ListFilter, ArrowLeft } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useBreadcrumbStore } from '@/store/breadcrumbs';
import { useRouter } from 'next/navigation';

export default function DashboardHeader() {
  const router = useRouter();
  const title = useBreadcrumbStore(state => state.title);

  const handleBack = () => {
    router.back();
  };

  return (
    <header className="relative flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <ArrowLeft className="w-4 h-4 text-[#858585] cursor-pointer" onClick={handleBack} />
        <h1 className="text-sm font-medium text-[#858585]">{title}</h1>
      </div>

      <form
        role="search"
        aria-label="Site search"
        className="absolute left-0 right-0 top-0 bottom-0 m-auto  flex items-center w-full max-w-md border border-input rounded-full px-2 py-0 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
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
          name="searc"
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
          <Bell className="h-5 w-5 text-[#333333]" />
        </Button>
      </div>
    </header>
  );
}
