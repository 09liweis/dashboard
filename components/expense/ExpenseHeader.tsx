import { ExpenseResponse } from 'types';

interface ExpenseHeaderProps {
  expenseResponse: ExpenseResponse;
  onDateChange: (date: string) => void;
}

export default function ExpenseHeader({ expenseResponse, onDateChange }: ExpenseHeaderProps) {
  const stats = [
    {
      tl: 'Incomes',
      value: expenseResponse.incomes,
      color: 'text-green-600'
    },
    {
      tl: 'Balance',
      value: expenseResponse.total,
      color: 'text-blue-600'
    },
    {
      tl: 'Expenses',
      value: expenseResponse.expenses,
      color: 'text-red-600'
    },
  ];
  return (
    <div className="mb-6">
      <input 
        type="month" 
        value={expenseResponse.date} 
        onChange={(e) => onDateChange(e.target.value)}
        className="w-full p-3 rounded-lg bg-white border border-gray-200 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all mb-4"
      />
      
      <div className="grid grid-cols-3 gap-4 text-center text-gray-500">
      {stats.map(({tl,value,color})=>
        <div key={tl} className="bg-white p-1 sm:p-4 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium mb-1">{tl}</h3>
          <p className={`text-xl font-bold ${color}`}>{value}</p>
        </div>
      )}
      </div>
    </div>
  );
}