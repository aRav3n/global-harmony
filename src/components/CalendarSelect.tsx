import { useEffect, useState } from "react";

import "../styles/LocationSelector.css";

import type { CalendarSelectImports } from "../types";

export function CalendarSelect({
  dateTime,
  setDateTime,
}: CalendarSelectImports) {
  const [calendarDisplayDate, setCalendarDisplayDate] = useState<string>("");

  const handleSetCalendarDisplayDate = (
    year: string | null,
    month: string | null,
    day: string | null,
  ) => {
    if (year === null && month === null && day === null) {
      const dateToSet = `${dateTime.getFullYear()}-${(dateTime.getMonth() + 1).toString().padStart(2, "0")}-${dateTime.getDate().toString().padStart(2, "0")}`;
      setCalendarDisplayDate(dateToSet);
    }
  };

  useEffect(() => {
    handleSetCalendarDisplayDate(null, null, null);
  }, [dateTime]);

  const handleCalendarDayChange = (dateString: string) => {
    if (dateString === "") {
      setDateTime(new Date());
      return;
    }

    const dateArray = dateString.split("-");
    const year = Number(dateArray[0]);
    const month = Number(dateArray[1]) - 1;
    const day = Number(dateArray[2]);
    const newDate = new Date(year, month, day);
    setDateTime(newDate);
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
