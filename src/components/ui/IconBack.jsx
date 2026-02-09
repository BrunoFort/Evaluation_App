import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";

export default function IconBack({ className = "" }) {
  return (
    <span className={`inline-flex items-center gap-1 ${className}`}>
      <FontAwesomeIcon icon={faArrowLeftLong} className="h-4 w-4" />
      <FontAwesomeIcon icon={faStar} className="h-3 w-3 opacity-60" />
    </span>
  );
}
