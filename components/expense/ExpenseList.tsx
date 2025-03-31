import { motion } from 'motion/react';
import { CategoryTransaction, ExpenseListProps } from 'types';
import ExpenseTransaction from '@/components/expense/ExpenseTransaction';

interface CategoryPriceProps {
  categoryPrice: CategoryTransaction;
}

const CategoryPrice = ({ categoryPrice }: CategoryPriceProps) => {
  const { category, income, total, percentage } = categoryPrice;
  const colorClass = income ? 'bg-green-600' : 'bg-red-600';
  const priceColor = income ? 'text-green-600' : 'text-red-600';

  return (
    <div className="bg-white rounded-lg p-3 border border-gray-100 shadow">
      <div className="flex justify-between items-center mb-2 text-lg">
        <h3 className="font-medium capitalize">{category}</h3>
        <span className={`font-bold ${priceColor}`}>{total}</span>
      </div>
      <div className="relative h-2 bg-gray-200 rounded-sm overflow-hidden">
        <motion.div
          animate={{width: percentage}}
          className={`absolute top-0 left-0 h-full ${colorClass} transition-all duration-500 ease-out`}
        ></motion.div>
      </div>
      <span className="text-sm text-gray-500 mt-1 inline-block">{percentage}</span>
    </div>
  );
};

export default function ExpenseList({
  categoryTransactions,
  openTransactionDetail,
}: ExpenseListProps) {
  return (
    <div className="space-y-6">
      {categoryTransactions.map((categoryPrice) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          key={categoryPrice.category}>
          <CategoryPrice categoryPrice={categoryPrice} />
          <div className="space-y-1">
            {categoryPrice.items.map((transaction) => (
              <ExpenseTransaction
                key={transaction._id}
                transaction={transaction}
                onClick={() => openTransactionDetail(transaction)}
              />
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}