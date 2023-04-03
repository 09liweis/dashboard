import { ExpenseDatesProps } from '../types';

const YEARS = ['2023', '2022', '2021', '2020', '2019', '2018', '2017'];
const MONTHS: { [key: string]: string } = {
  '1': 'Jan',
  '2': 'Fed',
  '3': 'Mar',
  '4': 'Apr',
  '5': 'May',
  '6': 'June',
  '7': 'July',
  '8': 'Aug',
  '9': 'Sep',
  '10': 'Oct',
  '11': 'Nov',
  '12': 'Dec',
};

const activeStyleClass = 'text-red-300 border-red-300';
const defaultStyleClass =
  'mr-2 p-0.5 rounded border border-transparent transition duration-300';

function getExpenseDateStyle(curDate: string, date: string) {
  return `${defaultStyleClass} ${
    curDate == date ? activeStyleClass : 'cursor-pointer'
  }`;
}

export default function ExpenseDates({
  curYear,
  curMonth,
  setYear,
  setMonth,
}: ExpenseDatesProps) {
  return (
    <article className="rounded month p-2 mb-2 bg-card md:flex-none">
      <section className="flex mb-1 flex-row md:flex-col">
        {YEARS.map((year) => (
          <p
            className={getExpenseDateStyle(curYear, year)}
            key={year}
            onClick={() => setYear(year)}
          >
            {year}
          </p>
        ))}
      </section>

      <section className="flex flex-row md:flex-col overflow-hidden">
        {curYear &&
          Object.keys(MONTHS).map((month) => (
            <p
              className={getExpenseDateStyle(curMonth, month)}
              key={month}
              onClick={() => setMonth(month)}
            >
              {MONTHS[month]}
            </p>
          ))}
      </section>
    </article>
  );
}
