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

const CountryStep: React.FC<StepProps> = ({ formData, onChange }) => (
  <div className="space-y-4 pr-30">
    <Select value={formData.country} onValueChange={onChange}>
      <SelectTrigger className="w-full bg-white border-gray-200 focus:ring-2 focus:ring-[#00a59b] focus:border-transparent">
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

export default CountryStep;
