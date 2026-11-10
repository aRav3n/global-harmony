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
    <>
      <LocationInput
        singleAttendee={singleAttendee}
        setAttendees={setAttendees}
      />
      <DateTimeCalendarSelect
        dateTime={dateTime}
        setDateTime={setDateTime}
        timezoneName={singleAttendee.timezoneName}
      />
      <DeleteSingleAttendeeButton
        attendees={attendees}
        setAttendees={setAttendees}
        singleAttendeeId={singleAttendee.id}
      />
    </>
  );
}
