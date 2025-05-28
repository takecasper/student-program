'use client';
import Image from 'next/image';
import { useState } from 'react';
import { Info, ChevronDown, ChevronUp } from 'lucide-react';

import MSPEPanel from '../MSPEPanel';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const users = [
  {
    id: '1',
    username: 'Medicine',
    role: 'Learner',
    status: 'Active',
    image: '/images/avatar.png',
  },
  {
    id: '2',
    username: 'Medicine',
    role: 'Learner',
    status: 'Active',
    image: '/images/avatar.png',
  },
  {
    id: '3',
    username: 'Medicine',
    role: 'Learner',
    status: 'Active',
    image: '/images/avatar.png',
  },
];
export function MSPETab() {
  const [showPanel, setShowPanel] = useState<boolean>(false);
  const [showPopover, setShowPopover] = useState<boolean>(false);

  return (
    <div className="space-y-6 p-6">
      <div className="relative w-fit">
        <span className="flex gap-2 absolute top-2 right-2 px-3 py-2 text-xs bg-[#FA8D8F] text-[#333333DE] font-semibold rounded-[10px] z-10">
          <Info className="w-4 h-4" /> Not Reviewed
        </span>
        <Card
          onClick={() => setShowPanel(true)}
          className="w-[308px] p-6 bg-white rounded-lg shadow-none hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="flex flex-col items-start gap-4">
            <div className="bg-[#F6F8FF] p-4 rounded-lg">
              <Image src="/mspe.png" alt="MSPE Form" width={267} height={100} />
            </div>
            <div className="flex-1 w-full">
              <div className="mb-2 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-[#333333]">MSPE Form</h3>
                  <p className="text-sm text-[#6C6C6C]">Sent Date: Mar 20, 2023</p>
                  <div className="h-[1px] w-full bg-[#E0E0E0]" />
                </div>

                <Popover open={showPopover} onOpenChange={setShowPopover}>
                  <PopoverTrigger onClick={e => e.stopPropagation()} asChild>
                    <div className="flex items-center bg-transparent border-[#D9D9D9] cursor-pointer rounded-full px-2 py-1 gap-[-8px] border">
                      <div className="flex -space-x-3 pr-1">
                        {users.slice(0, 2).map(user => (
                          <Avatar key={user.id} className="w-6 h-6 border-2 border-white">
                            <AvatarImage src={user.image} alt={user.username} />
                          </Avatar>
                        ))}

                        <Avatar
                          className={`${showPopover ? 'border-[#D9D9D9] text-[#333333] bg-white' : 'bg-[#B22234] border-white font-bold text-white'}  flex items-center justify-center w-6 h-6 border-2  text-[12px]`}
                        >
                          1
                        </Avatar>
                      </div>

                      {showPopover ? (
                        <ChevronUp className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      )}
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-[370px]">
                    <div className="flex items-start gap-4 px-2 py-3 w-full max-w-md">
                      {/* Red dot + Avatar */}
                      <div className="relative">
                        <span className="absolute top-[17px] left-[-14px] h-3 w-3 rounded-full bg-red-600" />
                        
                        <Avatar className=" ml-2 h-12 w-12">
                          <AvatarImage src="/avatar.png" alt="Ralph Par" />
                          <AvatarFallback>RP</AvatarFallback>
                        </Avatar>
                      </div>

                      {/* Text Content */}
                      <CardContent className="p-0 flex flex-col gap-1">
                        <p className="text-sm font-normal text-[#33333399]">
                        Ralph Par replied toyour comment
                        </p>
                        <p className="text-base font-medium text-foreground">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                        </p>
                        <div className="flex gap-4 mt-1 text-sm text-muted-foreground">
                          <button className="hover:underline">Like</button>
                          <button className="hover:underline">Reply</button>
                        </div>
                      </CardContent>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex flex-col gap-2">
                <div className="">
                  <div className="flex items-center gap-2 text-sm text-[#6C6C6C]">
                    <Image src="/hotel_class.svg" alt="MSPE Form" width={18} height={18} />
                    <span>Course Name</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
      {showPanel ? <MSPEPanel setShowPanel={setShowPanel} /> : <></>}
    </div>
  );
}
