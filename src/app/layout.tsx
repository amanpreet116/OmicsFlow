'use client';

import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import Sidebar from '@/components/Sidebar';
import { Toaster } from 'sonner';
import ThemeProvider from '@/components/theme/Provider';
import { usePathname } from 'next/navigation';

const montserrat = Montserrat({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Arial', 'sans-serif'],
});

// Note: Move metadata to a separate metadata.ts file or page-level
// since this will now be a client component

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  
  // Routes where sidebar should be hidden
  const noSidebarRoutes = ['/results','/'];
  const shouldHideSidebar = noSidebarRoutes.includes(pathname);

  return (
    <html className="h-full" lang="en" suppressHydrationWarning>
      <body className={cn('h-full', montserrat.className)}>
        <ThemeProvider>
          {!shouldHideSidebar ? (
            <Sidebar>{children}</Sidebar>
          ) : (
            <div className="h-full">
              {children}
            </div>
          )}
          <Toaster
            toastOptions={{
              unstyled: true,
              classNames: {
                toast:
                  'bg-light-primary dark:bg-dark-secondary dark:text-white/70 text-black-70 rounded-lg p-4 flex flex-row items-center space-x-2',
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
