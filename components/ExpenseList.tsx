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
      <div key={key}>
        <div className="father p-1 flex justify-between my-2 rounded text-red-600">
          <span className="">
            <i className={`fa-solid ${ICON_CATEGORY[key]}`}></i>
            {key}
          </span>
          <span className="">
            <i className="fa-solid fa-sack-dollar"></i>
            {total}
          </span>
        </div>
        <ul className="detail1">
          {items.map((transaction) => {
            const { _id, price, date, place, title } = transaction;
            return (
              <li
                key={_id}
                title={place?.address}
                className="box cursor-pointer hover:text-red-600 transition duration-300"
                onClick={() => openTransactionDetail(transaction)}
              >
                <div>{place?.name}</div>
                <div className="box box2">
                  <div>{date}</div>
                  <div>{title}</div>
                  {price && <div>${Math.abs(price)}</div>}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  });
  return <>{expensesHTML}</>;
}
