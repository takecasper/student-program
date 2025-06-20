'use client';

import { StepProps } from '../types';
import { ChevronDown } from 'lucide-react';

const PaymentStep: React.FC<StepProps> = ({ formData }) => {
  // Calculate total amount
  const distributionFee = 85.0;
  const schoolFee = 15.0;
  const totalAmount = distributionFee + (formData.schools?.length || 0) * schoolFee;

  return (
    <div className="space-y-6">
      {/* Program Details */}
      <div className="space-y-3">
        <div className="flex gap-2">
          <h4 className="text-sm font-medium text-gray-600">Program Type:</h4>
          <p className="text-sm">{formData.programType || 'Medicine'}</p>
        </div>

        <div className="flex gap-2">
          <h4 className="text-sm font-medium text-gray-600">Test Type:</h4>
          <p className="text-sm">Casper and Video Interview</p>
        </div>

        <div className="flex gap-2">
          <h4 className="text-sm font-medium text-gray-600">Test Date & Time:</h4>
          <p className="text-sm">
            {formData.testDate?.CASPER
              ? `${formData.testDate.CASPER.date} at ${formData.testDate.CASPER.time}`
              : 'Not selected'}
          </p>
        </div>
      </div>

      {/* Fee Breakdown */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left text-xs font-medium text-gray-500 uppercase py-2">
                Fee Breakdown
              </th>
              <th className="text-right text-xs font-medium text-gray-500 uppercase py-2">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="py-3 text-sm">Distribution Fee</td>
              <td className="py-3 text-sm text-right">${distributionFee.toFixed(2)} USD</td>
            </tr>
            <tr>
              <td className="py-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">All Schools Applied</span>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </div>
              </td>
              <td className="py-3 text-right">
                {formData.schools?.map((school, index) => (
                  <div key={index} className="text-sm">
                    ${schoolFee.toFixed(2)} USD
                  </div>
                ))}
              </td>
            </tr>
            <tr className="font-medium">
              <td className="py-3 text-sm">TOTAL</td>
              <td className="py-3 text-sm text-right">${totalAmount.toFixed(2)} USD</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentStep;
