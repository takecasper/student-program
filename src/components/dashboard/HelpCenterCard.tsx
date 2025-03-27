import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export function HelpCenterCard() {
  return (
    <div className="p-4 bg-[#6a6eec] text-white rounded-lg m-3 relative overflow-hidden">
      <div className="absolute top-0 right-0 opacity-10">
        <svg
          width="80"
          height="80"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
        </svg>
      </div>
      <div className="relative z-10">
        <div className="flex items-center justify-center w-8 h-8 bg-white bg-opacity-20 rounded-full mb-2">
          <Send className="h-4 w-4 text-white" />
        </div>
        <h3 className="font-bold text-sm mb-1">Help Center</h3>
        <p className="text-xs text-white/80 mb-3">
          Have a problem?
          <br />
          Send us a message!
        </p>
        <Button size="sm" className="w-full bg-white text-[#6a6eec] hover:bg-white/90 text-xs font-medium">
          Go to Help Center
        </Button>
      </div>
    </div>
  );
}
