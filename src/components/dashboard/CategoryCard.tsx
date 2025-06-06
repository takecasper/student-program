/* eslint-disable @next/next/no-img-element */
import { Card, CardContent } from '@/components/ui/card';

export interface CategoryCardProps {
  imageSrc: string;
  category: string;
  title: string;
  description: string;
}

export default function CategoryCard({
  imageSrc,
  title,
  description,
}: CategoryCardProps) {
  return (
    <Card className="border border-[#D9D9D9] h-[240px] w-[240px] shadow-none overflow-hidden rounded-2xl p-3">
      <div className=" bg-white flex items-center justify-center overflow-hidden rounded-2xl">
        <img src={imageSrc} alt={title} className="object-cover w-full h-full" />
      </div>
      <CardContent className="p-4 bg-white rounded-b-2xl">
        <p className="text-xs font-semibold text-[#888] uppercase tracking-wide mb-0.5">CATEGORY</p>
        <h3 className="text-xl text-[#333] font-bold mb-1">{title}</h3>
        <p className="text-[13px] text-[#888] font-medium">{description}</p>
      </CardContent>
    </Card>
  );
}
