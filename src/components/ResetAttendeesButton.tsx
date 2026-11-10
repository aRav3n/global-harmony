import type { ResetAttendeesButtonImports } from "../types";
import { handleResetLocations } from "../utils";

export function ResetAttendeesButton({
  setAttendees,
}: ResetAttendeesButtonImports) {
  return (
    <button
      type="button"
      onClick={() => {
        handleResetLocations(2, setAttendees);
      }}
    >
      🗑️ Reset
    </button>
  );
}
