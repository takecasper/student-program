import { Assessment } from '@/types/assessment';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

interface AssessmentListProps {
  ofMeAssessments: Assessment[];
  byMeAssessments: Assessment[];
}

function formatActivityText(text: string) {
  // For activity without '::'
  if (!text.includes('::')) {
    return text.split('-').map((part, index) => (
      <span key={index} className="block">
        {part.trim()}
      </span>
    ));
  }
  // For activity with '::'
  return text.split('::').map((part, index) => (
    <span key={index} className="block">
      {part.trim()}
    </span>
  ));
}

function formatTargetText(text: string) {
  return text.split('-').map((part, index) => (
    <span key={index} className="block">
      {part.trim()}
    </span>
  ));
}

export function AssessmentList({ ofMeAssessments, byMeAssessments }: AssessmentListProps) {
  const [activeTab, setActiveTab] = useState<'OF ME' | 'BY ME'>('OF ME');

  const currentAssessments = activeTab === 'OF ME' ? ofMeAssessments : byMeAssessments;

  return (
    <div className="w-full overflow-hidden">
      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'OF ME' ? 'border-b-2 border-primary' : 'text-muted-foreground'
            }`}
            onClick={() => setActiveTab('OF ME')}
          >
            OF ME
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'BY ME' ? 'border-b-2 border-primary' : 'text-muted-foreground'
            }`}
            onClick={() => setActiveTab('BY ME')}
          >
            BY ME
          </button>
        </div>

        <div className="flex items-center gap-4 ml-auto">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Level</span>
            <Select>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Level 1</SelectItem>
                <SelectItem value="2">Level 2</SelectItem>
                <SelectItem value="3">Level 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Status</span>
            <Select>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Date</span>
            <Select>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Latest" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Latest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="w-full overflow-hidden">
        <Table className="border">
          <TableHeader className="bg-[#F5F5F5]">
            <TableRow className="border-x">
              <TableHead className="border-x">Activity</TableHead>
              <TableHead className="border-x">
                {activeTab === 'OF ME' ? 'Evaluator' : 'Target'}
              </TableHead>
              <TableHead className="border-x">Form Name</TableHead>
              <TableHead className="border-x">From</TableHead>
              <TableHead className="border-x">To</TableHead>
              <TableHead className="border-x">Date Done</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentAssessments.map(assessment => (
              <TableRow key={assessment.id} className="border-x">
                <TableCell className="font-medium border-x">
                  <div>
                    {formatActivityText(assessment.activity)}
                    <p className="text-xs text-muted-foreground">{assessment.courseCode}</p>
                  </div>
                </TableCell>
                <TableCell className="border-x">
                  {activeTab === 'OF ME' ? (
                    <div className="flex items-start justify-start gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage
                          src={assessment.evaluator?.avatar || '/avatar-placeholder.png'}
                        />
                        <AvatarFallback>AN</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-[#33333399] font-semibold">
                        {assessment.evaluator?.name}
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-1">
                      <div className="flex items-start gap-2">
                        {assessment.target?.avatar && (
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={assessment.target.avatar} />
                            <AvatarFallback>TA</AvatarFallback>
                          </Avatar>
                        )}
                        <span className="text-sm text-[#33333399] font-semibold">
                          {formatTargetText(assessment.target?.name || '')}
                        </span>
                      </div>
                      {assessment.target?.details?.map((detail, idx) => (
                        <span key={idx} className="text-xs ml-8 text-muted-foreground">
                          {detail}
                        </span>
                      ))}
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-sm border-x text-[#33333399] font-semibold">
                  {assessment.formName}
                </TableCell>
                <TableCell className="text-sm border-x text-[#33333399] font-semibold">
                  {assessment.dateFrom}
                </TableCell>
                <TableCell className="text-sm border-x text-[#33333399] font-semibold">
                  {assessment.dateTo}
                </TableCell>
                <TableCell className="border-x">
                  {activeTab === 'OF ME' ? (
                    <div className="flex flex-col gap-1">
                      <Badge variant="success" className="w-fit font-semibold">
                        {assessment.status}
                      </Badge>
                      {assessment.confirmedDate && (
                        <span className="ml-6 text-xs text-muted-foreground">
                          {assessment.confirmedDate}
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="text-sm text-[#33333399] font-semibold">
                      {assessment.dateDone}
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
