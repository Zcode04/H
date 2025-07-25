// components/navigation/Sidebar.tsx
import React, { useState, useMemo, useCallback } from "react";
import { SquarePen, MessageSquare, LogOut, Trash2, Search, MoreHorizontal, Edit3,  } from "lucide-react";
import UserProfile from "@/components/navigation/UserProfile";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface Chat {
  id: string;
  title: string;
  date: string;
  active: boolean;
  lastMessage?: string;
  timestamp: string;
}

interface SidebarProps {
  isOpen: boolean;
  onChatSelect?: (chatId: string) => void;
  onNewChat?: () => void;
  onArchiveChat?: (chatId: string) => void;
  onDeleteChat?: (chatId: string) => void;
  className?: string;
}

export function Sidebar({
  isOpen,
  onChatSelect,
  onNewChat,
  onArchiveChat,
  onDeleteChat,
  className
}: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChatId, setSelectedChatId] = useState<string>("1");
  const [hoveredChatId, setHoveredChatId] = useState<string | null>(null);

  const [chatHistory, setChatHistory] = useState<Chat[]>([
    {
      id: "1",
      title: " المستخدم المتقدمة",
      date: "اليوم",
      active: true,
      lastMessage: "كيف يمكنني ",
      timestamp: "10:30 ص"
    },
    {
      id: "2",
      title: "والميزات الجديدة",
      date: "أمس",
      active: false,
      lastMessage: "Server Components تبدو رائعة للتطبيقات الكبيرة",
      timestamp: "03:45 م"
    },
    {
      id: "3",
      title: "استراتيجيات تصميم قواعد البيانات",
      date: "قبل يومين",
      active: false,
      lastMessage: "شكراً لك على الشرح المفصل والأمثلة العملية",
      timestamp: "11:20 ص"
    },
    {
      id: "4",
      title: " وأفضل الممارسات",
      date: "قبل 3 أيام",
      active: false,
      lastMessage: "الآن فهمت الـ Generic Types بشكل أفضل",
      timestamp: "05:15 م"
    },
    {
      id: "5",
      title: "تحليل البيانات ",
      date: "قبل أسبوع",
      active: false,
      lastMessage: "المكتبات التي اقترحتها مفيدة جداً",
      timestamp: "02:30 م"
    },
  
    
  ]);

  const filteredChats = useMemo(() => {
    if (!searchQuery.trim()) return chatHistory;
    return chatHistory.filter(chat =>
      chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [chatHistory, searchQuery]);

  const groupedChats = useMemo(() => {
    const groups: { [key: string]: Chat[] } = {};

    filteredChats.forEach(chat => {
      const key = chat.date;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(chat);
    });

    return groups;
  }, [filteredChats]);

  const handleChatSelect = useCallback((chatId: string) => {
    setSelectedChatId(chatId);
    onChatSelect?.(chatId);
  }, [onChatSelect]);

  const handleNewChat = useCallback(() => {
    const newChatId = `chat_${Date.now()}`;
    const newChat: Chat = {
      id: newChatId,
      title: "محادثة جديدة",
      date: "اليوم",
      active: true,
      lastMessage: "",
      timestamp: new Date().toLocaleTimeString('ar-SA', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })
    };

    setChatHistory(prev => [newChat, ...prev.map(chat => ({ ...chat, active: false }))]);
    setSelectedChatId(newChatId);
    onNewChat?.();
  }, [onNewChat]);

  const handleDelete = useCallback((chatId: string) => {
    setChatHistory(prev => prev.filter(chat => chat.id !== chatId));
    onDeleteChat?.(chatId);
  }, [onDeleteChat]);

  const handleArchive = useCallback((chatId: string) => {
    setChatHistory(prev => prev.filter(chat => chat.id !== chatId));
    onArchiveChat?.(chatId);
  }, [onArchiveChat]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden transition-opacity duration-300"
        />
      )}
      <div className={cn(
        "fixed justify-items-center mt-2 h-3/4 z-30 transition-transform duration-300 ease-in-out rounded-l-2xl",
        "w-65 bg-gradient-to-tr from-green-50 via-white to-green-50",
        "dark:from-gray-700 dark:via-gray-800 dark:to-gray-900",
        "shadow-2xl backdrop-blur-xl",
        "font-cairo flex flex-col",
        isOpen ? "translate-x-0" : "translate-x-full",
        className
      )}>
        <div className="flex-shrink-0 p-2 -mt-8 border-b border-blue-200/30 dark:border-blue-800/20">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center"></div>
          </div>

          <Button
            onClick={handleNewChat}
            className={cn(

             "h-10 transition-all duration-200 font-cairo rounded-full",
                "bg-gradient-to-l from-gray-300 to-gray-50 dark:from-gray-900 dark:to-gray-600 hover:from-green-400 hover:to-greeen-400 backdrop-blur-sm",
                "border-gray-950/10 dark:border-gray-950/100",
                "focus:border-green-400 dark:focus:border-green-500  dark:hover:from-gray-100 ",
                "focus:ring-2 focus:ring-blue-200/50 dark:focus:ring-green-800/50",
                "placeholder:text-slate-500 dark:placeholder:text-slate-500"


            )}
            aria-label="مردّه جديدّ"
          >
            <SquarePen className="h-5 w-5  text-gray-900  dark:text-green-400" />
                          <span className="font-medium font-cairo text-gray-900 dark:text-green-50 p-2  ">مردّه جديدّ</span>
          </Button>
        </div>

        <div className="flex-shrink-0 px-6 py-3">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-950 dark:text-green-400 z-40 " />
            <Input
              placeholder="دَيّرهونْ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(

                "pr-10 h-10 transition-all duration-200 font-cairo rounded-full",
                "bg-gradient-to-l from-gray-200 to-gray-50 dark:from-gray-900 dark:to-gray-600 hover:from-green-400  backdrop-blur-sm",
                "border-gray-950/10 dark:border-gray-950/100     dark:hover:from-gray-100 ",
                "focus:border-green-400 dark:focus:border-green-500",
                "focus:ring-2 focus:ring-blue-200/50 dark:focus:ring-green-800/50",
                "placeholder:text-slate-500 dark:placeholder:text-slate-500"


              )}
              aria-label="دَيّر"
            />
          </div>
        </div>

        <div className="flex-1 min-h-0 px-2">
          <ScrollArea className="h-full">
            <div className="space-y-6 w-60">
              {Object.entries(groupedChats).map(([dateGroup, chats]) => (
                <div key={dateGroup}>
                  <div className="flex items-center gap-2 px-3 py-2 mb-3">
                    
                  
                    <div className="flex-1 h-px bg-gradient-to-r from-green-500  to-transparent  dark:from-green-500"></div>
                  </div>

                  <div className="space-y-2">
                    {chats.map((chat) => (
                      <ChatItem
                        key={chat.id}
                        chat={chat}
                        isSelected={selectedChatId === chat.id}
                        isHovered={hoveredChatId === chat.id}
                        onSelect={() => handleChatSelect(chat.id)}
                        onHover={setHoveredChatId}
                        onArchive={() => handleArchive(chat.id)}
                        onDelete={() => handleDelete(chat.id)}
                      />
                    ))}
                  </div>
                </div>
              ))}
              {filteredChats.length === 0 && searchQuery && (
                <div className="text-center py-12">
                  <div className="w-10 h-10 mx-auto mb-4 rounded-full bg-gradient-to-r from-gray-950 to-gray-950 dark:from-green-500 dark:to-green-600 flex items-center justify-center">
                    <MessageSquare className="h-6 w-6 text-green-200 dark:text-green-400" />
                  </div>
                  <p className="text-sm font-medium text-gray-900 dark:text-green-500 mb-1 font-cairo">
                    ماهونْ مردّ  ذنبته
                  </p>
                  <p className="text-xs text-gray-900 dark:text-green-500 font-cairo">
                    دير بشي ماه ذّ
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        <Separator className="bg-gradient-to-r from-transparent via-gray-50 to-transparent dark:via-gray-950" />

        <div className="flex-shrink-0 p-4 space-y-1">
          <UserProfile name="AHMED" />

          <Button
            variant="ghost"
            onClick={() => console.log("نوخظ")}
            className={cn(



                "pr-10 h-10 transition-all duration-200 font-cairo rounded-full",
                "bg-gradient-to-l from-gray-200 to-gray-50 dark:from-gray-900 dark:to-gray-600 hover:from-green-400 backdrop-blur-sm",
                "border-gray-950/10 dark:border-gray-950/100",
                "focus:border-green-400 dark:focus:border-green-500 dark:hover:from-gray-100 ",
                "focus:ring-2 focus:ring-blue-200/50 dark:focus:ring-green-800/50",
                "placeholder:text-slate-500 dark:placeholder:text-slate-500"



            )}
            aria-label="نوخظ"
          >
            <LogOut className="h-6 w-6 absolute inset-y-2 right-2 text-gray-900 dark:text-green-400"/>
            <span className="font-cairo text-gray-900 dark:text-green-400">نَـــــوْخَـــــظْ</span>
          </Button>
        </div>
      </div>
    </>
  );
}

