import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";

export default function IconBack({ className = "" }) {
  return (
    <span className={`relative inline-flex items-center justify-center ${className}`}>
      <FontAwesomeIcon icon={faArrowLeftLong} className="h-4 w-4" />
      <FontAwesomeIcon
        icon={faStar}
        className="absolute -top-1 -right-2 h-2.5 w-2.5 opacity-50"
      />
    </span>
  );
}
