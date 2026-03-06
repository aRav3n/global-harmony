import { useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import "../styles/ScheduleViewer.css";

export function ScheduleViewer() {
  const [date, setDate] = useState({ year: "", month: "", day: "" });

  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, "0");
    const minutes = "00";
    return `${hour}:${minutes}`;
  });

  return (
    <div className="schedule-viewer-container">
      <Header />
      <main className="schedule-viewer-main">
        <div className="schedule-controls">
          <div className="date-inputs">
            <input
              type="text"
              placeholder="YYYY"
              value={date.year}
              onChange={(e) => setDate({ ...date, year: e.target.value })}
              className="date-input"
            />
            <input
              type="text"
              placeholder="Month"
              value={date.month}
              onChange={(e) => setDate({ ...date, month: e.target.value })}
              className="date-input"
            />
            <input
              type="text"
              placeholder="DD"
              value={date.day}
              onChange={(e) => setDate({ ...date, day: e.target.value })}
              className="date-input"
            />
          </div>
          <button className="calendar-btn">📅</button>
          <button className="today-btn">Today</button>
        </div>

        <p className="instruction-text">
          Click on a row to select this meeting time, or pick a new date below
        </p>

        <div className="schedule-table-container">
          <table className="schedule-table">
            <thead>
              <tr>
                <th>Greenwich Mean Time</th>
                <th>Me</th>
                <th>Person 2</th>
                <th>Person 3</th>
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((time, index) => (
                <tr key={index} className="time-slot-row">
                  <td>Month DD YYYY - Day HH:MM</td>
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
