import { useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import type { ScheduleViewerImports } from "../types";
import "../styles/ScheduleViewer.css";

export function ScheduleViewer({ attendees, date }: ScheduleViewerImports) {
  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, "0");
    const minutes = "00";
    return `${hour}:${minutes}`;
  });

  return (
    <div className="schedule-viewer-container">
      <Header />
      <main className="schedule-viewer-main">
        <h1>{date.toDateString()}</h1>

        <p className="instruction-text">
          Click on a row to select this meeting time.
        </p>

        <div className="schedule-table-container">
          <table className="schedule-table">
            <thead>
              <tr>
                <th>Me</th>
                <th>Person 2</th>
                <th>Person 3</th>
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((time, index) => (
                <tr key={index} className="time-slot-row">
                  <td>Day {time}</td>
                  <td>Day HH:MM</td>
                  <td>Day HH:MM</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </div>
  );
}
