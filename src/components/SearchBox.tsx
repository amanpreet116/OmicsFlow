// src/components/SearchBox.tsx
'use client';

import { useState, useRef, KeyboardEvent } from 'react';
import { ArrowRight, Zap, Paperclip, Loader2 } from 'lucide-react';
import TextareaAutosize from 'react-textarea-autosize';

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void | Promise<void>;
  placeholder?: string;
  agentColor?: string;
  agentName?: string;
  disabled?: boolean;
  loading?: boolean;
  maxLength?: number;
}

export default function SearchBox({
  value,
  onChange,
  onSubmit,
  placeholder = 'Type a message...',
  agentColor = '#FFD600',
  agentName = 'Agent',
  disabled = false,
  loading = false,
  maxLength = 2000,
}: SearchBoxProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (disabled || loading || isSubmitting || value.trim().length === 0) return;

    setIsSubmitting(true);
    try {
      await onSubmit(value.trim());
      onChange('');
    } catch (error) {
      console.error('Search submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!disabled && !loading && !isSubmitting && value.trim().length > 0) {
        handleSubmit(e);
      }
    }
  };

  const isDisabled = disabled || loading || isSubmitting;
  const isOverLimit = value.length > maxLength;
  const canSubmit = !isDisabled && value.trim().length > 0 && !isOverLimit;

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div
        className={`
          flex flex-col
          border-2
          bg-gradient-to-br from-black/95 to-gray-900/95
          backdrop-blur-lg
          rounded-2xl
          px-6 py-4
          w-full
          mx-auto
          transition-all duration-300 ease-out
          shadow-xl shadow-black/50
          ${isFocused 
            ? 'border-yellow-400 shadow-2xl shadow-yellow-400/20 scale-[1.02] bg-gradient-to-br from-black/98 to-gray-900/98' 
            : 'border-yellow-400/60 hover:border-yellow-400/70'
          }
          ${isDisabled ? 'opacity-75 cursor-not-allowed' : ''}
        `}
      >
        {/* Main input area */}
        <div className="relative">
          <TextareaAutosize
            ref={inputRef}
            value={value}
            onChange={(e) => !isDisabled && onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={isDisabled}
            minRows={2}
            maxRows={6}
            maxLength={maxLength}
            className={`
              w-full bg-transparent resize-none rounded-xl px-3 py-3 mb-4 
              text-base font-normal text-yellow-50 
              placeholder:text-yellow-100/40 placeholder:font-light 
              focus:outline-none transition-all duration-200 
              min-h-[3rem] leading-relaxed
              ${isDisabled ? 'cursor-not-allowed' : ''}
              ${isOverLimit ? 'text-red-300' : ''}
            `}
            placeholder={isDisabled ? 'Please wait...' : placeholder}
          />
          
          {/* Character count indicator */}
          {value.length > 0 && (
            <div className={`absolute bottom-1 right-3 text-xs transition-colors ${
              isOverLimit ? 'text-red-400' : 
              value.length > maxLength * 0.8 ? 'text-yellow-400' : 
              'text-yellow-100/40'
            }`}>
              {value.length}/{maxLength}
            </div>
          )}
        </div>
        
        {/* Controls row */}
        <div className="flex flex-row items-center justify-between gap-3 flex-wrap">
          {/* Left side controls */}
          <div className="flex flex-row items-center gap-2 sm:gap-3">
            {/* Speed Mode Indicator */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-yellow-400/20 to-yellow-300/20 border border-yellow-400/30 rounded-lg text-xs backdrop-blur-sm hover:from-yellow-400/30 hover:to-yellow-300/30 transition-all duration-200">
              <Zap size={12} style={{ color: agentColor }} className={isDisabled ? '' : 'animate-pulse'} />
              <span className="text-yellow-100/80 font-medium hidden sm:inline">
                {loading ? 'Processing...' : 'Speed Mode'}
              </span>
              <span className="text-yellow-100/80 font-medium sm:hidden">
                {loading ? 'Processing' : 'Speed'}
              </span>
            </div>
            
            {/* File Attach Button */}
            <button
              type="button"
              disabled={isDisabled}
              className={`
                flex items-center gap-2 px-3 py-1.5 
                bg-white/10 border border-white/20 rounded-lg text-xs 
                text-yellow-100/70 hover:text-yellow-100 
                hover:bg-white/20 hover:border-white/30 
                transition-all duration-200 backdrop-blur-sm 
                hover:scale-105 active:scale-95
                ${isDisabled ? 'opacity-50 cursor-not-allowed hover:scale-100' : ''}
              `}
            >
              <Paperclip size={12} />
              <span className="font-medium hidden sm:inline">Attach Files</span>
              <span className="font-medium sm:hidden">Attach</span>
            </button>
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Agent Indicator */}
            <div className="text-sm text-yellow-100/60 font-medium hidden sm:block px-2 py-1 bg-white/5 rounded-lg border border-white/10">
              {agentName}
            </div>
            
            {/* Status indicator */}
            {(loading || isSubmitting) && (
              <div className="flex items-center gap-2 text-xs text-yellow-400">
                <Loader2 size={12} className="animate-spin" />
                <span className="hidden md:inline">
                  {loading ? 'Analyzing...' : 'Sending...'}
                </span>
              </div>
            )}
            
            {/* Send Button */}
            <button
              type="submit"
              disabled={!canSubmit}
              className={`
                p-2.5 rounded-xl flex items-center justify-center
                bg-gradient-to-br from-yellow-400 via-yellow-300 to-yellow-200
                shadow-lg shadow-yellow-400/25 text-gray-900
                font-bold text-sm
                hover:from-yellow-300 hover:via-yellow-200 hover:to-yellow-400
                transition-all duration-200
                border border-yellow-300/50
                ${canSubmit 
                  ? 'hover:scale-110 active:scale-95 hover:shadow-xl hover:shadow-yellow-400/40' 
                  : 'opacity-40 cursor-not-allowed from-yellow-200/50 to-yellow-100/50 shadow-none'
                }
              `}
            >
              {(loading || isSubmitting) ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <ArrowRight size={14} />
              )}
            </button>
          </div>
        </div>

        {/* Error message for character limit */}
        {isOverLimit && (
          <div className="mt-2 text-red-400 text-xs bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
            Message is too long. Please keep it under {maxLength} characters.
          </div>
        )}
      </div>
    </form>
  );
}
