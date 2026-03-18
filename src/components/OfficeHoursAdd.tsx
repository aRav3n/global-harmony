import type { OfficeHourAddImports } from "../types";

export function OfficeHoursAdd({
  attendee,
  handleAddOfficeHourBlock,
}: OfficeHourAddImports) {
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          handleAddOfficeHourBlock(attendee);
        }}
      >
        ⏳{" Add "}
        {attendee.officeHours !== undefined && attendee.officeHours.length > 0
          ? "More"
          : null}{" "}
        Office Hours
      </button>
    </div>
  );
}
