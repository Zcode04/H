// ChatFooter.tsx
'use client';
import { useRef } from 'react';
import { isValidMessage } from '@/lib/utils';
import InputArea from './InputArea';
import ActionButtons from './ActionButtons';
import MediaButtons from './MediaButtons';

interface ChatFooterProps {
  inputMessage: string;
  setInputMessage: (message: string) => void;
  onSendMessage: () => void;
  isLoading: boolean;
  toggleSidebar?: () => void;
  onActionClick?: (action: string) => void;
  onMediaSelect?: (mediaType: string) => void;
}

const ChatFooter = ({ 
  inputMessage, 
  setInputMessage, 
  onSendMessage, 
  isLoading, 
  toggleSidebar, 
  onActionClick,
  onMediaSelect 
}: ChatFooterProps) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  return (
    <footer className="p-4 relative z-10 -mt-9">
      <div className="max-w-4xl mx-auto">
        
          

         

        
        
        {/* Action Buttons */}
       
        <ActionButtons onActionClick={onActionClick} />
         
        {/* Input Area */}
        <InputArea
          ref={inputRef}
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          onKeyPress={handleKeyPress}
          isLoading={isLoading}
        />
        
        {/* Media and Send Buttons */}
        <MediaButtons
          onSendMessage={onSendMessage}
          isValidMessage={isValidMessage(inputMessage)}
          isLoading={isLoading}
          toggleSidebar={toggleSidebar}
          onMediaSelect={onMediaSelect}
        />
      </div>
    </footer>
  );
};

export default ChatFooter;