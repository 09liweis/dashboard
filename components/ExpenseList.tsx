const ICON_CATEGORY: { [key: string]: string } = {
  food: 'utensils',
  gas: 'gas-pump',
  computer: 'computer',
  clothes: 'clothes-hanger',
  grocery: 'cart-shopping',
  phone: 'phone',
  electricity: 'bolt',
  internet: 'internet-explorer',
  fuel: 'gas-pump'
};

import { ExpenseListProps } from '../types';
import Icon from './Icon';

export default function ExpenseList({
  categoryTransactions,
  openTransactionDetail,
}: ExpenseListProps) {
  const expensesHTML = categoryTransactions.map(({ category, total, items }) => {
    return (
      <div key={category} className="mb-2">
        <div className="father bg-gradient-to-l from-red-200 border-dashed border-2 border-red-600 p-1 flex justify-between items-center mb-1 rounded text-red-600 transition duration-300">
          <Icon
            classNames={
              'flex gap-x-1 tracking-widest transition duration-300 hover:translate-y-0.5'
            }
            name={ICON_CATEGORY[category]}
            text={category}
          />
          <span className="font-bold">{total}</span>
        </div>
        {items.map((transaction) => {
          const { id, price, date, place, title } = transaction;
          return (
            <article
              key={id}
              title={place?.address}
              className="flex justify-between cursor-pointer text-red-400 hover:text-red-600 transition duration-300"
              onClick={() => openTransactionDetail(transaction)}
            >
              <span className="truncate w-1/2">{place?.name}</span>
              <span className="flex justify-between w-1/2 text-black">
                <span className="text-indigo-500">{date}</span>
                <span className="truncate hidden md:block">{title}</span>
                {price && <span className='text-rose-600'>{price}</span>}
              </span>
            </article>
          );
        })}
      </div>
    );
  });
  return <>{expensesHTML}</>;
}
