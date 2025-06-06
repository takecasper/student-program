import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

export interface SummaryDropCardProps {
  iconSrc: string;
  title: string;
}

export default function SummaryDropCard({ iconSrc, title }: SummaryDropCardProps) {
  return (
    <Link href="dashboard/calendar">
      <Card className="borderborder-[#EFEFEF] rounded-[16px] transition py-2 shadow-none">
        <CardContent className="flex items-center gap-4 px-6">
          <div className="w-12 h-12 rounded-[12px] border border-[#D9D9D9] flex items-center justify-center">
            <Image src={iconSrc} alt={title} width={20} height={20} />
          </div>
          <p className="text-lg font-semibold text-[#555]">{title}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
