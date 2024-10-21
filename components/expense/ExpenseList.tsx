import { CategoryTransaction, ExpenseListProps, Transaction } from 'types';

interface ExpensesProps {
  expenses: Transaction[];
  openTransactionDetail: Function;
}
const Expenses = ({ expenses, openTransactionDetail }: ExpensesProps) => {
  return (
    <>
      {expenses.map((transaction) => {
        const { _id, price, date, place, title, income } = transaction;
        return (
          <article
            key={_id}
            title={place?.address}
            className="expense-item"
            onClick={() => openTransactionDetail(transaction)}
          >
            <span className="truncate w-1/2">{place?.name}</span>
            <span className="flex justify-between w-1/2 text-black">
              <span className="text-indigo-400">{date}</span>
              <span className="truncate hidden md:block">{title}</span>
              <span className={income?'text-green-600':`text-rose-600`}>{price}</span>
            </span>
          </article>
        );
      })}
    </>
  )
}

const CategoryPrice = ({categoryPrice}:{categoryPrice:CategoryTransaction}) => {
  const {category,income,total,percentage} = categoryPrice;
  return (
    <div className={`category-price ${income?'income':'expense'}`}>
      <div className='flex justify-between items-center'>
        <span className='capitalize text-xl'>{category}</span>
        <span className="font-bold">{total}</span>
      </div>
      <div className={`category-percentage ${income?'income':'expense'}`} style={{ width: percentage }}>{percentage}</div>
    </div>
  )
}

export default function ExpenseList({
  categoryTransactions,
  openTransactionDetail,
}: ExpenseListProps) {
  return (<>
    {categoryTransactions.map((categoryPrice) => {
      const {items, category} = categoryPrice;
      return (
        <div key={category} className="mb-5">
          <CategoryPrice categoryPrice={categoryPrice} />
          <Expenses expenses={items} openTransactionDetail={openTransactionDetail} />
        </div>
      );
    })}
  </>);
}
