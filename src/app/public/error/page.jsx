import PublicLayout from "/src/layouts/PublicLayout.jsx";

export default function PublicErrorPage() {
  return (
    <PublicLayout title="Error – Shine">
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Something went wrong
        </h1>

        <p className="text-neutral-600 mb-8">
          The page you’re trying to access is unavailable or invalid.
        </p>

        <a
          href="/"
          className="text-purple-600 font-medium hover:underline text-lg"
        >
          Go back to home
        </a>
      </div>
    </PublicLayout>
  );
}
