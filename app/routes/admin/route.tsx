import { Link, Outlet } from "@remix-run/react";
import Breadcrumb from "./breadcrumb";
import Topbar from "./topbar";

export const handle = {
  breadcrumb: () => (
    <Link
      to="/admin"
      className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
    >
      Admin
    </Link>
  ),
};

export default function AdminLyout() {
  return (
    <>
      <div className="min-h-full bg-gray-100">
        <header className="bg-white shadow">
          <Topbar />
          <Breadcrumb />
        </header>

        <main className="py-10">
          <Outlet />
        </main>
      </div>
    </>
  );
}
