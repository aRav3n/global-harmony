import { Link } from "react-router-dom";
import "../styles/NotFound.css";

export function NotFound() {
  return (
    <div className="not-found-container">
      <div>
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p className="not-found-message">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="not-found-button">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
