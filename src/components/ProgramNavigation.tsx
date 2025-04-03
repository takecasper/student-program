"use client";

import { useState } from "react";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ProgramDetail from "./ProgramDetail";

export default function ProgramNavigation() {
  const [selectedView, setSelectedView] = useState<string | null>(null);
  const backgroundImageUrl =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='160' viewBox='0 0 300 160'%3E%3Crect width='300' height='160' fill='%23f8c4d9'/%3E%3Cpath d='M0 0 L300 160' stroke='%236a6eec' strokeWidth='8'/%3E%3Ccircle cx='150' cy='120' r='15' fill='%2370c0b8'/%3E%3C/svg%3E";

  const handleBack = () => {
    setSelectedView(null);
  };

  // If a year/semester is selected, show the detail view
  if (selectedView) {
    return <ProgramDetail selectedView={selectedView} onBack={handleBack} />;
  }

  // Otherwise show the program overview
  return (
    <div className="p-6">
      <h1 className="text-lg font-medium text-[#333333] mb-6">MEDICAL PROGRAM</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Year 1 */}
        <Card className="border border-[#f5f5f5] overflow-hidden">
          <div className="relative h-40 overflow-hidden">
            <div className="absolute top-3 right-3 bg-white text-[#6c6c6c] text-xs font-medium py-1 px-3 rounded-full z-10">
              PAST
            </div>
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("${backgroundImageUrl}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </div>
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-[#333333] mb-4">YEAR 1</h3>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full text-xs h-8 px-4 border-[#d9d9d9] text-[#333333]"
                onClick={() => setSelectedView("year1-s1")}
              >
                S1
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full text-xs h-8 px-4 border-[#d9d9d9] text-[#333333]"
                onClick={() => setSelectedView("year1-s2")}
              >
                S2
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full text-xs h-8 px-4 border-[#d9d9d9] text-[#333333]"
                onClick={() => setSelectedView("year1-s3")}
              >
                S3
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full text-xs h-8 px-4 border-[#d9d9d9] text-[#333333]"
                onClick={() => setSelectedView("year1-s4")}
              >
                S4
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Year 2 */}
        <Card className="border border-[#f5f5f5] overflow-hidden">
          <div className="relative h-40 overflow-hidden">
            <div className="absolute top-3 right-3 bg-white text-[#6c6c6c] text-xs font-medium py-1 px-3 rounded-full z-10">
              PAST
            </div>
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("${backgroundImageUrl}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </div>
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-[#333333] mb-4">YEAR 2</h3>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full text-xs h-8 px-4 border-[#d9d9d9] text-[#333333]"
                onClick={() => setSelectedView("year2-s1")}
              >
                S1
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full text-xs h-8 px-4 border-[#d9d9d9] text-[#333333]"
                onClick={() => setSelectedView("year2-s2")}
              >
                S2
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full text-xs h-8 px-4 border-[#d9d9d9] text-[#333333]"
                onClick={() => setSelectedView("year2-s3")}
              >
                S3
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full text-xs h-8 px-4 border-[#d9d9d9] text-[#333333]"
                onClick={() => setSelectedView("year2-s4")}
              >
                S4
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Year 3 */}
        <Card className="border border-[#f5f5f5] overflow-hidden">
          <div className="relative h-40 overflow-hidden">
            <div className="absolute top-3 right-3 bg-[#8eeee4] text-[#364699] text-xs font-medium py-1 px-3 rounded-full z-10">
              CURRENT
            </div>
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("${backgroundImageUrl}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </div>
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-[#333333] mb-4">YEAR 3</h3>
            <div className="flex items-center gap-2 text-[#6c6c6c]">
              <Home className="h-4 w-4" />
              <Button
                variant="link"
                className="text-sm p-0 h-auto text-[#364699]"
                onClick={() => setSelectedView("year3-s3")}
              >
                CLINICAL PHASE
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Year 4 */}
        <Card className="border border-[#f5f5f5] overflow-hidden">
          <div className="relative h-40 overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("${backgroundImageUrl}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </div>
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-[#333333] mb-4">YEAR 4</h3>
            <div className="flex items-center gap-2 text-[#6c6c6c]">
              <Home className="h-4 w-4" />
              <Button
                variant="link"
                className="text-sm p-0 h-auto text-[#364699]"
                onClick={() => setSelectedView("year4-clinical")}
              >
                CLINICAL PHASE
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
