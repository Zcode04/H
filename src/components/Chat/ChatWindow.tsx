// chatWindows.tsx (المصحَّح)
'use client';
import { ChatMessage as ChatMessageType } from '@/lib/api-config';
import ChatMessage from '@/components/Chat/ChatMessage';
import { useRef, useEffect } from 'react';
import {  MessageCircle, Code, Edit3, BookOpen, Briefcase, PenTool} from 'lucide-react';
import Image from 'next/image';

interface ChatWindowProps {
  messages: ChatMessageType[];
  isLoading: boolean;
  onSuggestionClick?: (suggestionPrompt: string) => void;
}

export default function ChatWindow({ messages, isLoading, onSuggestionClick }: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const smartSuggestions = [
    { icon: Edit3, text: 'كتابة مقال احترافي', prompt: 'ساعدني في كتابة مقال احترافي عن موضوع: ', color: 'from-green-600 to-green-500' },
    { icon: Code, text: 'مراجعة وتحسين الكود', prompt: 'راجع وحسّن هذا الكود:\n\n', color: 'from-green-600 to-green-500' },
    { icon: MessageCircle, text: 'ترجمة نصوص', prompt: 'ترجم هذا النص إلى الإنجليزية:\n\n', color: 'from-green-600 to-green-500' },
    { icon: BookOpen, text: 'شرح المفاهيم المعقدة', prompt: 'اشرح لي هذا المفهوم ببساطة: ', color: 'from-green-600 to-green-500' },
    { icon: Briefcase, text: 'خطة عمل تجارية', prompt: 'ساعدني في إنشاء خطة عمل لمشروع: ', color: 'from-green-600 to-green-500' },
    { icon: PenTool, text: 'كتابة إبداعية', prompt: 'اكتب لي قصة قصيرة أو قصيدة عن: ', color: 'from-green-600 to-green-500' },
  ];

  const handleSuggestionClick = (item: typeof smartSuggestions[0]) => {
    onSuggestionClick?.(item.prompt);
  };

  return (
    <div className="flex-1 overflow-y-auto relative [&::-webkit-scrollbar]:hidden">
      {/* خلفية ثابتة */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gray-100 dark:bg-gray-900" />
      </div>

      <div className="relative z-10 p-4 sm:p-6">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
            <div className="max-w-5xl w-full text-center px-4">
              <div className="mb-8 animate-fade-in">
                <Image src="/THG.svg" alt="Logo" width={96} height={96} className="mx-auto mb-4 h-36 sm:h-16 md:h-24 -mt-8 w-auto" />
              </div>

              {/* اقتراحات – key فريد */}
              <div className="suggestions-container flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-8 max-w-4xl mx-auto">
                {smartSuggestions.map((item, idx) => (
                  <button
                    key={`${item.text}-${idx}`} // key فريد
                    onClick={() => handleSuggestionClick(item)}
                    className="suggestion-button group flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 bg-white/20 dark:bg-gray-900/30 backdrop-blur-xl border border-gray-300/40 dark:border-gray-600/30 rounded-full hover:bg-white/30 dark:hover:bg-gray-950/30 transition-all duration-300 cursor-pointer hover:scale-[1.02] hover:shadow-lg hover:shadow-green-500/20 dark:hover:shadow-green-400/20 active:scale-[0.95]"
                    style={{ animationDelay: `${0.1 + idx * 0.03}s` }}
                  >
                    <div className={`w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300 flex-shrink-0`}>
                      <item.icon className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white drop-shadow-sm" />
                    </div>
                    <span className="suggestion-text text-gray-800 dark:text-gray-200 font-medium text-xs sm:text-sm group-hover:text-green-500 dark:group-hover:text-gray-400 transition-colors whitespace-nowrap">
                      {item.text}
                    </span>
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 rounded-full transition-opacity duration-300`} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6 max-w-4xl mx-auto">
            {messages?.map(msg => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            {isLoading && (
              <div className="flex items-start gap-4 p-6 animate-slide-up">
                <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                  <Image src="/DHG.svg" alt="Had Logo" width={32} height={32} className="w-full h-full object-contain" />
                </div>
                <div className="flex flex-col items-start">
                  <div className="flex items-center gap-1 mb-2">
                    <div className="w-2 h-2 bg-green-400 dark:bg-green-500 rounded-full animate-pulse-dot" />
                    <div className="w-2 h-2 bg-green-300 dark:bg-green-600 rounded-full animate-pulse-dot" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-pulse-dot" style={{ animationDelay: '0.4s' }} />
                  </div>
                  <span className="text-green-600 dark:text-green-400 text-sm font-medium">حني شوي</span>
                </div>
              </div>
            )}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-dot {
          0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
          40%           { transform: scale(1);   opacity: 1;   }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        .animate-slide-up {
          opacity: 0;
          animation: slide-up 0.6s ease-out forwards;
        }
        .animate-pulse-dot {
          animation: pulse-dot 1.4s ease-in-out infinite;
        }
        @media (max-width: 640px) {
          .flex-wrap { justify-content: center; }
        }
        @media (max-width: 480px) {
          .suggestion-button {
            font-size: 0.7rem !important;
            padding: 0.375rem 0.625rem !important;
          }
          .suggestion-button .w-4 {
            width: 0.875rem !important;
            height: 0.875rem !important;
          }
          .suggestion-button .w-2\\.5 {
            width: 0.5rem !important;
            height: 0.5rem !important;
          }
        }
      `}</style>
    </div>
  );
}