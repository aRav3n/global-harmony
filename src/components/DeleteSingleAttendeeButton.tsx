import type { DeleteSingleAttendeeButtonImports } from "../types";
import { handleDeleteAttendee } from "../utils";

export function DeleteSingleAttendeeButton({
  attendees,
  setAttendees,
  singleAttendeeId,
}: DeleteSingleAttendeeButtonImports) {
  return (
    <button
      type="button"
      onClick={() => {
        handleDeleteAttendee(attendees, setAttendees, singleAttendeeId);
      }}
    >
      ❌ Delete
    </button>
  );
}
