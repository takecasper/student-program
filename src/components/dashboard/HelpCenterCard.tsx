import { Button } from '@/components/ui/button';
import Image from 'next/image';

export function HelpCenterCard() {
  return (
    <div className="mt-[3rem] py-6 relative px-4 bg-gradient-to-b from-[#6A6EEC] to-[#606AAA] text-white rounded-3xl m-3">
      {/* Send icon in a circle */}
      <div className="absolute top-0 left-0 right-0 flex justify-center -translate-y-1/2">
        <div className="bg-white border border-[#6A6EEC] items-center justify-center flex rounded-full w-12 h-12">
          <Image src="/send.svg" alt="Help Center Icon" width={20} height={20} />
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center justify-center text-center">
          <h3 className="font-bold text-sm mb-1">Help Center</h3>
          <p className="text-xs text-white/80 mb-3">
            Have a problem?
            <br />
            Send us a message!
          </p>
        </div>
        {/* <div className="flex justify-end mb-2">
          <Image src="/logo_sheltr.png" alt="Shelter Link Logo" width={80} height={50} />
        </div> */}
      </div>
      <Button
        size="sm"
        className="w-full bg-white text-[#6a6eec] hover:bg-white/90 text-xs font-medium"
      >
        Go to Help Center
      </Button>
    </div>
  );
}
