'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import AddRole from './components/AddRole';
import ViewList from './components/ViewList';

import { useBreadcrumbStore } from '@/store/breadcrumbs';

export default function UserRolePage() {
  const setTitle = useBreadcrumbStore(state => state.setTitle);

  const [screenView, setScreenView] = useState(0);

  useEffect(() => {
    if (setTitle) setTitle('User & Roles');
  }, [setTitle]);

  return (
    <div className="w-full relative h-full">
      <div className='relative z-10'>
        {screenView === 0 && <ViewList setScreenView={setScreenView} />}
        {screenView === 1 && <AddRole setScreenView={setScreenView} />}
      </div>

      <Image
        width={383}
        height={327}
        alt="calendar"
        src={'/images/calendar-background.png'}
        className="absolute bottom-10 right-10 z-1"
      />
    </div>
  );
}
