import PublicLayout from "/src/layouts/PublicLayout.jsx";

export default function TokenInvalidPage() {
  return (
    <PublicLayout title="Invalid Token – Shime">
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Invalid Link
        </h1>

        <p className="text-neutral-600 mb-8">
          The evaluation link you used is invalid or malformed.
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
