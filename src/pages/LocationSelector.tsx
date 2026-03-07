import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { LocationInput } from "../components/LocationInput";
import "../styles/LocationSelector.css";
import type { LocationSelectorImports } from "../types";

export function LocationSelector({
  attendees,
  setAttendees,
  date,
  setDate,
  nextId,
  setNextId,
}: LocationSelectorImports) {
  const handleAddLocations = (numberOfLocationsToAdd: number) => {
    const newAttendeeArray = [...attendees];

    for (let i = 0; i < numberOfLocationsToAdd; i++) {
      const newPerson = {
        id: nextId + i,
        name: "",
        city: "",
        country: "",
        timezoneName: "",
        timezoneOffsetStd: "",
        timezoneOffsetStdSeconds: 0,
        timezoneOffsetDst: "",
        timezoneOffsetDstSeconds: 0,
      };
      newAttendeeArray.push(newPerson);
    }

    const newId = nextId + numberOfLocationsToAdd;
    setNextId(newId);
    setAttendees(newAttendeeArray);
  };

  const handleUpdateLocation = (
    id: number,
    city: string,
    country: string,
    timezoneName: string,
    timezoneOffsetStd: string,
    timezoneOffsetStdSeconds: number,
    timezoneOffsetDst: string,
    timezoneOffsetDstSeconds: number,
  ) => {
    const newAttendeeArray = [...attendees];

    for (let i = 0; i < newAttendeeArray.length; i++) {
      const currentAttendee = newAttendeeArray[i];
      if (currentAttendee.id === id) {
        currentAttendee.city = city;
        currentAttendee.country = country;
        currentAttendee.timezoneName = timezoneName;
        currentAttendee.timezoneOffsetDst = timezoneOffsetDst;
        currentAttendee.timezoneOffsetDstSeconds = timezoneOffsetDstSeconds;
        currentAttendee.timezoneOffsetStd = timezoneOffsetStd;
        currentAttendee.timezoneOffsetStdSeconds = timezoneOffsetStdSeconds;
        setAttendees(newAttendeeArray);
        return;
      }
    }
  };

  const handleUpdateName = (id: number, newName: string) => {
    const newAttendeeArray = [...attendees];

    for (let i = 0; i < newAttendeeArray.length; i++) {
      const currentPerson = newAttendeeArray[i];
      if (currentPerson.id === id) {
        currentPerson.name = newName;
        setAttendees(newAttendeeArray);
        return;
      }
    }
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

  useEffect(() => {
    if (attendees.length < 2) {
      handleAddLocations(2);
    }
  }, []);

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
                    handleUpdateName(attendee.id, e.target.value)
                  }
                  className="attendee-input"
                />
                <LocationInput
                  attendee={attendee}
                  handleUpdateLocation={handleUpdateLocation}
                />
              </div>
            ))}
          </div>

          <div>
            <button
              onClick={() => {
                handleAddLocations(1);
              }}
            >
              📍 Add More Locations
            </button>
            <Link to="/schedule">
              <button tabIndex={0}>⏱️ Pick a Time</button>
            </Link>
          </div>
        </div>

        <aside className="about">
          <p>
            Seamlessly bridge the gap between diverse time zones with our
            intuitive scheduling tool. Designed for simplicity, this solution
            eliminates the hassle of account creation, enabling users to select
            optimal meeting times effortlessly. By coordinating collaborations
            when team members are most alert and engaged, the tool helps you
            prioritize productivity and mitigate the challenges of remote work.
            Experience a world where scheduling becomes an integral part of your
            team’s harmony - try it out today and transform how you connect with
            colleagues across the globe!
          </p>
        </aside>
      </main>
      <Footer />
    </div>
  );
}
