import PublicLayout from "/src/layouts/PublicLayout.jsx";

export default function TokenExpiredPage() {
  return (
    <PublicLayout title="Token Expired – Shine">
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          This link has expired
        </h1>

        <p className="text-neutral-600 mb-8">
          The evaluation link you tried to access is no longer valid.
        </p>

        <a
          href="/"
          className="text-purple-600 font-medium hover:underline text-lg"
        >
          Return to Home
        </a>
      </div>
    </PublicLayout>
  );
}
