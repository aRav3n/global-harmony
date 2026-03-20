import type { ShareHoursButtonImports } from "../types";
import "../styles/ShareHoursButton.css";
import { useNavigate } from "react-router-dom";
import {
  copyStringToClipboard,
  generatePreloadStringSegmentForAttendee,
} from "../utils";

export function ShareHoursButton({
  fullTeam,
  attendeeArray,
  attendee,
}: ShareHoursButtonImports) {
  if (!attendeeArray && !attendee) {
    return null;
  }

  const basePageUrl = `${window.location.href}preload`;

  const attendees = attendeeArray ? attendeeArray : [attendee];

  const handleClick = () => {
    let preloadLink = basePageUrl;
    for (let i = 0; i < attendees.length; i++) {
      const preloadStringSegment = generatePreloadStringSegmentForAttendee(
        attendees[i],
      );
      preloadLink += preloadStringSegment;
    }
    copyStringToClipboard(preloadLink);
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
