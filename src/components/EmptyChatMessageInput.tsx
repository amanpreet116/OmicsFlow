import { ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import CopilotToggle from './MessageInputActions/Copilot';
import Focus from './MessageInputActions/Focus';
import Optimization from './MessageInputActions/Optimization';
import Attach from './MessageInputActions/Attach';
import { File } from './ChatWindow';

const EmptyChatMessageInput = ({
  sendMessage,
  focusMode,
  setFocusMode,
  optimizationMode,
  setOptimizationMode,
  fileIds,
  setFileIds,
  files,
  setFiles,
}: {
  sendMessage: (message: string) => void;
  focusMode: string;
  setFocusMode: (mode: string) => void;
  optimizationMode: string;
  setOptimizationMode: (mode: string) => void;
  fileIds: string[];
  setFileIds: (fileIds: string[]) => void;
  files: File[];
  setFiles: (files: File[]) => void;
}) => {
  const [copilotEnabled, setCopilotEnabled] = useState(false);
  const [message, setMessage] = useState('');

  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeElement = document.activeElement;

      const isInputFocused =
        activeElement?.tagName === 'INPUT' ||
        activeElement?.tagName === 'TEXTAREA' ||
        activeElement?.hasAttribute('contenteditable');

      if (e.key === '/' && !isInputFocused) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    inputRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
  <form
    onSubmit={e => {
      e.preventDefault();
      sendMessage(message);
      setMessage('');
    }}
    onKeyDown={e => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage(message);
        setMessage('');
      }
    }}
    className="w-full"
  >
    <div
      className="
        flex flex-col
        border border-yellow-400/70
        bg-black
        backdrop-blur-md
        rounded-xl
        px-6 py-2 
        w-full
        max-w-2xl
        mx-auto
        transition-all
      "
    >
      <TextareaAutosize
        ref={inputRef}
        value={message}
        onChange={e => setMessage(e.target.value)}
        minRows={1}
        maxRows={4}
        className="w-full bg-transparent resize-none rounded-xl px-3 py-1.5 mb-2 text-[15px] font-normal text-yellow-100 placeholder:text-yellow-100/50 placeholder:font-normal focus:outline-none focus:border-yellow-400 transition max-h-16"

        placeholder="Type a message..."
      />
      <div className="flex flex-row items-center justify-between mt-1 gap-1 flex-wrap">
        <div className="flex flex-row items-center gap-1 sm:gap-3">
          {/* <Focus focusMode={focusMode} setFocusMode={setFocusMode} /> */}
          <Attach
            fileIds={fileIds}
            setFileIds={setFileIds}
            files={files}
            setFiles={setFiles}
            showText
          />
        </div>
        <div className="flex items-center gap-0.5 sm:gap-2">
          <Optimization
            optimizationMode={optimizationMode}
            setOptimizationMode={setOptimizationMode}
          />
          <button
            disabled={message.trim().length === 0}
            className="
              p-1 rounded-lg
              bg-gradient-to-br from-yellow-400 to-yellow-200
              shadow-md text-gray-900
              font-medium
              hover:from-yellow-300 hover:to-yellow-400
              disabled:opacity-50 disabled:from-yellow-200 disabled:to-yellow-100
              transition
            "
          >
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  </form>
);



};

export default EmptyChatMessageInput;
