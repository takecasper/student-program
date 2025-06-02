import React from 'react';
import Image from 'next/image';
import { Download } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';

type MarketPlacePopoverProps = {
  setIsOpen: (isOpen: boolean) => void;
};

const MarketPlacePopover = ({ setIsOpen }: MarketPlacePopoverProps) => {
  return (
    <div className="absolute z-50 bottom-[0px] left-[4rem]">
      <Card
        onMouseLeave={() => setIsOpen(false)}
        className="w-[330px]  h-[280px] rounded-2xl shadow-md"
      >
        <CardContent className="p-4 py-0">
          <Tabs defaultValue="myapps" className="w-full">
            <TabsList className="border border-[#D9D9D9]  bg-white w-full flex justify-between py-[10px] rounded-full mb-4">
              <TabsTrigger
                value="myapps"
                className="cursor-pointer group h-[30px] w-1/2 data-[state=active]:bg-[#364699] data-[state=active]:text-white text-[#333333DE] rounded-full"
              >
                <Download
                  height={14}
                  width={14}
                  className="mr-1 group-data-[state=active]:text-white text-[##333333DE]"
                />
                My Apps
              </TabsTrigger>
              <TabsTrigger
                value="marketplace"
                className="cursor-pointer group h-[30px] w-1/2 data-[state=active]:bg-[#364699] data-[state=active]:text-white text-[#333333DE] rounded-full"
              >
                Marketplace
              </TabsTrigger>
            </TabsList>

            <ScrollArea className="h-full">
              <div className="space-y-4 max-h-[12rem] overflow-auto">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        width={48}
                        height={48}
                        alt="App Logo"
                        className="object-cover"
                        src="/images/app-placeholder.png"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">App Name</p>
                      <p className="text-sm text-muted-foreground">Description of the app</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketPlacePopover;
