import type { OfficeHourAddImports } from "../types";
import "../styles/OfficeHoursAdd.css";

export function OfficeHoursAdd({
  attendee,
  handleAddOfficeHourBlock,
}: OfficeHourAddImports) {
  return (
    <div>
      {attendee.officeHours.map((officeHourBlock) => {
        return (
          <div
            key={`office-hours-${officeHourBlock.id}`}
            className="office-hour-block"
          >
            <label htmlFor={`${officeHourBlock.id}-start-time`}>
              Start Time
              <input
                id={`${officeHourBlock.id}-start-time`}
                type="time"
                name="start"
                value={officeHourBlock.start}
              />
            </label>
            <label htmlFor={`${officeHourBlock.id}-end-time`}>
              End Time
              <input
                id={`${officeHourBlock.id}-end-time`}
                type="time"
                name="end"
                value={officeHourBlock.end}
              />
            </label>
          </div>
        );
      })}
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
