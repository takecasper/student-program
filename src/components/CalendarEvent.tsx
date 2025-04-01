import { Clock, MapPin } from "lucide-react";

interface CalendarEventProps {
  title: string;
  startTime: string;
  endTime: string;
  location?: string;
  color: string;
  status?: {
    text: string;
    color: string;
    dotColor?: string;
  };
  isAllDay?: boolean;
}

export default function CalendarEvent({
  title,
  startTime,
  endTime,
  location,
  color,
  status,
  isAllDay = false,
}: CalendarEventProps) {
  return (
    <div className="flex">
      <div
        className={`bg-white rounded-[20px] border border-[#D9D9D9] p-2 flex-1 shadow-lg ${
          isAllDay ? "w-full" : ""
        }`}
      >
        <div className="flex gap-2 items-center">
          <div
            className="flex items-center h-[34px] rounded-[20px]"
            style={{ borderLeft: `4px solid ${color}` }}
          ></div>

          <div className="flex flex-col">
            <p className="text-sm font-medium">{title}</p>
            {status && (
              <span
                className="ml-auto text-[#364699] text-xs py-1 px-2 rounded-full flex items-center gap-1"
                style={{ backgroundColor: status.color }}
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: status.dotColor || color }}
                ></div>
                {status.text}
              </span>
            )}
            {!isAllDay && (
              <>
                <div className="flex items-center gap-1 mt-1">
                  <Clock className="h-3 w-3 text-[#6c6c6c]" />
                  <span className="text-xs text-[#6c6c6c]">
                    {startTime} - {endTime}
                  </span>
                </div>
                {location && (
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin className="h-3 w-3 text-[#6c6c6c]" />
                    <span className="text-xs text-[#6c6c6c]">{location}</span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
