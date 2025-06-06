export interface CourseCardProps {
  number: string;
  title: string;
  dateRange: string;
  progress: number; // 0–100
  isCompleted: boolean;
}

export default function CourseCard({
  number,
  title,
  dateRange,
  progress,
  isCompleted,
}: CourseCardProps) {
  return (
    <div
      className={`bg-[#384BA8] p-4 relative overflow-hidden rounded-[16px] border-2 border-[#D9D9D9] ${
        isCompleted ? 'opacity-60' : ''
      }`}
    >
      <div className="absolute top-[10px] right-[10px] bg-[#70C0B8] text-[#333333DE] border border-white text-[10px] font-medium py-1.5 px-2.5 rounded-full">
        {isCompleted ? 'COMPLETED' : 'IN PROGRESS'}
      </div>
      <h3 className="text-lg font-bold text-white mb-1">{number}</h3>
      <h4 className="text-lg font-semibold text-white mb-2">{title}</h4>
      <p className="text-xs text-white/80 mb-4">{dateRange}</p>

      {/* Progress Circle */}
      <div className="flex items-start justify-start mb-2.5">
        <div className="relative w-[54px] h-[54px]">
          <svg viewBox="0 0 36 36" className="w-[54px] h-[54px]">
            {/* Track */}
            <circle cx="18" cy="18" r="16" fill="none" stroke="#fff" strokeWidth="4" />
            {/* Progress */}
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              stroke="#7fcfd2"
              strokeWidth="4"
              strokeDasharray={`${(progress * 100) / 100} ${100 - (progress * 100) / 100}`}
              strokeDashoffset="25"
              strokeLinecap="round"
              transform="rotate(-90 18 18)"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-[11px] font-bold text-white text-center leading-none">
            {progress}%<br />
            <span className="font-normal text-[10px]">Complete</span>
          </div>
        </div>
      </div>

      <div className="text-xs text-white/90 text-start">7 Sessions / 48 Hours</div>
    </div>
  );
}
