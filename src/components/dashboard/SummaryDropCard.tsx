import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

export interface SummaryCardProps {
  iconSrc: string;
  title: string; // e.g., "Add/Drop\nScheduling"
  onClick?: () => void;
}

export default function SummaryDropCard({ iconSrc, title, onClick }: SummaryCardProps) {
  return (
    <Card className="border border-[#D9D9D9] shadow-none rounded-[20px] w-[280px] px-4 py-5">
      <CardContent className="p-0">
        <div className="flex flex-col items-start gap-3">
          <div className="flex items-center gap-3">
            <div className="!w-[56px] !h-[56px] rounded-[12px] border border-[#D9D9D9] flex items-center justify-center">
              <Image src={iconSrc} alt={title} width={20} height={20} />
            </div>
            <div className="text-[18px] font-semibold text-[#A6192E] leading-tight w-[150px]">
              <div>{title}</div>
            </div>
          </div>
          <button
            onClick={onClick}
            className="text-white bg-[#253E92] text-sm font-medium rounded-full px-4 py-1.5 hover:bg-[#1a2e78] transition mt-3"
          >
            Make Changes
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
