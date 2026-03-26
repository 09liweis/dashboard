import { motion } from 'motion/react';

interface ViewToggleProps {
  currentView: 'overview' | 'detail';
  onViewChange: (view: 'overview' | 'detail') => void;
}

export default function ViewToggle({ currentView, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-2 bg-white rounded-lg p-1 shadow-xs border border-gray-200">
      <button
        onClick={() => onViewChange('overview')}
        className={`relative px-4 py-2 rounded-md text-sm cursor-pointer font-medium transition-all ${
          currentView === 'overview'
            ? 'text-white'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        {currentView === 'overview' && (
          <motion.div
            layoutId="activeView"
            className="absolute inset-0 bg-blue-600 rounded-md"
            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
          />
        )}
        <span className="relative z-10 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Overview
        </span>
      </button>

      <button
        onClick={() => onViewChange('detail')}
        className={`relative px-4 py-2 rounded-md text-sm cursor-pointer font-medium transition-all ${
          currentView === 'detail'
            ? 'text-white'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        {currentView === 'detail' && (
          <motion.div
            layoutId="activeView"
            className="absolute inset-0 bg-blue-600 rounded-md"
            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
          />
        )}
        <span className="relative z-10 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
          Detail
        </span>
      </button>
    </div>
  );
}
