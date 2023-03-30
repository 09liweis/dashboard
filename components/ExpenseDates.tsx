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
const defaultStyleClass = 'mr-2 p-0.5 rounded border';

export default function ExpenseDates({
  curYear,
  curMonth,
  setYear,
  setMonth,
}: ExpenseDatesProps) {
  return (
    <article className="month p-3 mb-2 bg-card md:flex-none">
      <section className="flex flex-row md:flex-col">
        {YEARS.map((year) => (
          <p
            className={`${defaultStyleClass} ${
              curYear == year ? activeStyleClass : 'cursor-pointer'
            }`}
            key={year}
            onClick={() => setYear(year)}
          >
            {year}
          </p>
        ))}
      </section>

      <section className="flex flex-row md:flex-col">
        {curYear
          ? Object.keys(MONTHS).map((month) => (
              <p
                className={`${defaultStyleClass} ${
                  curMonth == month ? activeStyleClass : 'cursor-pointer'
                }`}
                key={month}
                onClick={() => setMonth(month)}
              >
                {MONTHS[month]}
              </p>
            ))
          : null}
      </section>
    </article>
  );
}
