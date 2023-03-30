const ICON_CATEGORY: { [key: string]: string } = {
  food: 'fa-utensils',
  gas: 'fa-gas-pump',
  computer: 'fa-computer',
  clothes: 'fa-clothes-hanger',
  grocery: 'fa-cart-shopping',
  phone: 'fa-phone',
  electricity: 'fa-bolt',
  internet: 'fa-internet-explorer',
};

import { ExpenseListProps } from '../types';

export default function ExpenseList({
  categoryTransactions,
  openTransactionDetail,
}: ExpenseListProps) {
  const expensesHTML = Object.keys(categoryTransactions).map((key) => {
    const { total, items } = categoryTransactions[key];
    return (
      <div key={key} className="mb-2">
        <div className="father bg-gradient-to-r from-red-300 border-dashed border-2 border-red-600 p-1 flex justify-between items-center mb-1 rounded text-red-600 transition duration-300">
          <i
            className={`flex gap-x-1 tracking-widest fa-solid transition duration-300 hover:translate-y-0.5 ${ICON_CATEGORY[key]}`}
          >
            {key}
          </i>
          <span className="font-bold">${total}</span>
        </div>
        {items.map((transaction) => {
          const { _id, price, date, place, title } = transaction;
          return (
            <article
              key={_id}
              title={place?.address}
              className="flex justify-between cursor-pointer text-red-400 hover:text-red-600 transition duration-300"
              onClick={() => openTransactionDetail(transaction)}
            >
              <span className="truncate w-1/2">{place?.name}</span>
              <span className="flex justify-between w-1/2 text-black">
                <span>{date}</span>
                <span className="truncate hidden md:block">{title}</span>
                {price && <span>${Math.abs(price)}</span>}
              </span>
            </article>
          );
        })}
      </div>
    );
  });
  return <>{expensesHTML}</>;
}