interface ChatItemProps {
  chat: Chat;
  isSelected: boolean;
  isHovered: boolean;
  onSelect: () => void;
  onHover: (chatId: string | null) => void;
  onArchive: () => void;
  onDelete: () => void;
}

function ChatItem({
  chat,
  isSelected,
  
  onSelect,
  onHover,
  
  onDelete
}: ChatItemProps) {
  return (
    <div
      className={cn(
        "group relative rounded-xl p-4 cursor-pointer transition-all duration-200 active:scale-[0.98]",
        isSelected
          ? "bg-gradient-to-tr from-green-400 via-green-200 to-green-400 border dark:from-gray-600 dark:via-gray-900 dark:to-zinc-950 border-green-400/100 dark:border-green-300/30 shadow-md backdrop-blur-sm"
          : "hover:bg-rad-500 dark:hover:bg-gray-950 border border-green-500/30 hover:border-gray-900/20 dark:hover:border-green-300/20 hover:shadow-lg backdrop-blur-sm"
      )}
      onClick={onSelect}
      onMouseEnter={() => onHover(chat.id)}
      onMouseLeave={() => onHover(null)}
      tabIndex={0}
      aria-pressed={isSelected}
	    aria-label={` مردّ: ${chat.title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className={cn(
              "h-4 w-4 transition-colors",
              isSelected ? "text-gray-950 border-green-500 dark:text-green-500" : "text-gray-950 dark:text-green-400"
            )} />
            <h3 className={cn(
              "text-sm font-semibold truncate transition-colors font-cairo",
              isSelected ? "text-gray-950 dark:text-green-400" : "text-green-500 dark:text-green-500"
            )}>
              {chat.title}
            </h3>
          </div>

          {chat.lastMessage && (
            <p className="text-xs text-gray-800 dark:text-green-300 line-clamp-2 mb-2 leading-relaxed font-cairo">
              {chat.lastMessage}
            </p>
          )}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "h-5 w-5 -p-8  transition-all duration-200 rounded-full",
                "  bg-green-50 dark:bg-green-500 border-green-500/30",
                ""
              )}
              onClick={(e) => e.stopPropagation()}
              aria-label="ختر مردة"
            >
              <MoreHorizontal className="h-4 w-4  text-green-500 dark:text-green-50  dark:border-green-400/90" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-40 h-20 bg-white/95 dark:bg-gray-800 backdrop-blur-md border-green-500/100 dark:border-green-600/90 font-cairo">
            <DropdownMenuItem
              onClick={(e) => { e.stopPropagation(); /* إعادة تسمية */ }}
              className="text-gray-950 hover:bg-green-400 dark:text-green-400  dark:hover:bg-green-800"
            >
              <Edit3 className="h-4 w-4 text-gray-950  dark:text-green-400 ml-2" />
              إعادة تسمية
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={(e) => { e.stopPropagation(); onDelete(); }}
              className="text-gray-950 hover:bg-green-400  dark:text-green-400  dark:hover:bg-green-900 "
            >
              <Trash2 className="h-4 w-4 ml-2 text-gray-950 dark:text-green-400" />
              حذف
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}