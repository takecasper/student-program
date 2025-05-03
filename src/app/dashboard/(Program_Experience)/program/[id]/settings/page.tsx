/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Settings, LockKeyhole } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { useProgram } from '@/store/program';
import { useBreadcrumbStore } from '@/store/breadcrumbs';

export default function ProgramPage() {
  const router = useRouter();

  const program = useProgram(state => state.program);
  const setTitle = useBreadcrumbStore(state => state.setTitle);

  const handleViewContent = () => {};

  useEffect(() => {
    setTitle(`Program / ${program ? `${program.name} - ${program.year} / Settings` : ''}`);
  }, [setTitle, program]);

  return (
    <div className="p-6 px-20 flex ">
        <div className=''></div>
    </div>
  );
}
