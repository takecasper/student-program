import { Bell, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useBreadcrumbStore } from '@/store/breadcrumbs';

export default function DashboardHeader() {
  const title = useBreadcrumbStore(state => state.title);

  return (
    <header className="flex justify-between items-center">
      <h1 className="text-sm font-medium text-[#858585]">{title}</h1>

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
