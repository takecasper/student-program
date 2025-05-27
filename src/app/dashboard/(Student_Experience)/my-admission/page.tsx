/* eslint-disable react-hooks/exhaustive-deps */
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
import { Check, Plus, X } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
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
    casper?: { date: string; time: string };
    duet?: { date: string; time: string };
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

const AdmissionCycleStep: React.FC<StepProps> = ({ onChange }) => (
  <div className="flex items-start gap-2">
    {['2025-2026', '2026-2027'].map(cycle => (
      <RadioGroup
        key={cycle}
        defaultValue=""
        onValueChange={onChange}
        className="border rounded-md p-3"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value={cycle} id={`cycle-${cycle}`} className="text-[#00a59b]" />
          <Label htmlFor={`cycle-${cycle}`}>{cycle}</Label>
        </div>
      </RadioGroup>
    ))}
  </div>
);

// Add these components after the existing step components

interface ProgramOptionProps {
  id: string;
  label: string;
  selected: boolean;
  onSelect: (value: string) => void;
}

const ProgramOption: React.FC<ProgramOptionProps> = ({ id, label, selected, onSelect }) => (
  <div className="border border-[#d9d9d9] rounded-md p-3">
    <RadioGroup defaultValue="" onValueChange={() => onSelect(id)}>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value={id} id={id} className="text-[#00a59b]" checked={selected} />
        <Label htmlFor={id}>{label}</Label>
      </div>
    </RadioGroup>
  </div>
);

const ProgramTypeStep: React.FC<StepProps> = ({ formData, onChange }) => (
  <div className="space-y-6">
    <div>
      <h4 className="font-medium text-[#333333] mb-3">GRADUATE MEDICAL EDUATION</h4>
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
            onSelect={onChange}
          />
        ))}
      </div>
    </div>

    <div>
      <h4 className="font-medium text-[#333333] mb-3">MEDICINE</h4>
      <div className="grid grid-cols-2 gap-3">
        {[
          { id: 'athletic-training', label: 'Athletic Training' },
          { id: 'other', label: 'Other' },
          { id: 'dentistry', label: 'Dentistry' },
          { id: 'pharmacy', label: 'Pharmacy' },
        ].map(program => (
          <ProgramOption
            key={program.id}
            id={program.id}
            label={program.label}
            selected={formData.programType === program.id}
            onSelect={onChange}
          />
        ))}
      </div>
    </div>
  </div>
);

