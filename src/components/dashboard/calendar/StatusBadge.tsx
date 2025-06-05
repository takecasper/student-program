import { useEffect, useRef } from 'react';
import { CalendarEventType, Status } from '@/types/calendar';
import { Stamp, XCircle, Hourglass, CheckCircle, SquarePen, Menu } from 'lucide-react';
import TooltipMenu from './ToolTip';

const getStatusIcon = (text: Status['text']) => {
  switch (text) {
    case 'Pending':
      return <Stamp className="w-3 h-3 text-white" />;
    case 'Drop Requested':
      return <XCircle className="w-3 h-3 text-white" />;
    case 'Waitlisted':
      return <Hourglass className="w-3 h-3 text-white" />;
    case 'Confirmed':
      return <CheckCircle className="w-3 h-3 text-white" />;
    case 'Swap Requested':
      return (
        <div className="w-3 h-3 rounded-lg border border-gray-300 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            className="w-full h-full text-white"
            fill="currentColor"
          >
            <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="5" fill="none" />
            <path d="M35 55 V30 H25 L40 10 L55 30 H45 V55 Z" fill="currentColor" />
            <path d="M65 45 V70 H75 L60 90 L45 70 H55 V45 Z" fill="currentColor" />
          </svg>
        </div>
      );
    default:
      return null;
  }
};

export interface StatusBadgeProps {
  status: Status;
  showTooltip: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowTooltip: React.Dispatch<React.SetStateAction<boolean>>;
  event: CalendarEventType;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  showTooltip,
  setShowModal,
  setShowTooltip,
  event,
}) => {
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      requestAnimationFrame(() => {
        if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
          setShowTooltip(false);
        }
      });
    };

    if (showTooltip) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showTooltip, setShowTooltip]);
  if (!status) return null;

  if (status.text === 'Editable') {
    return (
      <div className="relative inline-block">
        <span onClick={() => setShowTooltip(prev => !prev)} className="cursor-pointer">
          <Menu className="w-4 h-4 text-black" />
        </span>

        {showTooltip && (
          <div ref={tooltipRef} className="absolute right-0 top-full mt-2 z-50">
            <TooltipMenu event={event} setShowTooltip={setShowTooltip} />
          </div>
        )}
      </div>
    );
  }

  return (
    <span
      className="text-white text-xs py-1 px-2 rounded-full flex items-center gap-1 w-fit sm:ml-auto cursor-pointer"
      style={{ backgroundColor: status.color }}
      onClick={() => setShowModal(prev => !prev)}
    >
      <div className="w-3 h-3 rounded-full flex justify-center items-center">
        {getStatusIcon(status.text)}
      </div>
      {status.text}
    </span>
  );
};




export default StatusBadge;
