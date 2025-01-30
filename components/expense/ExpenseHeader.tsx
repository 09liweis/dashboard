import { ExpenseResponse } from 'types';

interface ExpenseHeaderProps {
  expenseResponse: ExpenseResponse;
  onDateChange: (date: string) => void;
}

export default function ExpenseHeader({ expenseResponse, onDateChange }: ExpenseHeaderProps) {
  return (
    <div className="mb-6">
      <input 
        type="month" 
        value={expenseResponse.date} 
        onChange={(e) => onDateChange(e.target.value)}
        className="w-full p-3 rounded-lg bg-white border border-gray-200 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all mb-4"
      />
      
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white text-center p-1 sm:p-4 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Income</h3>
          <p className="text-xl font-bold text-green-600">{expenseResponse.incomes}</p>
        </div>
        
        <div className="bg-white text-center p-1 sm:p-4 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Balance</h3>
          <p className="text-xl font-bold text-blue-600">{expenseResponse.total}</p>
        </div>
        
        <div className="bg-white text-center p-1 sm:p-4 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Expenses</h3>
          <p className="text-xl font-bold text-red-600">{expenseResponse.expenses}</p>
        </div>
        
      </div>
    </div>
  );
}