import { Settings } from 'lucide-react';
import EmptyChatMessageInput from './EmptyChatMessageInput';
import { File } from './ChatWindow';
import Link from 'next/link';
import WeatherWidget from './WeatherWidget';
import NewsArticleWidget from './NewsArticleWidget';

const EmptyChat = ({
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
 return (
  <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#161618] via-[#29291f] to-[#232313] p-2">
    {/* Floating settings for mobile */}
    <div className="absolute top-5 right-5 z-10 lg:hidden">
      <Link href="/settings">
        <Settings className="w-6 h-6 text-yellow-400 opacity-80 hover:opacity-100 cursor-pointer" />
      </Link>
    </div>

    {/* Centered main content */}
    <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center text-center space-y-8 px-4">
      <h2 className="text-4xl font-bold bg-gradient-to-tr from-yellow-400 via-yellow-300 to-white bg-clip-text text-transparent drop-shadow mb-3 tracking-tight">
        Your scientific journey begins here.
      </h2>
      <EmptyChatMessageInput
        sendMessage={sendMessage}
        focusMode={focusMode}
        setFocusMode={setFocusMode}
        optimizationMode={optimizationMode}
        setOptimizationMode={setOptimizationMode}
        fileIds={fileIds}
        setFileIds={setFileIds}
        files={files}
        setFiles={setFiles}
      />
    </div>
  </div>
);

};

export default EmptyChat;