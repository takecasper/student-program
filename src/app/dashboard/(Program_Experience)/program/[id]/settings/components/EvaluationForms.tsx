/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from 'next/image';
import React, { useState } from 'react';

import EvaluationCard from './EvalualtionCard';

import { Button } from '@/components/ui/button';
import AddEvaluationForm from './AddEvaluationForm';

import { EvaluationData } from '../types';

const initialTableData: EvaluationData[] = [
  {
    id: 1,
    completion: '15/30',
    formName: 'Form Name',
    date: 'Mar 26, 2025',
    totalUsers: 12,
    users: [
      {
        id: '1',
        username: 'Medicine',
        role: 'Learner',
        status: 'Active',
        image: '/images/avatar.png',
      },
      {
        id: '2',
        username: 'Medicine',
        role: 'Learner',
        status: 'Active',
        image: '/images/avatar.png',
      },
      {
        id: '3',
        username: 'Medicine',
        role: 'Learner',
        status: 'Active',
        image: '/images/avatar.png',
      },
    ],
    courseName: 'Course Name',
  },
  {
    id: 2,
    completion: '15/30',
    formName: 'Form Name',
    date: 'Mar 26, 2025',
    totalUsers: 12,
    users: [
      {
        id: '1',
        username: 'Medicine',
        role: 'Learner',
        status: 'Active',
        image: '/images/avatar.png',
      },
      {
        id: '2',
        username: 'Medicine',
        role: 'Learner',
        status: 'Active',
        image: '/images/avatar.png',
      },
      {
        id: '3',
        username: 'Medicine',
        role: 'Learner',
        status: 'Active',
        image: '/images/avatar.png',
      },
    ],
    courseName: 'Course Name',
  },
  {
    id: 3,
    completion: '15/30',
    formName: 'Form Name',
    date: 'Mar 26, 2025',
    totalUsers: 12,
    users: [
      {
        id: '1',
        username: 'Medicine',
        role: 'Learner',
        status: 'Active',
        image: '/images/avatar.png',
      },
      {
        id: '2',
        username: 'Medicine',
        role: 'Learner',
        status: 'Active',
        image: '/images/avatar.png',
      },
      {
        id: '3',
        username: 'Medicine',
        role: 'Learner',
        status: 'Active',
        image: '/images/avatar.png',
      },
    ],
    courseName: 'Course Name',
  },
  {
    id: 4,
    completion: '15/30',
    formName: 'Form Name',
    date: 'Mar 26, 2025',
    totalUsers: 12,
    users: [
      {
        id: '1',
        username: 'Medicine',
        role: 'Learner',
        status: 'Active',
        image: '/images/avatar.png',
      },
      {
        id: '2',
        username: 'Medicine',
        role: 'Learner',
        status: 'Active',
        image: '/images/avatar.png',
      },
      {
        id: '3',
        username: 'Medicine',
        role: 'Learner',
        status: 'Active',
        image: '/images/avatar.png',
      },
    ],
    courseName: 'Course Name',
  },
  {
    id: 5,
    completion: '15/30',
    formName: 'Form Name',
    date: 'Mar 26, 2025',
    totalUsers: 12,
    users: [
      {
        id: '1',
        username: 'Medicine',
        role: 'Learner',
        status: 'Active',
        image: '/images/avatar.png',
      },
      {
        id: '2',
        username: 'Medicine',
        role: 'Learner',
        status: 'Active',
        image: '/images/avatar.png',
      },
      {
        id: '3',
        username: 'Medicine',
        role: 'Learner',
        status: 'Active',
        image: '/images/avatar.png',
      },
    ],
    courseName: 'Course Name',
  },
  {
    id: 6,
    completion: '15/30',
    formName: 'Form Name',
    date: 'Mar 26, 2025',
    totalUsers: 12,
    users: [
      {
        id: '1',
        username: 'Medicine',
        role: 'Learner',
        status: 'Active',
        image: '/images/avatar.png',
      },
      {
        id: '2',
        username: 'Medicine',
        role: 'Learner',
        status: 'Active',
        image: '/images/avatar.png',
      },
      {
        id: '3',
        username: 'Medicine',
        role: 'Learner',
        status: 'Active',
        image: '/images/avatar.png',
      },
    ],
    courseName: 'Course Name',
  },
];

type EvaluationFormProps = {
  isSettingUpEvaluationForms: boolean;
  setIsSettingUpEvaluationForms: React.Dispatch<React.SetStateAction<boolean>>;
};

const EvaluationForms = ({
  setIsSettingUpEvaluationForms,
  isSettingUpEvaluationForms,
}: EvaluationFormProps) => {
  const [evaluationList, setEvaluationList] = useState<EvaluationData[]>(initialTableData);

  const handleAddNew = () => {
    setIsSettingUpEvaluationForms(true);
  };

  return (
    <div>
      {isSettingUpEvaluationForms ? (
        <AddEvaluationForm setIsSettingUpEvaluationForms={setIsSettingUpEvaluationForms} />
      ) : (
        <>
          <h4 className="text-[12px] text-[#4f4f4f] font-medium mb-4">SUBMIT NEW FORM</h4>

          <Button
            onClick={handleAddNew}
            className="cursor-pointer hover:bg-transparent shadow-none bg-transparent border border-[#D9D9D9] border-dashed rounded-[20px] w-[80px] h-[80px] flex items-center justify-center"
          >
            <Image width={16} height={16} src={'/svgs/add.svg'} alt="plus" />
          </Button>

          <div className="flex items-center justify-between mt-6 mb-4">
            <h4 className="text-[12px] text-[#4f4f4f] font-medium mb-0">EXISTING FORMS</h4>

            <div className="flex items-center gap-2">
              <Button className="cursor-pointer hover:bg-transparent shadow-none bg-transparent border border-[#ebebeb] rounded-[4px] w-[24px] h-[24px] p-0 flex items-center justify-center">
                <Image width={16} height={16} src={'/svgs/search.svg'} alt="search" />
              </Button>

              <div className="w-[1px] bg-[#ebebeb] h-[10px]"></div>

              <Button className="cursor-pointer hover:bg-transparent shadow-none bg-transparent border border-[#ebebeb] rounded-[4px] w-[24px] h-[24px] p-0 flex items-center justify-center">
                <Image width={16} height={16} src={'/svgs/event_list.svg'} alt="event_list" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {evaluationList.map(evaluation => (
              <EvaluationCard key={evaluation.id} {...evaluation} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default EvaluationForms;
