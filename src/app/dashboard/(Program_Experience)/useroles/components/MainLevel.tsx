import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Clock,
  Users,
  Store,
  Music2,
  Search,
  Workflow,
  CalendarDays,
  GraduationCap,
  LayoutDashboard,
} from 'lucide-react';

import { Switch } from '@/components/ui/switch';

import ArrowRightIcon from '../../../../../../public/svgs/arrow-right.svg';

type SettingItem = {
  label: string;
  icon: React.ReactNode;
  toggle: boolean;
  enabled: boolean;
};

type MainLevelProps = {
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
  { label: 'Dashboard', icon: <LayoutDashboard size={20} />, toggle: false, enabled: false },
  { label: 'Program', icon: <Music2 size={20} />, toggle: true, enabled: false },
  { label: 'Calendar', icon: <CalendarDays size={20} />, toggle: true, enabled: true },
  { label: 'Logs', icon: <Clock size={20} />, toggle: true, enabled: true },
  { label: "User's & Roles", icon: <Users size={20} />, toggle: true, enabled: true },
  { label: 'Workflow', icon: <Workflow size={20} />, toggle: true, enabled: true },
  { label: 'Search', icon: <Search size={20} />, toggle: true, enabled: true },
  { label: 'Admissions', icon: <GraduationCap size={20} />, toggle: true, enabled: true },
  { label: 'Marketplace', icon: <Store size={20} />, toggle: true, enabled: true },
];

const MainLevel = ({ settingsColumns, setSettingsColumns }: MainLevelProps) => {
  const [settings, setSettings] = useState(initialSettings);

  const toggleSetting = (index: number) => {
    setSettings(prev =>
      prev.map((item, i) => (i === index ? { ...item, enabled: !item.enabled } : item)),
    );
  };

  const showSecondLevel = () => {
    setSettingsColumns(prev => ({
      ...prev,
      mainLevel: true,
      secondaryLevel: true,
    }));
  }

  const isShowingSecondLevel = settingsColumns?.mainLevel && settingsColumns.secondaryLevel;

  return (
    <div className="space-y-3 p-4 w-full max-w-sm">
      {settings.map((item, index) => (
        <div
          key={index}
          className={`${isShowingSecondLevel && index === 0 ? 'bg-[#F5F5F5]' : 'bg-white'} flex items-center justify-between px-4 py-3 rounded-xl border border-muted shadow-sm`}
        >
          <div className="flex items-center space-x-3">
            <div className="text-muted-foreground">{item.icon}</div>
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

            <Button
              onClick={showSecondLevel}
              className={`${isShowingSecondLevel && index === 0 ? 'bg-[#374898]' : 'bg-transparent'} group w-[24px] h-[24px] !p-0 m-0 flex items-center justify-center cursor-pointer rounded-full border-2 border-[#D9D9D9] hover:bg-[#374898]`}
            >
              <ArrowRightIcon
                className={`${isShowingSecondLevel && index === 0 ? '!fill-white' : ''} w-[16px] h-[16px] fill-[#4d4e4f] group-hover:fill-white`}
              />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MainLevel;
