"use client";

import { Check, FileText, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from "next/image";

export default function ProgramDetail() {
  return (
    <div className="p-6">
      {/* Breadcrumbs */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#" className="text-[#364699]">
              Medical Program
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#" className="text-[#6c6c6c]">
              YEAR 3 - S2
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-medium text-[#333333]">YEAR 3- S3</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="h-9 w-9 border-[#d9d9d9]">
            <LayoutGrid className="h-4 w-4 text-[#6c6c6c]" />
          </Button>
          <Button variant="outline" size="icon" className="h-9 w-9 border-[#d9d9d9]">
            <FileText className="h-4 w-4 text-[#6c6c6c]" />
          </Button>
        </div>
      </div>

      <div className="mb-10">
        <Table>
          <TableHeader className="bg-[#D9D9D91A]">
            <TableRow className="border-b border-[#f5f5f5]">
              <TableHead className="w-12"></TableHead>
              <TableHead className="text-[#6c6c6c] font-medium ">Rotation</TableHead>
              <TableHead className="text-[#6c6c6c] font-medium ">From</TableHead>
              <TableHead className="text-[#6c6c6c] font-medium ">To</TableHead>
              <TableHead className="text-[#6c6c6c] font-medium">Evaluation Form</TableHead>
              <TableHead className="text-[#6c6c6c] font-medium">Grade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="border-b border-[#f5f5f5]">
              <TableCell className="py-4">
                <div className="w-10 h-10 rounded-[16px] bg-[#f5f5f5] flex items-center justify-center">
                  <Check className="h-4 w-4 text-[#00a59b]" />
                </div>
              </TableCell>
              <TableCell className="font-medium">Surgery - Hospital A</TableCell>
              <TableCell>Jan 28, 2025</TableCell>
              <TableCell>Feb 2, 2025</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  className="text-[#333333DE] p-0 h-auto hover:bg-transparent hover:underline"
                >
                  <div className="border border-[#D9D9D9] rounded p-1">
                    <Image src="/clarify.svg" alt="form" width={14} height={14} />
                  </div>
                  Form Name
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  className="text-[#333333DE] p-0 h-auto hover:bg-transparent hover:underline"
                >
                  <div className="border border-[#D9D9D9] rounded p-1">
                    <Image src="/grade.svg" alt="form" width={14} height={14} />
                  </div>{" "}
                  Gradesheet
                </Button>
              </TableCell>
            </TableRow>

            <TableRow className="border-b border-[#f5f5f5]">
              <TableCell className="py-4 ">
                <div className="w-10 h-10 rounded-[16px] bg-[#f5f5f5] flex items-center justify-center">
                  <Check className="h-4 w-4 text-[#00a59b]" />
                </div>
              </TableCell>
              <TableCell className="font-medium">Family Medicine - Hospital A</TableCell>
              <TableCell>Jan 28, 2025</TableCell>
              <TableCell>Feb 2, 2025</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  className="text-[#333333DE] p-0 h-auto hover:bg-transparent hover:underline"
                >
                  <div className="border border-[#D9D9D9] rounded p-1">
                    <Image src="/clarify.svg" alt="form" width={14} height={14} />
                  </div>
                  Form Name
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  className="text-[#333333DE] p-0 h-auto hover:bg-transparent hover:underline"
                >
                  <div className="border border-[#D9D9D9] rounded p-1">
                    <Image src="/grade.svg" alt="form" width={14} height={14} />
                  </div>{" "}
                  Gradesheet
                </Button>
              </TableCell>
            </TableRow>

            <TableRow className="border-b border-[#f5f5f5]">
              <TableCell className="py-4">
                <div className="w-10 h-10 rounded-[16px] bg-[#f5f5f5] flex items-center justify-center">
                  <Image src="/home_health.svg" alt="form" width={14} height={14} />
                </div>
              </TableCell>
              <TableCell className="font-medium">Obstetrics & Gynecology</TableCell>
              <TableCell>Jan 28, 2025</TableCell>
              <TableCell>Feb 2, 2025</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  className="text-[#333333DE] p-0 h-auto hover:bg-transparent hover:underline"
                >
                  <div className="border border-[#D9D9D9] rounded p-1">
                    <Image src="/clarify.svg" alt="form" width={14} height={14} />
                  </div>
                  Form Name
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  className="text-[#333333DE] p-0 h-auto hover:bg-transparent hover:underline"
                >
                  <div className="border border-[#D9D9D9] rounded p-1">
                    <Image src="/grade.svg" alt="form" width={14} height={14} />
                  </div>{" "}
                  Gradesheet
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Academic Sessions Table */}
      <div>
        <Table>
          <TableHeader>
            <TableRow className="border-b border-[#f5f5f5]">
              <TableHead className="w-12"></TableHead>
              <TableHead className="text-[#6c6c6c] font-medium">Academic Session</TableHead>
              <TableHead className="text-[#6c6c6c] font-medium">Location</TableHead>
              <TableHead className="text-[#6c6c6c] font-medium">From</TableHead>
              <TableHead className="text-[#6c6c6c] font-medium">To</TableHead>
              <TableHead className="text-[#6c6c6c] font-medium">Evaluation Form</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="border-b border-[#f5f5f5]">
              <TableCell className="py-4">
                <div className="w-10 h-10 rounded-[16px] bg-[#f5f5f5] flex items-center justify-center">
                  <Image src="/lecture.svg" alt="form" width={14} height={14} />
                </div>
              </TableCell>
              <TableCell className="font-medium">Lecture: Arm & Intro to Forearm</TableCell>
              <TableCell>H&S 403</TableCell>
              <TableCell>Jan 28, 2025</TableCell>
              <TableCell>Feb 2, 2025</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  className="text-[#364699] p-0 h-auto hover:bg-transparent hover:underline"
                >
                  <div className="border border-[#D9D9D9] rounded p-1">
                    <Image src="/clarify.svg" alt="form" width={14} height={14} />
                  </div>{" "}
                  Form Name
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
