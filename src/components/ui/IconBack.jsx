export default function IconBack({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M19 6H9.2C6.7 6 5 7.7 5 10.2V14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M8.6 9.6L5 13.2L8.6 16.8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M12 6L19 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.35"
      />
    </svg>
  );
}
