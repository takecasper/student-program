'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Check, Database, Plus, Scissors, SendHorizonal, X } from 'lucide-react';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { countries } from '@/lib/countries';
import Flag from 'react-world-flags';
import CasperPrepare from '@/components/addmission/Prepare';

interface Step {
  id: number;
  title: string;
  description: string;
  infoText?: string;
  component: React.FC<StepProps>;
}

interface StepProps {
  formData: FormData;
  onChange: (value: string) => void;
  currentStep: number;
}

interface FormData {
  country: string;
  admissionCycle: string;
  programType: string;
  schools: string[];
  testDate?: {
    CASPER?: { date: string; time: string };
    DUET?: { date: string; time: string };
  };
  payment?: PaymentFormData;
}

// Create separate components for each step
const CountryStep: React.FC<StepProps> = ({ formData, onChange }) => (
  <Select value={formData.country} onValueChange={onChange}>
    <SelectTrigger className="w-full bg-white border-gray-200 focus:ring-2 focus:ring-[#00a59b] focus:border-transparent">
      <SelectValue placeholder="Select a country" />
    </SelectTrigger>
    <SelectContent>
      {countries.map(country => (
        <SelectItem key={country.code} value={country.code}>
          <div className="flex items-center gap-2">
            <div className="w-6 h-4 flex items-center overflow-hidden">
              <Flag
                code={country.code}
                height={16}
                width={24}
                className="object-cover rounded-[2px]"
                fallback={<span className="text-gray-400">🏳️</span>}
              />
            </div>
            <span>{country.name}</span>
          </div>
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

const AdmissionCycleStep: React.FC<StepProps> = ({ formData, onChange }) => {
  const handleCycleChange = (value: string) => {
    // If the same value is clicked again, deselect it
    if (formData.admissionCycle === value) {
      onChange('');
    } else {
      onChange(value);
    }
  };

  return (
    <div className="flex items-start gap-2">
      {['2025-2026', '2026-2027'].map(cycle => (
        <div
          key={cycle}
          className={`border rounded-md p-3 cursor-pointer hover:border-[#00a59b] transition-colors ${
            formData.admissionCycle === cycle
              ? 'border-[#00a59b] bg-[#00a59b]/5'
              : 'border-[#d9d9d9]'
          }`}
          onClick={() => handleCycleChange(cycle)}
        >
          <div className="flex items-center space-x-2">
            <div
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                formData.admissionCycle === cycle
                  ? 'border-[#00a59b] bg-[#00a59b]'
                  : 'border-gray-300'
              }`}
            >
              {formData.admissionCycle === cycle && (
                <Check className="h-3 w-3 text-white" />
              )}
            </div>
            <Label className="cursor-pointer select-none">{cycle}</Label>
          </div>
        </div>
      ))}
    </div>
  );
};

// Add these components after the existing step components

interface ProgramOptionProps {
  id: string;
  label: string;
  selected: boolean;
  onSelect: (value: string) => void;
}

const ProgramOption: React.FC<ProgramOptionProps> = ({ id, label, selected, onSelect }) => {
  const handleClick = () => {
    // If already selected, deselect it, otherwise select it
    onSelect(selected ? '' : id);
  };

  return (
    <div
      className={`border rounded-md p-3 cursor-pointer hover:border-[#00a59b] transition-colors ${
        selected ? 'border-[#00a59b] bg-[#00a59b]/5' : 'border-[#d9d9d9]'
      }`}
      onClick={handleClick}
    >
      <div className="flex items-center space-x-2">
        <div
          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
            selected ? 'border-[#00a59b] bg-[#00a59b]' : 'border-gray-300'
          }`}
        >
          {selected && <Check className="h-3 w-3 text-white" />}
        </div>
        <Label className="cursor-pointer select-none">{label}</Label>
      </div>
    </div>
  );
};

const ProgramTypeStep: React.FC<StepProps> = ({ formData, onChange }) => {
  const handleProgramChange = (value: string) => {
    // If the same value is clicked again, deselect it
    if (formData.programType === value) {
      onChange('');
    } else {
      onChange(value);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium text-[#333333] mb-3">GRADUATE MEDICAL EDUCATION</h4>
        <div className="grid grid-cols-2 gap-3">
          {[
            { id: 'anesthesiology', label: 'Anesthesiology' },
            { id: 'obgyn', label: 'OBGYN' },
            { id: 'internal-medicine', label: 'Internal Medicine' },
            { id: 'surgery', label: 'Surgery' },
          ].map(program => (
            <ProgramOption
              key={program.id}
              id={program.id}
              label={program.label}
              selected={formData.programType === program.id}
              onSelect={handleProgramChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const SchoolStep: React.FC<StepProps> = ({ formData, onChange }) => {
  const handleSchoolChange = (schoolId: string) => {
    let newSchools = [...formData.schools];

    if (schoolId === 'all') {
      // Toggle all schools
      const allSchoolIds = ['sam-houston', 'san-juan'];
      if (formData.schools.length === allSchoolIds.length) {
        newSchools = []; // Deselect all
      } else {
        newSchools = allSchoolIds; // Select all
      }
    } else {
      // Toggle individual school
      if (newSchools.includes(schoolId)) {
        newSchools = newSchools.filter(id => id !== schoolId);
      } else {
        newSchools.push(schoolId);
      }
    }

    onChange(JSON.stringify(newSchools));
  };

  const allSchoolIds = ['sam-houston', 'san-juan'];
  const isAllSelected = allSchoolIds.every(id => formData.schools.includes(id));

  return (
    <div className="space-y-4">
      <div className="bg-[#fcedca] p-4 rounded-md text-sm">
        <p>
          The program type you have selected includes up to 8 distributions as part of the base fee.
          Additional distributions beyond that are $ 15.00.
        </p>
      </div>

      <div className="space-y-3">
        {[
          { id: 'all', name: 'Select All Schools', selected: isAllSelected },
          {
            id: 'sam-houston',
            name: 'Sam Houston State University',
            selected: formData.schools.includes('sam-houston'),
          },
          {
            id: 'san-juan',
            name: 'San Juan Bautista School of Medicine',
            selected: formData.schools.includes('san-juan'),
          },
        ].map(school => (
          <div
            key={school.id}
            className={`border rounded-md p-3 cursor-pointer hover:border-[#00a59b] transition-colors ${
              school.selected ? 'border-[#00a59b] bg-[#00a59b]/5' : 'border-[#d9d9d9]'
            }`}
            onClick={() => handleSchoolChange(school.id)}
          >
            <div className="flex items-center space-x-2">
              <div
                className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                  school.selected ? 'border-[#00a59b] bg-[#00a59b]' : 'border-gray-300'
                }`}
              >
                {school.selected && <Check className="h-3 w-3 text-white" />}
              </div>
              <Label className="cursor-pointer select-none">{school.name}</Label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Add these interfaces first
interface TimeSlot {
  time: string;
  available: boolean;
}

interface DaySlot {
  day: string;
  date: number;
  slots: number;
}

// Add the TestDateStep component after other step components
const TestDateStep: React.FC<StepProps> = ({ formData, onChange }) => {
  const [selectedTest, setSelectedTest] = useState<'CASPER' | 'DUET'>('CASPER');
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
          className={`rounded-full ${
            formData.testDate?.CASPER
              ? 'bg-[#70C0B8] text-white border-[#00A59B] border-2' // Saved state - teal
              : selectedTest === 'CASPER'
                ? 'bg-[#364699] text-white' // Active state - blue
                : 'border-[#d9d9d9] text-[#333333]' // Default state
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
          variant={selectedTest === 'DUET' ? 'default' : 'outline'}
          className={`rounded-full ${
            formData.testDate?.DUET
              ? 'bg-[#70C0B8] text-white border-[#00A59B] border-2' // Saved state - teal
              : selectedTest === 'DUET'
                ? 'bg-[#364699] text-white' // Active state - blue
                : 'border-[#d9d9d9] text-[#333333]' // Default state
          }`}
          onClick={() => {
            setSelectedTest('DUET');
            setSelectedDate(null);
            setSelectedTime(null);
          }}
        >
          {formData.testDate?.DUET && <Check className="h-4 w-4 mr-2" />}
          DUET
        </Button>
      </div>

      {/* Show current selections */}
      {(formData.testDate?.CASPER || formData.testDate?.DUET) && (
        <div className="bg-gray-50 p-3 rounded-lg text-sm">
          <h4 className="font-medium mb-2">Selected Tests:</h4>
          {formData.testDate?.CASPER && (
            <div>
              CASPER: {formData.testDate.CASPER.date} - {formData.testDate.CASPER.time}
            </div>
          )}
          {formData.testDate?.DUET && (
            <div>
              DUET: {formData.testDate.DUET.date} - {formData.testDate.DUET.time}
            </div>
          )}
        </div>
      )}

      <div className="space-y-4">
        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
          <SelectTrigger className="w-[200px]">
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
              <div className="text-xs text-[#00a59b]">{day.slots} Slot</div>
            </div>
          ))}
        </div>

        {selectedDate && (
          <div className="space-y-2">
            {timeSlots.map(slot => (
              <div
                key={slot.time}
                className={`border rounded-lg p-3 cursor-pointer hover:border-[#00a59b] flex justify-between items-center ${
                  selectedTime === slot.time ? 'border-[#00a59b] bg-[#00a59b]/5' : ''
                }`}
                onClick={() => setSelectedTime(slot.time)}
              >
                <span>{slot.time}</span>
                <span className="text-sm text-[#00a59b]">Available</span>
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

// Add this interface for payment form
interface PaymentFormData {
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  cvv: string;
  saveCard: boolean;
}

// Update the PaymentStep component
const PaymentStep: React.FC<StepProps> = ({ formData, onChange }) => {
  const [paymentData, setPaymentData] = useState<PaymentFormData>({
    cardNumber: '',
    cardholderName: '',
    expiryDate: '',
    cvv: '',
    saveCard: false,
  });

  // Initialize from form data
  useEffect(() => {
    if (formData.payment) {
      setPaymentData(formData.payment);
    }
  }, [formData.payment]);

  const handleInputChange = (field: keyof PaymentFormData) => (value: string | boolean) => {
    const newPaymentData = {
      ...paymentData,
      [field]: value,
    };
    setPaymentData(newPaymentData);
    onChange(JSON.stringify(newPaymentData));
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <div>
          <Label htmlFor="cardNumber">Card Number</Label>
          <input
            id="cardNumber"
            type="text"
            placeholder="1234 5678 9012 3456"
            value={paymentData.cardNumber}
            onChange={e => handleInputChange('cardNumber')(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#00a59b] focus:border-transparent"
          />
        </div>

        <div>
          <Label htmlFor="cardholderName">Cardholder Name</Label>
          <input
            id="cardholderName"
            type="text"
            placeholder="John Doe"
            value={paymentData.cardholderName}
            onChange={e => handleInputChange('cardholderName')(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#00a59b] focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="expiryDate">Expiry Date</Label>
            <input
              id="expiryDate"
              type="text"
              placeholder="MM/YY"
              value={paymentData.expiryDate}
              onChange={e => handleInputChange('expiryDate')(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#00a59b] focus:border-transparent"
            />
          </div>
          <div>
            <Label htmlFor="cvv">CVV</Label>
            <input
              id="cvv"
              type="text"
              placeholder="123"
              value={paymentData.cvv}
              onChange={e => handleInputChange('cvv')(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#00a59b] focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <input
            id="saveCard"
            type="checkbox"
            checked={paymentData.saveCard}
            onChange={e => handleInputChange('saveCard')(e.target.checked)}
            className="rounded border-gray-300 text-[#00a59b] focus:ring-[#00a59b]"
          />
          <Label htmlFor="saveCard" className="text-sm">
            Save card for future payments
          </Label>
        </div>
      </div>
    </div>
  );
};

// Add a new component for the final success screen
const PurchaseSuccessScreen: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
      {/* Success Icon */}
      <div className="w-16 h-16 bg-[#00a59b] rounded-full flex items-center justify-center mb-6">
        <Check className="w-8 h-8 text-white" />
      </div>

      {/* Title */}
      <h2 className="text-xl font-semibold text-[#333333] mb-2">Altus Suite Test</h2>
      <h3 className="text-xl font-semibold text-[#333333] mb-4">Reservation Complete</h3>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-6 max-w-sm leading-relaxed">
        A confirmation email and receipt will be sent to your inbox. You will now be taken to the
        Altus Suite Homepage with information on your assessments.
      </p>

      {/* Purchase Summary */}
      <div className="w-full mb-6">
        <h4 className="text-sm font-medium text-left mb-3">Purchase Summary:</h4>

        {/* Test Items */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-[#F5F5F5] rounded-full flex items-center justify-center">
              <span className="text-xs">📅</span>
            </div>
            <div className="text-left">
              <p className="text-sm">12 Oct 2025 10:30 AM - 12:30 PM</p>
              <p className="text-sm font-medium">Casper</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-[#F5F5F5] rounded-full flex items-center justify-center">
              <span className="text-xs">📅</span>
            </div>
            <div className="text-left">
              <p className="text-sm">24 Oct 2025 10:30 AM - 12:30 PM</p>
              <p className="text-sm font-medium">Duet</p>
            </div>
          </div>
        </div>

        {/* Total Amount */}
        <div className="bg-[#EBEBFF] p-4 rounded-lg">
          <p className="text-sm text-gray-600">TOTAL AMOUNT</p>
          <p className="text-xl font-semibold">85.00 USD</p>
        </div>
      </div>

      {/* Accommodation Note */}
      <p className="text-xs text-gray-500 mb-6 max-w-sm">
        If you require accommodations for your test, please visit accommodations for more
        information.
      </p>

      {/* Done Button */}
      <Button className="w-32 rounded-full bg-[#364699] hover:bg-[#253170]" onClick={onClose}>
        DONE
      </Button>
    </div>
  );
};

// Update the ReservationComplete component to accept the setter as a prop
const ReservationComplete: React.FC<{
  onClose: () => void;
  onPurchase: () => void;
}> = ({ onClose, onPurchase }) => {
  const handlePurchase = () => {
    onPurchase();
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-[#364699]">Apply New</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="bg-white  rounded-lg p-6 space-y-6">
        <div className="space-y-4 border rounded-t-2xl rounded-b-2xl">
          <div>
            <div className="space-y-3 border-b border-l border-r rounded-b-2xl rounded-t-2xl">
              <div className="flex flex-col items-start border-b p-2">
                <h3 className="font-medium text-[#333333]">Altus Suite Test Reservation Summary</h3>
                <p className="text-sm text-gray-600">US - Medicine (CSP - 10111)</p>
              </div>

              {/* Show scheduled tests */}
              <div className="flex items-center gap-3 p-2 border-b">
                <div className="w-5 h-5 bg-[#F5F5F5] rounded-full flex items-center justify-center">
                  <span className="text-xs">📅</span>
                </div>
                <div>
                  <p className="text-sm">12 Oct 2025 10:30 AM - 12:30 PM</p>
                  <p className="text-sm font-medium">Casper</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2">
                <div className="w-5 h-5 bg-[#F5F5F5] rounded-full flex items-center justify-center">
                  <span className="text-xs">📅</span>
                </div>
                <div>
                  <p className="text-sm">24 Oct 2025 10:30 AM - 12:30 PM</p>
                  <p className="text-sm font-medium">Duet</p>
                </div>
              </div>
            </div>
          </div>
          {/* Fee Breakdown */}
          <div className="space-y-4 px-4 ">
            <div className="bg-[#EBEBFF] p-4 rounded-lg text-center">
              <p className="text-sm text-gray-600">TOTAL AMOUNT</p>
              <p className="text-xl font-semibold">85.00 USD</p>
            </div>

            <div className="rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left text-sm font-medium text-gray-600 p-3">
                      Fee Breakdown
                    </th>
                    <th className="text-right text-sm font-medium text-gray-600 p-3">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="p-3">
                      <div className="flex items-center gap-2 text-sm">
                        <span>
                          <Database className="w-4 h-4" />
                        </span>
                        Base Test Fee
                      </div>
                      <div className="text-xs text-gray-600 mt-1 ml-6">
                        US - Medicine (CSP - 10111)
                      </div>
                    </td>
                    <td className="text-right p-3 text-sm">85.00 USD</td>
                  </tr>
                  <tr>
                    <td className="p-3">
                      <div className="text-sm flex items-center gap-2">
                        <span>
                          <SendHorizonal className="w-4 h-4" />
                        </span>
                        Included Distribution (s)
                      </div>
                      <div className="text-xs text-gray-600 mt-1 ml-6">
                        US - Alabama College of Osteopathic Medicine
                      </div>
                    </td>
                    <td className="text-right p-3 text-sm">00.00 USD</td>
                  </tr>
                  <tr>
                    <td className="p-3">
                      <div className="text-sm flex items-center gap-2">
                        <span>
                          <Scissors className="w-4 h-4" />
                        </span>
                        Discount (s)
                      </div>
                      <div className="text-xs text-gray-600 mt-1 ml-6">
                        Fee Assistance Program Discount
                      </div>
                    </td>
                    <td className="text-right p-3 text-sm">-00.00 USD</td>
                  </tr>
                  <tr className="flex items-end font-medium ">
                    <td className="p-3 text-sm">TOTAL</td>
                    <td className=" p-3 text-sm">85.00 USD</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            variant="outline"
            className="flex-1 rounded-full border-gray-300"
            onClick={onClose}
          >
            Go Back
          </Button>
          <Button
            className="flex-1 rounded-full bg-[#364699] hover:bg-[#253170]"
            onClick={handlePurchase}
          >
            Purchase
          </Button>
        </div>
      </div>
    </div>
  );
};

// Remove the SummaryStep component and keep only 6 steps
const ADMISSION_STEPS: Step[] = [
  {
    id: 1,
    title: 'Select Country',
    description: 'Choose your country of residence',
    component: CountryStep,
  },
  {
    id: 2,
    title: 'Admission Cycle',
    description: 'Select your admission cycle',
    component: AdmissionCycleStep,
  },
  {
    id: 3,
    title: 'Program Type',
    description: 'Choose your program type',
    component: ProgramTypeStep,
  },
  {
    id: 4,
    title: 'Schools',
    description: 'Select schools to send your results',
    component: SchoolStep,
  },
  {
    id: 5,
    title: 'Test Date & Time',
    description: 'Schedule your test sessions',
    component: TestDateStep,
  },
  {
    id: 6,
    title: 'Payment',
    description: 'Enter payment information',
    component: PaymentStep,
  },
];

export default function AdmissionContent() {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [selectedProgram, setSelectedProgram] = useState<string | undefined>(undefined);
  const [showSidebar, setShowSidebar] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [hideSteps, setHideSteps] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    country: '',
    admissionCycle: '',
    programType: '',
    schools: [],
    testDate: undefined,
    payment: undefined,
  });
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);
  const [showPrepare, setShowPrepare] = useState<boolean>(false);
  const [showFinalSuccess, setShowFinalSuccess] = useState(false);

  const filters = ['ALL', 'CASPER', 'DUET', 'SNAPSHOT'];

  const tests = [
    {
      id: 1,
      type: 'CASPER',
      date: 'March 25, 2025',
      startTime: '11:00 AM',
      endTime: '12:00 PM',
      status: 'NOT STARTED',
      image: '/category1.png',
    },
    {
      id: 2,
      type: 'DUET',
      date: 'March 25, 2025',
      startTime: '11:00 AM',
      endTime: '12:00 PM',
      status: 'NOT STARTED',
      image: '/category1.png',
    },
  ];

  // Filter tests based on active filter
  const filteredTests =
    activeFilter === 'ALL' ? tests : tests.filter(test => test.type === activeFilter);

  const handleOpenSidebar = () => {
    setShowSidebar(true);
  };

  const handleCloseSidebar = () => {
    setShowSidebar(false);
    setCurrentStep(1);
    setShowSuccessScreen(false);
    setShowFinalSuccess(false);
    setHideSteps(false);
  };

  const handleStepChange = (field: keyof FormData) => (value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]:
        field === 'payment'
          ? JSON.parse(value)
          : field === 'schools'
            ? JSON.parse(value)
            : field === 'testDate'
              ? JSON.parse(value)
              : value,
    }));
  };

  const renderStep = (step: Step) => {
    const StepComponent = step.component;
    const fieldKey = {
      1: 'country',
      2: 'admissionCycle',
      3: 'programType',
      4: 'schools',
      5: 'testDate',
      6: 'payment',
    }[step.id] as keyof FormData;

    // Custom validation for each step
    const isStepValid = () => {
      switch (step.id) {
        case 1:
          return !!formData.country && formData.country.trim() !== '';
        case 2:
          return !!formData.admissionCycle && formData.admissionCycle.trim() !== '';
        case 3:
          return !!formData.programType && formData.programType.trim() !== '';
        case 4:
          return formData.schools.length > 0;
        case 5:
          if (!formData.testDate) return false;
          const hasValidTest = Object.values(formData.testDate).some(
            test => test && test.date && test.time,
          );
          return hasValidTest;
        case 6:
          return (
            !!formData.payment &&
            formData.payment.cardNumber.trim() !== '' &&
            formData.payment.cardholderName.trim() !== '' &&
            formData.payment.expiryDate.trim() !== '' &&
            formData.payment.cvv.trim() !== ''
          );
        default:
          return false;
      }
    };

    // Handle step completion
    const handleStepComplete = () => {
      if (step.id === ADMISSION_STEPS.length) {
        // After payment step, show summary and hide steps
        setShowSuccessScreen(true);
        setHideSteps(true);
      } else {
        setCurrentStep(prev => prev + 1);
      }
    };

    const isNotLastStep = step.id < ADMISSION_STEPS.length;

    return (
      <div key={step.id} className="relative">
        {/* Connecting line - show for all steps except the last one */}
        {isNotLastStep && (
          <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-gray-200 z-0">
            {/* Active line portion */}
            <div
              className={`w-full transition-all duration-300 ${
                currentStep > step.id ? 'bg-[#00a59b] h-full' : 'bg-gray-200 h-0'
              }`}
            />
          </div>
        )}

        <div className="flex flex-col items-start relative z-10">
          <div className="flex items-start gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                currentStep >= step.id
                  ? 'bg-[#00a59b] text-white border-[#00a59b]'
                  : 'bg-white text-[#6c6c6c] border-gray-200'
              }`}
            >
              {currentStep > step.id ? <Check className="h-5 w-5" /> : <span>{step.id}</span>}
            </div>
            <h3 className="text-lg font-medium">
              Step {step.id}: {step.title}
            </h3>
          </div>
        </div>

        <div className="ml-10 relative z-10">
          <div className="flex flex-col gap-2">
            <p className="text-xs text-[#6c6c6c]">{step.description}</p>
            {step.infoText && (
              <p className="bg-[#EC7A000D] text-xs p-3 rounded-[10px]">{step.infoText}</p>
            )}
          </div>

          <div
            className={`pt-4 ${currentStep === step.id ? 'border-[#00a59b]' : 'border-[#d9d9d9]'}`}
          >
            <StepComponent
              formData={formData}
              onChange={handleStepChange(fieldKey)}
              currentStep={currentStep}
            />
          </div>

          {/* Only show Next button if this is the current step */}
          {currentStep === step.id && (
            <div className="mt-6 mb-8">
              <Button
                className="rounded-full py-1 px-[23px] bg-[#364699] hover:bg-[#253170] disabled:opacity-50"
                onClick={handleStepComplete}
                disabled={!isStepValid()}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Add event listener for payment summary
  useEffect(() => {
    const handleShowPaymentSummary = () => {
      setHideSteps(true);
    };

    window.addEventListener('showPaymentSummary', handleShowPaymentSummary);

    return () => {
      window.removeEventListener('showPaymentSummary', handleShowPaymentSummary);
    };
  }, []);

  // Add a function to handle purchase completion
  // const handlePurchase = () => {
  //   setShowSuccessScreen(true);
  // };

  return showPrepare ? (
    <CasperPrepare />
  ) : (
    <div className="p-6 relative">
      {/* Apply for a new program section */}
      <div className="mb-10">
        <h2 className="text-lg font-medium text-[#333333] mb-6">APPLY FOR A NEW PROGRAM</h2>

        <div
          className="border-2 border-dashed border-[#d9d9d9] rounded-[20px] w-[100px] h-[100px] flex items-center justify-center cursor-pointer hover:border-[#6a6eec] transition-colors"
          onClick={handleOpenSidebar}
        >
          <Button variant="ghost" className="h-full w-full rounded-[20px]">
            <Plus className="h-6 w-6 text-[#6c6c6c]" />
          </Button>
        </div>
      </div>

      {/* Booked tests section */}
      <div>
        <h2 className="text-lg font-medium text-[#333333] mb-6">BOOKED TESTS</h2>

        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-2">
            {filters.map(filter => (
              <Button
                key={filter}
                variant={activeFilter === filter ? 'default' : 'outline'}
                className={`rounded-full ${
                  activeFilter === filter
                    ? 'bg-[#364699] text-white'
                    : 'border-[#d9d9d9] text-[#333333]'
                }`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </Button>
            ))}
            <Select value={selectedProgram} onValueChange={setSelectedProgram}>
              <SelectTrigger className="w-[200px]  text-black bg-[#ececec] rounded-[12px]">
                <SelectValue placeholder="Select Program Name" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="medicine">Medicine</SelectItem>
                <SelectItem value="nursing">Nursing</SelectItem>
                <SelectItem value="pharmacy">Pharmacy</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {filteredTests.map(test => (
            <Card
              key={test.id}
              onClick={() => setShowPrepare(true)}
              className="w-[234px] h-[240px] border border-[#D9D9D9] shadow-none rounded-[20px] overflow-hidden py-3 cursor-pointer"
            >
              <div className="relative h-[150px] bg-white">
                <div className="absolute top-3 right-5 bg-[#fcedca] text-[#333333] text-xs font-medium py-1 px-3 rounded-full z-10">
                  {test.status}
                </div>
                <Image
                  className="m-auto rounded-2xl"
                  src={test.image || '/placeholder.svg'}
                  alt={`${test.type} test`}
                  width={215}
                  height={104}
                />
              </div>
              <CardContent>
                <h3 className="text-lg font-medium text-[#333333] mb-1">{test.type}</h3>
                <p className="text-sm text-[#6c6c6c]">{test.date}</p>
                <p className="text-sm text-[#6c6c6c]">
                  {test.startTime} - {test.endTime}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Application Sidebar - Modified to show success screen */}
      {showSidebar && (
        <div className="absolute top-0 right-0 bottom-0 z-40 flex justify-end h-screen">
          <div className="bg-white w-full max-w-md h-full overflow-y-auto shadow-lg border-l border-[#f5f5f5] animate-in slide-in-from-right">
            <div className="p-6">
              {showFinalSuccess ? (
                <PurchaseSuccessScreen onClose={handleCloseSidebar} />
              ) : showSuccessScreen ? (
                <ReservationComplete
                  onClose={handleCloseSidebar}
                  onPurchase={() => setShowFinalSuccess(true)}
                />
              ) : (
                <>
                  {/* Steps indicator - only show when not hideSteps */}
                  {!hideSteps && (
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-[#333333]">Apply New</h2>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleCloseSidebar}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="space-y-6">
                        {ADMISSION_STEPS.map(step => renderStep(step))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
