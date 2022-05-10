import { Spinner } from "react-bootstrap";
import "./LoadingIndicator.css";

/**
 * A component with a spinning loading indicator taking up all space available.
 */
export const LoadingIndicator: React.FC = () => {
  return (
    <div className="loading-indicator__container">
      <Spinner
        className="loading-indicator__spinner"
        animation="border"
      ></Spinner>
    </div>
  );
};
