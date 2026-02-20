// src/layouts/PublicLayout.jsx

import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export default function PublicLayout({ children, title = "Shime" }) {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">

      <Helmet>
        <title>{title}</title>
        <meta name="description" content="Verified work references on Shime" />
        <meta property="og:title" content={title} />
        <meta property="og:site_name" content="Shime" />
      </Helmet>

      <header className="w-full border-b border-neutral-200 bg-white">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-purple-700">
            Shime
          </Link>

          <nav className="flex items-center gap-6 text-sm text-neutral-700">
            <Link to="/employee/login" className="hover:text-purple-600">
              Employee Login
            </Link>
            <Link to="/employer/login" className="hover:text-purple-600">
              Employer Login
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 w-full">
        <div className="max-w-4xl mx-auto px-6 py-12">{children}</div>
      </main>

      <footer className="border-t border-neutral-200 bg-white mt-12">
        <div className="max-w-5xl mx-auto px-6 py-6 text-center text-neutral-500 text-sm">
          © {new Date().getFullYear()} Shime — Verified Work References
        </div>
      </footer>
    </div>
  );
}
