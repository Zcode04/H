// InputArea.tsx
'use client';
import { forwardRef } from 'react';
import { Textarea } from "@/components/ui/textarea";

interface InputAreaProps {
  inputMessage: string;
  setInputMessage: (message: string) => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  isLoading: boolean;
  placeholder?: string;
}

const InputArea = forwardRef<HTMLTextAreaElement, InputAreaProps>(
  ({ inputMessage, setInputMessage, onKeyPress, isLoading, placeholder = "اكتب رسالتك هنا..." }, ref) => {
    return (
      <div className="relative px-8">
       
          
        
          
        <Textarea
          ref={ref}
          placeholder={placeholder}
          className="w-full resize-none px-8 py-8 rounded-full min-h-[80px] max-h-[100px] overflow-y-auto border bg-gradient-to-br from-gray-200 via-gray-100 to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-950 dark:text-white text-gray-800 border-green-500/80 dark:border-green-500/40 focus:ring-0 focus:ring-green-500 focus:border-green-500 transition-all duration-200 [&::-webkit-scrollbar]:hidden"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={onKeyPress}
          disabled={isLoading}
        />
      </div>
    );
  }
);

InputArea.displayName = 'InputArea';

export default InputArea;