import { Button } from '@/components/ui/button';
import { Bell, Search } from 'lucide-react';

export default function DashboardHeader() {
  return (
    <header className="flex justify-end items-center">
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
