import type { SuccessfulCopyNotificationImports } from "../types";
import "../styles/SuccessfulCopyNotification.css";

export function SuccessfulCopyNotification({
  success,
  setSuccess,
}: SuccessfulCopyNotificationImports) {
  if (success === null) {
    return null;
  }
  return (
    <div
      id="copy-notification"
      onClick={() => {
        setSuccess(null);
      }}
    >
      <h1>Success!</h1>
      <p>
        Your custom link was copied to your clipboard. You can now paste it into
        an email, text, or message and send it to your teammates so they can see
        your available hours.
      </p>
      <p>Click anywhere on this notification to close it.</p>
    </div>
  );
}
