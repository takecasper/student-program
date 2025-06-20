'use client';

import { useState } from 'react';
import { StepProps } from '../types';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

const PaymentTypeStep: React.FC<StepProps> = ({ onChange }) => {
  const [paymentType, setPaymentType] = useState<'credit' | 'assistance'>('credit');
  const [cardDetails, setCardDetails] = useState({
    cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    saveCard: false,
  });
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleCardDetailsChange = (field: string, value: string | boolean) => {
    const newDetails = { ...cardDetails, [field]: value };
    setCardDetails(newDetails);
    onChange(JSON.stringify({ ...newDetails, type: paymentType }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      onChange(JSON.stringify({ type: paymentType, file: file.name }));
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      setUploadedFile(file);
      onChange(JSON.stringify({ type: paymentType, file: file.name }));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs text-gray-500 mb-4">
          Complete your application by securely submitting your payment
        </p>

        <div className="flex gap-4 mb-6">
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
              paymentType === 'credit' ? 'border-[#00a59b] bg-[#00a59b]/5' : 'border-gray-200'
            }`}
            onClick={() => {
              setPaymentType('credit');
              onChange(JSON.stringify({ ...cardDetails, type: 'credit' }));
            }}
          >
            <div className="w-4 h-4 rounded-full border flex items-center justify-center">
              {paymentType === 'credit' && <div className="w-2 h-2 rounded-full bg-[#00a59b]" />}
            </div>
            <span className="text-sm">Credit Card</span>
          </button>

          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
              paymentType === 'assistance' ? 'border-[#00a59b] bg-[#00a59b]/5' : 'border-gray-200'
            }`}
            onClick={() => {
              setPaymentType('assistance');
              onChange(JSON.stringify({ type: 'assistance' }));
            }}
          >
            <div className="w-4 h-4 rounded-full border flex items-center justify-center">
              {paymentType === 'assistance' && (
                <div className="w-2 h-2 rounded-full bg-[#00a59b]" />
              )}
            </div>
            <span className="text-sm">Fee Assistance</span>
          </button>
        </div>

        {paymentType === 'credit' && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="cardName">Name on Card</Label>
              <input
                id="cardName"
                type="text"
                value={cardDetails.cardholderName}
                onChange={e => handleCardDetailsChange('cardholderName', e.target.value)}
                placeholder="Isabella Ding"
                className="w-full p-2 border border-gray-200 rounded-lg mt-1"
              />
            </div>

            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <div className="relative">
                <input
                  id="cardNumber"
                  type="text"
                  value={cardDetails.cardNumber}
                  onChange={e => handleCardDetailsChange('cardNumber', e.target.value)}
                  placeholder="4747 4747 4747 4747"
                  className="w-full p-2 border border-gray-200 rounded-lg mt-1 pr-10"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <img src="/mastercard.svg" alt="Mastercard" className="w-6 h-6" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiry">Expiry Date</Label>
                <input
                  id="expiry"
                  type="text"
                  value={cardDetails.expiryDate}
                  onChange={e => handleCardDetailsChange('expiryDate', e.target.value)}
                  placeholder="10/24"
                  className="w-full p-2 border border-gray-200 rounded-lg mt-1"
                />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <input
                  id="cvv"
                  type="text"
                  value={cardDetails.cvv}
                  onChange={e => handleCardDetailsChange('cvv', e.target.value)}
                  placeholder="934"
                  className="w-full p-2 border border-gray-200 rounded-lg mt-1"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="saveCard"
                checked={cardDetails.saveCard}
                onChange={e => handleCardDetailsChange('saveCard', e.target.checked)}
                className="rounded border-gray-300"
              />
              <Label htmlFor="saveCard" className="text-sm text-gray-600">
                Save card for future use
              </Label>
            </div>
          </div>
        )}

        {paymentType === 'assistance' && (
          <div className="space-y-4">
            <div className="bg-[#EC7A000D] p-3 rounded-[10px]">
              <p className="text-sm">
                You have chosen to apply for fee assistance. Please upload the required
                documentation below, and remember to wait for the review process to complete before
                expecting a response.
              </p>
            </div>
            {/* File Upload Area */}
            <div
              className="border-2 border-dashed border-[#6366f1] rounded-lg p-8 text-center cursor-pointer"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => document.getElementById('fileInput')?.click()}
            >
              <input
                type="file"
                id="fileInput"
                className="hidden"
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx"
              />
              <div className="flex flex-col items-center gap-2">
                <Upload className="w-6 h-6 text-[#6366f1]" />
                <p className="text-sm text-[#6366f1]">Drag your file(s) to start uploading</p>
              </div>
            </div>

            {/* Uploaded File Display */}
            {uploadedFile && (
              <div className="flex items-center justify-between p-3 bg-white border rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="text-sm">{uploadedFile.name}</div>
                  <div className="text-xs text-gray-500">Checked by AI</div>
                </div>
                <button
                  onClick={() => {
                    setUploadedFile(null);
                    onChange(JSON.stringify({ type: paymentType }));
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            )}

            <Button
              className="w-full bg-[#364699] hover:bg-[#253170] text-white rounded-full py-2 mt-4"
              disabled={!uploadedFile}
            >
              Submit
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentTypeStep;
