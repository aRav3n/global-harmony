import type { ScheduleTableDataImports } from "../types";
import { checkIfAcceptableMeetingTime, convertDateToString } from "../utils";

export function ScheduleTableData({
  attendee,
  time,
}: ScheduleTableDataImports) {
  const localDateTimeString = convertDateToString(time, attendee.timezoneName);
  const acceptableMeetingTime = checkIfAcceptableMeetingTime(
    time,
    attendee.timezoneName,
    attendee.officeHours,
  );
  return (
    <td className={acceptableMeetingTime ? "" : "bad-time"} key={attendee.id}>
      {localDateTimeString}
    </td>
  );
}
