import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

import { Switch } from '@/components/ui/switch';

import PencilIcon from '../../../../../../public/svgs/pencil.svg';

type SettingItem = {
  label: string;
  icon: React.ReactNode;
  toggle: boolean;
  enabled: boolean;
  isEdit?: boolean;
};

const initialSettings: SettingItem[] = [
  { label: 'Address', icon: null, toggle: false, enabled: false, isEdit: true },
  { label: 'Emergency Contact', icon: null, toggle: true, enabled: false, isEdit: true },
  { label: 'Activity', icon: null, toggle: true, enabled: true, isEdit: true },
  { label: 'Link & Merge Patient', icon: null, toggle: true, enabled: true, isEdit: true },
  { label: 'Guarantor', icon: null, toggle: true, enabled: true, isEdit: true },
  { label: 'Coverage', icon: null, toggle: true, enabled: true, isEdit: true },
  { label: 'Alerts', icon: null, toggle: true, enabled: true, isEdit: true },
  { label: 'Allergy', icon: null, toggle: true, enabled: true, isEdit: true },
  { label: 'Patient Notes', icon: null, toggle: true, enabled: true, isEdit: true },
];

const TertiaryLevel = () => {
  const [tertiarySettings, setTertiarySettings] = useState(initialSettings);

  const toggleSetting = (index: number) => {
    setTertiarySettings(prev =>
      prev.map((item, i) => (i === index ? { ...item, enabled: !item.enabled } : item)),
    );
  };

  return (
    <>
      <div className="w-full flex flex-wrap p-4 gap-3 justify-between">
        {tertiarySettings.map((item, index) => (
          <div
            key={index}
            className="flex w-[calc(50%-0.625rem)] items-center justify-between px-4 py-3 rounded-xl border border-muted shadow-sm bg-white"
          >
            <div className="flex items-center space-x-3">
              {item.icon !== null && <div className="text-muted-foreground">{item.icon}</div>}

              <span className="text-sm font-medium">{item.label}</span>
            </div>

            <div className="flex items-center space-x-3">
              {item.toggle && (
                <Switch
                  checked={item.enabled}
                  onCheckedChange={() => toggleSetting(index)}
                  className="cursor-pointer bg-[#f5f5f5] data-[state=checked]:bg-[#364699] text-[#d9d9d9] border-[#d9d9d9] border"
                />
              )}

              <div className="w-[1px] h-[24px] bg-[#d3d3d3]"></div>

              <Button className="bg-transparent hover:bg-transparent cursor-pointer w-[24px] h-[24px] !p-0 m-0 flex items-center justify-center">
                <PencilIcon className="!w-[24px] !h-[24px] object-fit" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TertiaryLevel;
