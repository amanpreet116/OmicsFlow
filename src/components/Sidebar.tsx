'use client';

import { cn } from '@/lib/utils';
import {
  Compass,
  History,
  FlaskConical,
  Dna,
  UserCog,
  LogOut,
  Settings,
  MessageCircle,
  Star,
  Bell,
  BookOpenText,
  Activity,
  FileText
} from 'lucide-react';
import Link from 'next/link';
import { useSelectedLayoutSegments } from 'next/navigation';
import React, { useState } from 'react';
import Focus from './MessageInputActions/Focus';

/* ---------- NAV DATA ---------- */

const ExpertNav = [
  { icon: FlaskConical, label: 'Chemist', href: '/search/chemist' },
  { icon: Dna,           label: 'Omics',  href: '/search/omics' },
  { icon: UserCog,       label: 'Gene Analyst',      href: '/search/gene-analyst' },
  { icon: BookOpenText,  label: 'Report Generation', href: '/expert/literature-reviewer' },
];

const mainLinks = [
  { icon: Compass,       label: 'Explore',  href: '/discover' },
  { icon: MessageCircle, label: 'New Chat', href: '/home' },
  { icon: History,       label: 'History',  href: '/history' },
  { icon: Activity,      label: 'Activity', href: '/activity' },
  { icon: FileText, label: 'Results', href: '/results' },
];

const quickAccessLinks = [
  { icon: Star,        label: 'Favorites',     href: '/favorites'     },
  { icon: Bell,        label: 'Notifications', href: '/notifications' },
  { icon: BookOpenText,label: 'Library',       href: '/library'       },
];

interface SidebarProps {
  children: React.ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  const segments = useSelectedLayoutSegments();
  const [focusMode, setFocusMode] = useState('webSearch');

  const isActive = (href: string) =>
    segments.includes(href.replace(/^\//, '')) || (href === '/' && segments.length === 0);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#131417] via-[#191919] to-[#0e0e11]">
      {/* --- STATIC SIDEBAR --- */}
      <aside
        className={cn(
          'fixed top-0 left-0 h-screen z-40',
          'w-72 min-w-[280px] bg-[rgba(30,30,35,0.56)] backdrop-blur-xl',
          'border-r-2 border-yellow-400/90 shadow-2xl rounded-tr-2xl rounded-br-2xl',
          'flex flex-col justify-between px-5 py-8 overflow-y-auto'
        )}
      >
        <div className="space-y-6">
<Link href="/home" className="cursor-pointer">
  <div className="text-xl font-bold">
    <span className="bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(255,214,0,0.5)] hover:from-yellow-300 hover:to-yellow-100 transition-all duration-300">
      ResearchIQ
    </span>
  </div>
</Link>


          <nav className="flex flex-col gap-1.5">
            {mainLinks.map(({ icon: Icon, label, href }) => (
              <Link
                key={label}
                href={href}
                className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  isActive(href)
                    ? 'text-yellow-400 bg-yellow-400/10 border-l-2 border-yellow-400'
                    : 'text-white/90 hover:text-yellow-400 hover:bg-[#23242a]/60'
                )}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {label}
              </Link>
            ))}
          </nav>

          <Focus focusMode={focusMode} setFocusMode={setFocusMode} />

          <div>
            <p className="uppercase text-xs text-yellow-400/70 font-semibold mb-1 tracking-wide">
              Expert Agents
            </p>
            <nav className="flex flex-col gap-1.5">
              {ExpertNav.map(({ icon: Icon, label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors',
                    isActive(href)
                      ? 'text-yellow-300 bg-yellow-400/10 border-l-2 border-yellow-400'
                      : 'text-white/80 hover:text-yellow-300 hover:bg-[#222326]/40'
                  )}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="uppercase text-xs text-yellow-400/70 font-semibold mb-1 tracking-wide">
              Quick Access
            </p>
            <nav className="flex flex-col gap-1.5">
              {quickAccessLinks.map(({ icon: Icon, label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                    isActive(href)
                      ? 'text-yellow-400 bg-yellow-400/10 border-l-2 border-yellow-400'
                      : 'text-white/70 hover:text-yellow-200 hover:bg-white/5'
                  )}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="flex flex-col gap-1 pt-4 border-t border-gray-700/50">
          <Link
            href="/settings"
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-white/70 hover:text-yellow-400 hover:bg-[#212226]/40 transition-colors"
          >
            <Settings className="w-4 h-4" />
            Settings
          </Link>
          <button
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Log Out
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 min-h-screen ml-60">
        {children}
      </main>
    </div>
  );
}
