import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import { useState } from 'react';
import { AssessmentList } from '../AssessmentList';
import { mockAssessments, byMeAssessments } from '@/data/mockAssessments';
import EvalSidebar from './EvalSidebar';

interface EvalCardProps {
  title: string;
  sentDate: string;
  courseName: string;
  imageUrl: string;
  onClick?: () => void;
}

function EvalCard({ title, sentDate, courseName, imageUrl, onClick }: EvalCardProps) {
  return (
    <div className="relative w-fit">
      <Card
        className="w-[308px] p-6 bg-white rounded-lg shadow-none hover:shadow-md transition-shadow cursor-pointer"
        onClick={onClick}
      >
        <div className="flex flex-col items-start gap-4">
          <div className="bg-[#F6F8FF] p-4 rounded-lg">
            <Image src={imageUrl} alt={title} width={267} height={100} />
          </div>
          <div className="flex-1 w-full">
            <div className="mb-2 flex items-center justify-between ">
              <h3 className="text-lg font-semibold text-[#333333]">{title}</h3>
              <div className="flex border rounded-full py-1 px-2 -space-x-2">
                <Avatar className="w-8 h-8 border-2 border-white">
                  <AvatarImage src="/avatar.png" />
                </Avatar>
                <Avatar className="w-8 h-8 border-2 border-white">
                  <AvatarImage src="/avatar.png" />
                </Avatar>
                <Avatar className="w-8 h-8 border-2 border-white">
                  <AvatarImage src="/avatar.png" />
                </Avatar>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-[#6C6C6C]">Sent Date: {sentDate}</p>
              <div className="h-[1px] w-full bg-[#E0E0E0]" />
              <div>
                <div className="flex items-center gap-2 text-sm text-[#6C6C6C]">
                  <Image src="/hotel_class.svg" alt="Course Icon" width={18} height={18} />
                  <span>{courseName}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export function EvalTab() {
  const [showAssessments, setShowAssessments] = useState(false);
  const [showEvalPanel, setShowEvalPanel] = useState(false);

  const evaluations = [
    {
      id: 1,
      title: 'Form Name',
      sentDate: 'Mar 20, 2023',
      courseName: 'Course Name',
      imageUrl: '/mspe.png',
      completed: true,
    },
    {
      id: 2,
      title: 'Form Name',
      sentDate: 'Not Started',
      courseName: 'Course Name',
      imageUrl: '/mspe.png',
      completed: false,
    },
  ];

  if (showAssessments) {
    return (
      <div className="p-6">
        <AssessmentList ofMeAssessments={mockAssessments} byMeAssessments={byMeAssessments} />
      </div>
    );
  }

  return (
    <div className="p-6">
      {showEvalPanel ? <EvalSidebar setShowEvalPanel={setShowEvalPanel} /> : <></>}
      <div className="flex flex-row space-x-6">
        {evaluations.map(evaluation => (
          <EvalCard
            key={evaluation.id}
            {...evaluation}
            onClick={() =>
              evaluation.completed ? setShowAssessments(true) : setShowEvalPanel(true)
            }
          />
        ))}
      </div>
    </div>
  );
}
