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
      className="bg-white rounded-lg p-3 border border-gray-100 shadow-sm hover:border-blue-500 transition-all cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-gray-900 font-medium truncate">
              {place?.name || title}
            </span>
            <span className="text-sm text-gray-500">{date}</span>
          </div>
          {place?.address && (
            <p className="text-sm text-gray-500 truncate">{place.address}</p>
          )}
        </div>
        <span className={`font-medium ${income ? 'text-green-600' : 'text-red-600'}`}>
          {income ? '+' : '-'}{price}
        </span>
      </div>
    </div>
  );
}