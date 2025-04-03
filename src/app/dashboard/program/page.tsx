"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";
import ProgramDetail from "@/components/ProgramDetail";

export default function ProgramContentWithImages() {
  const [selectedView, setSelectedView] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Handle going back to the main view
  const handleBack = () => {
    setSelectedView(null);
  };

  console.log("Current selectedView in main page:", selectedView);

  const handleViewSelection = (view: string) => {
    console.log("Setting selectedView to:", view);
    setSelectedView(view);
  };

  if (selectedView) {
    return <ProgramDetail selectedView={selectedView} onBack={handleBack} />;
  }

  // Card data to make the code more maintainable
  const programCards = [
    {
      year: "YEAR 1",
      status: "PAST",
      content: (
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            className="rounded-[10px] text-xs h-7 px-2 border-[#d9d9d9] text-black font-bold"
            onClick={() => handleViewSelection("year1-s1")}
          >
            S1
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-[10px] text-xs h-7 px-2 border-[#d9d9d9] text-black font-bold"
            onClick={() => handleViewSelection("year1-s2")}
          >
            S2
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-[10px] text-xs h-7 px-2 border-[#d9d9d9] text-black font-bold"
            onClick={() => handleViewSelection("year1-s3")}
          >
            S3
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-[10px] text-xs h-7 px-2 border-[#d9d9d9] text-black font-bold"
            onClick={() => handleViewSelection("year1-s4")}
          >
            S4
          </Button>
        </div>
      ),
    },
    {
      year: "YEAR 2",
      status: "PAST",
      content: (
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            className="rounded-[10px] text-xs h-7 px-2 border-[#d9d9d9] text-black font-bold"
            onClick={() => handleViewSelection("year2-s1")}
          >
            S1
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-[10px] text-xs h-7 px-2 border-[#d9d9d9] text-black font-bold"
            onClick={() => handleViewSelection("year2-s2")}
          >
            S2
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-[10px] text-xs h-7 px-2 border-[#d9d9d9] text-black font-bold"
            onClick={() => handleViewSelection("year2-s3")}
          >
            S3
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-[10px] text-xs h-7 px-2 border-[#d9d9d9] text-black font-bold"
            onClick={() => handleViewSelection("year2-s4")}
          >
            S4
          </Button>
        </div>
      ),
    },
    {
      year: "YEAR 3",
      status: "CURRENT",
      content: (
        <div className="flex items-center gap-2 text-[#6c6c6c]">
          <Image src="/home_health.svg" alt="form" width={16} height={16} />
          <Button
            variant="link"
            className="text-sm p-0 h-auto text-[#333333DE]"
            onClick={() => handleViewSelection("year3-s3")}
          >
            CLINICAL PHASE
          </Button>{" "}
        </div>
      ),
    },
    {
      year: "YEAR 4",
      status: null,
      content: (
        <div className="flex items-center gap-2 text-[#6c6c6c]">
          <Image src="/home_health.svg" alt="form" width={16} height={16} />
          <Button
            variant="link"
            className="text-sm p-0 h-auto text-[#333333DE]"
            onClick={() => handleViewSelection("year4-clinical")}
          >
            CLINICAL PHASE
          </Button>{" "}
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-lg font-medium text-[#333333] mb-6">MEDICAL PROGRAM</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {programCards.map((card, index) => (
          <div
            key={index}
            className={`relative rounded-[20px] cursor-pointer ${
              hoveredCard === index ? "p-[2px] bg-gradient-to-r from-[#6A6EEC] to-[#DD99F6]" : "p-0"
            }`}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => handleViewSelection(`year${index + 1}`)}
          >
            <Card
              className={`border-2 ${
                hoveredCard === index ? "border-transparent" : "border-[#D9D9D9]"
              } overflow-hidden flex flex-col py-0 relative rounded-[18px] shadow-none h-full`}
            >
              {card.status && (
                <div
                  className={`absolute top-3 right-3 text-xs font-medium py-1 px-3 rounded-[10px] z-10 ${
                    card.status === "CURRENT" ? "bg-white text-[#364699]" : "bg-white text-[#6c6c6c]"
                  }`}
                >
                  {card.status}
                </div>
              )}
              <div className={index === 0 ? "border-b-2 border-[#D9D9D9] rounded-[20px]" : ""}>
                <Image
                  src="/program.png"
                  alt="program"
                  width={500}
                  height={300}
                  quality={100}
                  priority={index < 2}
                  className="w-full h-40 object-cover rounded-[20px]"
                />
              </div>
              <CardContent className="p-4 flex-grow">
                <h3 className="text-sm font-medium text-[#333333] mb-4">{card.year}</h3>
                {card.content}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
