// MediaButtons.tsx (الإصدار المصحَّح)
'use client';
import { Power , Image as ImageIcon, Video, FileText, Music,  ChevronRight,  } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
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
  
  toggleSidebar,
  onMediaSelect,
}: MediaButtonsProps) => {
  const handleMediaSelect = (mediaType: string) => onMediaSelect?.(mediaType);

  const mediaOptions = [
    { icon: ImageIcon, label: 'صورة', type: 'image', color: 'text-green-50 dark:text-green-400' },
    { icon: Video, label: 'فيديو', type: 'video', color: 'text-green-50 dark:text-green-400' },
    { icon: FileText, label: 'مستند', type: 'document', color: 'text-green-50 dark:text-green-400' },
    { icon: Music, label: 'صوت', type: 'audio', color: 'text-green-50 dark:text-green-400' },
  ];

  return (
    <div className="flex justify-center items-center gap-3 mt-3">
      <TooltipProvider>
        {toggleSidebar && (
          <Tooltip>
            <TooltipTrigger asChild>
              <SidebarToggleButton toggleSidebar={toggleSidebar} />
            </TooltipTrigger>

          </Tooltip>
        )}

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={onSendMessage}
              
              size="icon"
              className={`h-10 w-10 rounded-full text-green-200 border-green-400 bg-gradient-to-b from-green-900 via-green-600 to-green-700 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950 dark:text-green-400 dark:border-green-400/40 hover:bg-blue-100 dark:hover:bg-blue-900/3 shadow-md hover:shadow-lg transition-all duration-200 `}
            >
              
                
               
                <Power className="h-6 w-6 text-white absolute bottom-6 dark:text-green-50" />
              
            </Button>
          </TooltipTrigger>
       
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-6 w-12 rounded-full  border-green-400 bg-gradient-to-b from-green-600 to-green-700 dark:from-gray-900 dark:to-gray-950 dark:text-green-400 dark:border-green-400/40 hover:bg-blue-100 dark:hover:bg-blue-900/3 transition-colors duration-200 shadow-sm"
                  aria-label="إرفاق وسائط"
                >
                  <ChevronRight className="h-5 w-5 text-green-200 hover:rotate-100 transition-transform duration-400" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                side="top"
                className="w-60 p-3 bg-gradient-to-r from-green-500 to-emerald-800 border-green-400/40 dark:to-gray-900 dark:from-gray-600   rounded-xl shadow-xl mb-2"
              >
                <div className="grid grid-cols-2 gap-2">
                  {mediaOptions.map(({ icon: Icon, label, type, color }) => (
                    <Button
                      key={type} // key فريد بدل index
                      variant="outline"
                      className={`flex items-center gap-2 p-3 h-auto justify-start ${color}  border-green-400/30 hover:bg-green-400 dark:hover:bg-green-50  duration-200`}
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
       
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default MediaButtons;