import { useState } from 'react';
import { Check } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

const steps = [
  { label: 'Date', placeholder: 'Select Date' },
  { label: 'Supervisor', placeholder: 'Type in the full name of your supervisor' },
  { label: 'Gender & Age', placeholder: 'Type in your age and gender' },
  { label: 'Info', placeholder: 'Type in your diagnosis' },
  { label: 'Student Participation Level', placeholder: 'Type in your diagnosis' },
  { label: 'Additional Comments', placeholder: 'Type in your diagnosis' },
];

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const days = Array.from({ length: 31 }, (_, i) => i + 1);
const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

export default function AddNewForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    date: { month: '', day: '', year: '' },
    supervisor: '',
    gender: '',
    age: '',
    info: '',
    participation: '',
    comments: '',
    sendLog: false,
  });

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderStepInput = (index: number) => {
    const isCurrent = index === currentStep;
    const isDone = index < currentStep;

    if (!isCurrent && !isDone) return null;

    switch (index) {
      case 0:
        return (
          <div className="flex gap-2">
            <select
              className="h-[50px] text-[#33333399] border border-[#D9D9D9] rounded-[10px] cursor-pointer px-2 py-1"
              value={formData.date.month}
              onChange={e =>
                setFormData({
                  ...formData,
                  date: { ...formData.date, month: e.target.value },
                })
              }
              disabled={!isCurrent}
            >
              <option value="">Month</option>
              {months.map(m => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <select
              className="h-[50px] text-[#33333399] border border-[#D9D9D9] rounded-[10px] cursor-pointer px-2 py-1"
              value={formData.date.day}
              onChange={e =>
                setFormData({
                  ...formData,
                  date: { ...formData.date, day: e.target.value },
                })
              }
              disabled={!isCurrent}
            >
              <option value="">Day</option>
              {days.map(d => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <select
              className="h-[50px] text-[#33333399] border border-[#D9D9D9] rounded-[10px] cursor-pointer px-2 py-1"
              value={formData.date.year}
              onChange={e =>
                setFormData({
                  ...formData,
                  date: { ...formData.date, year: e.target.value },
                })
              }
              disabled={!isCurrent}
            >
              <option value="">Year</option>
              {years.map(y => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        );
      case 1:
        return (
          <Input
            type="text"
            disabled={!isCurrent}
            value={formData.supervisor}
            placeholder="Type in a name"
            onChange={e => updateField('supervisor', e.target.value)}
            className="h-[50px] w-full md:w-full lg:w-[20rem] text-[#33333399] border border-[#D9D9D9] rounded-[10px] px-3 py-2"
          />
        );
      case 2:
        return (
          <div className="flex flex-col gap-2">
            <div>
              <span className="text-[12px] text-[#333333DE]">Sex</span>

              <div className="flex gap-4">
                {['Male', 'Female', 'Others'].map(gender => (
                  <label
                    key={gender}
                    className="text-[12px] text-[#333333DE] flex items-center gap-1"
                  >
                    <input
                      type="radio"
                      value={gender}
                      disabled={!isCurrent}
                      className="cursor-pointer"
                      checked={formData.gender === gender}
                      onChange={e => updateField('gender', e.target.value)}
                    />
                    {gender}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <span className="text-[12px] text-[#333333DE]">Patient Age</span>

              <Input
                type="number"
                value={formData.age}
                disabled={!isCurrent}
                placeholder="Type in age"
                onChange={e => updateField('age', e.target.value)}
                className="h-[50px] w-full md:w-full lg:w-[20rem] text-[#33333399] border border-[#D9D9D9] rounded-[10px] px-3 py-2"
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col gap-1">
            <span className="text-[12px] text-[#333333DE]">Setting</span>

            <select
              value={formData.info}
              disabled={!isCurrent}
              className="h-[50px] w-full md:w-full lg:w-[20rem] text-[#33333399] border border-[#D9D9D9] rounded-[10px] cursor-pointer px-2 py-1"
              onChange={e =>
                setFormData({
                  ...formData,
                  info: e.target.value,
                })
              }
            >
              <option value="">-----</option>
            </select>
          </div>
        );
      case 4:
        return (
          <div className="flex flex-col gap-1">
            <span className="text-[12px] text-[#333333DE]">Type in your diagnosis</span>

            <select
              value={formData.participation}
              disabled={!isCurrent}
              className="h-[50px] w-full md:w-full lg:w-[20rem] text-[#33333399] border border-[#D9D9D9] rounded-[10px] cursor-pointer px-2 py-1"
              onChange={e =>
                setFormData({
                  ...formData,
                  participation: e.target.value,
                })
              }
            >
              <option value="">-----</option>
            </select>
          </div>
        );
      case 5:
        return (
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <span className="text-[12px] text-[#333333DE]">Type in your comments</span>

              <Textarea
                rows={5}
                disabled={!isCurrent}
                value={formData.comments}
                placeholder="Type in a comment"
                onChange={e => updateField('comments', e.target.value)}
                className="h-[50px] w-full md:w-full lg:w-[20rem] text-[#33333399] border border-[#D9D9D9] rounded-[10px] px-3 py-2"
              />
            </div>

            <div className="flex gap-3 mt-3 items-start">
              <Checkbox
                checked={formData.sendLog}
                className="cursor-pointer"
                onCheckedChange={checked => setFormData(prev => ({ ...prev, sendLog: !!checked }))}
              />

              <div>
                <p className="text-sm font-medium text-[#333333DE]">
                  Send Feedback Log for this Entry
                </p>
                <span className="text-xs text-[#33333399]">
                  Please check off the “Send Feedback Log for this entry” if you have completed a
                  thorough log entry for review from your supervising faculty member.
                </span>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="relative p-4 flex flex-col justify-between items-center max-w-md mx-auto h-[calc(100%_-_64px)]">
      <div className="relative">
        {steps.map((step, index) => {
          const isCurrent = index === currentStep;
          const isDone = index < currentStep;

          return (
            <div
              key={index}
              className="pb-5 mb-1 overflow-hidden w-full flex items-start gap-3 relative"
            >
              {/* Persistent vertical line, adjusted to run through all steps */}
              {index < steps.length - 1 && (
                <div
                  className={`absolute left-[9px] border-t-3 border-white top-[24px] h-full w-[6px] z-0 transition-colors duration-200 ${
                    index < currentStep ? 'bg-[#70C0B8]' : 'bg-[#F5F5F5]'
                  }`}
                />
              )}

              <div
                className={`text-[#70C0B8] text-[12px] relative z-10 !w-[24px] min-w-[24px] !h-[24px] rounded-full flex items-center justify-center text-sm font-bold border transition-colors duration-200 ${
                  index === currentStep
                    ? 'bg-[#F5F5F5] text-[#70C0B8] border-[#F5F5F5]'
                    : index < currentStep
                      ? 'bg-[#70C0B8] text-white border-[#70C0B8]'
                      : 'bg-[#F5F5F5] text-[#70C0B8] border-[#F5F5F5]'
                }`}
              >
                {index < currentStep ? <Check className="w-3 h-3 text-white" /> : index + 1}
              </div>

              <div className="pl-2">
                <p className="font-medium">
                  Step {index + 1}: {step.label}
                </p>
                {!isCurrent && !isDone && (
                  <p className="text-sm text-muted-foreground">{step.placeholder}</p>
                )}

                <div className="mt-2">{renderStepInput(index)}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div
        className={`${currentStep >= 3 ? 'pb-5' : ''} w-full flex justify-between pt-4 border-top border-top-[#D9D9D9]`}
      >
        <Button
          className="bg-[#fff] hover:bg-[#fff] border-[#364699] rounded-[20px] w-[93px] h-[40px] cursor-pointer"
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 0}
        >
          Cancel
        </Button>

        <div className="flex gap-2">
          <Button
            className="bg-[#fff] hover:bg-[#fff] border-[#364699] rounded-[20px] w-[93px] h-[40px] cursor-pointer"
            variant="outline"
          >
            Save
          </Button>
          <Button
            className="bg-[#364799] hover:bg-[#364799] border-[#D9D9D9] rounded-[20px] w-[93px] h-[40px] cursor-pointer"
            onClick={handleNext}
            disabled={currentStep === steps.length - 1}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
