import { LocationInput } from "./LocationInput";
import type { SingleAttendeeSectionImports } from "../types";
import { OfficeHoursAdd } from "./OfficeHoursAdd";
import { ShareHoursButton } from "./ShareHoursButton";

export function SingleAttendeeSection({
  attendee,
  handleAddOfficeHourBlock,
  handleDeleteAttendee,
  handleDeleteOfficeHourBlock,
  handleOfficeHourChange,
  handleUpdateLocation,
  handleUpdateName,
}: SingleAttendeeSectionImports) {
  return (
    <>
      <div>
        <div key={attendee.id} className="attendee-row">
          <label htmlFor={`${attendee.id}-name`}>
            Name
            <input
              type="text"
              id={`${attendee.id}-name`}
              placeholder={`Person ${attendee.name}`}
              value={attendee.name}
              onChange={(e) => handleUpdateName(attendee.id, e.target.value)}
              className="attendee-input"
            />
          </label>
          <LocationInput
            attendee={attendee}
            handleUpdateLocation={handleUpdateLocation}
          />
        </div>
        <ShareHoursButton
          fullTeam={false}
          attendeeArray={null}
          attendee={attendee}
        />
      </div>
      <OfficeHoursAdd
        attendee={attendee}
        handleAddOfficeHourBlock={handleAddOfficeHourBlock}
        handleDeleteOfficeHourBlock={handleDeleteOfficeHourBlock}
        handleOfficeHourChange={handleOfficeHourChange}
      />
      <button
        type="button"
        onClick={() => {
          handleDeleteAttendee(attendee.id);
        }}
      >
        ❌ Remove Person
      </button>
    </>
  );
}
