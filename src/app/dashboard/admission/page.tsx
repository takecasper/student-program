"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, Plus, X } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export default function AdmissionContent() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [selectedProgram, setSelectedProgram] = useState<string | undefined>(undefined);
  const [showSidebar, setShowSidebar] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    country: "United States of America",
    admissionCycle: "2025 - 2026",
    programType: "",
    schools: [] as string[],
  });

  const filters = ["ALL", "CASPER", "DUET", "SNAPSHOT"];

  const tests = [
    {
      id: 1,
      type: "CASPER",
      date: "March 25, 2025",
      startTime: "11:00 AM",
      endTime: "12:00 PM",
      status: "NOT STARTED",
      image: "/category1.png",
    },
    {
      id: 2,
      type: "DUET",
      date: "March 25, 2025",
      startTime: "11:00 AM",
      endTime: "12:00 PM",
      status: "NOT STARTED",
      image: "/category1.png",
    },
  ];

  // Filter tests based on active filter
  const filteredTests = activeFilter === "ALL" ? tests : tests.filter((test) => test.type === activeFilter);

  const handleOpenSidebar = () => {
    setShowSidebar(true);
  };

  const handleCloseSidebar = () => {
    setShowSidebar(false);
    setCurrentStep(1);
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit form or go to next page
      console.log("Form submitted:", formData);
      handleCloseSidebar();
    }
  };

  const handleProgramTypeSelect = (value: string) => {
    setFormData({ ...formData, programType: value });
  };

  // Add a function to handle school selection
  const handleSchoolSelect = (value: string) => {
    if (value === "all") {
      setFormData({ ...formData, schools: ["all"] });
    } else {
      // If "all" was previously selected, remove it
      const updatedSchools = formData.schools.includes("all")
        ? [value]
        : [...formData.schools.filter((school) => school !== value), value];
      setFormData({ ...formData, schools: updatedSchools });
    }
  };

  return (
    <div className="p-6 relative">
      {/* Apply for a new program section */}
      <div className="mb-10">
        <h2 className="text-lg font-medium text-[#333333] mb-6">APPLY FOR A NEW PROGRAM</h2>

        <div
          className="border-2 border-dashed border-[#d9d9d9] rounded-[20px] w-[100px] h-[100px] flex items-center justify-center cursor-pointer hover:border-[#6a6eec] transition-colors"
          onClick={handleOpenSidebar}
        >
          <Button variant="ghost" className="h-full w-full rounded-[20px]">
            <Plus className="h-6 w-6 text-[#6c6c6c]" />
          </Button>
        </div>
      </div>

      {/* Booked tests section */}
      <div>
        <h2 className="text-lg font-medium text-[#333333] mb-6">BOOKED TESTS</h2>

        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-2">
            {filters.map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? "default" : "outline"}
                className={`rounded-full ${
                  activeFilter === filter ? "bg-[#364699] text-white" : "border-[#d9d9d9] text-[#333333]"
                }`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </Button>
            ))}
            <Select value={selectedProgram} onValueChange={setSelectedProgram}>
              <SelectTrigger className="w-[200px]  text-black bg-[#ececec] rounded-[12px]">
                <SelectValue placeholder="Select Program Name" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="medicine">Medicine</SelectItem>
                <SelectItem value="nursing">Nursing</SelectItem>
                <SelectItem value="pharmacy">Pharmacy</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {filteredTests.map((test) => (
            <Card
              key={test.id}
              className="w-[234px] h-[240px] border border-[#D9D9D9] shadow-none rounded-[20px] overflow-hidden"
            >
              <div className="relative h-[150px] bg-[#b0b1d7]">
                <div className="absolute top-3 right-3 bg-[#fcedca] text-[#333333] text-xs font-medium py-1 px-3 rounded-full z-10">
                  {test.status}
                </div>
                <Image
                  src={test.image || "/placeholder.svg"}
                  alt={`${test.type} test`}
                  width={215}
                  height={104}
                />
              </div>
              <CardContent>
                <h3 className="text-lg font-medium text-[#333333] mb-1">{test.type}</h3>
                <p className="text-sm text-[#6c6c6c]">{test.date}</p>
                <p className="text-sm text-[#6c6c6c]">
                  {test.startTime} - {test.endTime}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Application Sidebar - Modified to show within content */}
      {showSidebar && (
        <div className="absolute top-0 right-0 bottom-0 z-40 flex justify-end h-screen">
          <div className="bg-white w-full max-w-md h-full overflow-y-auto shadow-lg border-l border-[#f5f5f5] animate-in slide-in-from-right">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#364699]">APPLY NEW</h2>
                <Button variant="ghost" size="icon" onClick={handleCloseSidebar}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="space-y-8">
                {/* Step 1 */}
                <div className="relative">
                  <div className="flex items-center gap-4 mb-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        currentStep >= 1 ? "bg-[#00a59b] text-white" : "bg-[#f5f5f5] text-[#6c6c6c]"
                      }`}
                    >
                      {currentStep > 1 ? <Check className="h-5 w-5" /> : <span>1</span>}
                    </div>
                    <h3 className="text-lg font-medium">Step 1: Program Country</h3>
                  </div>

                  <div className="ml-12">
                    <p className="text-sm text-[#6c6c6c] mb-3">Select the country</p>

                    <div
                      className={`border rounded-md p-3 mb-4 ${
                        currentStep === 1 ? "border-[#00a59b]" : "border-[#d9d9d9]"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#00a59b] flex items-center justify-center">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                        <span>United State of America</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative">
                  <div className="flex items-center gap-4 mb-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        currentStep >= 2 ? "bg-[#00a59b] text-white" : "bg-[#f5f5f5] text-[#6c6c6c]"
                      }`}
                    >
                      {currentStep > 2 ? <Check className="h-5 w-5" /> : <span>2</span>}
                    </div>
                    <h3 className="text-lg font-medium">Step 2: Admission Cycle</h3>
                  </div>

                  <div className="ml-12">
                    <p className="text-sm text-[#6c6c6c] mb-3">
                      Select the admission period for your program(s):
                    </p>

                    <div
                      className={`border rounded-md p-3 mb-4 ${
                        currentStep === 2 ? "border-[#00a59b]" : "border-[#d9d9d9]"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#00a59b] flex items-center justify-center">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                        <span>2025 - 2026</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative">
                  <div className="flex items-center gap-4 mb-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        currentStep >= 3 ? "bg-[#00a59b] text-white" : "bg-[#f5f5f5] text-[#6c6c6c]"
                      }`}
                    >
                      <span>3</span>
                    </div>
                    <h3 className="text-lg font-medium">Step 3: Program Type</h3>
                  </div>

                  <div className="ml-12">
                    <p className="text-sm text-[#6c6c6c] mb-3">
                      Select the programs you will be distributing your Altus Suite results to
                    </p>

                    {currentStep === 3 && (
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-medium text-[#333333] mb-3">GRADUATE MEDICAL EDUATION</h4>
                          <div className="grid grid-cols-2 gap-3">
                            <ProgramOption
                              id="anesthesiology"
                              label="Anesthesiology"
                              onSelect={handleProgramTypeSelect}
                            />
                            <ProgramOption id="obgyn" label="OBGYN" onSelect={handleProgramTypeSelect} />
                            <ProgramOption
                              id="internal-medicine"
                              label="Internal Medicine"
                              onSelect={handleProgramTypeSelect}
                            />
                            <ProgramOption id="surgery" label="Surgery" onSelect={handleProgramTypeSelect} />
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-[#333333] mb-3">MEDICINE</h4>
                          <div className="grid grid-cols-2 gap-3">
                            <ProgramOption
                              id="athletic-training"
                              label="Athletic Training"
                              onSelect={handleProgramTypeSelect}
                            />
                            <ProgramOption id="other" label="Other" onSelect={handleProgramTypeSelect} />
                            <ProgramOption
                              id="dentistry"
                              label="Dentistry"
                              onSelect={handleProgramTypeSelect}
                            />
                            <ProgramOption
                              id="pharmacy"
                              label="Pharmacy"
                              onSelect={handleProgramTypeSelect}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="relative">
                  <div className="flex items-center gap-4 mb-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        currentStep >= 4 ? "bg-[#00a59b] text-white" : "bg-[#f5f5f5] text-[#6c6c6c]"
                      }`}
                    >
                      <span>4</span>
                    </div>
                    <h3 className="text-lg font-medium">Step 4: School</h3>
                  </div>

                  <div className="ml-12">
                    <p className="text-sm text-[#6c6c6c] mb-3">
                      Select the school(s) you will be distributing your Altrus Suite results to:
                    </p>

                    {currentStep === 4 && (
                      <div className="space-y-4">
                        <div className="bg-[#fcedca] p-4 rounded-md text-sm">
                          <p>
                            The program type you have selected includes up to 8 distributions as part of the
                            base fee. Additional distributions beyond that are $ 15.00.
                          </p>
                        </div>

                        <div className="space-y-3">
                          <div className="border border-[#d9d9d9] rounded-md p-3">
                            <RadioGroup defaultValue="" onValueChange={(value) => handleSchoolSelect("all")}>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="all" id="all-schools" className="text-[#00a59b]" />
                                <Label htmlFor="all-schools">Select All Schools</Label>
                              </div>
                            </RadioGroup>
                          </div>

                          <div className="border border-[#d9d9d9] rounded-md p-3">
                            <RadioGroup
                              defaultValue=""
                              onValueChange={(value) => handleSchoolSelect("sam-houston")}
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value="sam-houston"
                                  id="sam-houston"
                                  className="text-[#00a59b]"
                                />
                                <Label htmlFor="sam-houston">Sam Houston State University</Label>
                              </div>
                            </RadioGroup>
                          </div>

                          <div className="border border-[#d9d9d9] rounded-md p-3">
                            <RadioGroup
                              defaultValue=""
                              onValueChange={(value) => handleSchoolSelect("san-juan")}
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="san-juan" id="san-juan" className="text-[#00a59b]" />
                                <Label htmlFor="san-juan">San Juan Bautista School of Medicine</Label>
                              </div>
                            </RadioGroup>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-[#f5f5f5] mt-4">
              <Button className="w-full bg-[#364699] hover:bg-[#253170]" onClick={handleNext}>
                Next
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface ProgramOptionProps {
  id: string;
  label: string;
  onSelect: (value: string) => void;
}

function ProgramOption({ id, label, onSelect }: ProgramOptionProps) {
  return (
    <div className="border border-[#d9d9d9] rounded-md p-3">
      <RadioGroup defaultValue="" onValueChange={onSelect}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value={id} id={id} className="text-[#00a59b]" />
          <Label htmlFor={id}>{label}</Label>
        </div>
      </RadioGroup>
    </div>
  );
}
