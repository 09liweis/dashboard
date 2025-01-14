import { motion } from 'motion/react';
import { CategoryTransaction, ExpenseListProps, Transaction } from 'types';
import ExpenseTransaction from '@/components/expense/ExpenseTransaction';

interface CategoryPriceProps {
  categoryPrice: CategoryTransaction;
}

const CategoryPrice = ({ categoryPrice }: CategoryPriceProps) => {
  const { category, income, total, percentage } = categoryPrice;
  const colorClass = income ? 'bg-green-600' : 'bg-red-600';

  return (
    <div className="bg-white rounded-lg p-4 mb-4 border border-gray-100 shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium capitalize">{category}</h3>
        <span className="font-bold text-lg">{total}</span>
      </div>
      <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className={`absolute top-0 left-0 h-full ${colorClass} transition-all duration-500 ease-out`}
          style={{ width: percentage }}
        ></div>
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
          <div className="space-y-2">
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