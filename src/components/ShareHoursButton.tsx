import type { ShareHoursButtonImports } from "../types";
import "../styles/ShareHoursButton.css";
import {
  copyStringToClipboard,
  generatePreloadStringSegmentForAttendee,
} from "../utils";
import { useState } from "react";
import { SuccessfulCopyNotification } from "./SuccessfulCopyNotification";

export function ShareHoursButton({
  fullTeam,
  attendeeArray,
  attendee,
}: ShareHoursButtonImports) {
  const [success, setSuccess] = useState<boolean | null>(null);

  if (!attendeeArray && !attendee) {
    return null;
  }

  const basePageUrl = `${window.location.href}preload`;

  const attendees = attendeeArray ? attendeeArray : [attendee];

  const handleClick = async () => {
    let preloadLink = basePageUrl;
    for (let i = 0; i < attendees.length; i++) {
      const preloadStringSegment = generatePreloadStringSegmentForAttendee(
        attendees[i],
      );
      preloadLink += preloadStringSegment;
    }
    await copyStringToClipboard(preloadLink);
    setSuccess(true);
  };

  return (
    <div className="share-hours-container">
      <button type="button" onClick={handleClick}>
        🔗 Get My {fullTeam ? "Team's" : null} Link
      </button>
      <SuccessfulCopyNotification success={success} setSuccess={setSuccess} />
    </div>
  );
}
