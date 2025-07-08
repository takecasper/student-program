export interface Step {
  id: number;
  title: string;
  description: string;
  infoText?: string;
  component: React.FC<StepProps>;
}

export interface StepProps {
  formData: FormData;
  onChange: (value: string) => void;
  currentStep: number;
}

export interface FormData {
  country: string;
  programType: string;
  schools: string[];
  testDate?: {
    CASPER?: { date: string; time: string };
    VIDEO_INTERVIEW?: { date: string; time: string };
    SNAPSHOT?: { date: string; time: string };
  };
  payment?: PaymentFormData;
}

export interface PaymentFormData {
  type?: 'credit' | 'assistance';
  cardNumber?: string;
  cardholderName?: string;
  expiryDate?: string;
  cvv?: string;
  saveCard?: boolean;
  file?: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface DaySlot {
  day: string;
  date: number;
  slots: number;
}

export interface ProgramOptionProps {
  id: string;
  label: string;
  selected: boolean;
  onSelect: (value: string) => void;
}
