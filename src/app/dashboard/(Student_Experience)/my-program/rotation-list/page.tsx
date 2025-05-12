'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { mockElectives } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ListedSchedule {
  id: string;
  priority: number;
  elective: string;
  duration: string;
  date: string;
  instructor: string;
  city: string;
  status: string;
}

export default function RotationList() {
  const [selectedElective, setSelectedElective] = useState<string>('');
  const [selectedDuration, setSelectedDuration] = useState<string>('');
  const [selectedDates, setSelectedDates] = useState<string>('');
  const [selectedInstructor, setSelectedInstructor] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [listedSchedules, setListedSchedules] = useState<ListedSchedule[]>([]);

  const handleReset = () => {
    setSelectedElective('');
    setSelectedDuration('');
    setSelectedDates('');
    setSelectedInstructor('');
    setSelectedCity('');
  };

  const currentElective = mockElectives.find(e => e.id === selectedElective);

  const handleListSchedule = () => {
    if (currentElective) {
      const newSchedule: ListedSchedule = {
        id: Date.now().toString(),
        priority: listedSchedules.length + 1,
        elective: currentElective.name,
        duration: selectedDuration,
        date: selectedDates,
        instructor: currentElective.instructor,
        city: currentElective.city,
        status: 'Pending',
      };
      setListedSchedules(prev => [...prev, newSchedule]);
      handleReset();
    }
  };

  const handleClearList = () => {
    setListedSchedules([]);
  };

  const handleSubmitRequest = () => {
    console.log('Submitting schedules:', listedSchedules);
    // Add your submit logic here
  };

  const selectTriggerStyles =
    'w-full border-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0';

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="w-full mx-auto space-y-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">ELECTIVE SELECTION</h2>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <Table>
              <TableHeader className="bg-[#F5F5F5]">
                <TableRow className="border">
                  <TableHead className="border">Elective</TableHead>
                  <TableHead className="border">Duration</TableHead>
                  <TableHead className="border">Dates</TableHead>
                  <TableHead className="border">Instructor</TableHead>
                  <TableHead className="border">City</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="border">
                <TableRow className="border">
                  <TableCell className="border">
                    <Select value={selectedElective} onValueChange={setSelectedElective}>
                      <SelectTrigger className={selectTriggerStyles}>
                        <SelectValue placeholder="Select Elective" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockElectives.map(option => (
                          <SelectItem key={option.id} value={option.id}>
                            {option.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="border">
                    <Select
                      value={selectedDuration}
                      onValueChange={setSelectedDuration}
                      disabled={!selectedElective}
                    >
                      <SelectTrigger className={selectTriggerStyles}>
                        <SelectValue placeholder="Duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="4-weeks">4 Weeks</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="border">
                    <Select
                      value={selectedDates}
                      onValueChange={setSelectedDates}
                      disabled={!selectedElective}
                    >
                      <SelectTrigger className={selectTriggerStyles}>
                        <SelectValue placeholder="Select Dates" />
                      </SelectTrigger>
                      <SelectContent>
                        {currentElective?.dates.map((date, index) => (
                          <SelectItem key={index} value={date}>
                            {date}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="border">
                    <Select
                      value={selectedInstructor}
                      onValueChange={setSelectedInstructor}
                      disabled={!selectedElective}
                    >
                      <SelectTrigger className={selectTriggerStyles}>
                        <SelectValue placeholder="Select Instructor" />
                      </SelectTrigger>
                      <SelectContent>
                        {currentElective && (
                          <SelectItem value={currentElective.instructor}>
                            {currentElective.instructor}
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="border">
                    <Select
                      value={selectedCity}
                      onValueChange={setSelectedCity}
                      disabled={!selectedElective}
                    >
                      <SelectTrigger className={selectTriggerStyles}>
                        <SelectValue placeholder="Select City" />
                      </SelectTrigger>
                      <SelectContent>
                        {currentElective && (
                          <SelectItem value={currentElective.city}>
                            {currentElective.city}
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                onClick={handleReset}
                className="px-6 rounded-full border border-[#364699]"
              >
                Reset
              </Button>
              <Button
                variant="default"
                className="bg-[#364699] rounded-full hover:bg-[#0056b3] text-white px-6"
                onClick={handleListSchedule}
                disabled={
                  !selectedElective ||
                  !selectedDuration ||
                  !selectedDates ||
                  !selectedInstructor ||
                  !selectedCity
                }
              >
                List This Schedule
              </Button>
            </div>
          </div>

          {listedSchedules.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">SCHEDULE LIST SELECTED</h3>
              <Table>
                <TableHeader className="bg-[#F5F5F5]">
                  <TableRow className="border">
                    <TableHead className="border">Priority</TableHead>
                    <TableHead className="border">Elective</TableHead>
                    <TableHead className="border">Duration</TableHead>
                    <TableHead className="border">Date</TableHead>
                    <TableHead className="border">Instructor</TableHead>
                    <TableHead className="border">City</TableHead>
                    <TableHead className="border">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="border">
                  {listedSchedules.map(schedule => (
                    <TableRow key={schedule.id} className="border">
                      <TableCell className="border">{schedule.priority}</TableCell>
                      <TableCell className="border">{schedule.elective}</TableCell>
                      <TableCell className="border">{schedule.duration}</TableCell>
                      <TableCell className="border">{schedule.date}</TableCell>
                      <TableCell className="border">{schedule.instructor}</TableCell>
                      <TableCell className="border">{schedule.city}</TableCell>
                      <TableCell className="border">{schedule.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="flex justify-end gap-4">
                <Button
                  variant="outline"
                  onClick={handleClearList}
                  className="px-6 rounded-full border border-[#364699]"
                >
                  Clear List
                </Button>
                <Button
                  variant="default"
                  className="bg-[#364699] rounded-full hover:bg-[#0056b3] text-white px-6"
                  onClick={handleSubmitRequest}
                >
                  Submit Request
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
