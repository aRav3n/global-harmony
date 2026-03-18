import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import type { ScheduleViewerImports, TableRowProps } from "../types";
import { generateHeadingTimeString } from "../utils";
import { ScheduleTableData } from "../components/ScheduleTableData";
import "../styles/ScheduleViewer.css";

export function ScheduleViewer({
  attendees,
  date,
  setMeetingTime,
}: ScheduleViewerImports) {
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !attendees[0] ||
      !attendees[0].timezoneName ||
      typeof date !== "object"
    ) {
      navigate("/");
    }
  }, []);

  const timeSlots: Date[] = [];
  for (let i = 0; i < 24; i++) {
    const timeslot = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), i, 0, 0, 0),
    );
    timeSlots.push(timeslot);
  }

  function TableRow({ time }: TableRowProps) {
    return (
      <tr
        className="time-slot-row"
        onClick={() => {
          setMeetingTime(time);
          navigate("/create");
        }}
      >
        {attendees.map((attendee) => (
          <ScheduleTableData
            key={attendee.id}
            attendee={attendee}
            time={time}
          />
        ))}
      </tr>
    );
  }

  return (
    <div className="schedule-viewer-container">
      <Header />
      <main className="schedule-viewer-main">
        <h1>{generateHeadingTimeString(timeSlots[0])}</h1>

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
