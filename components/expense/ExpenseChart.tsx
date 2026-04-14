import { motion } from 'motion/react';
import { CategoryTransaction } from 'types';
import { useState } from 'react';

interface ExpenseChartProps {
  categoryTransactions: CategoryTransaction[];
}

const colors = [
  { bg: 'bg-blue-500', hover: 'hover:bg-blue-600', text: 'text-blue-500' },
  { bg: 'bg-emerald-500', hover: 'hover:bg-emerald-600', text: 'text-emerald-500' },
  { bg: 'bg-amber-500', hover: 'hover:bg-amber-600', text: 'text-amber-500' },
  { bg: 'bg-rose-500', hover: 'hover:bg-rose-600', text: 'text-rose-500' },
  { bg: 'bg-teal-500', hover: 'hover:bg-teal-600', text: 'text-teal-500' },
  { bg: 'bg-cyan-500', hover: 'hover:bg-cyan-600', text: 'text-cyan-500' },
  { bg: 'bg-orange-500', hover: 'hover:bg-orange-600', text: 'text-orange-500' },
  { bg: 'bg-lime-500', hover: 'hover:bg-lime-600', text: 'text-lime-500' },
  { bg: 'bg-sky-500', hover: 'hover:bg-sky-600', text: 'text-sky-500' },
  { bg: 'bg-pink-500', hover: 'hover:bg-pink-600', text: 'text-pink-500' },
];

export default function ExpenseChart({ categoryTransactions }: ExpenseChartProps) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  if (categoryTransactions.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <p className="text-gray-500 font-medium">No data to display</p>
        <p className="text-gray-400 text-sm mt-1">Add some expenses to see your breakdown</p>
      </div>
    );
  }

  const total = categoryTransactions.reduce((sum, cat) => {
    const amount = parseFloat(cat.total.replace(/[$,]/g, ''));
    return sum + amount;
  }, 0);

  const sortedCategories = [...categoryTransactions].sort((a, b) => {
    const amountA = parseFloat(a.total.replace(/[$,]/g, ''));
    const amountB = parseFloat(b.total.replace(/[$,]/g, ''));
    return amountB - amountA;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 md:p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Expense Overview</h2>
        <div className="text-right">
          <p className="text-sm text-gray-500">Total Expenses</p>
          <p className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</p>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center h-16 rounded-xl overflow-hidden shadow-sm border border-gray-200">
          {sortedCategories.map((category, index) => {
            const amount = parseFloat(category.total.replace(/[$,]/g, ''));
            const percentage = total > 0 ? (amount / total) * 100 : 0;
            const colorScheme = colors[index % colors.length];
            const isHovered = hoveredCategory === category.category;

            return (
              <motion.div
                key={category.category}
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 0.8, delay: index * 0.05, ease: 'easeOut' }}
                className={`h-full cursor-pointer transition-all relative group ${colorScheme.bg} ${colorScheme.hover}`}
                onMouseEnter={() => setHoveredCategory(category.category)}
                onMouseLeave={() => setHoveredCategory(null)}
                style={{
                  filter: hoveredCategory && !isHovered ? 'brightness(0.7)' : 'brightness(1)',
                  transition: 'filter 0.2s ease'
                }}
              >
                {percentage > 5 && (
                  <div className="h-full flex flex-col items-center justify-center text-white text-xs font-bold px-2 text-center">
                    <span className="capitalize truncate max-w-full">{category.category}</span>
                    <span className="text-[10px] opacity-90">{percentage.toFixed(1)}%</span>
                  </div>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                  className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 bg-gray-900 text-white text-xs py-3 px-4 rounded-lg shadow-xl whitespace-nowrap z-20 pointer-events-none"
                >
                  <div className="font-semibold capitalize mb-1">{category.category}</div>
                  <div className="text-green-400 font-bold">{category.total}</div>
                  <div className="text-gray-300">{percentage.toFixed(1)}% of total</div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-px">
                    <div className="border-4 border-transparent border-t-gray-900"></div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">Hover over segments to see details</p>
      </div>

      <div className="space-y-3">
        {sortedCategories.map((category, index) => {
          const amount = parseFloat(category.total.replace(/[$,]/g, ''));
          const percentage = total > 0 ? (amount / total) * 100 : 0;
          const colorScheme = colors[index % colors.length];
          const isHovered = hoveredCategory === category.category;

          return (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`p-2 md:p-4 rounded-lg border-2 transition-all cursor-pointer ${
                isHovered
                  ? 'border-gray-300 bg-gray-50 shadow-md scale-105'
                  : 'border-gray-100 bg-white hover:border-gray-200'
              }`}
              onMouseEnter={() => setHoveredCategory(category.category)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3 flex-1">
                  <div className={`w-4 h-4 rounded-full ${colorScheme.bg} flex-shrink-0 shadow-sm`} />
                  <span className="font-semibold text-gray-900 capitalize">{category.category}</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900">{category.total}</div>
                  <div className={`text-sm font-medium ${colorScheme.text}`}>
                    {percentage.toFixed(1)}%
                  </div>
                </div>
              </div>

              <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.8, delay: index * 0.05 + 0.5 }}
                  className={`absolute top-0 left-0 h-full ${colorScheme.bg} rounded-full shadow-sm`}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-2 md:p-4 border border-blue-200">
          <div className="flex items-center gap-2 mb-1">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-xs font-medium text-blue-900 uppercase tracking-wide">Total</p>
          </div>
          <p className="text-xl font-bold text-center text-blue-900">${total.toFixed(2)}</p>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-2 md:p-4 border border-emerald-200">
          <div className="flex items-center gap-2 mb-1">
            <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            <p className="text-xs font-medium text-emerald-900 uppercase tracking-wide">Categories</p>
          </div>
          <p className="text-xl font-bold text-center text-emerald-900">{categoryTransactions.length}</p>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-2 md:p-4 border border-amber-200">
          <div className="flex items-center gap-2 mb-1">
            <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <p className="text-xs font-medium text-amber-900 uppercase tracking-wide">Average</p>
          </div>
          <p className="text-xl font-bold text-center text-amber-900">
            ${(total / (categoryTransactions.length || 1)).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
