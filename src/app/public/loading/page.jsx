// src/app/public/loading/page.jsx

import PublicLayout from "/src/layouts/PublicLayout.jsx";

export default function PublicLoadingPage() {
  return (
    <PublicLayout>
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-10 h-10 border-4 border-purple-300 border-t-purple-600 rounded-full animate-spin"></div>
        <p className="text-neutral-600 mt-4">Loading...</p>
      </div>
    </PublicLayout>
  );
}
