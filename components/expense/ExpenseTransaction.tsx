import { Transaction } from 'types';

interface ExpenseTransactionProps {
  transaction: Transaction;
  onClick: () => void;
}

export default function ExpenseTransaction({ transaction, onClick }: ExpenseTransactionProps) {
  const { price, date, place, title, income } = transaction;
  
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg p-3 border border-gray-100 shadow-xs hover:border-blue-500 transition-all cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-gray-900 font-medium truncate">
            {place?.name || title}
          </span>
          <span className="text-sm text-gray-500">{date}</span>
        </div>
        <span className={`font-medium ${income ? 'text-green-600' : 'text-red-600'}`}>
          {price}
        </span>
      </div>
    </div>
  );
}