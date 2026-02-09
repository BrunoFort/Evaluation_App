import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faStar } from "@fortawesome/free-solid-svg-icons";

export default function IconBack({ className = "" }) {
  return (
    <span className={`relative inline-flex items-center justify-center ${className}`}>
      <FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4" />
      <FontAwesomeIcon
        icon={faStar}
        className="absolute -top-1 -right-1 h-2.5 w-2.5 opacity-60"
      />
    </span>
  );
}
