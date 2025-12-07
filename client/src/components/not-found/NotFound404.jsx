import { Link } from "react-router";

export default function NotFound() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4"
      style={{ backgroundImage: 'url("/images/background.png")' }}
    >
      <div className="bg-white/80 backdrop-blur rounded-2xl shadow-xl p-10 max-w-lg text-center">
        <h1 className="text-7xl font-extrabold text-slate-900 mb-4">404</h1>

        <h2 className="text-2xl font-semibold text-slate-800 mb-3">
          Page Not Found
        </h2>

        <p className="text-slate-600 mb-6">
          The page you're looking for doesn’t exist or has been moved.
        </p>

        <Link
          to="/"
          className="inline-block rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-slate-900 shadow-md hover:bg-emerald-400 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
