import type { OfficeHourAddImports } from "../types";
import "../styles/OfficeHoursAdd.css";

export function OfficeHoursAdd({
  attendee,
  handleAddOfficeHourBlock,
  handleOfficeHourChange,
}: OfficeHourAddImports) {
  const updateOfficeHours = (
    newTimeString: string,
    hourBlockId: number,
    isStartTime: boolean,
  ) => {
    const newHourBlock = { ...attendee.officeHours[hourBlockId] };
    isStartTime
      ? (newHourBlock.start = newTimeString)
      : (newHourBlock.end = newTimeString);

    handleOfficeHourChange(attendee, newHourBlock);
  };

  return (
    <div className="office-hours-container">
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
      <div className="office-hours-section">
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
                  onChange={(e) => {
                    updateOfficeHours(e.target.value, officeHourBlock.id, true);
                  }}
                />
              </label>
              <label htmlFor={`${officeHourBlock.id}-end-time`}>
                End Time
                <input
                  id={`${officeHourBlock.id}-end-time`}
                  type="time"
                  name="end"
                  value={officeHourBlock.end}
                  onChange={(e) => {
                    updateOfficeHours(
                      e.target.value,
                      officeHourBlock.id,
                      false,
                    );
                  }}
                />
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
