import { useEffect, useState } from "react";

import "../styles/LocationSelector.css";

import type { CalendarSelectImports } from "../types";

export function CalendarSelect({ date, setDate }: CalendarSelectImports) {
  const [calendarDisplayDate, setCalendarDisplayDate] = useState<string>("");

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
    // dateString = 2026-11-10
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
