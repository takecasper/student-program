'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface AddCalendarEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSave: (eventData: any) => void;
  defaultDate?: string;
}

export default function AddCalendarEventModal({
  isOpen,
  onClose,
  onSave,
  defaultDate = new Date().toISOString().split('T')[0],
}: AddCalendarEventModalProps) {
  const [eventType, setEventType] = useState<'vacation' | 'duty' | 'event'>('vacation');
  const [startDate, setStartDate] = useState(defaultDate);
  const [endDate, setEndDate] = useState(defaultDate);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');
  const [isAllDay, setIsAllDay] = useState(true);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const handleSave = () => {
    // Format times for display
    const formattedStartTime = formatTimeForDisplay(startTime);
    const formattedEndTime = formatTimeForDisplay(endTime);

    onSave({
      type: eventType,
      startDate,
      endDate,
      startTime: isAllDay ? undefined : formattedStartTime,
      endTime: isAllDay ? undefined : formattedEndTime,
      description,
      location,
      isAllDay,
    });

    // Reset form
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setEventType('vacation');
    setStartDate(defaultDate);
    setEndDate(defaultDate);
    setStartTime('09:00');
    setEndTime('10:00');
    setIsAllDay(true);
    setDescription('');
    setLocation('');
  };

  const formatTimeForDisplay = (time: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [hours, minutes] = time.split(':');
    const hour = Number.parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour} ${ampm}`;
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={open => {
        if (!open) {
          onClose();
          resetForm();
        }
      }}
    >
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-medium">Type of Booking</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <div className="flex gap-2">
              <Button
                type="button"
                variant={eventType === 'vacation' ? 'default' : 'outline'}
                className={`rounded-full ${eventType === 'vacation' ? 'bg-[#364699]' : ''}`}
                onClick={() => setEventType('vacation')}
              >
                Vacation
              </Button>
              <Button
                type="button"
                variant={eventType === 'duty' ? 'default' : 'outline'}
                className={`rounded-full ${eventType === 'duty' ? 'bg-[#364699]' : ''}`}
                onClick={() => setEventType('duty')}
              >
                Duty Hour
              </Button>
              <Button
                type="button"
                variant={eventType === 'event' ? 'default' : 'outline'}
                className={`rounded-full ${eventType === 'event' ? 'bg-[#364699]' : ''}`}
                onClick={() => setEventType('event')}
              >
                Event
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="all-day" className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  id="all-day"
                  checked={isAllDay}
                  onChange={e => setIsAllDay(e.target.checked)}
                  className="rounded border-gray-300"
                />
                All day event
              </Label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-date">Start time</Label>
              <div className="flex gap-2">
                <Input
                  id="start-date"
                  type="date"
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                  className="flex-1"
                />
                {!isAllDay && (
                  <Input
                    type="time"
                    value={startTime}
                    onChange={e => setStartTime(e.target.value)}
                    className="w-24"
                  />
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-date">End time</Label>
              <div className="flex gap-2">
                <Input
                  id="end-date"
                  type="date"
                  value={endDate}
                  onChange={e => setEndDate(e.target.value)}
                  className="flex-1"
                />
                {!isAllDay && (
                  <Input
                    type="time"
                    value={endTime}
                    onChange={e => setEndTime(e.target.value)}
                    className="w-24"
                  />
                )}
              </div>
            </div>
          </div>

          {!isAllDay && (
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="Enter location"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="min-h-[100px]"
              placeholder="Add description or notes"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              resetForm();
              onClose();
            }}
          >
            Cancel
          </Button>
          <Button type="button" className="bg-[#364699] hover:bg-[#253170]" onClick={handleSave}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
