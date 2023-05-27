import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { Button } from "~/components/button";
import { Input } from "~/components/input";
import { Label } from "~/components/label";
import { Textarea } from "~/components/textarea";
import type { CategoryResource } from "~/lib/types";

export const handle = {
  breadcrumb: () => (
    <span className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
      Edit
    </span>
  ),
};

export async function loader({ params }: LoaderArgs) {
  const { data } = (await fetch(
    `http://localhost:8000/api/v1/category/${params.slug}`
  ).then((res) => res.json())) as CategoryResource;
  return json({ data });
}

export default function AdminCategoryEdit() {
  const { data } = useLoaderData<typeof loader>();

  return (
    <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
      <h2 className="text-lg font-medium text-gray-900">Edit category</h2>

      <div className="mt-6 flow-root w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="name">Name</Label>
        <Input type="text" id="name" value={data.attributes.name} />
      </div>

      <div className="mt-6 flow-root w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" value={data.attributes.description} />
      </div>

      <div className="justify-stretch mt-6 flex flex-col">
        <Button>Update</Button>
      </div>

      <div className="justify-stretch mt-6 flex flex-col">
        <Button variant="link" asChild>
          <Link to="/admin/category">Cancel</Link>
        </Button>
      </div>
    </div>
  );
}
