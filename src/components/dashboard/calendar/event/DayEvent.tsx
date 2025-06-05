import { Status } from '@/types/calendar';
import { Clock, MapPin, User } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface DayEventProps {
  title: string;

  startTime: string;
  endTime: string;
  location?: string;
  teacher?: string;
  color: string;
  status?: Status;
  isAllDay?: boolean;
  description?: string;
  size: number;
}

export default function DayEvent({
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
      {size === 1 ? (
        <div className="flex">
          <div
            className={`bg-white rounded-r-[8px] border border-[#D9D9D9] flex-1 shadow-lg cursor-pointer w-full px-2 py-4 ${
              showModal ? 'absolute top-0' : 'p-2'
            }`}
            style={{
              borderLeft: `4px solid ${color}`,
            }}
          >
            <div className="flex flex-col h-[110px]">
              <div className="flex gap-2 justify-between pb-3">
                <p className="text-lg font-medium">{title}</p>
                {status && (
                  <span
                    className="ml-auto text-[#364699] text-md py-1 px-2 rounded-full flex items-center gap-1"
                    style={{ backgroundColor: status.color }}
                    onClick={() => setShowModal(!showModal)}
                  >
                    {status.text}
                  </span>
                )}
              </div>

              <div>
                <div className="flex flex-col sm:flex-row pb-3">
                  <div className="w-full flex items-center gap-1">
                    <Clock className="h-4 w-4 text-[#6c6c6c]" />
                    <span className="text-md text-[#6c6c6c]">
                      {startTime} - {endTime}
                    </span>
                  </div>
                  {location && (
                    <div className="w-full flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-[#6c6c6c]" />
                      <span className="text-md text-[#6c6c6c]">{location}</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row">
                  {teacher && (
                    <div className="w-full flex items-center gap-1">
                      <User className="h-4 w-4 text-[#6c6c6c]" />
                      <span className="text-md text-[#6c6c6c]">{teacher}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {showModal ? (
              <div className="border-t-2">
                <div className="text-sm text-[#333] space-y-4">
                  <h2 className="text-base font-semibold">Elective Details</h2>
                  <p>
                    The FP-AddicMed-Victoria-RJH rotation (South Vancouver Island) offers Family
                    medicine training in Victoria, BC (RJH, VicGH, RAAC, community) for Canadian
                    students, with flexible lengths (8-week max).
                  </p>

                  <h2 className="text-base font-semibold">Key Details</h2>

                  <div>
                    <p className="font-semibold text-sm">Clinical Locations:</p>
                    <ul className="list-disc list-inside text-sm text-[#555] space-y-1 mt-1">
                      <li>Royal Jubilee Hospital (1952 Bay St)</li>
                      <li>Victoria General Hospital (1 Hospital Way)</li>
                      <li>Rapid Access Addiction Clinic (RAAC, 1119 Pembroke St)</li>
                      <li>Various community settings</li>
                    </ul>
                  </div>

                  <p className="font-semibold text-sm mt-4">Focus Areas:</p>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
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
                      {status.text}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          {!isAllDay && (
            <div className="absolut top-0 hidden group-hover:block z-50 w-full">
              <div className="flex">
                <div
                  className={`bg-white rounded-r-[8px] border border-[#D9D9D9] flex-1 shadow-lg cursor-pointer ${
                    size > 1 ? 'w-full px-2 py-4' : 'p-2'
                  }`}
                  style={{
                    borderLeft: `4px solid ${color}`,
                  }}
                >
                  <div className="flex flex-col h-[110px]">
                    <div className="flex gap-2 justify-between pb-3">
                      <p className="text-lg font-medium">{title}</p>
                      {status && (
                        <span
                          className="ml-auto text-[#364699] text-md py-1 px-2 rounded-full flex items-center gap-1"
                          style={{ backgroundColor: status.color }}
                          onClick={() => setShowModal(!showModal)}
                        >
                          {status.text}
                        </span>
                      )}
                    </div>

                    <div>
                      <div className="flex flex-col sm:flex-row pb-3">
                        <div className="w-full flex items-center gap-1">
                          <Clock className="h-4 w-4 text-[#6c6c6c]" />
                          <span className="text-md text-[#6c6c6c]">
                            {startTime} - {endTime}
                          </span>
                        </div>
                        {location && (
                          <div className="w-full flex items-center gap-1">
                            <MapPin className="h-4 w-4 text-[#6c6c6c]" />
                            <span className="text-md text-[#6c6c6c]">{location}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col sm:flex-row">
                        {teacher && (
                          <div className="w-full flex items-center gap-1">
                            <User className="h-4 w-4 text-[#6c6c6c]" />
                            <span className="text-md text-[#6c6c6c]">{teacher}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {showModal ? (
                    <div className="border-t-2">
                      <div className="text-sm text-[#333] space-y-4">
                        <h2 className="text-base font-semibold">Elective Details</h2>
                        <p>
                          The FP-AddicMed-Victoria-RJH rotation (South Vancouver Island) offers
                          Family medicine training in Victoria, BC (RJH, VicGH, RAAC, community) for
                          Canadian students, with flexible lengths (8-week max).
                        </p>

                        <h2 className="text-base font-semibold">Key Details</h2>

                        <div>
                          <p className="font-semibold text-sm">Clinical Locations:</p>
                          <ul className="list-disc list-inside text-sm text-[#555] space-y-1 mt-1">
                            <li>Royal Jubilee Hospital (1952 Bay St)</li>
                            <li>Victoria General Hospital (1 Hospital Way)</li>
                            <li>Rapid Access Addiction Clinic (RAAC, 1119 Pembroke St)</li>
                            <li>Various community settings</li>
                          </ul>
                        </div>

                        <p className="font-semibold text-sm mt-4">Focus Areas:</p>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
