'use client';

import { Button } from '@/components/ui/button';
import { Database, SendHorizonal, Scissors, X } from 'lucide-react';

interface ReservationCompleteProps {
  onClose: () => void;
  onPurchase: () => void;
  onGoBack: () => void;
}

const ReservationComplete: React.FC<ReservationCompleteProps> = ({
  onClose,
  onPurchase,
  onGoBack,
}) => {
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
            onClick={onGoBack}
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

export default ReservationComplete;
