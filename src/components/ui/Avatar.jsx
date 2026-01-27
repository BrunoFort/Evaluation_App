export default function Avatar({ src, alt, size = 48 }) {
  const dimension = `${size}px`;

  if (!src) {
    return (
      <div
        style={{ width: dimension, height: dimension }}
        className="rounded-full bg-slate-200 flex items-center justify-center text-slate-500"
      >
        ?
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      style={{ width: dimension, height: dimension }}
      className="rounded-full object-cover border"
    />
  );
}
