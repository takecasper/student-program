import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export interface SummaryCardProps {
  iconSrc: string;
  title: string;
  value: string | number;
}

export default function SummaryCard({ iconSrc, title, value }: SummaryCardProps) {
  return (
    <Card className="border-2 border-[#D9D9D9] shadow-none">
      <CardContent className="p-4">
        <div className="flex items-start">
          <div className="w-14 h-14 rounded-md bg-[#f5f5f5] flex items-center justify-center mr-3">
            <Image src={iconSrc} alt={title} width={20} height={20} />
          </div>
          <div>
            <p className="text-[16px] text-[#333333] font-bold">{title}</p>
            <h3 className="text-5xl text-[#333333] font-bold mt-1">{value}</h3>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
