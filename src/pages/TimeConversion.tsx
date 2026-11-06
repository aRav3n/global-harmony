import { useEffect, useState } from "react";

import { PageWrapper } from "../components/PageWrapper";
import { LocationInput } from "../components/LocationInput";
import { handleAddLocations } from "../utils";
import type { AttendeeArray, SingleTimezoneImports } from "../types";

import "../styles/TimeConversion.css";

function SingleTimezone({ dateTime, setDateTime }: SingleTimezoneImports) {
  console.log(dateTime);

  return <></>;
}

export function TimeConversion() {
  const [dateTime, setDateTime] = useState<Date | null>(null);
  const [attendees, setAttendees] = useState<AttendeeArray>([]);

  const localStorageKey = "timezoneConversionAttendeeArray";

  useEffect(() => {
    const localAttendeeArray = localStorage.getItem(localStorageKey);

    if (localAttendeeArray) {
      setAttendees(JSON.parse(localAttendeeArray));
    } else {
      handleAddLocations(2, attendees, setAttendees);
    }
  }, []);

  return (
    <PageWrapper>
      <div className="location-selector-content">
        <div className="date-section">
          <button
            className="today-button"
            onClick={() => {
              const today = new Date();
              setDateTime(today);
            }}
          >
            Today
          </button>
        </div>
      </div>
    </PageWrapper>
  );
}
