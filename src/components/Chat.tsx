'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import MessageInput from './MessageInput';
import { File, Message } from './ChatWindow';
import MessageBox from './MessageBox';
import MessageBoxLoading from './MessageBoxLoading';

const Chat = ({
  loading,
  messages,
  sendMessage,
  messageAppeared,
  rewrite,
  fileIds,
  setFileIds,
  files,
  setFiles,
}: {
  messages: Message[];
  sendMessage: (message: string) => void;
  loading: boolean;
  messageAppeared: boolean;
  rewrite: (messageId: string) => void;
  fileIds: string[];
  setFileIds: (fileIds: string[]) => void;
  files: File[];
  setFiles: (files: File[]) => void;
}) => {
  const [dividerWidth, setDividerWidth] = useState(0);
  const dividerRef = useRef<HTMLDivElement | null>(null);
  const messageEnd = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateDividerWidth = () => {
      if (dividerRef.current) {
        setDividerWidth(dividerRef.current.scrollWidth);
      }
    };

    updateDividerWidth();

    window.addEventListener('resize', updateDividerWidth);

    return () => {
      window.removeEventListener('resize', updateDividerWidth);
    };
  });

  useEffect(() => {
    const scroll = () => {
      messageEnd.current?.scrollIntoView({ behavior: 'smooth' });
    };

    if (messages.length === 1) {
      document.title = `${messages[0].content.substring(0, 30)} - Perplexica`;
    }

    if (messages[messages.length - 1]?.role == 'user') {
      scroll();
    }
  }, [messages]);

  return (
  <div className="flex flex-col space-y-6 pt-8 pb-44 lg:pb-32 sm:mx-4 md:mx-8 lg:ml-72 xl:ml-80">
    {messages.map((msg, i) => {
      const isLast = i === messages.length - 1;

      return (
        <Fragment key={msg.messageId}>
          <MessageBox
            key={i}
            message={msg}
            messageIndex={i}
            history={messages}
            loading={loading}
            dividerRef={isLast ? dividerRef : undefined}
            isLast={isLast}
            rewrite={rewrite}
            sendMessage={sendMessage}
          />
          {!isLast && msg.role === 'assistant' && (
            <div className="h-px w-full bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />
          )}
        </Fragment>
      );
    })}
    {loading && !messageAppeared && <MessageBoxLoading />}
    <div ref={messageEnd} className="h-0" />
    {dividerWidth > 0 && (
      <div
        className="bottom-24 lg:bottom-10 fixed z-40 lg:ml-72 xl:ml-0"
        style={{ width: dividerWidth }}
      >
        {/* Enhanced backdrop with glassmorphism effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent backdrop-blur-md border-t border-yellow-400/20 rounded-t-2xl shadow-2xl shadow-yellow-400/5" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent" />
        
        <div className="relative ">
          <MessageInput
            loading={loading}
            sendMessage={sendMessage}
            fileIds={fileIds}
            setFileIds={setFileIds}
            files={files}
            setFiles={setFiles}
          />
        </div>
      </div>
    )}
  </div>
);

};

export default Chat;
