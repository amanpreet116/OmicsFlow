import {
  BadgePercent,
  ChevronDown,
  Globe,
  Pencil,
  ScanEye,
  SwatchBook,
  Stethoscope, // Add this if using lucide-react >= 0.312.0
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from '@headlessui/react';
import { SiReddit, SiYoutube } from '@icons-pack/react-simple-icons';
import { Fragment } from 'react';

const focusModes = [
  {
    key: 'webSearch',
    title: 'All',
    description: 'Searches across all of the internet',
    icon: <Globe size={20} />,
  },
  {
    key: 'academicSearch',
    title: 'Academic',
    description: 'Search in published academic papers',
    icon: <SwatchBook size={20} />,
  },
  {
    key: 'writingAssistant',
    title: 'Writing',
    description: 'Chat without searching the web',
    icon: <Pencil size={16} />,
  },
  {
    key: 'wolframAlphaSearch',
    title: 'Wolfram Alpha',
    description: 'Computational knowledge engine',
    icon: <BadgePercent size={20} />,
  },
  {
    key: 'youtubeSearch',
    title: 'Youtube',
    description: 'Search and watch videos',
    icon: <SiYoutube className="h-5 w-auto mr-0.5" />,
  },
  {
    key: 'redditSearch',
    title: 'Reddit',
    description: 'Search for discussions and opinions',
    icon: <SiReddit className="h-5 w-auto mr-0.5" />,
  },

  ///////////////////////////
  // --- Add the new Healthcare focus mode below ---
  {
    key: 'healthSearch',
    title: 'Healthcare',
    description: 'Focused search for healthcare and drug discovery',
    icon: <Stethoscope size={20} />, // You can use any suitable icon if Stethoscope is not available
  },

  ///////////////////////////
];

const Focus = ({
  focusMode,
  setFocusMode,
}: {
  focusMode: string;
  setFocusMode: (mode: string) => void;
}) => {
 return (
<Popover className="w-full">
  <PopoverButton
    className={cn(
      "w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-white/80 hover:text-yellow-300 hover:bg-[#222326]/40 transition",
      "focus:outline-none"
    )}
  >
    {/* Use main icon for the current focus mode */}
    {focusModes.find(m => m.key === focusMode)?.icon}
    <span className="">Focus</span>
    <ChevronDown size={17} className="ml-auto text-yellow-300" />
  </PopoverButton>
  <Transition
    as={Fragment}
    enter="transition duration-100"
    enterFrom="opacity-0 -translate-y-1"
    enterTo="opacity-100 translate-y-0"
    leave="transition duration-100"
    leaveFrom="opacity-100 translate-y-0"
    leaveTo="opacity-0 -translate-y-2"
  >
    <PopoverPanel className="w-full mt-1 rounded-md bg-[rgba(25,19,60,0.98)] border border-yellow-400/20 shadow-xl backdrop-blur-lg p-2 z-30">
      <nav className="flex flex-col gap-1">
        {focusModes.map((mode) => (
          <button
            key={mode.key}
            onClick={() => setFocusMode(mode.key)}
            className={cn(
              "flex items-center gap-2 px-2 py-1.5 rounded-md text-sm w-full text-left",
              focusMode === mode.key
                ? "bg-yellow-400/10 text-yellow-200"
                : "hover:bg-yellow-500/10 text-yellow-100/90"
            )}
          >
            <span className={focusMode === mode.key ? 'text-yellow-300' : 'text-yellow-200/70'}>
              {mode.icon}
            </span>
            <span>{mode.title}</span>
          </button>
        ))}
      </nav>
    </PopoverPanel>
  </Transition>
</Popover>
);
};

export default Focus;
