'use client';

import React, { useState } from 'react';
import SnapshotForm from './SnapshotForm';
import CasperDrawer from './CasperDrawer';
import { Button } from '@/components/ui/button';

const EnrollForm = () => {
  const [currentStep, setCurrentStep] = useState<'CASPER' | 'SNAPSHOT'>('CASPER');
  const [isCasperDrawerOpen, setIsCasperDrawerOpen] = useState(true);

  const handleCasperComplete = () => {
    setIsCasperDrawerOpen(false);
    setCurrentStep('SNAPSHOT');
  };

  return (
    <div className="bg-white">
      <div className="p-4">
        <div className="flex gap-4 mb-6">
          <Button
            variant={currentStep === 'CASPER' ? 'default' : 'outline'}
            className="h-[30px] hover:bg-[#364699] cursor-pointer hover:text-white rounded-full px-6"
            onClick={() => {
              setCurrentStep('CASPER');
              setIsCasperDrawerOpen(true);
            }}
          >
            CASPER
          </Button>
          <Button
            variant={currentStep === 'SNAPSHOT' ? 'default' : 'outline'}
            className="h-[30px] hover:bg-[#364699] cursor-pointer hover:text-white rounded-full px-6"
            onClick={() => setCurrentStep('SNAPSHOT')}
          >
            SNAPSHOT
          </Button>
        </div>

        {/* Always render SnapshotForm but conditionally show CASPER drawer */}
        <SnapshotForm />
        <CasperDrawer
          open={isCasperDrawerOpen}
          onClose={() => setIsCasperDrawerOpen(false)}
          onComplete={handleCasperComplete}
        />
      </div>
    </div>
  );
};

export default EnrollForm;
