import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import TodoListItem from "../ToDoListItem";
import SummaryCard from "./SummaryCard";
import CourseCard from "./CourseCard";
import CategoryCard from "./CategoryCard";
import SuggestedCourseCard from "./SuggestedCourseCard";

// Main component
export default function DashboardContent() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-[60%_40%] gap-6">
        <div className="space-y-6">
          {/* Dashboard Summary */}
          <h2 className="text-lg font-medium text-[#333333]">DASHBOARD</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SummaryCard iconSrc="/golf_course.svg" title="Ongoing Course" value="1" />
            <SummaryCard iconSrc="hotel_class.svg" title="Upcoming Sessions" value="3" />
          </div>

          {/* My Course */}
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-[#333333]">MY COURSE</h2>

            <Tabs defaultValue="s2">
              <TabsList className="bg-transparent border-b border-[#f5f5f5] justify-start p-0 h-auto border-none">
                {[
                  { value: "s1", label: "S1" },
                  { value: "s2", label: "S2 - current" },
                  { value: "s3", label: "S3" },
                  { value: "s4", label: "S4" },
                ].map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="rounded-[10px] py-1 px-4 data-[state=active]:bg-[#364699] data-[state=active]:text-white border border-[#d9d9d9] bg-white text-[#333333] mr-2"
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <CourseCard
                number="01"
                title="Clinical Anatomy"
                dateRange="July 2024 - Sept 20, 2024"
                progress={100}
                isCompleted={true}
              />
              <CourseCard
                number="02"
                title="Immunology"
                dateRange="Jan 2025 - May 2025"
                progress={65}
                isCompleted={false}
              />
            </div>
          </div>

          {/* Suggested Courses & Tests */}
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-[#333333]">SUGGESTED COURSES & TESTS</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <SuggestedCourseCard />

              <CategoryCard
                imageSrc="/category1.png"
                category="CATEGORY"
                title="Social Skill"
                description="Test - 1 Hour Session"
              />

              <CategoryCard
                imageSrc="/category1.png"
                category="CATEGORY"
                title="Social Skill"
                description="Test - 2 Hours Session"
              />
            </div>
          </div>
        </div>

        {/* To-Do List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-[#333333]">TO-DO LIST</h2>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3 9H21M3 15H21M9 3V21M15 3V21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          </div>

          <ScrollArea className="h-[600px]">
            <div className="space-y-3">
              {[
                { day: "Wed", date: "28", time: "09:00 - 11:00", isTest: true },
                { day: "Thu", date: "29", time: "09:00 - 11:00", isForm: true },
                { day: "Fri", date: "30", time: "09:00 - 11:00", isSession: true },
                { day: "Sat", date: "31", time: "09:00 - 11:00", isSession: true },
                { day: "Mon", date: "2", time: "09:00 - 11:00", isSession: true },
              ].map((item, index) => (
                <TodoListItem
                  key={index}
                  day={item.day}
                  date={item.date}
                  time={item.time}
                  sessionName="Session Name"
                  courseName="Course Name"
                  isTest={item.isTest}
                  isForm={item.isForm}
                  isSession={item.isSession}
                />
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
