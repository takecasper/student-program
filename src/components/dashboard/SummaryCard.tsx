// components/SummaryCard.tsx
import Image from 'next/image';

export interface SummaryCardProps {
  iconSrc: string;
  title: string;
  value: string | number;
}

export default function SummaryCard({ iconSrc, title, value }: SummaryCardProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-xl border border-[#D9D9D9] flex items-center justify-center">
        <Image src={iconSrc} alt={title} width={20} height={20} />
      </div>
      <div className="flex items-start gap-2">
        <p className="text-4xl font-bold text-[#333333] leading-none">{value}</p>
        <div className="flex flex-col leading-tight text-[#666666] text-sm max-w-[54px]">
          <span>{title}</span>
        </div>
      </div>
    </div>
  );
}
