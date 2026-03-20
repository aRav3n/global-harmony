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
      className={!success ? "failure" : ""}
      onClick={() => {
        setSuccess(null);
      }}
    >
      <h1>{success ? "Success!" : "There was an error!"}</h1>

      {success ? (
        <p>
          Your custom link was copied to your clipboard. You can now paste it
          into an email, text, or message and send it to your teammates so they
          can see your available hours.
        </p>
      ) : (
        <p>
          Your custom link could not be copied. Double check that your{" "}
          <strong>Name</strong> and <strong>City</strong> are set correctly. It
          would also be a good idea to <strong>Add Office Hours</strong> so your
          teammates know the best time to schedule a meeting.
        </p>
      )}

      <p>Click anywhere on this notification to close it.</p>
    </div>
  );
}
