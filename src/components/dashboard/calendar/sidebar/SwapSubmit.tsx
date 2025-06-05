import { EVENT_COLORS, EVENT_TYPES, SlideStates } from '@/lib/const';
import { MapPin, User, AlertTriangle, Clock } from 'lucide-react';
import { useCalendarContext } from '../context/CalendarContext';
import { CalendarEventType } from '@/types/calendar';
import { useState } from 'react';

interface SwapSubmitProps {
  events: CalendarEventType[];
  setEvents: (events: CalendarEventType[]) => void;
}

export const SwapSubmit = ({ events, setEvents }: SwapSubmitProps) => {
  const { setSlideState, selectedEvent, selectedSwapEvent, setSidebarOpen } = useCalendarContext();
  const [agree, setAgree] = useState(false);

  return (
    <div className="w-full px-6 pt-6 bg-white">
      <h2 className="text-sm font-semibold text-gray-800 mb-1">Review Changes</h2>
      <p className="text-sm text-gray-600 mb-4">You are about to submit a swap request for</p>

      <div className="border border-gray-200 rounded-lg p-4 mb-4">
        <div className="flex gap-4 overflow-x-auto">
          {[selectedEvent, selectedSwapEvent]
            .filter((item): item is CalendarEventType => item !== null)
            .map(item => {
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
                </div>
              );
            })}
        </div>

        <label className="flex items-start mt-4 gap-2 text-sm text-gray-700 cursor-pointer">
          <input
            type="checkbox"
            className="mt-1 accent-[#364699]"
            checked={agree}
            onChange={() => setAgree(!agree)}
          />
          I agree to share my name and email with the other learner for this swap request.
        </label>
      </div>

      <div className="flex justify-end gap-3">
        <div className="flex items-center text-xs text-yellow-600 gap-2">
          <AlertTriangle className="w-4 h-4" />
          <span>1 of 3 credits will be used</span>
        </div>
        <button className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-full hover:bg-gray-50">
          Cancel
        </button>
        <button
          className="px-4 py-2 text-sm text-white bg-[#364699] hover:bg-[#2c3c85] rounded-full"
          disabled={!agree}
          onClick={() => {
            if (agree) {
              const event = events.find(event => event.id === selectedEvent?.id);
              if (event) {
                event.color = EVENT_COLORS.SWAP_REQUESTED;
                event.status = {
                  text: EVENT_TYPES.SWAP_REQUESTED,
                  color: EVENT_COLORS.SWAP_REQUESTED,
                };
              }

              const newEvent = {
                ...selectedSwapEvent,
                startDate: selectedEvent?.startDate,
                endDate: selectedEvent?.endDate,
                startTime: selectedEvent?.startTime,
                endTime: selectedEvent?.endTime,
                color: EVENT_COLORS.SWAP_REQUESTED,
                status: {
                  text: EVENT_TYPES.SWAP_REQUESTED,
                  color: EVENT_COLORS.SWAP_REQUESTED,
                },
              } as CalendarEventType;
              setEvents([...events, newEvent]);
              setSidebarOpen(false);
              setSlideState(SlideStates.INIT_ADD);
            }
          }}
        >
          Request
        </button>
      </div>
    </div>
  );
};
