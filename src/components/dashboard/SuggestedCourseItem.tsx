export interface SuggestedCourseItemProps {
  number: string;
  name: string;
  period: string;
}

export default function SuggestedCourseItem({ number, name, period }: SuggestedCourseItemProps) {
  return (
    <div className="flex items-center justify-center gap-2 p-2 bg-[#EDEAEA]  rounded-full">
      <div className="text-xl font-bold text-[#333333]">{number}</div>
      <div>
        <p className="text-md font-medium">{name}</p>
        <p className="text-xs text-[#6c6c6c]">{period}</p>
      </div>
    </div>
  );
}
