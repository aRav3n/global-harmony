import type { ShareHoursButtonImports } from "../types";
import "../styles/ShareHoursButton.css";
import { useNavigate } from "react-router-dom";

export function ShareHoursButton({
  fullTeam,
  attendeeArray,
  attendee,
}: ShareHoursButtonImports) {
  const basePageUrl = `${window.location.href}preload/`;

  

  const preloadLink = basePageUrl + "";

  const handleClick = () => {
    console.log({ preloadLink });
  };

  return (
    <div className="share-hours-container">
      <button type="button" onClick={handleClick}>
        🔗 Get My {fullTeam ? "Team's" : null} Link
      </button>
      <div>
        Copy your link by clicking the button below, then share your{" "}
        {fullTeam ? "team's hours with others" : "hours with your team"}!
      </div>
    </div>
  );
}
