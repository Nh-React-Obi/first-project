import { Link, Outlet } from "react-router";

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <nav className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
          {/* Logo */}
          <h1 className="text-2xl font-extrabold text-purple-800">
            Aqua<span className="text-gray-900">Pure.</span>
          </h1>

          {/* Navigation */}
          <div className="flex items-center gap-8 text-sm font-semibold">
            <Link
              to="/"
              className="text-purple-700 hover:text-purple-900 transition"
            >
              Homepage
            </Link>

            <Link
              to="/build-your-own"
              className="text-gray-600 hover:text-purple-700 transition"
            >
              Build Your Own
            </Link>
          </div>

          <Link
            to="/login"
            className="bg-purple-700 text-white px-6 py-3 rounded-lg hover:bg-purple-800 transition shadow-md"
          >
            Get Started
          </Link>
        </nav>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-8 py-10">
        <Outlet />
      </main>

      <footer className="bg-purple-950 text-white py-8 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-xl font-bold">AquaPure.</h2>

          <p className="text-purple-200 text-sm">
            Create your own bottle. Make it yours.
          </p>

          <p className="text-purple-300 text-sm">
            © 2026 AquaPure. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
