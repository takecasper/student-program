import { Clock, MapPin, User } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import StatusBadge from '../StatusBadge';
import { CalendarEventType, Status } from '@/types/calendar';

interface WeekEventProps {
  teacher?: string;
  color: string;
  status?: Status;
  isAllDay?: boolean;
  numWeek: number;
  size: number;
  index: number;
  event: CalendarEventType;
  setIsAddModalOpen: () => void;
}

export default function WeekEvent({
  teacher,
  color,
  status,
  isAllDay = false,
  numWeek,
  size,
  index,
  event,
}: WeekEventProps) {
  const [showModal, setShowModal] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowModal(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const totalWidth = `calc(${100 * numWeek + '%' + ' + ' + (2 * numWeek - 10) + 'px '})`;
  const eventHeight = `${(isAllDay ? 64 : 136) / size}px`;
  const top = `${((isAllDay ? 64 : 136) / size) * index + 3}px`;

  return (
    <>
      {isAllDay ? (
        <div className={`absolute left-1 bg-white `} style={{ width: totalWidth, top: top }}>
          <div className="flex">
            <div
              onClick={() => setShowModal(true)}
              className={`bg-white ${size > 1 ? (index === 0 ? 'rounded-tr-[10px]' : index === size - 1 && 'rounded-br-[10px]') : 'rounded-r-[10px]'} border border-[#D9D9D9] p-2 flex-1 shadow-lg cursor-pointer`}
              style={{ borderLeft: `4px solid ${color}`, minHeight: eventHeight }}
            >
              <div className="flex gap-2 h-full items-center">
                <div className="flex flex-col justify-center">
                  <p className="text-md font-medium truncate">{event.title}</p>
                  <div className="flex items-end">
                    <div className="flex items-end">
                      {status && (
                        <StatusBadge
                          status={status}
                          showTooltip={showTooltip}
                          setShowModal={setShowModal}
                          setShowTooltip={setShowTooltip}
                          event={event}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {size === 1 ? (
            <div
              className={`absolute left-1 bg-white ${showTooltip ? 'z-30' : showModal ? 'z-20' : 'z-10'}`}
              style={{ width: totalWidth, top: top }}
            >
              <div className="flex w-full">
                <div
                  className={`bg-white ${
                    size > 1
                      ? index === 0
                        ? 'rounded-tr-[10px]'
                        : index === size - 1 && 'rounded-br-[10px]'
                      : 'rounded-r-[10px]'
                  } border border-[#D9D9D9] p-2 shadow-lg cursor-pointer w-full`}
                  style={{ borderLeft: `4px solid ${color}`, minHeight: '136px' }}
                >
                  <div className="flex h-full items-center w-full">
                    <div className="flex flex-col justify-center w-full ">
                      <div className="flex flex-col sm:flex-row justify-between pb-1">
                        <div className="flex flex-col text-nowrap">
                          <p className="text-md font-medium">{event.title}</p>
                        </div>
                        <div className="flex">
                          {status && (
                            <StatusBadge
                              status={status}
                              showTooltip={showTooltip}
                              setShowModal={setShowModal}
                              setShowTooltip={setShowTooltip}
                              event={event}
                            />
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col pb-1">
                        <div className="w-full flex items-center gap-1">
                          <Clock className="h-3 w-3 text-[#6c6c6c]" />
                          <span className="text-sm text-[#6c6c6c]">
                            {event.startTime} - {event.endTime}
                          </span>
                        </div>
                      </div>

                      {teacher && (
                        <div className="flex flex-col pb-1">
                          <div className="w-full flex items-center gap-1">
                            <User className="h-3 w-3 text-[#6c6c6c]" />
                            <span className="text-sm text-[#6c6c6c]">{teacher}</span>
                          </div>
                        </div>
                      )}

                      {event.location && (
                        <div className="flex flex-col pb-1">
                          <div className="w-full flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-[#6c6c6c]" />
                            <span className="text-sm text-[#6c6c6c]">{event.location}</span>
                          </div>
                        </div>
                      )}

                      {showModal && (
                        <div className="border-t-2 mt-2">
                          <div className="text-sm text-[#333] space-y-4">
                            <h2 className="text-base font-semibold">Elective Details</h2>
                            <p>
                              The FP-AddicMed-Victoria-RJH rotation (South Vancouver Island) offers
                              Family medicine training in Victoria, BC (RJH, VicGH, RAAC, community)
                              for Canadian students, with flexible lengths (8-week max).
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
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div
                className={`absolute left-1 bg-white z-1`}
                style={{ width: totalWidth, top: top }}
              >
                <div className="flex">
                  <div
                    className={`bg-white ${index === 0 ? 'rounded-tr-[10px]' : index === size - 1 && 'rounded-br-[10px]'} border border-[#D9D9D9] p-2 flex-1 shadow-lg cursor-pointer`}
                    style={{ borderLeft: `4px solid ${color}`, minHeight: eventHeight }}
                  >
                    <div className="flex h-full items-center">
                      <div className="flex flex-col justify-center w-full ">
                        <div className="flex  flex-col sm:flex-row justify-between pb-1">
                          <div className="flex flex-col text-nowrap">
                            <p className="text-md font-medium">{event.title}</p>
                          </div>
                          <div className="flex items-end">
                            {status && (
                              <StatusBadge
                                status={status}
                                showTooltip={showTooltip}
                                setShowModal={setShowModal}
                                setShowTooltip={setShowTooltip}
                                event={event}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`absolute left-1 hidden group-hover:block bg-white ${showTooltip ? 'z-30' : showModal ? 'z-20' : 'z-10'}`}
                style={{ width: totalWidth, top: top }}
              >
                <div className="flex w-full">
                  <div
                    className={`bg-white ${
                      size > 1
                        ? index === 0
                          ? 'rounded-tr-[10px]'
                          : index === size - 1 && 'rounded-br-[10px]'
                        : 'rounded-r-[10px]'
                    } border border-[#D9D9D9] p-2 shadow-lg cursor-pointer w-full`}
                    style={{ borderLeft: `4px solid ${color}`, minHeight: '136px' }}
                  >
                    <div className="flex h-full items-center w-full">
                      <div className="flex flex-col justify-center w-full ">
                        <div className="flex flex-col sm:flex-row justify-between pb-1">
                          <div className="flex flex-col">
                            <p className="text-md font-medium">{event.title}</p>
                          </div>
                          <div className="flex items-end">
                            {status && (
                              <StatusBadge
                                status={status}
                                showTooltip={showTooltip}
                                setShowModal={setShowModal}
                                setShowTooltip={setShowTooltip}
                                event={event}
                              />
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col pb-1">
                          <div className="w-full flex items-center gap-1">
                            <Clock className="h-3 w-3 text-[#6c6c6c]" />
                            <span className="text-sm text-[#6c6c6c]">
                              {event.startTime} - {event.endTime}
                            </span>
                          </div>
                        </div>

                        {teacher && (
                          <div className="flex flex-col pb-1">
                            <div className="w-full flex items-center gap-1">
                              <User className="h-3 w-3 text-[#6c6c6c]" />
                              <span className="text-sm text-[#6c6c6c]">{teacher}</span>
                            </div>
                          </div>
                        )}

                        {event.location && (
                          <div className="flex flex-col pb-1 z-10">
                            <div className="w-full flex items-center gap-1">
                              <MapPin className="h-3 w-3 text-[#6c6c6c]" />
                              <span className="text-sm text-[#6c6c6c]">{event.location}</span>
                            </div>
                          </div>
                        )}

                        {showModal && (
                          <div className="border-t-2 mt-2 z-50">
                            <div className="text-sm text-[#333] space-y-4">
                              <h2 className="text-base font-semibold">Elective Details</h2>
                              <p>
                                The FP-AddicMed-Victoria-RJH rotation (South Vancouver Island)
                                offers Family medicine training in Victoria, BC (RJH, VicGH, RAAC,
                                community) for Canadian students, with flexible lengths (8-week
                                max).
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
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
