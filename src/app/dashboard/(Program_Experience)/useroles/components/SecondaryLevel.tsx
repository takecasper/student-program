import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

import { Switch } from '@/components/ui/switch';

import ArrowRightIcon from '../../../../../../public/svgs/arrow-right.svg';
import PencilIcon from '../../../../../../public/svgs/pencil.svg';

type SettingItem = {
  label: string;
  icon: React.ReactNode;
  toggle: boolean;
  enabled: boolean;
  isEdit?: boolean;
};

type SecondaryLevelProps = {
  settingsColumns: {
    mainLevel: boolean;
    secondaryLevel: boolean;
    tertiaryLevel: boolean;
  };
  setSettingsColumns: React.Dispatch<
    React.SetStateAction<{
      mainLevel: boolean;
      secondaryLevel: boolean;
      tertiaryLevel: boolean;
    }>
  >;
};

const initialSettings: SettingItem[] = [
  { label: 'Patient', icon: null, toggle: false, enabled: false },
  { label: 'Visit', icon: null, toggle: true, enabled: false },
  { label: 'Order', icon: null, toggle: true, enabled: true },
  { label: 'Study', icon: null, toggle: true, enabled: true },
  { label: 'Image Viewer', icon: null, toggle: true, enabled: true },
  { label: 'Document Viewer', icon: null, toggle: true, enabled: true },
  { label: 'Send', icon: null, toggle: true, enabled: true },
  { label: 'Study History', icon: null, toggle: true, enabled: true, isEdit: true },
  { label: 'Worklist', icon: null, toggle: true, enabled: true },
  { label: 'Voice Recognition', icon: null, toggle: true, enabled: true, isEdit: true },
];

const SecondaryLevel = ({ settingsColumns, setSettingsColumns }: SecondaryLevelProps) => {
  const [settings, setSettings] = useState(initialSettings);

  const toggleSetting = (index: number) => {
    setSettings(prev =>
      prev.map((item, i) => (i === index ? { ...item, enabled: !item.enabled } : item)),
    );
  };

  const showThirdLevel = () => {
    setSettingsColumns(prev => ({
      ...prev,
      tertiaryLevel: true,
    }));
  };

  const isShowingTertiaryLevel =
    settingsColumns?.mainLevel && settingsColumns.secondaryLevel && settingsColumns.tertiaryLevel;

  return (
    <div className="space-y-3 p-4 w-full max-w-sm">
      {settings.map((item, index) => (
        <div
          key={index}
          className={`${isShowingTertiaryLevel && index === 0 ? 'bg-[#F5F5F5]' : 'bg-white'} flex items-center justify-between px-4 py-3 rounded-xl border border-muted shadow-sm`}
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

            {item?.isEdit ? (
              <Button className="bg-transparent hover:bg-transparent cursor-pointer w-[24px] h-[24px] !p-0 m-0 flex items-center justify-center">
                <PencilIcon className="!w-[24px] !h-[24px] object-fit" />
              </Button>
            ) : (
              <Button
                onClick={showThirdLevel}
                className={`${isShowingTertiaryLevel && index === 0 ? 'bg-[#374898]' : 'bg-transparent'} group w-[24px] h-[24px] !p-0 m-0 flex items-center justify-center cursor-pointer rounded-full border-2 border-[#D9D9D9] hover:bg-[#374898]`}
              >
                <ArrowRightIcon
                  className={`${isShowingTertiaryLevel && index === 0 ? '!fill-white' : ''} w-[16px] h-[16px] fill-[#4d4e4f] group-hover:fill-white`}
                />
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SecondaryLevel;
