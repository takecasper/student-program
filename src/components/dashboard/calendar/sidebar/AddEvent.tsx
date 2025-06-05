import { SlideStates } from '@/lib/const';
import { CalendarEventType, SlideState } from '@/types/calendar';
import { Clock, MapPin, Plus, User } from 'lucide-react';
import { useCalendarContext } from '../context/CalendarContext';

interface EventSliderProps {
  totalWeekData: CalendarEventType[];
}

export const AddEvent = ({ totalWeekData }: EventSliderProps) => {
  const { setSlideState, setSelectedEvent } = useCalendarContext();
  return (
    <div className="px-6">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">Elective Recommendations</h3>
      <div className="flex gap-4 overflow-x-auto">
        {totalWeekData.map(item => {
          return (
            <div
              key={item.id}
              className="flex-shrink-0 bg-white relative flex flex-col justify-between border border-[#D9D9D9] shadow-lg p-4 rounded-tr-[10px] rounded-br-[10px]"
              style={{
                borderLeft: `4px solid ${item.color}`,
                minHeight: '136px',
              }}
            >
              <div className="flex justify-between items-start mb-2">
                <p className="text-md font-medium text-gray-800">{item.title}</p>
              </div>

              <div className="flex items-center gap-2 text-sm text-[#6c6c6c] mb-1">
                <Clock className="w-4 h-4" />
                <span>
                  {item.startDate.toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                  })}{' '}
                  -{' '}
                  {item.endDate.toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>

              {item.teacher && (
                <div className="flex items-center gap-2 text-sm text-[#6c6c6c] mb-1">
                  <User className="w-4 h-4" />
                  <span>{item.teacher}</span>
                </div>
              )}

              {item.location && (
                <div className="flex items-center gap-2 text-sm text-[#6c6c6c] mb-1">
                  <MapPin className="w-4 h-4" />
                  <span className="truncate">{item.location}</span>
                </div>
              )}

              <button
                className="absolute top-2 right-2 text-gray-500 border rounded-[5px] p-1 hover:bg-gray-100"
                onClick={() => {
                  setSelectedEvent(item);
                  setSlideState(SlideStates.CONFIRM);
                }}
              >
                <Plus size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
