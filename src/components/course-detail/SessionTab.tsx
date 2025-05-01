import { SessionItem } from '@/types/course';

interface SessionTabProps {
  sessions: SessionItem[];
}

export default function SessionTab({ sessions }: SessionTabProps) {
  return (
    <div className="space-y-3">
      {sessions.map((session, index) => (
        <div key={index} className="border border-[#d9d9d9] rounded-[20px] pr-2 flex items-center">
          {/* Session content */}
          {/* ... */}
        </div>
      ))}
    </div>
  );
}
