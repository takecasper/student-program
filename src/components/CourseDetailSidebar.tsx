"use client";

import { Clock, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { ScrollArea } from "./ui/scroll-area";
import { useState } from "react";

interface CourseDetailSidebarProps {
  courseName: string;
  startDate: string;
  endDate: string;
  gradYear: string;
  facilitators: string;
  objectives: string[];
  onClose: () => void;
  onExpand: (expanded: boolean) => void;
}

export default function CourseDetailSidebar({
  courseName,
  startDate,
  endDate,
  gradYear,
  facilitators,
  objectives,
  onClose,
  onExpand,
}: CourseDetailSidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    const newExpandedState = !isExpanded;
    setIsExpanded(newExpandedState);
    onExpand(newExpandedState);
  };

  return (
    <Card
      className={`border border-[#f5f5f5] shadow-none rounded-none transition-all duration-300 ${
        isExpanded ? "w-full" : "w-full max-w-[600px]"
      }`}
    >
      <CardContent className={`p-0 ${isExpanded ? "max-h-[90vh] overflow-auto" : ""}`}>
        <div className="p-4 flex justify-between">
          <div className="flex flex-col items-start gap-2 text-xs text-[#6c6c6c] mb-1">
            <div className="flex items-center gap-2">
              <Clock className="h-3 w-3" />
              <span>
                {startDate} - {endDate}
              </span>
            </div>
            <h2 className="text-lg font-medium text-[#333333]">{courseName}</h2>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="border" onClick={toggleExpand}>
              <Image
                src={isExpanded ? "/collapse.svg" : "/expand.svg"}
                alt={isExpanded ? "collapse" : "expand"}
                width={12}
                height={12}
              />
            </Button>
            <Button variant="ghost" size="icon" className="border" onClick={onClose}>
              <X className="h-2 w-2" />
            </Button>
          </div>
        </div>

        <div className="px-4 ">
          <Image src="/video.png" alt="course-detail-sidebar" width={580} height={200} />
        </div>

        <div className="p-4 gap-2 flex ">
          <Button
            variant="ghost"
            className="flex-1 py-3 rounded-full text-white border border-[#D9D9D9] bg-[#364699]"
          >
            INFO & OBJECTIVE
          </Button>
          <Button variant="ghost" className="flex-1 py-3 rounded-full border border-[#D9D9D9]">
            SESSION
          </Button>
          <Button variant="ghost" className="flex-1 py-3 rounded-full border border-[#D9D9D9]">
            GRADES
          </Button>
        </div>

        <div className="flex flex-col gap-4 px-4">
          <Card className="px-4 border border-[#D9D9D9] shadow-none">
            <h3 className="text-sm font-medium text-[#333333] mb-4">GENERAL INFO</h3>

            <div className="space-y-3">
              <div className="grid grid-cols-2 items-center">
                <p className="text-sm text-[#6c6c6c]">Runs From:</p>
                <p className="text-sm">
                  {startDate} - {endDate}
                </p>
              </div>

              <div className="grid grid-cols-2 items-center">
                <p className="text-sm text-[#6c6c6c]">Facilitators:</p>
                <p className="text-sm">{facilitators}</p>
              </div>

              <div className="grid grid-cols-2 items-center">
                <p className="text-sm text-[#6c6c6c]">Grad Year:</p>
                <p className="text-sm">{gradYear}</p>
              </div>
            </div>
          </Card>
          <Card className="px-4 border border-[#D9D9D9] shadow-none">
            <ScrollArea className="h-[100px]">
              <h3 className="text-sm font-medium text-[#333333] mt-6 mb-4">
                COURSE OBJECTIVE ({objectives.length})
              </h3>

              <div className="space-y-3">
                {objectives.map((objective, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm">
                    <div className="min-w-5 h-5 border rounded flex items-center justify-center mt-0.5">
                      <Image src="/new_releases.svg" alt="check" width={14} height={14} />
                    </div>
                    <p>{objective}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
