import { Link, useLocation } from "@remix-run/react";
import { Button } from "~/components/button";
import { Input } from "~/components/input";
import { Label } from "~/components/label";
import { Textarea } from "~/components/textarea";

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
  const location = useLocation();

  return (
    <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
      <h2 className="text-lg font-medium text-gray-900">Create new category</h2>

      <div className="mt-6 flow-root w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="name">Name</Label>
        <Input type="text" id="name" />
      </div>

      <div className="mt-6 flow-root w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" />
      </div>

      <div className="justify-stretch mt-6 flex flex-col">
        <Button>Store</Button>
      </div>

      <div className="justify-stretch mt-6 flex flex-col">
        <Button variant="link" asChild>
          <Link to={{ pathname: "/admin/category", search: location.search }}>
            Cancel
          </Link>
        </Button>
      </div>
    </div>
  );
}
