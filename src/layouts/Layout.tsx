import { Link, Outlet } from "react-router";

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b px-6 py-4">
        <nav className="flex flex-wrap gap-4 text-sm font-medium">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/catalog" className="hover:underline">Catalog</Link>
          <Link to="/build" className="hover:underline">Build Your Own</Link>
          <Link to="/events" className="hover:underline">Events</Link>
          <Link to="/cart" className="hover:underline">Cart</Link>
          <Link to="/checkout" className="hover:underline">Checkout</Link>
        </nav>
      </header>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}

