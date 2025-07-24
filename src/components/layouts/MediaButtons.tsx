// MediaButtons.tsx (الإصدار المصحَّح)
'use client';
import { Power ,ChevronDown, Image as ImageIcon, Video, FileText, Music,  } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { SidebarToggleButton } from '@/components/navigation/SidebarToggleButton';

interface MediaButtonsProps {
  onSendMessage: () => void;
  isValidMessage: boolean;
  isLoading: boolean;
  toggleSidebar?: () => void;
  onMediaSelect?: (mediaType: string) => void;
}

const MediaButtons = ({
  onSendMessage,
  isValidMessage,
  isLoading,
  toggleSidebar,
  onMediaSelect,
}: MediaButtonsProps) => {
  const handleMediaSelect = (mediaType: string) => onMediaSelect?.(mediaType);

  const mediaOptions = [
    { icon: ImageIcon, label: 'صورة', type: 'image', color: 'text-green-500' },
    { icon: Video, label: 'فيديو', type: 'video', color: 'text-green-500' },
    { icon: FileText, label: 'مستند', type: 'document', color: 'text-green-500' },
    { icon: Music, label: 'صوت', type: 'audio', color: 'text-green-500' },
  ];

  return (
    <div className="flex justify-center items-center gap-3 mt-3">
      <TooltipProvider>
        {toggleSidebar && (
          <Tooltip>
            <TooltipTrigger asChild>
              <SidebarToggleButton toggleSidebar={toggleSidebar} />
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>تبديل الشريط الجانبي</p>
            </TooltipContent>
          </Tooltip>
        )}

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={onSendMessage}
              disabled={!isValidMessage || isLoading}
              size="icon"
              className={`h-10 w-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-700 dark:to-gray-50 dark:from-gray-50 hover:from-green-600 hover:to-emerald-700 shadow-md hover:shadow-lg transition-all duration-200 ${!isValidMessage || isLoading ? 'opacity-70' : 'opacity-100'}`}
            >
              
                
               :
                <Power className="h-5 w-5 text-white absolute bottom-7 dark:text-green-600" />
              
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>إرسال</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-full text-green-600 dark:text-green-100 border-green-500 dark:border-green-400 bg-green-500 hover:bg-green-500 dark:hover:bg-green-500/30 transition-colors duration-200 shadow-sm"
                  aria-label="إرفاق وسائط"
                >
                  <ChevronDown className="h-5 w-5 text-gray-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                side="top"
                className="w-60 p-3 bg-gradient-to-r from-green-500 to-emerald-800 dark:to-gray-100 dark:from-gray-100 border-green-400 dark:border-emerald-900 rounded-xl shadow-xl mb-2"
              >
                <div className="grid grid-cols-2 gap-2">
                  {mediaOptions.map(({ icon: Icon, label, type, color }) => (
                    <Button
                      key={type} // key فريد بدل index
                      variant="outline"
                      className={`flex items-center gap-2 p-3 h-auto justify-start ${color} border-green-600 dark:border-green-500 hover:bg-green-500 dark:hover:bg-green-500 transition-colors duration-200`}
                      onClick={() => handleMediaSelect(type)}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-sm">{label}</span>
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>إرفاق وسائط</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default MediaButtons;