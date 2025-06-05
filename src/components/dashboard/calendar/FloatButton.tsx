import { AlertTriangle, Hourglass, Stamp } from "lucide-react";

export const FloatButton = () => {
  return (
    <div className="fixed right-15 bottom-5 flex flex-col items-center gap-3 z-50">
      <div className="relative">
        <button className="bg-white shadow-md rounded-full w-10 h-10 flex items-center justify-center">
          <AlertTriangle className="h-5 w-5 text-[#666]" />
        </button>
        <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          4
        </span>
      </div>
      <button className="bg-white shadow-md rounded-full w-10 h-10 flex items-center justify-center">
        <Hourglass className="h-5 w-5 text-[#666]" />
      </button>
      <button className="bg-white shadow-md rounded-full w-10 h-10 flex items-center justify-center">
        <Stamp className="h-5 w-5 text-[#666]" />
      </button>
    </div>
  );
};
