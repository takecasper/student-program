'use client';
import UserProfile from '@/components/dashboard/UserProfile';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { AssessmentList } from '@/components/dashboard/AssessmentList';
import { mockAssessments, byMeAssessments } from '@/data/mockAssessments';

export default function UserProfilePage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('account');
  return <UserProfile user={user} activeTab={activeTab} setActiveTab={setActiveTab} />;
}

export function AssessmentsPage() {
  return (
    <div className="container py-6">
      <AssessmentList ofMeAssessments={mockAssessments} byMeAssessments={byMeAssessments} />
    </div>
  );
}
