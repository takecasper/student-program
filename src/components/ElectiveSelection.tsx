'use client';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ElectiveOption, ElectiveSelectionProps } from '@/types/elective';

const MOCK_DATA: ElectiveOption[] = [
  {
    id: '1',
    name: 'AN-ANES-DELTA-DH',
    duration: '4 Weeks',
    dates: ['July 1 - July 7, 2025', 'July 7 - July 14, 2025', 'July 15 - July 24, 2025'],
    instructor: 'Mr. Padila',
    city: 'Davao City',
  },
];

export default function ElectiveSelection({ onSubmit }: ElectiveSelectionProps) {
  const [selectedElective, setSelectedElective] = useState<string>('');
  const [selectedDuration, setSelectedDuration] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedInstructor, setSelectedInstructor] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');

  const handleReset = () => {
    setSelectedElective('');
    setSelectedDuration('');
    setSelectedDate('');
    setSelectedInstructor('');
    setSelectedCity('');
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-6">ELECTIVE SELECTION</h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Select value={selectedElective} onValueChange={setSelectedElective}>
            <SelectTrigger>
              <SelectValue placeholder="Elective" />
            </SelectTrigger>
            <SelectContent>
              {MOCK_DATA.map(option => (
                <SelectItem key={option.id} value={option.id}>
                  {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedDuration} onValueChange={setSelectedDuration}>
            <SelectTrigger>
              <SelectValue placeholder="Duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="4-weeks">4 Weeks</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedDate} onValueChange={setSelectedDate}>
            <SelectTrigger>
              <SelectValue placeholder="Select Dates Available" />
            </SelectTrigger>
            <SelectContent>
              {MOCK_DATA[0].dates.map((date, index) => (
                <SelectItem key={index} value={date}>
                  {date}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedInstructor} onValueChange={setSelectedInstructor}>
            <SelectTrigger>
              <SelectValue placeholder="Instructor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mr-padila">Mr. Padila</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedCity} onValueChange={setSelectedCity}>
            <SelectTrigger>
              <SelectValue placeholder="City" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="davao-city">Davao City</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <Button variant="outline" onClick={handleReset} className="px-6">
            Reset
          </Button>
          <Button
            variant="default"
            onClick={() =>
              onSubmit({
                name: selectedElective,
                duration: selectedDuration,
                dates: [selectedDate],
                instructor: selectedInstructor,
                city: selectedCity,
                id: selectedElective,
              })
            }
            className="bg-blue-600 hover:bg-blue-700 text-white px-6"
          >
            List This Schedule
          </Button>
        </div>
      </div>
    </div>
  );
}
