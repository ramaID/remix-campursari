import { Link } from "@remix-run/react";
import { Button } from "~/components/button";

export const handle = {
  breadcrumb: () => (
    <Link
      to="/admin/category/create"
      className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
    >
      Create
    </Link>
  ),
};

export default function AdminCategoryCreate() {
  return (
    <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
      <h2 className="text-lg font-medium text-gray-900">Create new category</h2>

      <div className="mt-6 flow-root">{/* form fields */}</div>

      <div className="justify-stretch mt-6 flex flex-col">
        <Button>Store</Button>
      </div>

      <div className="justify-stretch mt-6 flex flex-col">
        <Button variant="link" asChild>
          <Link to="/admin/category">Cancel</Link>
        </Button>
      </div>
    </div>
  );
}
