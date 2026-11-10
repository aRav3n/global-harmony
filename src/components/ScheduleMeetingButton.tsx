import { useNavigate } from "react-router-dom";

export function GoToSchedulingPageButton() {
  const navigate = useNavigate();

  const handleScheduleAMeeting = () => {
    navigate("/meeting");
  };

  return (
    <button type="button" onClick={handleScheduleAMeeting}>
      🗓️ Schedule a Meeting
    </button>
  );
}
