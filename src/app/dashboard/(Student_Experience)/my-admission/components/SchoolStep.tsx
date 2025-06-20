'use client';

import { Check } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { StepProps } from '../types';
import { Input } from '@/components/ui/input';

const SchoolStep: React.FC<StepProps> = ({ formData, onChange }) => {
  const handleSchoolChange = (schoolId: string) => {
    let newSchools = [...formData.schools];

    if (schoolId === 'all') {
      // Toggle all schools
      const allSchoolIds = ['sam-houston', 'san-juan'];
      if (formData.schools.length === allSchoolIds.length) {
        newSchools = []; // Deselect all
      } else {
        newSchools = allSchoolIds; // Select all
      }
    } else {
      // Toggle individual school
      if (newSchools.includes(schoolId)) {
        newSchools = newSchools.filter(id => id !== schoolId);
      } else {
        newSchools.push(schoolId);
      }
    }

    onChange(JSON.stringify(newSchools));
  };

  const allSchoolIds = ['sam-houston', 'san-juan'];
  const isAllSelected = allSchoolIds.every(id => formData.schools.includes(id));

  return (
    <div className="space-y-4 pr-30">
      <div className="">
        <Input placeholder="Search" className="bg-white rounded-full shadow-none" />
      </div>

      <div className="space-y-3">
        {[
          {
            id: 'u-of-t-medicine',
            name: 'U of T Medicine',
            selected: formData.schools.includes('u-of-t-medicine'),
          },
          {
            id: 'mc-master-medicine',
            name: 'McMaster Medicine',
            selected: formData.schools.includes('mc-master-medicine'),
          },
          {
            id: 'queens-medicine',
            name: 'Queen’s Medicine ',
            selected: formData.schools.includes('queens-medicine'),
          },
          {
            id: 'ottawa-medicine',
            name: 'Ottawa Medicine',
            selected: formData.schools.includes('ottawa-medicine'),
          },
          { id: 'all', name: 'Select All Schools', selected: isAllSelected },
        ].map(school => (
          <div
            key={school.id}
            className={`border rounded-[12px] p-3 cursor-pointer hover:border-[#00a59b] transition-colors ${
              school.selected ? 'border-[#00a59b] bg-[#00a59b]/5' : 'border-[#d9d9d9]'
            }`}
            onClick={() => handleSchoolChange(school.id)}
          >
            <div className="flex items-center space-x-2">
              <div
                className={`w-4 h-4 rounded-[12px] border-2 flex items-center justify-center ${
                  school.selected ? 'border-[#00a59b] bg-[#00a59b]' : 'border-gray-300'
                }`}
              >
                {school.selected && <Check className="h-3 w-3 text-white" />}
              </div>
              <Label className="cursor-pointer select-none">{school.name}</Label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SchoolStep;
