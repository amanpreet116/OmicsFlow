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
} from 'lucide-react';
import Link from 'next/link';
import { useSelectedLayoutSegments } from 'next/navigation';
import React, { useState } from 'react';
import Layout from './Layout';
import Focus from './MessageInputActions/Focus';

const ExpertNav = [
  { icon: FlaskConical, label: 'Chemist', href: '/expert/chemist' },
  { icon: Dna, label: 'Omics', href: '/expert/omics' },
  { icon: UserCog, label: 'Gene Analyst', href: '/expert/gene-analyst' },
];

const mainLinks = [
  { icon: Compass, label: 'Explore', href: '/explore' },
  { icon: MessageCircle, label: 'New Chat', href: '/' },
  { icon: History, label: 'History', href: '/history' },
  { icon: Activity, label: 'Activity', href: '/activity' },
];

// const quickAccessLinks = [
//   { icon: Star, label: 'Favorites', href: '/favorites', color: 'text-yellow-400', hover: 'hover:bg-yellow-100 dark:hover:bg-yellow-800' },
//   { icon: Bell, label: 'Notifications', href: '/notifications', color: 'text-yellow-100', hover: 'hover:bg-yellow-300 dark:hover:bg-yellow-900' },
//   { icon: BookOpenText, label: 'Library', href: '/library', color: 'text-yellow-300', hover: 'hover:bg-yellow-200 dark:hover:bg-yellow-900' },
// ];

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const segments = useSelectedLayoutSegments();
  const [focusMode, setFocusMode] = useState('webSearch');
  

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#131417] via-[#191919] to-[#0e0e11]">
      {/* Responsive Sidebar: always visible, fits content */}
      <aside
        className="
          flex flex-col justify-between
          w-64 min-w-[220px] max-w-xs h-screen
          backdrop-blur-xl bg-[rgba(30,30,35,0.56)]
          border-r-2 border-yellow-400/90 shadow-2xl
          px-4 md:px-6 py-8
          rounded-tr-2xl rounded-br-2xl
          transition-all
          fixed z-30 top-0 left-0
          overflow-hidden
        "
      >
        <div>
          {/* Logo/Brand */}
          <div className="text-lg md:text-xl font-bold tracking-tight mb-5 flex items-center gap-2">
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(255,214,0,0.5)]">OmicsFlow</span>
          </div>

          {/* Main Navigation */}
          <nav className="flex flex-col gap-1">
            {mainLinks.map(({ icon: Icon, label, href }) => (
              <Link
                key={label}
                href={href}
                className="
                  flex items-center gap-2 px-2 py-1.5 rounded-md
                  text-sm text-white/90 hover:text-yellow-400
                  hover:bg-[#23242a]/60 transition font-medium
                "
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </Link>
            ))}
          </nav>
          <div className="mt-4">
            <Focus focusMode={focusMode} setFocusMode={setFocusMode} />
          </div>


          {/* Experts Section */}
          <div className="mt-5">
            <div className="uppercase text-xs text-yellow-400/70 mb-1 font-semibold tracking-wide">Expert Agents</div>
            <nav className="flex flex-col gap-1">
              {ExpertNav.map(({ icon: Icon, label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="
                    flex items-center gap-2 px-2 py-1.5 rounded-md
                    text-sm text-white/80 hover:text-yellow-300
                    hover:bg-[#222326]/40 transition
                  "
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Quick Access Section */}
          {/* <div className="mt-5">
            <div className="uppercase text-xs text-yellow-400/70 mb-1 font-semibold tracking-wide">Quick Access</div>
            <nav className="flex flex-col gap-1">
              {quickAccessLinks.map(({ icon: Icon, label, href, color, hover }) => (
                <Link
                  key={label}
                  href={href}
                  className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-sm ${color} font-medium ${hover} transition`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </Link>
              ))}
            </nav>
          </div> */}
        </div>

        {/* Settings & Log Out always inside container */}
        <div className="flex flex-col gap-1 mt-4 pb-2">
          <Link
            href="/settings"
            className="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-white/70 hover:text-yellow-400 hover:bg-[#212226]/40 transition"
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </Link>
          <button className="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-red-500 hover:bg-yellow-50/10 transition">
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-h-screen p-4 md:p-2 ml-56">
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
