import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";

export default function IconBack({ className = "" }) {
  return (
    <span className={`relative inline-flex items-center justify-center ${className}`}>
      <FontAwesomeIcon icon={faHouse} className="h-4 w-4" />
      <FontAwesomeIcon
        icon={faStar}
        className="absolute h-2.5 w-2.5 opacity-70"
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -35%)" }}
      />
    </span>
  );
}
