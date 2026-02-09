import PublicLayout from "/src/layouts/PublicLayout.jsx";
import IconBack from "/src/components/ui/IconBack.jsx";

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
          className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 text-lg"
        >
          <IconBack />
          Home
        </a>
      </div>
    </PublicLayout>
  );
}
