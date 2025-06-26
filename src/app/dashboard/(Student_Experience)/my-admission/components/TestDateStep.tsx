'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Check } from 'lucide-react';
import { StepProps, TimeSlot, DaySlot } from '../types';

const TestDateStep: React.FC<StepProps> = ({ formData, onChange }) => {
  const [selectedTest, setSelectedTest] = useState<'CASPER' | 'VIDEO_INTERVIEW'>('CASPER');
  const [selectedMonth, setSelectedMonth] = useState('March 2025');
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const days: DaySlot[] = [
    { day: 'Mon', date: 11, slots: 3 },
    { day: 'Tue', date: 12, slots: 7 },
    { day: 'Wed', date: 13, slots: 7 },
    { day: 'Thur', date: 14, slots: 7 },
  ];

  const timeSlots: TimeSlot[] = [
    { time: '7:00 AM - 8:00 AM', available: true },
    { time: '9:00 AM - 10:00 AM', available: true },
    { time: '11:00 AM - 12 PM', available: true },
  ];

  // Handle date/time selection
  const handleDateTimeSelection = () => {
    if (selectedDate && selectedTime) {
      const currentTestDates = formData.testDate || {};
      const testDate = {
        ...currentTestDates,
        [selectedTest]: {
          date: `${selectedMonth} ${selectedDate}`,
          time: selectedTime,
        },
      };
      onChange(JSON.stringify(testDate));

      // Reset selections after saving
      setSelectedDate(null);
      setSelectedTime(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#FFF9F0] p-4 rounded-[10px] text-xs">
        <p>
          For this program which you have applied request to take Casper and Duet, Please select the
          tests you want to take and choose Date & Time for each.
        </p>
      </div>

      <div className="flex gap-2">
        <Button
          variant={selectedTest === 'CASPER' ? 'default' : 'outline'}
          className={`rounded-full text-xs ${
            formData.testDate?.CASPER
              ? 'bg-white text-[#54B9B1] border-[#00A59B] border-2' // Saved state - teal
              : selectedTest === 'CASPER'
                ? 'bg-[#54B9B1] text-white' // Active state - blue
                : 'border-[#d9d9d9] text-[#54B9B1]' // Default state
          }`}
          onClick={() => {
            setSelectedTest('CASPER');
            setSelectedDate(null);
            setSelectedTime(null);
          }}
        >
          {formData.testDate?.CASPER && <Check className="h-4 w-4 mr-2" />}
          CASPER
        </Button>
        <Button
          variant={selectedTest === 'VIDEO_INTERVIEW' ? 'default' : 'outline'}
          className={`rounded-full text-xs ${
            formData.testDate?.VIDEO_INTERVIEW
              ? 'bg-white text-[#54B9B1] border-[#00A59B] border-2' // Saved state - teal
              : selectedTest === 'VIDEO_INTERVIEW'
                ? 'bg-[#54B9B1] text-white' // Active state - blue
                : 'border-[#d9d9d9] text-[#54B9B1]' // Default state
          }`}
          onClick={() => {
            setSelectedTest('VIDEO_INTERVIEW');
            setSelectedDate(null);
            setSelectedTime(null);
          }}
        >
          {formData.testDate?.VIDEO_INTERVIEW && <Check className="h-4 w-4 mr-2" />}
          VIDEO INTERVIEW
        </Button>
      </div>

      {/* Show current selections */}
      {(formData.testDate?.CASPER || formData.testDate?.VIDEO_INTERVIEW) && (
        <div className="bg-gray-50 p-3 rounded-lg text-sm">
          <h4 className="font-medium mb-2">Selected Tests:</h4>
          {formData.testDate?.CASPER && (
            <div>
              CASPER: {formData.testDate.CASPER.date} - {formData.testDate.CASPER.time}
            </div>
          )}
          {formData.testDate?.VIDEO_INTERVIEW && (
            <div>
              VIDEO INTERVIEW: {formData.testDate.VIDEO_INTERVIEW.date} -{' '}
              {formData.testDate.VIDEO_INTERVIEW.time}
            </div>
          )}
        </div>
      )}

      <div className="space-y-4">
        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
          <SelectTrigger className="w-[200px] bg-[#F5F5F5] border-none">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="March 2025">March 2025</SelectItem>
            <SelectItem value="April 2025">April 2025</SelectItem>
          </SelectContent>
        </Select>

        <div className="grid grid-cols-4 gap-3">
          {days.map(day => (
            <div
              key={day.date}
              className={`border rounded-lg p-3 text-center cursor-pointer hover:border-[#00a59b] ${
                selectedDate === day.date ? 'border-[#00a59b] bg-[#00a59b]/5' : ''
              }`}
              onClick={() => setSelectedDate(day.date)}
            >
              <div className="text-sm font-medium">{day.day}</div>
              <div className="text-lg font-medium">{day.date}</div>
            </div>
          ))}
        </div>

        {selectedDate && (
          <div className="space-y-2 grid grid-cols-2 gap-3">
            {timeSlots.map(slot => (
              <div
                key={slot.time}
                className={`border rounded-lg p-3 cursor-pointer hover:border-[#00a59b] flex justify-between items-center ${
                  selectedTime === slot.time ? 'border-[#00a59b] bg-[#00a59b]/5' : ''
                }`}
                onClick={() => setSelectedTime(slot.time)}
              >
                <span>{slot.time}</span>
              </div>
            ))}
          </div>
        )}

        {selectedDate && selectedTime && (
          <Button
            onClick={handleDateTimeSelection}
            className="w-full bg-[#364699] hover:bg-[#253170]"
          >
            Save {selectedTest} Schedule
          </Button>
        )}
      </div>
    </div>
  );
};

const TestDateSummary: React.FC<{
  testDate?: {
    CASPER?: { date: string; time: string };
    VIDEO_INTERVIEW?: { date: string; time: string };
  };
}> = ({ testDate }) => {
  if (!testDate || (!testDate.CASPER && !testDate.VIDEO_INTERVIEW)) return null;
  return (
    <div className="w-full bg-white border-2 border-[#00a59b] rounded-[12px] flex flex-col px-4 py-3 gap-1 relative">
      {testDate.CASPER && (
        <span className="text-base font-medium text-[#333]">
          CASPER: {testDate.CASPER.date} - {testDate.CASPER.time}
        </span>
      )}
      {testDate.VIDEO_INTERVIEW && (
        <span className="text-base font-medium text-[#333]">
          Video Interview: {testDate.VIDEO_INTERVIEW.date} - {testDate.VIDEO_INTERVIEW.time}
        </span>
      )}
      <div className="absolute top-1 right-3 flex items-center justify-center w-7 h-7 rounded-full bg-[#00a59b]">
        <Check className="h-4 w-4 text-white" />
      </div>
    </div>
  );
};

export default TestDateStep;
export { TestDateSummary };
