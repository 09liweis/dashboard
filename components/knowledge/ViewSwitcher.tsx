import { motion } from 'motion/react';

type ViewMode = 'random' | 'list';

interface ViewSwitcherProps {
  viewMode: ViewMode;
  onChange: (mode: ViewMode) => void;
}

const TABS: { mode: ViewMode; label: string; iconPath: string }[] = [
  {
    mode: 'random',
    label: 'Random',
    iconPath: 'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12',
  },
  {
    mode: 'list',
    label: 'List',
    iconPath: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
  },
];

export default function ViewSwitcher({ viewMode, onChange }: ViewSwitcherProps) {
  return (
    <div className="inline-flex items-center gap-1 p-1.5 bg-gray-100 rounded-xl border border-gray-200">
      {TABS.map(({ mode, label, iconPath }) => {
        const isActive = viewMode === mode;
        return (
          <button
            key={mode}
            type="button"
            onClick={() => onChange(mode)}
            className={`relative px-5 py-2.5 cursor-pointer rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
              isActive ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="active-indicator"
                className="absolute inset-0 bg-white rounded-lg shadow-sm border border-gray-200 -z-10"
                transition={{ duration: 0.2, ease: 'easeInOut' }}
              />
            )}
            <svg
              className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-gray-400'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={iconPath} />
            </svg>
            {label}
          </button>
        );
      })}
    </div>
  );
}
