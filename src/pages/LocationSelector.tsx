import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import "./LocationSelector.css";
import type { LocationSelectorImports } from "../types";

export function LocationSelector({attendees, setAttendees, date, setDate}: LocationSelectorImports) {
  const [nextId, setNextId] = useState(4);
  

  const handleAttendeeChange = (id: number, field: string, value: string) => {
    const newAttendeeArray = attendees.map((a) =>
      a.id === id ? { ...a, [field]: value } : a,
    );

    setAttendees(newAttendeeArray);
  };

  const addMoreLocations = () => {
    const newAttendeeArray = [...attendees, { id: nextId, name: "", city: "" }];
    setAttendees(newAttendeeArray);
    const newId = nextId + 1;
    setNextId(newId);
  };

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
      const dateArray = dateString.split("-");
      const year = Number(dateArray[0]);
      const month = Number(dateArray[1]) - 1;
      const day = Number(dateArray[2]);
      const newDate = new Date(year, month, day);
      setDate(newDate);
    };

    return (
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
      <select
        value={date.getDate().toString()}
        className="date-input"
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
    );
  }

  function MonthSelect() {
    return (
      <select
        value={date.getMonth().toString()}
        onChange={(e) => updateMonth(e.target.value)}
        className="date-input"
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
    );
  }

  function YearSelect() {
    const yearsArray = [];
    for (let i = 0; i < 10; i++) {
      yearsArray[i] = new Date().getFullYear() + i;
    }

    return (
      <select
        value={date.getFullYear().toString()}
        onChange={(e) => updateYear(e.target.value)}
        className="date-input"
      >
        {yearsArray.map((year) => {
          return (
            <option key={year} value={year}>
              {year}
            </option>
          );
        })}
      </select>
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
              onClick={() => {
                const today = new Date();
                setDate(today);
              }}
            >
              Today
            </button>
          </div>

          <div className="attendees-section">
            {attendees.map((attendee) => (
              <div key={attendee.id} className="attendee-row">
                <input
                  type="text"
                  placeholder={`Person ${attendee.id}`}
                  value={attendee.name}
                  onChange={(e) =>
                    handleAttendeeChange(attendee.id, "name", e.target.value)
                  }
                  className="attendee-input"
                />
                <input
                  type="text"
                  placeholder={`City ${attendee.id}`}
                  value={attendee.city}
                  onChange={(e) =>
                    handleAttendeeChange(attendee.id, "city", e.target.value)
                  }
                  className="city-input"
                />
              </div>
            ))}
          </div>

          <div>
            <button onClick={addMoreLocations}>
            📍 Add More Locations
          </button>
          <button>
            ⏱️ Pick a Time
          </button>
          </div>
        </div>

        <aside className="lorem-section">
          <p>
            Lorem ipsum dolor sit amet. Qui nobis quia 33 quia obcaecati sed
            tenetur porro est autem voluptates eum molestias voluptas. Rem quia
            quidem ex enim autem ea nobis officia eum voluptatum exercitationem
            ut voluptatum exercitationem est deleniti adipisci. Non placeat
            explicabo et beatae mollitia ut nesciunt quam ex quam enim aut earum
            odit. Qui veritatis sequi et adipisci rerum id temporibus omnis ut
            maxime minima aut rerum assumenda ad voluptas dolore! Est incidunt
            placeat aut quia quam aut autem dolorum. Aut asperiores itaque in
            velit ratione sed aliquid soluta? Sed architecto exercitationem qui
            deleniti amet ut eligendi iure non labore dolores ut sapiente
            repellendus.
          </p>
        </aside>
      </main>
      <Footer />
    </div>
  );
}
