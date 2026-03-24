import { ExpenseResponse } from 'types';

interface ExpenseHeaderProps {
  expenseResponse: ExpenseResponse;
  onDateChange: (date: string) => void;
  onEndDateChange: (endDate: string) => void;
}

export default function ExpenseHeader({ expenseResponse, onDateChange, onEndDateChange }: ExpenseHeaderProps) {
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
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
          <input 
            type="month" 
            value={expenseResponse.date} 
            onChange={(e) => onDateChange(e.target.value)}
            className="w-full p-3 rounded bg-white border border-gray-200 shadow focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
          <input 
            type="date" 
            value={expenseResponse.endDate || ''} 
            onChange={(e) => onEndDateChange(e.target.value)}
            className="w-full p-3 rounded bg-white border border-gray-200 shadow focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 text-center text-gray-500">
      {stats.map(({tl,value,color})=>
        <div key={tl} className="bg-white p-1 sm:p-4 rounded shadow border border-gray-100">
          <h3 className="text-sm font-medium mb-1">{tl}</h3>
          <p className={`text-xl font-bold ${color}`}>{value}</p>
        </div>
      )}
      </div>
    </div>
  );
}