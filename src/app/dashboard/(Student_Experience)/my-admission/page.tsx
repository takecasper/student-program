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
import Image from 'next/image';
import CasperPrepare from '@/components/addmission/Prepare';
import { FormData, Step } from './types';
import { ADMISSION_STEPS } from './constants/steps';
import { filters, tests } from './data/mockData';
import PurchaseSuccessScreen from './components/PurchaseSuccessScreen';
import ReservationComplete from './components/ReservationComplete';
import DocumentReviewScreen from './components/DocumentReviewScreen';

export default function AdmissionContent() {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [selectedProgram, setSelectedProgram] = useState<string | undefined>(undefined);
  const [showSidebar, setShowSidebar] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [hideSteps, setHideSteps] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    country: '',
    programType: '',
    schools: [],
    testDate: undefined,
    payment: undefined,
  });
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);
  const [showPrepare, setShowPrepare] = useState<boolean>(false);
  const [showFinalSuccess, setShowFinalSuccess] = useState(false);
  const [showDocumentReview, setShowDocumentReview] = useState(false);

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
    setShowDocumentReview(false);
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
      2: 'programType',
      3: 'schools',
      4: 'testDate',
      6: 'payment',
    }[step.id] as keyof FormData;

    // Custom validation for each step
    const isStepValid = () => {
      switch (step.id) {
        case 1:
          return !!formData.country && formData.country.trim() !== '';
        case 2:
          return !!formData.programType && formData.programType.trim() !== '';
        case 3:
          return formData.schools.length > 0;
        case 4:
          if (!formData.testDate) return false;
          const hasValidTest = Object.values(formData.testDate).some(
            test => test && test.date && test.time,
          );
          return hasValidTest;
        case 5:
          // Order Summary step - always valid since it's just showing summary
          return true;
        case 6:
          // Payment Type step - check if payment data exists and is valid
          if (!formData.payment) return false;

          const paymentData = formData.payment;
          if (paymentData.type === 'credit') {
            // For credit card, check if all required fields are filled
            return (
              paymentData.cardNumber?.trim() !== '' &&
              paymentData.cardholderName?.trim() !== '' &&
              paymentData.expiryDate?.trim() !== '' &&
              paymentData.cvv?.trim() !== ''
            );
          } else if (paymentData.type === 'assistance') {
            // For fee assistance, check if file is uploaded
            return !!paymentData.file;
          }
          return false;
        default:
          return false;
      }
    };

    // Handle step completion
    const handleStepComplete = () => {
      if (step.id === ADMISSION_STEPS.length) {
        // After payment step, show summary and hide steps
        if (formData.payment?.type === 'credit') {
          setShowDocumentReview(true);
        } else {
          setShowSuccessScreen(true);
        }
        setHideSteps(true);
      } else {
        setCurrentStep(prev => prev + 1);
      }
    };

    const isNotLastStep = step.id < ADMISSION_STEPS.length;
    const isCurrentStep = currentStep === step.id;
    const isCompletedStep = currentStep > step.id;

    return (
      <div key={step.id} className="relative">
        {/* Connecting line - show for all steps except the last one */}
        {isNotLastStep && (
          <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-gray-200 z-0">
            {/* Active line portion */}
            <div
              className={`w-full transition-all duration-300 ${
                isCompletedStep ? 'bg-[#00a59b] h-full' : 'bg-gray-200 h-0'
              }`}
            />
          </div>
        )}

        <div className="flex flex-col items-start relative z-10">
          <div className="flex items-start gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                isCompletedStep
                  ? 'bg-[#00a59b] text-white border-[#00a59b]'
                  : isCurrentStep
                    ? 'bg-[#00a59b] text-white border-[#00a59b]'
                    : 'bg-white text-[#6c6c6c] border-gray-200'
              }`}
            >
              {isCompletedStep ? <Check className="h-5 w-5" /> : <span>{step.id}</span>}
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

          {/* Only show form content for current step */}
          {isCurrentStep && (
            <>
              <div className={`pt-4 ${isCurrentStep ? 'border-[#00a59b]' : 'border-[#d9d9d9]'}`}>
                <StepComponent
                  formData={formData}
                  onChange={fieldKey ? handleStepChange(fieldKey) : () => {}}
                  currentStep={currentStep}
                />
              </div>

              {/* Show Next button for current step */}
              <div className="mt-6 mb-8">
                <Button
                  className="rounded-full py-1 px-[23px] bg-[#364699] hover:bg-[#253170] disabled:opacity-50"
                  onClick={handleStepComplete}
                  disabled={!isStepValid()}
                >
                  {step.id === 5 ? 'Checkout' : 'Next'}
                </Button>
              </div>
            </>
          )}

          {/* Show completed step summary */}
          {isCompletedStep && (
            <div className="pt-2 pb-4">
              <div className="text-xs text-[#00a59b] bg-[#00a59b]/5 p-2 rounded">✓ Completed</div>
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

  const handleGoBackToPayment = () => {
    setShowSuccessScreen(false);
    setHideSteps(false);
    setCurrentStep(5); // Go back to payment step
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
        <div className="absolute top-0 right-0 bottom-0 z-40 flex justify-end">
          <div className="bg-white w-[500px] h-[750px] overflow-y-auto shadow-lg border-l border-[#f5f5f5] animate-in slide-in-from-right">
            <div className="p-6">
              {showFinalSuccess ? (
                <PurchaseSuccessScreen onClose={handleCloseSidebar} />
              ) : showDocumentReview ? (
                <DocumentReviewScreen onClose={handleCloseSidebar} formData={formData} />
              ) : showSuccessScreen ? (
                <ReservationComplete
                  onClose={handleCloseSidebar}
                  onPurchase={() => setShowFinalSuccess(true)}
                  onGoBack={handleGoBackToPayment}
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

                      <div className="space-y-6 pr-10">
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
