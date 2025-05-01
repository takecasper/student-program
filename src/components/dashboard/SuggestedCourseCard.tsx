import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SuggestedCourseItem from './SuggestedCourseItem';

export default function SuggestedCourseCard() {
  return (
    <Card className="border border-[#D9D9D9] shadow-none rounded-[24px]">
      <CardContent className="p-4">
        <h3 className="text-3xl font-bold text-[#6c6c6c] mb-3">SUGGESTED COURSE</h3>

        <div className="space-y-3">
          <SuggestedCourseItem number="01" name="Course Name" period="Start - End" />
          <SuggestedCourseItem number="02" name="Course Name" period="Start - End" />
        </div>

        <Button variant="link" className="w-full mt-3 text-[#364699] border-[#364699] text-lg py-1">
          Explore More
        </Button>
      </CardContent>
    </Card>
  );
}