const SchoolStep: React.FC<StepProps> = ({ formData, onChange }) => (
  <div className="space-y-4">
    <div className="bg-[#fcedca] p-4 rounded-md text-sm">
      <p>
        The program type you have selected includes up to 8 distributions as part of the base fee.
        Additional distributions beyond that are $ 15.00.
      </p>
    </div>

    <div className="space-y-3">
      {[
        { id: 'all', name: 'Select All Schools' },
        { id: 'sam-houston', name: 'Sam Houston State University' },
        { id: 'san-juan', name: 'San Juan Bautista School of Medicine' },
      ].map(school => (
        <div key={school.id} className="border border-[#d9d9d9] rounded-md p-3">
          <RadioGroup defaultValue="" onValueChange={() => onChange(school.id)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value={school.id}
                id={school.id}
                className="text-[#00a59b]"
                checked={formData.schools.includes(school.id)}
              />
              <Label htmlFor={school.id}>{school.name}</Label>
            </div>
          </RadioGroup>
        </div>
      ))}
    </div>
  </div>
);

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

  // Update parent component when selections change
  useEffect(() => {
    if (selectedDate && selectedTime) {
      const testDate = {
        ...formData.testDate,
        [selectedTest.toLowerCase()]: {
          date: `${selectedMonth} ${selectedDate}`,
          time: selectedTime,
        },
      };
      onChange(JSON.stringify(testDate));
    }
  }, [selectedTest, selectedDate, selectedTime, selectedMonth]);

  return (
    <div className="space-y-6">
      <div className="bg-[#FFF9F0] p-4 rounded-[10px] text-xs">
        <p>
          For this program which you have applied request to take Casper and Duet, Please select
          time Date & Time you would like to take your tests.
        </p>
      </div>

      <div className="flex gap-2">
        <Button
          variant={selectedTest === 'CASPER' ? 'default' : 'outline'}
          className={`rounded-full ${
            selectedTest === 'CASPER'
              ? 'bg-[#364699] text-white'
              : 'border-[#d9d9d9] text-[#333333]'
          }`}
          onClick={() => {
            setSelectedTest('CASPER');
            setSelectedDate(null);
            setSelectedTime(null);
          }}
        >
          CASPER
        </Button>
        <Button
          variant={selectedTest === 'DUET' ? 'default' : 'outline'}
          className={`rounded-full ${
            selectedTest === 'DUET' ? 'bg-[#364699] text-white' : 'border-[#d9d9d9] text-[#333333]'
          }`}
          onClick={() => {
            setSelectedTest('DUET');
            setSelectedDate(null);
            setSelectedTime(null);
          }}
        >
          DUET
        </Button>
      </div>

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

        <div className="space-y-2">
          {timeSlots.map(slot => (
            <div
              key={slot.time}
              className={`border rounded-lg p-3 cursor-pointer hover:border-[#00a59b] ${
                selectedTime === slot.time ? 'border-[#00a59b] bg-[#00a59b]/5' : ''
              }`}
              onClick={() => setSelectedTime(slot.time)}
            >
              {slot.time}
            </div>
          ))}
        </div>
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
  const [showSummary, setShowSummary] = useState(false);

  const handleInputChange =
    (field: keyof PaymentFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
      const newPaymentData = { ...paymentData, [field]: value };
      setPaymentData(newPaymentData);
      onChange(JSON.stringify(newPaymentData));
    };

  useEffect(() => {
    if (formData.payment) {
      setPaymentData(formData.payment);
    }
  }, [formData.payment]);

  // Function to validate card details before showing summary
  const handleShowSummary = () => {
    setShowSummary(true);
    // Signal to parent component that we're showing summary
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('showPaymentSummary');
      window.dispatchEvent(event);
    }
  };

  // Add event listener for reset
  useEffect(() => {
    const handleResetPaymentStep = () => {
      setShowSummary(false);
    };

    window.addEventListener('resetPaymentStep', handleResetPaymentStep);

    return () => {
      window.removeEventListener('resetPaymentStep', handleResetPaymentStep);
    };
  }, []);

  return (
    <div className="space-y-6">
      {!showSummary ? (
        // Payment Form - Only shown when summary is not visible
        <div className="bg-white rounded-lg p-4">
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Card Number</label>
              <input
                type="text"
                placeholder="0123 **** **** ****"
                className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#00a59b] focus:border-transparent"
                value={paymentData.cardNumber}
                onChange={handleInputChange('cardNumber')}
              />
            </div>

            <div>
              <label className="text-sm text-gray-600 mb-1 block">Cardholder Name</label>
              <input
                type="text"
                placeholder="Enter Card Holder Name"
                className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#00a59b] focus:border-transparent"
                value={paymentData.cardholderName}
                onChange={handleInputChange('cardholderName')}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Expiry Date</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#00a59b] focus:border-transparent"
                  value={paymentData.expiryDate}
                  onChange={handleInputChange('expiryDate')}
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">CVV Code</label>
                <input
                  type="text"
                  placeholder="Enter Code"
                  className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#00a59b] focus:border-transparent"
                  value={paymentData.cvv}
                  onChange={handleInputChange('cvv')}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="save-card"
                className="rounded border-gray-300 text-[#00a59b] focus:ring-[#00a59b]"
                checked={paymentData.saveCard}
                onChange={handleInputChange('saveCard')}
              />
              <label htmlFor="save-card" className="text-sm text-gray-600">
                Save my card for future
              </label>
            </div>

            <div className="mt-4">
              <Button
                className="rounded-full py-1 px-[23px] bg-[#364699] hover:bg-[#253170]"
                onClick={handleShowSummary}
                disabled={
                  !paymentData.cardNumber ||
                  !paymentData.cardholderName ||
                  !paymentData.expiryDate ||
                  !paymentData.cvv
                }
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      ) : (
        // Test Reservation Summary - Only shown after clicking Next
        <div className="bg-white  rounded-lg p-6 space-y-6">
          <div className="space-y-4 ">
            <div className="space-y-3 border rounded-[20px]">
              <div className="flex flex-col items-start border-b p-2">
                <h3 className="font-medium text-[#333333]">Altus Suite Test Reservation Summary</h3>
                <p className="text-sm text-gray-600">US - Medicine (CSP - 10111)</p>
              </div>
              <div className="flex items-center gap-3 p-2">
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
          <div className="space-y-4">
            <div className="bg-[#EBEBFF] p-4 rounded-lg text-center">
              <p className="text-sm text-gray-600">TOTAL AMOUNT</p>
              <p className="text-xl font-semibold">85.00 USD</p>
            </div>

            <div className=" rounded-lg overflow-hidden">
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
                      <div className="text-sm">Base Test Fee</div>
                      <div className="text-xs text-gray-600 mt-1">US - Medicine (CSP - 10111)</div>
                    </td>
                    <td className="text-right p-3 text-sm">85.00 USD</td>
                  </tr>
                  <tr>
                    <td className="p-3">
                      <div className="text-sm">Included Distribution (s)</div>
                      <div className="text-xs text-gray-600 mt-1">
                        US - Alabama College of Osteopathic Medicine
                      </div>
                    </td>
                    <td className="text-right p-3 text-sm">00.00 USD</td>
                  </tr>
                  <tr>
                    <td className="p-3">
                      <div className="text-sm">Discount (s)</div>
                      <div className="text-xs text-gray-600 mt-1">
                        Fee Assistance Program Discount
                      </div>
                    </td>
                    <td className="text-right p-3 text-sm">-00.00 USD</td>
                  </tr>
                  <tr className="bg-gray-50 font-medium">
                    <td className="p-3 text-sm">TOTAL</td>
                    <td className="text-right p-3 text-sm">85.00 USD</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Add this new component for the success confirmation
const ReservationComplete: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="flex flex-col items-center p-6 max-w-md mx-auto">
      <div className="bg-[#00a59b] rounded-full p-3 mb-4">
        <Check className="h-6 w-6 text-white" />
      </div>

      <h2 className="text-xl font-semibold text-[#333333] text-center">
        Altus Suite Test Reservation Complete
      </h2>

      <div className="text-center text-[#6c6c6c] text-sm my-4 space-y-2">
        <p>A confirmation email and receipt will be sent to your inbox</p>
        <p>
          You will now be taken to the Altus Suite Homepage with information on your assessments.
        </p>
      </div>

      <div className="w-full mt-4">
        <h3 className="font-medium text-[#333333] mb-4">Purchase Summary:</h3>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 bg-[#F5F5F5] rounded-full flex items-center justify-center mt-1">
              <span className="text-xs">📅</span>
            </div>
            <div>
              <p className="text-sm">12 Oct 2025 10:30 AM - 12:30 PM</p>
              <p className="text-sm font-medium">Casper</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-5 h-5 bg-[#F5F5F5] rounded-full flex items-center justify-center mt-1">
              <span className="text-xs">📅</span>
            </div>
            <div>
              <p className="text-sm">24 Oct 2025 10:30 AM - 12:30 PM</p>
              <p className="text-sm font-medium">Duet</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#EBEBFF] p-4 rounded-lg text-center w-full my-6">
        <p className="text-sm text-gray-600">TOTAL AMOUNT</p>
        <p className="text-xl font-semibold">85.00 USD</p>
      </div>

      <p className="text-sm text-gray-600 text-center mb-6">
        If you require accommodations for your test, please visit accomodations for more information
      </p>

      <div className="border-t w-full my-4"></div>

      <Button
        className="rounded-full py-1 px-8 bg-[#364699] hover:bg-[#253170] mt-4"
        onClick={onClose}
      >
        DONE
      </Button>
    </div>
  );
};

// Update the ADMISSION_STEPS array to include all steps
const ADMISSION_STEPS: Step[] = [
  {
    id: 1,
    title: 'Program Country',
    description: 'Select the country',
    component: CountryStep,
  },
  {
    id: 2,
    title: 'Admission Cycle',
    description: 'Select the admission period for your program(s):',
    infoText:
      "If you're applying to Medicine programs (Including Osteopathic). Select the admissions cycle ending in the year of your program start date.",
    component: AdmissionCycleStep,
  },
  {
    id: 3,
    title: 'Program Type',
    description: 'Select the programs you will be distributing your Altus Suite results to',
    component: ProgramTypeStep,
  },
  {
    id: 4,
    title: 'School',
    description: 'Select the school(s) you will be distributing your Altrus Suite results to:',
    component: SchoolStep,
  },
  {
    id: 5,
    title: 'Test Date & Time',
    description: 'Select your test Date & Time',
    component: TestDateStep,
  },
  {
    id: 6,
    title: 'Payment',
    description: 'Type in your Credit Card Information',
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
  });
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);
  const [showPrepare, setShowPrepare] = useState<boolean>(false);

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
    setHideSteps(false);
  };

  const handleStepChange = (field: keyof FormData) => (value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: field === 'payment' ? JSON.parse(value) : value,
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
          return !!formData.country;
        case 2:
          return !!formData.admissionCycle;
        case 3:
          return !!formData.programType;
        case 4:
          return formData.schools.length > 0;
        case 5:
          return !!formData.testDate;
        case 6:
          return !!formData.payment;
        default:
          return false;
      }
    };

    // Handle step completion
    const handleStepComplete = () => {
      if (step.id === ADMISSION_STEPS.length) {
        // Handle final submission
        console.log('Form submitted:', formData);
        handleCloseSidebar();
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
  const handlePurchase = () => {
    setShowSuccessScreen(true);
  };

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
              {!showSuccessScreen ? (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-[#364699]">APPLY NEW</h2>
                    <Button variant="ghost" size="icon" onClick={handleCloseSidebar}>
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  {!hideSteps ? (
                    <div className="space-y-8">{ADMISSION_STEPS.map(step => renderStep(step))}</div>
                  ) : (
                    <div>
                      <PaymentStep
                        formData={formData}
                        onChange={handleStepChange('payment')}
                        currentStep={6}
                      />

                      <div className="mt-6 flex justify-between">
                        <Button
                          variant="outline"
                          className="rounded-full py-1 px-[23px] border-[#364699] text-[#364699] hover:bg-[#364699]/10"
                          onClick={() => {
                            setHideSteps(false);
                            const event = new CustomEvent('resetPaymentStep');
                            window.dispatchEvent(event);
                          }}
                        >
                          Go Back
                        </Button>
                        <Button
                          className="rounded-full py-1 px-[23px] bg-[#364699] hover:bg-[#253170]"
                          onClick={handlePurchase}
                        >
                          Purchase
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <ReservationComplete onClose={handleCloseSidebar} />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
