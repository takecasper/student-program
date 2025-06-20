import { Step } from '../types';
import CountryStep from '../components/CountryStep';
import ProgramTypeStep from '../components/ProgramTypeStep';
import SchoolStep from '../components/SchoolStep';
import TestDateStep from '../components/TestDateStep';
import PaymentStep from '../components/PaymentStep';
import PaymentTypeStep from '../components/PaymentTypeStep';

export const ADMISSION_STEPS: Step[] = [
  {
    id: 1,
    title: 'Program Country',
    description: 'Select Country of Program',
    component: CountryStep,
  },
  {
    id: 2,
    title: 'Program Type',
    description: 'Select the program you are applying to.',
    component: ProgramTypeStep,
  },
  {
    id: 3,
    title: 'Schools',
    description: 'Select the school you are applying to.',
    component: SchoolStep,
  },
  {
    id: 4,
    title: 'Test Type and Schedule',
    description: 'Identify the specific test type',
    component: TestDateStep,
  },
  {
    id: 5,
    title: 'Order Summary',
    description: 'Review your order details before proceeding to payment',
    component: PaymentStep,
  },
  {
    id: 6,
    title: 'Payment Type',
    description: 'Complete your application by securely submitting your payment',
    component: PaymentTypeStep,
  },
];
