import { LocationInput } from "./LocationInput";
import { OfficeHoursAdd } from "./OfficeHoursAdd";
import { ShareHoursButton } from "./ShareHoursButton";

import type { SingleAttendeeSectionImports } from "../types";
import { handleUpdateName } from "../utils";
import { DeleteSingleAttendeeButton } from "./DeleteSingleAttendeeButton";

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
        {singleAttendee.city &&
        singleAttendee.timezoneName &&
        singleAttendee.name ? (
          <ShareHoursButton
            fullTeam={false}
            attendeeArray={null}
            attendee={singleAttendee}
          />
        ) : null}
      </div>
      <OfficeHoursAdd
        attendee={singleAttendee}
        handleAddOfficeHourBlock={handleAddOfficeHourBlock}
        handleDeleteOfficeHourBlock={handleDeleteOfficeHourBlock}
        handleOfficeHourChange={handleOfficeHourChange}
      />
      <DeleteSingleAttendeeButton
        attendees={attendees}
        setAttendees={setAttendees}
        singleAttendeeId={singleAttendee.id}
      />
    </>
  );
}
