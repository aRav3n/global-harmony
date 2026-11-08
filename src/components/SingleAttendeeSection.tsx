import { LocationInput } from "./LocationInput";
import { OfficeHoursAdd } from "./OfficeHoursAdd";
import { ShareHoursButton } from "./ShareHoursButton";

import type { SingleAttendeeSectionImports } from "../types";
import { handleDeleteAttendee, handleUpdateName } from "../utils";

export function SingleAttendeeSection({
  singleAttendee,
  attendees,
  setAttendees,
  handleAddOfficeHourBlock,
  handleDeleteOfficeHourBlock,
  handleOfficeHourChange,
}: SingleAttendeeSectionImports) {
  return (
    <>
      <div>
        <div key={singleAttendee.id} className="attendee-row">
          <label htmlFor={`${singleAttendee.id}-name`}>
            Name
            <input
              type="text"
              id={`${singleAttendee.id}-name`}
              placeholder={`Person ${singleAttendee.name}`}
              value={singleAttendee.name}
              onChange={(e) =>
                handleUpdateName(
                  singleAttendee.id,
                  e.target.value,
                  setAttendees,
                )
              }
              className="attendee-input"
            />
          </label>
          <LocationInput
            singleAttendee={singleAttendee}
            setAttendees={setAttendees}
          />
        </div>
        <ShareHoursButton
          fullTeam={false}
          attendeeArray={null}
          attendee={singleAttendee}
        />
      </div>
      <OfficeHoursAdd
        attendee={singleAttendee}
        handleAddOfficeHourBlock={handleAddOfficeHourBlock}
        handleDeleteOfficeHourBlock={handleDeleteOfficeHourBlock}
        handleOfficeHourChange={handleOfficeHourChange}
      />
      <button
        type="button"
        onClick={() => {
          handleDeleteAttendee(attendees, setAttendees, singleAttendee.id);
        }}
      >
        ❌ Remove Person
      </button>
    </>
  );
}
