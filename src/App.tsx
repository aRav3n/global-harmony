import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { LocationSelector } from "./pages/LocationSelector";
import { ScheduleViewer } from "./pages/ScheduleViewer";
import { MeetingCreator } from "./pages/MeetingCreator";
import type { AttendeeArray } from "./types";
import "./styles/App.css";

function App() {
  const [attendees, setAttendees] = useState<AttendeeArray>([]);
  const [date, setDate] = useState<Date>(new Date());
  const [nextId, setNextId] = useState<number>(1);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <LocationSelector
              attendees={attendees}
              setAttendees={setAttendees}
              date={date}
              setDate={setDate}
              nextId={nextId}
              setNextId={setNextId}
            />
          }
        />
        <Route
          path="/schedule"
          element={<ScheduleViewer attendees={attendees} date={date} />}
        />
        <Route path="/create" element={<MeetingCreator />} />
      </Routes>
    </Router>
  );
}

export default App;
