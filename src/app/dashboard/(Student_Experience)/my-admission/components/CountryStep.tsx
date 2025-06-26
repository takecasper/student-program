'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { countries } from '@/lib/countries';
import Flag from 'react-world-flags';
import { StepProps } from '../types';
import { Check } from 'lucide-react';

const CountryStep: React.FC<StepProps> = ({ formData, onChange }) => (
  <div className="space-y-4 pr-30">
    <Select value={formData.country} onValueChange={onChange}>
      <SelectTrigger className="w-full bg-white border-gray-200 ">
        <SelectValue placeholder="Select a country" />
      </SelectTrigger>
      <SelectContent>
        {countries.map(country => (
          <SelectItem key={country.code} value={country.code}>
            <div className="flex items-center gap-2">
              <div className="w-6 h-4 flex items-center overflow-hidden">
                <Flag
                  code={country.code}
                  height={16}
                  width={24}
                  className="object-cover rounded-[2px]"
                  fallback={<span className="text-gray-400">🏳️</span>}
                />
              </div>
              <span>{country.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

const CountrySummary: React.FC<{ countryCode: string }> = ({ countryCode }) => {
  const country = countries.find(c => c.code === countryCode);
  if (!country) return null;
  return (
    <div className="w-full bg-white border rounded-[12px] flex items-center px-4 py-3 gap-3">
      <div className="w-8 h-6 flex items-center overflow-hidden">
        <Flag
          code={country.code}
          height={24}
          width={32}
          className="object-cover rounded-[2px]"
          fallback={<span className="text-gray-400">🏳️</span>}
        />
      </div>
      <span className="text-base font-medium text-[#333]">{country.name}</span>
      <div className="ml-auto flex items-center justify-center w-7 h-7 rounded-full bg-[#00a59b]">
        <Check className="h-4 w-4 text-white" />
      </div>
    </div>
  );
};

export default CountryStep;
export { CountrySummary };
