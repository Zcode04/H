'use client';

import dynamic from 'next/dynamic';
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Music, Code2, Globe, MoreHorizontal, PhoneCall } from 'lucide-react';
import VoiceRecorder from '../voice/VoiceRecorder';

// ✅ استدعاء المكونات بشكل ديناميكي
const VideoCallAction = dynamic(() => import('@/components/actions/VideoCallAction'), { ssr: false });
const PhoneCallAction = dynamic(() => import('@/components/actions/PhoneCallAction'), { ssr: false });





interface ActionButtonsProps {
  onActionClick?: (action: string) => void;
}

const ActionButtons = ({ onActionClick }: ActionButtonsProps) => {
  const handleActionClick = (action: string) => {
    if (onActionClick) {
      onActionClick(action);
    }
  };

  const mobileActions = [
    { icon: Music, label: "موسيقى", action: "music" },
    { icon: Code2, label: "برمجة", action: "coding" },
    { icon: Globe, label: "البحث في الويب", action: "web_search" },
  ];

  return (
    <div className="mb-3 flex flex-wrap gap-2 justify-center">

          <VoiceRecorder />

      <TooltipProvider>
        {/* زر الاتصال */}
        <div className="flex gap-2"> 
         
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 rounded-full text-green-200 border-green-400 bg-gradient-to-b from-green-600 to-green-700 dark:from-gray-900 dark:to-gray-950 dark:text-green-400 dark:border-green-400/40 hover:bg-blue-100 dark:hover:bg-blue-900/30"
              >
                <PhoneCall className="h-4 w-4" />
              </Button>
              
            </PopoverTrigger>
            <PopoverContent className="flex flex-wrap gap-2 justify-center w-40 p-4 bg-white dark:bg-gray-900 border border-green-400 dark:border-green-500 rounded-xl shadow-xl">
              <VideoCallAction />
              <PhoneCallAction />
            </PopoverContent>
          </Popover>

         
        </div>

        {/* باقي الأدوات */}
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 rounded-full text-green-200 border-green-400 bg-gradient-to-b from-green-600 to-green-700 dark:from-gray-900 dark:to-gray-950 dark:text-green-400 dark:border-green-400/40 hover:bg-blue-100 dark:hover:bg-blue-900/30"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="flex flex-wrap gap-2 justify-center w-40 p-4 bg-white dark:bg-gray-900 border border-green-400 dark:border-green-500 rounded-xl shadow-xl">
              {mobileActions.map(({ icon: Icon, label, action }, index) => (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-9 w-9 rounded-full text-green-600 dark:text-green-400 border-green-400 dark:border-blue-900 hover:bg-green-100 dark:hover:bg-green-400/30"
                      aria-label={label}
                      onClick={() => handleActionClick(action)}
                    >
                      <Icon className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>{label}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </PopoverContent>
          </Popover>
        </div>
      </TooltipProvider>
    </div>
  );
};

export default ActionButtons;
