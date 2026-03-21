import { useEffect, useState } from "react";

import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { AttendeesSection } from "../components/AttendeesSection";
import "../styles/LocationSelector.css";
import type { LocationSelectorImports } from "../types";

export function LocationSelector({
  attendees,
  setAttendees,
  date,
  setDate,
}: LocationSelectorImports) {
  const [calendarDisplayDate, setCalendarDisplayDate] = useState<string>("");

  const updateDate = (
    year: number | null,
    month: number | null,
    day: number | null,
  ) => {
    const newYear = year === null ? date.getFullYear() : year;
    const newMonth = month === null ? date.getMonth() : month;
    const newDay = day === null ? date.getDate() : day;

    const newDateValue = new Date(newYear, newMonth, newDay);

    setDate(newDateValue);
  };

  const updateMonth = (month: string) => {
    const monthNumber = Number(month);
    if (
      monthNumber >= 0 &&
      monthNumber <= 11 &&
      Number.isInteger(monthNumber)
    ) {
      updateDate(null, monthNumber, null);
    }
  };

  const updateYear = (year: string) => {
    if (year.length === 4) {
      updateDate(Number(year), null, null);
    }
  };

  function CalendarSelect() {
    const handleSetCalendarDisplayDate = (
      year: string | null,
      month: string | null,
      day: string | null,
    ) => {
      if (year === null && month === null && day === null) {
        const dateToSet = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
        setCalendarDisplayDate(dateToSet);
      }
    };

    useEffect(() => {
      handleSetCalendarDisplayDate(null, null, null);
    }, [date]);

    const handleCalendarDayChange = (dateString: string) => {
      const dateArray = dateString.split("-");
      const year = Number(dateArray[0]);
      const month = Number(dateArray[1]) - 1;
      const day = Number(dateArray[2]);
      const newDate = new Date(year, month, day);
      setDate(newDate);
    };

    return (
      <label htmlFor="calendar">
        Or select a date
        <input
          onKeyDown={(e) => {
            e.preventDefault();
          }}
          type="date"
          name="calendar"
          id="calendar"
          className="date-input"
          value={calendarDisplayDate}
          onChange={(e) => {
            handleCalendarDayChange(e.target.value);
          }}
        />
      </label>
    );
  }

  function DaySelect() {
    const year = date.getFullYear();
    const nextMonth = date.getMonth() + 1;
    const daysInSelectedMonth = new Date(year, nextMonth, 0).getDate();

    const updateDay = (day: string) => {
      if (
        Number.isInteger(Number(day)) &&
        Number(day) > 0 &&
        Number(day) <= daysInSelectedMonth
      ) {
        updateDate(null, null, Number(day));
      }
    };

    const daysArray = new Array(daysInSelectedMonth);
    for (let i = 0; i < daysArray.length; i++) {
      daysArray[i] = i + 1;
    }

    return (
      <label htmlFor="day-select">
        Day
        <select
          value={date.getDate().toString()}
          className="date-input"
          id="day-select"
          onChange={(e) => updateDay(e.target.value.toString())}
        >
          <option disabled>-- Day --</option>
          {daysArray.map((day) => {
            return (
              <option key={day} value={day}>
                {day}
              </option>
            );
          })}
        </select>
      </label>
    );
  }

  function MonthSelect() {
    return (
      <label htmlFor="month-select">
        Month
        <select
          value={date.getMonth().toString()}
          onChange={(e) => updateMonth(e.target.value)}
          className="date-input"
          id="month-select"
        >
          <option disabled>-- Month --</option>
          <option value="0">January</option>
          <option value="1">February</option>
          <option value="2">March</option>
          <option value="3">April</option>
          <option value="4">May</option>
          <option value="5">June</option>
          <option value="6">July</option>
          <option value="7">August</option>
          <option value="8">September</option>
          <option value="9">October</option>
          <option value="10">November</option>
          <option value="11">December</option>
        </select>
      </label>
    );
  }

  function YearSelect() {
    const yearsArray = [];
    for (let i = 0; i < 10; i++) {
      yearsArray[i] = new Date().getFullYear() + i;
    }

    return (
      <label htmlFor="year-select">
        Year
        <select
          value={date.getFullYear().toString()}
          onChange={(e) => updateYear(e.target.value)}
          className="date-input"
          id="year-select"
        >
          {yearsArray.map((year) => {
            return (
              <option key={year} value={year}>
                {year}
              </option>
            );
          })}
        </select>
      </label>
    );
  }

  return (
    <div className="location-selector-container">
      <Header />
      <main className="location-selector-main">
        <div className="location-selector-content">
          <div className="date-section">
            <YearSelect />
            <MonthSelect />
            <DaySelect />
            <CalendarSelect />
            <button
              className="today-button"
              onClick={() => {
                const today = new Date();
                setDate(today);
              }}
            >
              Today
            </button>
          </div>

          <AttendeesSection attendees={attendees} setAttendees={setAttendees} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
