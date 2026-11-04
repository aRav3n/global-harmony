import { useNavigate } from "react-router-dom";
import { PageWrapper } from "../components/PageWrapper";

import "../styles/LandingPage.css";

export function Landing() {
  const navigate = useNavigate();

  const handleConvertTimes = () => {
    navigate("/conversion");
  };

  const handleScheduleAMeeting = () => {
    navigate("/meeting");
  };

  return (
    <PageWrapper>
      <h1>Convert times or schedule a meeting:</h1>
      <div>
        <button type="button" onClick={handleConvertTimes}>
          🕚 ➡️ 🕔 Convert Time
        </button>
        <button type="button" onClick={handleScheduleAMeeting}>
          🗓️ Schedule a Meeting
        </button>
      </div>
      <p>
        You can either try our quick timezone conversion, or use the more
        in-depth meeting scheduler. Give them both a try if you have time!
      </p>
    </PageWrapper>
  );
}
