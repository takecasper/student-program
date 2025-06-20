import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Check } from 'lucide-react';

interface CasperDrawerProps {
  open: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const CasperDrawer = ({ open, onClose, onComplete }: CasperDrawerProps) => {
  const [formData, setFormData] = useState({
    programName: '',
    programDescription: '',
    programType: 'casper',
  });

  const handleSubmit = () => {
    // Handle form submission
    onComplete();
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-[700px] sm:w-[700px]">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-left">PROGRAM CONFIGURATION</SheetTitle>
        </SheetHeader>

        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#70C0B8] text-white">
              1
            </div>
            <h3 className="text-lg font-semibold">Step 1: Program Setup</h3>
          </div>

          <p className="text-sm text-gray-500 mb-6">
            Configure the basic settings for your program
          </p>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="programName">PROGRAM NAME</Label>
              <Input
                id="programName"
                value={formData.programName}
                onChange={e => setFormData({ ...formData, programName: e.target.value })}
                placeholder="CASPER Cycle 1 - Spring Cohort"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="programDescription">PROGRAM DESCRIPTION</Label>
              <Input
                id="programDescription"
                value={formData.programDescription}
                onChange={e => setFormData({ ...formData, programDescription: e.target.value })}
                placeholder="Standard admission process for 2025 entry"
              />
            </div>

            <div className="space-y-2">
              <Label>PROGRAM TYPE</Label>
              <RadioGroup
                value={formData.programType}
                onValueChange={value => setFormData({ ...formData, programType: value })}
                className="flex gap-4"
              >
                <div
                  className={`flex items-center space-x-2 border rounded-md p-3 cursor-pointer relative ${formData.programType === 'casper' ? 'border-[#70C0B8] bg-[#70C0B8] bg-opacity-10' : ''}`}
                >
                  <RadioGroupItem value="casper" id="casper" className="hidden" />
                  <Label htmlFor="casper" className="cursor-pointer">
                    Casper
                  </Label>
                  {formData.programType === 'casper' && (
                    <Check className="w-4 h-4 text-[#70C0B8] absolute right-3" />
                  )}
                </div>
                <div
                  className={`flex items-center space-x-2 border rounded-md p-3 cursor-pointer relative ${formData.programType === 'interview' ? 'border-[#70C0B8] bg-[#70C0B8] bg-opacity-10' : ''}`}
                >
                  <RadioGroupItem value="interview" id="interview" className="hidden" />
                  <Label htmlFor="interview" className="cursor-pointer">
                    Interview
                  </Label>
                  {formData.programType === 'interview' && (
                    <Check className="w-4 h-4 text-[#70C0B8] absolute right-3" />
                  )}
                </div>
                <div
                  className={`flex items-center space-x-2 border rounded-md p-3 cursor-pointer relative ${formData.programType === 'formative' ? 'border-[#70C0B8] bg-[#70C0B8] bg-opacity-10' : ''}`}
                >
                  <RadioGroupItem value="formative" id="formative" className="hidden" />
                  <Label htmlFor="formative" className="cursor-pointer">
                    Formative
                  </Label>
                  {formData.programType === 'formative' && (
                    <Check className="w-4 h-4 text-[#70C0B8] absolute right-3" />
                  )}
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Button onClick={handleSubmit}>Next</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CasperDrawer;
