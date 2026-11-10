import "../styles/SingleTimezone.css";

import { DateTimeCalendarSelect } from "../components/DateTimeSelect";
import { LocationInput } from "../components/LocationInput";
import { DeleteSingleAttendeeButton } from "../components/DeleteSingleAttendeeButton";
import type { SingleTimezoneImports } from "../types";

export function SingleTimezone({
  singleAttendee,
  attendees,
  setAttendees,
  dateTime,
  setDateTime,
}: SingleTimezoneImports) {
  return (
    <div>
      <div className="single-timezone">
        <LocationInput
          singleAttendee={singleAttendee}
          setAttendees={setAttendees}
        />
        <DateTimeCalendarSelect
          dateTime={dateTime}
          setDateTime={setDateTime}
          timezoneName={singleAttendee.timezoneName}
        />
      </div>
      <DeleteSingleAttendeeButton
        attendees={attendees}
        setAttendees={setAttendees}
        singleAttendeeId={singleAttendee.id}
      />
    </div>
  );
}
