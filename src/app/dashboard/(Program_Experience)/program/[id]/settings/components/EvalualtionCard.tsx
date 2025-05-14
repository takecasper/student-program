import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

import { EvaluationData } from '../types';

const EvaluationCard: React.FC<EvaluationData> = ({
  date,
  users,
  formName,
  completion,
  courseName,
}) => {
  return (
    <Card className="rounded-2xl border border-gray-200 shadow-sm relative pb-0">
      {/* Completion Badge */}
      <div className="absolute top-3 right-2 z-10">
        <div className="rounded-full font-medium h-[40px] bg-[#FCEDCA] text-sm px-4 py-1 text-black flex items-center gap-2 border border-gray-300 shadow-sm">
          <span className="h-2 w-2 rounded-full bg-yellow-400" />
          Completion: <span className="font-medium">{completion}</span>
        </div>
      </div>

      <CardContent className="p-4">
        {/* Thumbnail */}
        <div className="rounded-xl overflow-hidden bg-muted">
          <Image
            width={400}
            height={113}
            alt="Form Preview"
            src="/images/card-image.png"
            className="w-full h-[113px] object-cover"
          />
        </div>

        {/* Title & Meta */}
        <div className="flex justify-between items-start mt-4">
          <div>
            <h3 className="text-[20px] font-bold text-[#575757]">{formName}</h3>
            <p className="text-[12px] text-[#858585] mt-0">Sent Date: {date}</p>
          </div>

          <div className="flex items-center bg-transparent border-[#D9D9D9] rounded-full px-2 py-1 gap-[-8px] border">
            <div className="flex -space-x-2 pr-1">
              {users.slice(0, 2).map(user => (
                <Avatar key={user.id} className="w-6 h-6 border-2 border-white">
                  <AvatarImage src={user.image} alt={user.username} />
                </Avatar>
              ))}
            </div>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>
        </div>

        <div className="border-t border-gray-200 my-4" />

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Image
            width={16}
            height={16}
            alt="stars"
            src="/svgs/hotel_class.svg"
            className="object-cover"
          />{' '}
          {courseName}
        </div>
      </CardContent>
    </Card>
  );
};

export default EvaluationCard;
