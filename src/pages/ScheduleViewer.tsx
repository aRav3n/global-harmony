import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import type { ScheduleViewerImports, TableRowProps } from "../types";
import "../styles/ScheduleViewer.css";

export function ScheduleViewer({
  attendees,
  date,
  setMeetingTime,
}: ScheduleViewerImports) {
  const earliestAcceptableTime = 6;
  const latestAcceptableTime = 22;
  const navigate = useNavigate();
  const timeSlots: Date[] = [];
  for (let i = 0; i < 24; i++) {
    const timeslot = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), i, 0, 0, 0),
    );
    timeSlots.push(timeslot);
  }

  const checkIfAcceptableMeetingTime = (time: Date, timezone: string) => {
    const timeString = time.toLocaleTimeString("en-gb", { timeZone: timezone });
    const hour = Number(timeString.slice(0, 2));
    return hour < earliestAcceptableTime || hour > latestAcceptableTime
      ? false
      : true;
  };

  const convertDateToString = function convertUtcDateToLocalStringWithOptions(
    dateTime: Date,
    timezone: string,
  ) {
    const dateTimeString = dateTime.toLocaleString(undefined, {
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      month: "long",
      timeZone: timezone,
      weekday: "short",
    });
    return dateTimeString;
  };

  const generateHeadingTimeString = () => {
    const dateTimeString = timeSlots[0].toLocaleString(undefined, {
      day: "numeric",
      month: "long",
      timeZone: "UTC",
      weekday: "long",
      timeZoneName: "short",
      year: "numeric",
    });
    return dateTimeString;
  };

  function TableRow({ time }: TableRowProps) {
    return (
      <tr
        className="time-slot-row"
        onClick={() => {
          setMeetingTime(time);
          navigate("/create");
        }}
      >
        {attendees.map((attendee) => {
          const localDateTimeString = convertDateToString(
            time,
            attendee.timezoneName,
          );
          const acceptableMeetingTime = checkIfAcceptableMeetingTime(
            time,
            attendee.timezoneName,
          );
          return (
            <td
              className={acceptableMeetingTime ? "" : "bad-time"}
              key={attendee.id}
            >
              {localDateTimeString}
            </td>
          );
        })}
      </tr>
    );
  }

  return (
    <div className="schedule-viewer-container">
      <Header />
      <main className="schedule-viewer-main">
        <h1>{generateHeadingTimeString()}</h1>

        <p className="instruction-text">
          Click on a row to select this meeting time.
        </p>

        <div className="schedule-table-container">
          <table className="schedule-table">
            <thead>
              <tr>
                {attendees.map((attendee) => {
                  return <th key={attendee.id}>{attendee.name}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((time, index) => (
                <TableRow key={index} time={time} />
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </div>
  );
}
