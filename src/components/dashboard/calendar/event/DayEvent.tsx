import { Clock, MapPin, User } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { format } from 'date-fns';

interface EventType {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  startTime?: string;
  endTime?: string;
  color: string;
  isAllDay: boolean;
  location?: string;
  status?: {
    text: string;
    color: string;
    dotColor: string;
  };
}

interface DayEventProps {
  title: string;

  startTime: string;
  endTime: string;
  location?: string;
  teacher?: string;
  color: string;
  status?: {
    text: string;
    color: string;
    dotColor?: string;
  };
  isAllDay?: boolean;
  description?: string;
  event: EventType;
  size: number;
}

export default function DayEvent({
  event,
  title,
  startTime,
  endTime,
  location,
  teacher,
  color,
  status,
  isAllDay = false,
  size,
}: DayEventProps) {
  const [showModal, setShowModal] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const minHeight = `${144 / size}px`;

  return (
    <>
      <div className="flex">
        <div
          onClick={() => setShowModal(true)}
          className={`bg-white rounded-r-[8px] border border-[#D9D9D9] flex-1 shadow-lg cursor-pointer ${
            size > 1 ? 'w-full p-1' : 'p-2'
          }`}
          style={{
            borderLeft: `4px solid ${color}`,
            minHeight: minHeight,
          }}
        >
          <div className="h-full flex flex-col justify-center">
            <div className="flex gap-2 justify-between items-center">
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
            </div>

            {/* Detail section shown only on hover */}
            <div className={`${size > 1 ? '' : ''}`}>
              <div className="flex flex-col sm:flex-row pb-2">
                <div className="w-full flex items-center gap-1">
                  <Clock className="h-3 w-3 text-[#6c6c6c]" />
                  <span className="text-xs text-[#6c6c6c]">
                    {startTime} - {endTime}
                  </span>
                </div>
                {location && (
                  <div className="w-full flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-[#6c6c6c]" />
                    <span className="text-xs text-[#6c6c6c]">{location}</span>
                  </div>
                )}
              </div>
              <div className="flex flex-col sm:flex-row">
                {teacher && (
                  <div className="w-full flex items-center gap-1">
                    <User className="h-3 w-3 text-[#6c6c6c]" />
                    <span className="text-xs text-[#6c6c6c]">{teacher}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {showModal ? (
          <div ref={wrapperRef} className="absolute z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-[296px] relative shadow-lg border border-[#CCCCCC]">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-4 hover:text-black cursor-pointer"
              >
                ✕
              </button>

              <h2 className="text-sm font-semibold mb-[19px] text-[#333333DE]">Type of Booking</h2>

              <div className="flex gap-2 mb-4">
                <button className="w-18 py-1 text-xs bg-[#364699] text-white rounded-full">
                  Vacation
                </button>
                <button className="w-18 py-1 text-xs border-[1.4px] border-[#CCCCCC] rounded-full">
                  Duty Hour
                </button>
                <button className="w-18 py-1 text-xs border-[1.4px] border-[#CCCCCC] rounded-full">
                  Event
                </button>
              </div>

              <div className="flex mb-4">
                {/* Start time */}
                <div className="flex flex-col">
                  <label className="text-xs text-[#33333399] font-medium mb-[2px]">
                    Start time
                  </label>
                  <span className="text-sm whitespace-nowrap border-b-2 text-[#333333DE] border-[#333333DE] pb-[1px]">
                    {format(event.startDate, 'MMMM d, yyyy')}
                  </span>
                </div>

                <span className="mx-2 mt-4 text-[#333333DE]">–</span>

                {/* End time */}
                <div className="flex flex-col">
                  <label className="text-xs text-[#33333399] font-medium mb-[2px]">End time</label>
                  <span className="text-sm whitespace-nowrap border-b-2 text-[#333333DE] border-[#333333DE] pb-[1px]">
                    {format(event.endDate, 'MMMM d, yyyy')}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea className="border p-2 w-full rounded" rows={5}></textarea>
              </div>

              <div className="w-full flex justify-end">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-[#364699] text-xs text-white px-4 py-[15px] rounded-full hover:bg-[#1e3088] cursor-pointer"
                >
                  Request Leave
                </button>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="absolute top-0 hidden group-hover:block z-50 w-full">
        <div className="flex">
          <div
            onClick={() => setShowModal(true)}
            className={`bg-white rounded-r-[8px] border border-[#D9D9D9] flex-1 shadow-lg cursor-pointer h-[144px] ${
              size > 1 ? 'w-full p-1' : 'p-2'
            }`}
            style={{
              borderLeft: `4px solid ${color}`,
            }}
          >
            <div className="h-full flex flex-col justify-center">
              <div className="flex gap-2 justify-between items-center">
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
              </div>

              {/* Detail section shown only on hover */}
              <div className={`${size > 1 ? '' : ''}`}>
                <div className="flex flex-col sm:flex-row pb-2">
                  <div className="w-full flex items-center gap-1">
                    <Clock className="h-3 w-3 text-[#6c6c6c]" />
                    <span className="text-xs text-[#6c6c6c]">
                      {startTime} - {endTime}
                    </span>
                  </div>
                  {location && (
                    <div className="w-full flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-[#6c6c6c]" />
                      <span className="text-xs text-[#6c6c6c]">{location}</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row">
                  {teacher && (
                    <div className="w-full flex items-center gap-1">
                      <User className="h-3 w-3 text-[#6c6c6c]" />
                      <span className="text-xs text-[#6c6c6c]">{teacher}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {showModal ? (
            <div ref={wrapperRef} className="absolute z-50">
              <div className="bg-white p-6 rounded-lg w-full max-w-[296px] relative shadow-lg border border-[#CCCCCC]">
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-3 right-4 hover:text-black cursor-pointer"
                >
                  ✕
                </button>

                <h2 className="text-sm font-semibold mb-[19px] text-[#333333DE]">
                  Type of Booking
                </h2>

                <div className="flex gap-2 mb-4">
                  <button className="w-18 py-1 text-xs bg-[#364699] text-white rounded-full">
                    Vacation
                  </button>
                  <button className="w-18 py-1 text-xs border-[1.4px] border-[#CCCCCC] rounded-full">
                    Duty Hour
                  </button>
                  <button className="w-18 py-1 text-xs border-[1.4px] border-[#CCCCCC] rounded-full">
                    Event
                  </button>
                </div>

                <div className="flex mb-4">
                  {/* Start time */}
                  <div className="flex flex-col">
                    <label className="text-xs text-[#33333399] font-medium mb-[2px]">
                      Start time
                    </label>
                    <span className="text-sm whitespace-nowrap border-b-2 text-[#333333DE] border-[#333333DE] pb-[1px]">
                      {format(event.startDate, 'MMMM d, yyyy')}
                    </span>
                  </div>

                  <span className="mx-2 mt-4 text-[#333333DE]">–</span>

                  {/* End time */}
                  <div className="flex flex-col">
                    <label className="text-xs text-[#33333399] font-medium mb-[2px]">
                      End time
                    </label>
                    <span className="text-sm whitespace-nowrap border-b-2 text-[#333333DE] border-[#333333DE] pb-[1px]">
                      {format(event.endDate, 'MMMM d, yyyy')}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea className="border p-2 w-full rounded" rows={5}></textarea>
                </div>

                <div className="w-full flex justify-end">
                  <button
                    onClick={() => setShowModal(false)}
                    className="bg-[#364699] text-xs text-white px-4 py-[15px] rounded-full hover:bg-[#1e3088] cursor-pointer"
                  >
                    Request Leave
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}
