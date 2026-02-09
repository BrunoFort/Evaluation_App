export default function IconBack({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M4 12L10 6V10H15.5C18.5 10 20.5 12 20.5 15C20.5 18 18.5 20 15.5 20H10"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.4"
      />
      <path
        d="M4 12L10 18V14H15.5C17.2 14 18.2 15.1 18.2 16.6C18.2 18.1 17.2 19.2 15.5 19.2H10"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
