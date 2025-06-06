import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SuggestedCourseItem from './SuggestedCourseItem';

export default function SuggestedCourseCard() {
  return (
    <Card className="border border-[#D9D9D9] shadow-none rounded-[24px] h-[240px] p-2">
      <CardContent className="p-1">
        <h3 className="text-2xl font-bold text-[#6c6c6c] ">SUGGESTED</h3>
        <h3 className="text-2xl font-bold text-[#6c6c6c] mb-1">COURSE</h3>

        <div className="space-y-1">
          <SuggestedCourseItem number="01" name="Course Name" period="Start Date - End Date" />
          <SuggestedCourseItem number="02" name="Course Name" period="Start Date - End Date" />
        </div>

        <Button variant="link" className="w-full text-[#364699] border-[#364699] text-lg py-1">
          Explore More
        </Button>
      </CardContent>
    </Card>
  );
}
