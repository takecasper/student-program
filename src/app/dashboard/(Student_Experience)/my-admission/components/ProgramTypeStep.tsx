'use client';

import { Check } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { StepProps, ProgramOptionProps } from '../types';

const ProgramOption: React.FC<ProgramOptionProps> = ({ id, label, selected, onSelect }) => {
  const handleClick = () => {
    // If already selected, deselect it, otherwise select it
    onSelect(selected ? '' : id);
  };

  return (
    <div
      className={`border rounded-md p-3 cursor-pointer hover:border-[#00a59b] transition-colors ${
        selected ? 'border-[#00a59b] bg-[#00a59b]/5' : 'border-[#d9d9d9]'
      }`}
      onClick={handleClick}
    >
      <div className="flex items-center space-x-2">
        <div
          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
            selected ? 'border-[#00a59b] bg-[#00a59b]' : 'border-gray-300'
          }`}
        >
          {selected && <Check className="h-3 w-3 text-white" />}
        </div>
        <Label className="cursor-pointer select-none">{label}</Label>
      </div>
    </div>
  );
};

const ProgramTypeStep: React.FC<StepProps> = ({ formData, onChange }) => {
  const handleProgramChange = (value: string) => {
    // If the same value is clicked again, deselect it
    if (formData.programType === value) {
      onChange('');
    } else {
      onChange(value);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium text-[#333333] mb-3">GRADUATE MEDICAL EDUCATION</h4>
        <div className="grid grid-cols-2 gap-3">
          {[
            { id: 'medicine', label: 'Medicine' },
            { id: 'law', label: 'Law' },
            { id: 'health-science', label: 'Health Science' },
            { id: 'engineering', label: 'Engineering' },
          ].map(program => (
            <ProgramOption
              key={program.id}
              id={program.id}
              label={program.label}
              selected={formData.programType === program.id}
              onSelect={handleProgramChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgramTypeStep;
