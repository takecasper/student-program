'use client';

import { Button } from '@/components/ui/button';
import { Check, DollarSign } from 'lucide-react';
import { FormData } from '../types';

interface PaymentConfirmedScreenProps {
  onClose: () => void;
  formData: FormData;
}

const PaymentConfirmedScreen: React.FC<PaymentConfirmedScreenProps> = ({ onClose, formData }) => {
  const distributionFee = 85.0;
  const schoolFee = 15.0;
  const totalAmount = distributionFee + (formData.schools?.length || 0) * schoolFee;
  const userEmail = "user's_email@example.com";

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
      <div className="bg-[#00a59b] text-white rounded-full p-4 inline-block">
        <Check className="h-10 w-10" />
      </div>

      <h2 className="text-2xl font-semibold mt-6 text-gray-800">Payment Confirmed!</h2>
      <p className="text-gray-500 mt-2 max-w-sm text-sm">
        A detailed confirmation email and receipt has been sent to your inbox at{' '}
        <span className="font-medium text-gray-700">{userEmail}</span>. You will now be taken to
        your Assessment Dashboard with information on your assessments.
      </p>

      <div className="w-full max-w-sm mt-8 text-left">
        <h3 className="text-sm font-semibold mb-4 text-gray-800">Purchase Summary:</h3>
        <div className="space-y-4">
          {formData.schools.map((school, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-500 leading-none">
                  AC
                  <br />
                  BC
                </div>
                {index < formData.schools.length - 1 && (
                  <div className="w-px flex-grow bg-gray-300"></div>
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">Casper Test and Video Interview</p>
                <p className="text-xs text-gray-500">
                  {formatDate(formData.testDate?.CASPER?.date || '')}{' '}
                  {formData.testDate?.CASPER?.time}
                </p>
                <p className="font-semibold text-gray-800 mt-1">
                  {school} {formData.programType}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full max-w-sm mt-8 p-4 bg-indigo-50 rounded-lg flex flex-col items-center">
        <div className="flex items-center gap-1 text-gray-500">
          <DollarSign className="h-3 w-3" />
          <span className="text-xs font-medium">TOTAL AMOUNT</span>
        </div>
        <p className="text-3xl font-bold text-gray-800 mt-1">${totalAmount.toFixed(2)} USD</p>
      </div>

      <p className="text-xs text-gray-400 mt-8 max-w-sm">
        If you require accommodations for your test, please visit accommodations for more
        information.
      </p>

      <div className="border-b w-full max-w-sm my-8"></div>

      <Button className="rounded-full py-2 px-12 bg-[#364699] hover:bg-[#253170]" onClick={onClose}>
        DONE
      </Button>
    </div>
  );
};

export default PaymentConfirmedScreen;
