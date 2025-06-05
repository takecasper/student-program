import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

export interface SummaryCardProps {
  iconSrc: string;
  title: string; // e.g., "Add/Drop\nScheduling"
  onClick?: () => void;
}

export default function SummaryDropCard({ iconSrc, title, onClick }: SummaryCardProps) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 shadow-sm bg-white w-full max-w-md">
      <div className="flex items-start gap-4">
        <div className="w-[56px] h-[56px]bg-gray-100 p-2 rounded-lg">
          <Image src={iconSrc} alt="Star icon" width={24} height={24} />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-[#b4325f] leading-tight">
            Add/Drop
            <br />
            Scheduling
          </h3>
        </div>
      </div>

      <Link
        href="dashboard/calendar"
        className="bg-[#364699] text-white text-sm font-medium py-2 px-4 rounded-full hover:bg-[#2538A8] transition"
      >
        Make Changes
      </Link>
    </div>
  );
}
