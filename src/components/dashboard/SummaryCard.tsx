import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export interface SummaryCardProps {
  iconSrc: string;
  title: string;
  value: string | number;
}

export default function SummaryCard({ iconSrc, title, value }: SummaryCardProps) {
  return (
    <Card className=" border border-[#D9D9D9] shadow-none rounded-[24px]">
      <CardContent className="">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-[14px] border border-[#D9D9D9] flex items-center justify-center mr-3">
              <Image src={iconSrc} alt={title} width={20} height={20} />
            </div>
            <div>
              <p className="text-[16px] text-[#333333] font-bold">{title}</p>
            </div>
          </div>
          <div>
            <h3 className="text-5xl text-[#333333] font-bold mt-1">{value}</h3>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
