'use client';

import React, { useEffect } from 'react';
import { Plus, Filter } from 'lucide-react';

import WorkflowCard from './components/WorkflowCard';

import { useBreadcrumbStore } from '@/store/breadcrumbs';

const topWorkflows = [
  {
    title: 'OAI Study Status Transitions',
    steps: 3,
    author: 'Administrator',
    date: '11/02/2025',
  },
  {
    title: 'Amendment Request',
    steps: 3,
    author: 'Administrator',
    date: '11/02/2025',
  },
  {
    title: 'Scheduled Status Workflow',
    steps: 3,
    author: 'Administrator',
    date: '11/02/2025',
  },
];

const bottomWorkflows = [
  {
    title: 'Update Patient',
    steps: 3,
    author: 'Administrator',
    date: '11/02/2025',
  },
  {
    title: 'Pull Prior Studies from PS',
    steps: 3,
    author: 'Administrator',
    date: '11/02/2025',
  },
  {
    title: 'Update Patient',
    steps: 3,
    author: 'Administrator',
    date: '11/02/2025',
  },
  {
    title: 'Update Patient',
    steps: 3,
    author: 'Administrator',
    date: '11/02/2025',
  },
  {
    title: 'Update Patient',
    steps: 3,
    author: 'Administrator',
    date: '11/02/2025',
  },
  {
    title: 'Update Patient',
    steps: 3,
    author: 'Administrator',
    date: '11/02/2025',
  },
];

export default function WorkflowAutomation() {
  const setTitle = useBreadcrumbStore(state => state.setTitle);

  useEffect(() => {
    if (setTitle) setTitle('Workflow');
  }, [setTitle]);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-700">
          WORKFLOW AUTOMATION ({topWorkflows.length + bottomWorkflows.length})
        </h2>
        <Filter className="w-5 h-5 text-gray-500 cursor-pointer" />
      </div>

      {/* Top Section: Add New + 3 cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Add New */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center py-10 hover:bg-gray-50 cursor-pointer">
          <Plus className="w-8 h-8 text-gray-500 mb-2" />
          <span className="text-sm font-medium text-gray-500">ADD NEW</span>
        </div>
        {/* Top Workflows */}
        {topWorkflows.map((workflow, idx) => (
          <WorkflowCard key={idx} {...workflow} />
        ))}
      </div>

      {/* Separator */}
      <div className="my-6 border-t border-gray-200" />

      {/* Bottom Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {bottomWorkflows.map((workflow, idx) => (
          <WorkflowCard key={idx} {...workflow} />
        ))}
      </div>
    </div>
  );
}
