'use client';
import { AssessmentList } from '@/components/dashboard/AssessmentList';
import { mockAssessments, byMeAssessments } from '@/data/mockAssessments';

export default function AssessmentsPage() {
  return (
    <div className="container py-6">
      <AssessmentList ofMeAssessments={mockAssessments} byMeAssessments={byMeAssessments} />
    </div>
  );
}
