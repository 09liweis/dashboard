import { motion } from 'motion/react';
import { CategoryTransaction } from 'types';

interface ExpenseChartProps {
  categoryTransactions: CategoryTransaction[];
}

const colors = [
  'bg-red-500', 'bg-red-600', 'bg-orange-500', 'bg-orange-600', 'bg-yellow-500',
  'bg-green-500', 'bg-blue-500', 'bg-blue-600', 'bg-purple-500', 'bg-pink-500',
  'bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-green-400', 'bg-blue-400',
];

export default function ExpenseChart({ categoryTransactions }: ExpenseChartProps) {
  if (categoryTransactions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-xs border border-gray-100 p-8 text-center">
        <p className="text-gray-500">No data to display</p>
      </div>
    );
  }

  const total = categoryTransactions.reduce((sum, cat) => {
    const amount = parseFloat(cat.total.replace(/[$,]/g, ''));
    return sum + amount;
  }, 0);

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 mb-6">
      <h2 className="text-2xl font-bold mb-8 text-gray-900">Category Breakdown</h2>

      <div className="mb-8">
        <div className="flex items-center h-12 rounded-lg overflow-hidden shadow-md">
          {categoryTransactions.map((category, index) => {
            const amount = parseFloat(category.total.replace(/[$,]/g, ''));
            const percentage = total > 0 ? (amount / total) * 100 : 0;

            return (
              <motion.div
                key={category.category}
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 0.8, delay: index * 0.05 }}
                className={`h-full cursor-pointer hover:opacity-80 transition-opacity group relative ${
                  colors[index % colors.length]
                }`}
                title={`${category.category}: ${category.total} (${percentage.toFixed(1)}%)`}
              >
                {percentage > 8 && (
                  <div className="h-full flex items-center justify-center text-white text-xs font-bold px-2 text-center">
                    {percentage.toFixed(1)}%
                  </div>
                )}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-900 text-white text-xs py-2 px-3 rounded whitespace-nowrap z-10">
                  <div className="font-semibold capitalize">{category.category}</div>
                  <div>{category.total}</div>
                  <div>{percentage.toFixed(1)}%</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
        {categoryTransactions.map((category, index) => {
          const amount = parseFloat(category.total.replace(/[$,]/g, ''));
          const percentage = total > 0 ? (amount / total) * 100 : 0;

          return (
            <div key={category.category} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded ${colors[index % colors.length]}`} />
              <div className="text-sm">
                <div className="font-medium text-gray-700 capitalize truncate">
                  {category.category}
                </div>
                <div className="text-xs text-gray-500">{percentage.toFixed(1)}%</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 text-center">
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-xs text-gray-600 uppercase tracking-wide mb-1">Total</p>
          <p className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-xs text-gray-600 uppercase tracking-wide mb-1">Categories</p>
          <p className="text-2xl font-bold text-gray-900">{categoryTransactions.length}</p>
        </div>
      </div>
    </div>
  );
}
