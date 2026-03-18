import { LocationInput } from "./LocationInput";
import type { SingleAttendeeSectionImports } from "../types";
import { OfficeHoursAdd } from "./OfficeHoursAdd";

export function SingleAttendeeSection({
  attendee,
  handleAddOfficeHourBlock,
  handleUpdateLocation,
  handleUpdateName,
}: SingleAttendeeSectionImports) {
  return (
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
      <OfficeHoursAdd
        attendee={attendee}
        handleAddOfficeHourBlock={handleAddOfficeHourBlock}
      />
    </div>
  );
}
