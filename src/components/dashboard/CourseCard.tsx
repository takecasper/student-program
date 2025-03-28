export interface CourseCardProps {
  number: string;
  title: string;
  dateRange: string;
  progress: number;
  isCompleted: boolean;
}

export default function CourseCard({ number, title, dateRange, progress, isCompleted }: CourseCardProps) {
  return (
    <div
      className={`bg-[#6a6eec] p-6 relative overflow-hidden rounded-[24px] border-4 border-[#D9D9D9] ${
        isCompleted ? "opacity-60" : ""
      }`}
    >
      <div className="absolute top-4 right-4 bg-[#70C0B8] text-[#333333DE] border border-white text-xs font-medium py-2 px-4 rounded-full">
        {isCompleted ? "COMPLETED" : "IN PROGRESS"}
      </div>
      <h3 className="text-2xl font-bold text-white mb-1">{number}</h3>
      <h4 className="text-2xl font-semibold text-white mb-2">{title}</h4>
      <p className="text-sm text-white/80 mb-6">{dateRange}</p>

      <div className="flex items-start justify-start mb-4">
        <div className="relative w-20 h-20">
          <svg viewBox="0 0 36 36" className="w-20 h-20 transform -rotate-90">
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#8eeee4"
              strokeWidth="3"
              strokeDasharray={`${progress}, 100`}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
            {progress}%
            <br />
            Complete
          </div>
        </div>
      </div>

      <div className="text-sm text-white/90 text-start">7 Sessions / 48 Hours</div>
    </div>
  );
}
