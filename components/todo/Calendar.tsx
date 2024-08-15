import { useEffect, useState } from "react";

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

interface CalendarDay {
  status: string,
  date: number
}

export default function Calendar() {

  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth();

  const [days, setDays] = useState<CalendarDay[]>([]);

  // Function to generate the calendar
  const setCalendarDays = () => {
    const newDays = [];
    // Get the first day of the month
    let dayone = new Date(year, month, 1).getDay();

    // Get the last date of the month
    let lastdate = new Date(year, month + 1, 0).getDate();

    // Get the day of the last date of the month
    let dayend = new Date(year, month, lastdate).getDay();

    // Get the last date of the previous month
    let monthlastdate = new Date(year, month, 0).getDate();

    // Loop to add the last dates of the previous month
    for (let i = dayone; i > 0; i--) {
      newDays.push({ status: 'inactive', date: monthlastdate - i + 1 });
    }

    // Loop to add the dates of the current month
    for (let i = 1; i <= lastdate; i++) {
      // Check if the current date is today
      let isToday = i === date.getDate()
        && month === new Date().getMonth()
        && year === new Date().getFullYear()
        ? "active"
        : "";
      newDays.push({ status: isToday, date: i });
    }

    // Loop to add the first dates of the next month
    for (let i = dayend; i < 6; i++) {
      newDays.push({ status: 'inactive', date: i - dayend + 1 })
    }
    // currdate.innerText = `${months[month]} ${year}`;
    setDays(newDays);
  }

  useEffect(() => {
    setCalendarDays();
  }, []);

  return (
    <section className="flex flex-wrap">
      {WEEKDAYS.map((day) => <span className="calendar-day" key={day}>{day}</span>)}
      {days.map(({date,status}) => <section className={`calendar-day ${status}`} key={date}><span className="bg-white p-2 rounded-lg transition duration-300 hover:scale-110">{date}</span></section>)}
    </section>
  );
}