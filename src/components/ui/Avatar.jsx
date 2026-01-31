export default function Avatar({ src, alt, size = 48 }) {
  const dimension = `${size}px`;

  if (!src) {
    return (
      <div
        style={{ width: dimension, height: dimension }}
        className="rounded-full bg-neutral-200 flex items-center justify-center text-neutral-500 border border-neutral-300"
      >
        <span className="text-sm font-semibold">?</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      style={{ width: dimension, height: dimension }}
      className="rounded-full object-cover border border-neutral-300"
    />
  );
}
