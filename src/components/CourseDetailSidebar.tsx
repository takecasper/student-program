"use client";

import { Clock, CornerDownRight, Download, MapPin, Paperclip, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";

import { CourseDetailSidebarProps } from "@/types/course";
import { sessionData } from "@/data/sessionData";
import { handoutsData } from "@/data/handoutsData";
import { gradesData } from "@/data/gradesData";

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
  const [activeTab, setActiveTab] = useState("SESSION");

  const toggleExpand = () => {
    const newExpandedState = !isExpanded;
    setIsExpanded(newExpandedState);
    onExpand(newExpandedState);
  };

  // Render tab content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "SESSION":
        return (
          <div className="space-y-3">
            {sessionData.map((session, index) => (
              <div key={index} className="border border-[#d9d9d9] rounded-[20px] pr-2  flex items-center">
                <div className="flex flex-col items-center justify-center w-20 h-20 rounded-lg mr-4">
                  <span
                    className={`text-${
                      session.isHighlighted ? "[#ba1e50]" : "[#333333]"
                    } text-sm font-medium`}
                  >
                    {session.day}
                  </span>
                  <span
                    className={`text-${
                      session.isHighlighted ? "[#ba1e50]" : "[#333333]"
                    } text-4xl font-semibold`}
                  >
                    {session.date}
                  </span>
                </div>

                <div className="flex-1 flex flex-col">
                  <div className="flex items-center mb-2">
                    <Clock className="h-4 w-4 text-[#333333] mr-2" />
                    <span className="text-sm text-[#333333]">{session.time}</span>
                    <span className="ml-4 text-sm  text-[#333333]">
                      With <span className="font-bold">{session.facilitator}</span>
                    </span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-[#333333] mr-2" />
                    <span className="text-sm text-[#333333]">{session.location}</span>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-[#b0b1d7] flex items-center justify-center text-xs text-white">
                      CC
                    </div>
                  </div>
                  <span className="ml-1 text-xs text-[#6a6eec]">+{session.attendees}</span>
                </div>
              </div>
            ))}
          </div>
        );
      case "GRADES":
        return (
          <div className="space-y-6">
            {/* Header with overall grade */}
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold text-[#333333]">Isabella Ding&apos;s Course Grade</h2>
                <div className="flex items-center mt-1">
                  <span className="text-[#333333]">Overal Grade:</span>
                  <span className="ml-2 text-[#00a59b] font-semibold">{gradesData.overall.score}</span>
                  <span className="ml-6 text-[#333333] text-sm">{gradesData.overall.period}</span>
                </div>
              </div>
              <button className="text-gray-700 border rounded">
                <span className="flex items-center justify-center p-1">
                  <Download className="h-4 w-4" />
                </span>
              </button>
            </div>

            {/* Categories and items */}
            {gradesData.categories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                {/* Divider */}
                <div className="border-t border-[#d9d9d9] mb-4"></div>

                {/* Category section */}
                <div>
                  <h3 className="font-medium text-[14px] text-[#333333] mb-3">{category.name}</h3>
                  <div className="space-y-3">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex justify-between items-center">
                        <div className="flex items-center">
                          <CornerDownRight className="h-4 w-4 text-[#333333] mr-2 " />
                          <span className="text-[#333333] text-[14px]">{item.title}</span>
                        </div>
                        <span className="font-medium text-[#333333] text-[14px]">{item.score}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      case "HANDOUTS":
        return (
          <div className="space-y-6 border border-[#d9d9d9] rounded-[20px] p-4">
            <div className="flex items-center mb-4 gap-2">
              <div className="bg-[#f5f5f5] rounded-[20px] p-4">
                <Image src="/hotel_class.svg" alt="star" width={20} height={20} />
              </div>
              <div>
                <h2 className="text-lg font-medium text-[#333333]">Year 2 - S2</h2>
                <p className="text-sm text-[#666666]">Course Objects ({handoutsData.length})</p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-[#d9d9d9] my-4"></div>

            {/* Handout items */}
            <div className="space-y-6">
              {handoutsData.map((handout, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-start">
                    <CornerDownRight className="h-4 w-4 text-[#333333] mr-2 mt-1 " />
                    <div>
                      <p className="text-[#333333] text-[14px] font-medium">{handout.title}</p>
                      <div className="flex text-sm text-[#666666] mt-1">
                        <span>added by: {handout.addedBy}</span>
                        <span className="mx-2">|</span>
                        <span>date: {handout.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center border rounded">
                    <button className="text-[#333333] p-1 cursor-pointer">
                      <Paperclip className="h-4 w-4 rotate-45" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case "EVAL":
        return <p className="text-sm text-gray-500">Evaluation content will display here</p>;
      default:
        return <p className="text-sm text-gray-500">Select a tab to view content</p>;
    }
  };

  return (
    <Card
      className={`border border-[#f5f5f5] shadow-none rounded-none transition-all duration-300 ${
        isExpanded ? "w-full" : "w-full max-w-[600px]"
      }`}
    >
      <CardContent className="p-0 flex flex-col h-full">
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

        {isExpanded ? (
          <div className="flex flex-1 overflow-hidden">
            {/* Left side content */}
            <div className="w-1/2 px-4 overflow-y-auto">
              <Image src="/video.png" alt="course-detail-sidebar" width={580} height={200} />

              <div className="flex flex-col gap-4 mt-4">
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
                  <h3 className="text-sm font-medium text-[#333333] mt-6 mb-4">
                    COURSE OBJECTIVE ({objectives.length})
                  </h3>

                  <div className="space-y-3 max-h-[200px] overflow-y-auto">
                    {objectives.map((objective, index) => (
                      <div key={index} className="flex items-start gap-2 text-sm">
                        <div className="min-w-5 h-5 border rounded flex items-center justify-center mt-0.5">
                          <Image src="/new_releases.svg" alt="check" width={14} height={14} />
                        </div>
                        <p>{objective}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>

            {/* Right side tabs and content */}
            <div className="w-1/2 px-4 flex flex-col">
              <div className="flex gap-2 mb-4">
                <Button
                  variant="ghost"
                  className={`py-3 rounded-full border border-[#D9D9D9] ${
                    activeTab === "SESSION" ? "bg-[#364699] text-white" : ""
                  }`}
                  onClick={() => setActiveTab("SESSION")}
                >
                  SESSION
                </Button>
                <Button
                  variant="ghost"
                  className={`py-3 rounded-full border border-[#D9D9D9] ${
                    activeTab === "GRADES" ? "bg-[#364699] text-white" : ""
                  }`}
                  onClick={() => setActiveTab("GRADES")}
                >
                  GRADES
                </Button>
                <Button
                  variant="ghost"
                  className={`py-3 rounded-full border border-[#D9D9D9] ${
                    activeTab === "HANDOUTS" ? "bg-[#364699] text-white" : ""
                  }`}
                  onClick={() => setActiveTab("HANDOUTS")}
                >
                  HANDOUTS
                </Button>
                <Button
                  variant="ghost"
                  className={`py-3 rounded-full border border-[#D9D9D9] ${
                    activeTab === "EVAL" ? "bg-[#364699] text-white" : ""
                  }`}
                  onClick={() => setActiveTab("EVAL")}
                >
                  EVAL
                </Button>
              </div>

              {/* Tab content */}
              <div className="border-l border-[#D9D9D9] p-4 flex-1 overflow-y-auto">{renderTabContent()}</div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col overflow-y-auto">
            <div className="px-4">
              <Image src="/video.png" alt="course-detail-sidebar" width={580} height={200} />
            </div>
            {/* tabs */}
            <div className="p-4 gap-2 flex">
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
              <Button variant="ghost" className="flex-1 py-3 rounded-full border border-[#D9D9D9]">
                HANDOUTS
              </Button>
              <Button variant="ghost" className="flex-1 py-3 rounded-full border border-[#D9D9D9]">
                EVAL
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
                <h3 className="text-sm font-medium text-[#333333] mt-6 mb-4">
                  COURSE OBJECTIVE ({objectives.length})
                </h3>

                <div className="space-y-3 max-h-[200px] overflow-y-auto">
                  {objectives.map((objective, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <div className="min-w-5 h-5 border rounded flex items-center justify-center mt-0.5">
                        <Image src="/new_releases.svg" alt="check" width={14} height={14} />
                      </div>
                      <p>{objective}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
