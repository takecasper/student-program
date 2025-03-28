import { Card, CardContent } from "@/components/ui/card";

export interface CategoryCardProps {
  imageSrc: string;
  category: string;
  title: string;
  description: string;
}

export default function CategoryCard({ imageSrc, category, title, description }: CategoryCardProps) {
  return (
    <Card className="border border-[#D9D9D9] shadow-none overflow-hidden rounded-[24px]">
      <div className="h-20 bg-white relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <img src={imageSrc} alt={title} className="w-full h-[104px] object-cover rounded-[20px]" />
        </div>
      </div>
      <CardContent className="p-3">
        <p className="text-sm font-bold text-[#333333] uppercase mb-1">{category}</p>
        <h3 className="text-2xl text-[#333333] font-bold mb-2">{title}</h3>
        <p className="text-xs text-[#333333]">{description}</p>
      </CardContent>
    </Card>
  );
}
