import { FaSpinner } from "react-icons/fa";
import "./loader.css"; // Optional: Add custom styles for the loader

function Loader() {
  return (
    <div className="loader">
      <FaSpinner className="spinner" />
    </div>
  );
}

export default Loader;
