import { motion } from 'motion/react';
import { CategoryTransaction } from 'types';

interface ExpenseChartProps {
  categoryTransactions: CategoryTransaction[];
}

export default function ExpenseChart({ categoryTransactions }: ExpenseChartProps) {
  if (categoryTransactions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-xs border border-gray-100 p-8 text-center">
        <p className="text-gray-500">No data to display</p>
      </div>
    );
  }

  const expenses = categoryTransactions.filter(cat => !cat.income);
  const incomes = categoryTransactions.filter(cat => cat.income);

  const renderChart = (data: CategoryTransaction[], title: string, colorClass: string) => {
    if (data.length === 0) return null;

    const total = data.reduce((sum, cat) => {
      const amount = parseFloat(cat.total.replace(/[$,]/g, ''));
      return sum + amount;
    }, 0);

    return (
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4 text-gray-800">{title}</h3>
        <div className="space-y-3">
          {data.map((category, index) => {
            const amount = parseFloat(category.total.replace(/[$,]/g, ''));
            const percentage = total > 0 ? (amount / total) * 100 : 0;

            return (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg p-4 shadow-xs border border-gray-100"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-700 capitalize">
                    {category.category}
                  </span>
                  <div className="text-right">
                    <span className={`font-bold ${colorClass}`}>
                      {category.total}
                    </span>
                    <span className="text-sm text-gray-500 ml-2">
                      ({percentage.toFixed(1)}%)
                    </span>
                  </div>
                </div>
                <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className={`absolute top-0 left-0 h-full rounded-full ${
                      category.income ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white rounded-lg shadow-lg border border-gray-200 p-6 mb-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Category Breakdown</h2>

      {renderChart(expenses, 'Expenses', 'text-red-600')}
      {renderChart(incomes, 'Incomes', 'text-green-600')}
    </div>
  );
}
