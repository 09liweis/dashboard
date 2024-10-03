import { ExpenseListProps, Transaction } from 'types';

interface ExpensesProps {
  expenses: Transaction[];
  openTransactionDetail: Function;
}
const Expenses = ({ expenses, openTransactionDetail }: ExpensesProps) => {
  return (
    <>
      {expenses.map((transaction) => {
        const { id, price, date, place, title, income } = transaction;
        return (
          <article
            key={id}
            title={place?.address}
            className="flex px-1 justify-between cursor-pointer text-red-400 hover:text-red-600 transition duration-300"
            onClick={() => openTransactionDetail(transaction)}
          >
            <span className="truncate w-1/2">{place?.name}</span>
            <span className="flex justify-between w-1/2 text-black">
              <span className="text-indigo-400">{date}</span>
              <span className="truncate hidden md:block">{title}</span>
              {price && <span className={income?'text-green-600':`text-rose-600`}>{price}</span>}
            </span>
          </article>
        );
      })}
    </>
  )
}

export default function ExpenseList({
  categoryTransactions,
  openTransactionDetail,
}: ExpenseListProps) {
  return (<>
    {categoryTransactions.map(({ category, total, items, percentage, income }) => {
      return (
        <div key={category} className="mb-2">
          <div className={`category-price text-${income?'green':'red'}-600`}>
            <div className='flex justify-between items-center'>
              <span className='capitalize text-xl'>{category}</span>
              <span className="font-bold">{total}</span>
            </div>
            <div className={`bg-${income ? 'green':'red'}-500 text-sm text-white text-right p-1 rounded`} style={{ width: percentage + '%' }}>{percentage.toFixed(2)}%</div>
          </div>
          <Expenses expenses={items} openTransactionDetail={openTransactionDetail} />
        </div>
      );
    })}
  </>);
}
