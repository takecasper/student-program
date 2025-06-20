'use client';

import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PurchaseSuccessScreenProps {
  onClose: () => void;
}

const PurchaseSuccessScreen: React.FC<PurchaseSuccessScreenProps> = ({ onClose }) => {
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

export default PurchaseSuccessScreen;
