import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { LocationSelector } from "./pages/LocationSelector";
import { ScheduleViewer } from "./pages/ScheduleViewer";
import { MeetingCreator } from "./pages/MeetingCreator";
import "./App.css";

function App() {
  const [attendees, setAttendees] = useState([
    { id: 1, name: "", city: "" },
    { id: 2, name: "", city: "" },
    { id: 3, name: "", city: "" },
  ]);
  const [date, setDate] = useState(new Date());

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
            />
          }
        />
        <Route path="/schedule" element={<ScheduleViewer />} />
        <Route path="/create" element={<MeetingCreator />} />
      </Routes>
    </Router>
  );
}

export default App;
