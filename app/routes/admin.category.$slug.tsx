import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
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

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const slug = form.get("slug");
  const name = form.get("name");
  const description = form.get("description");

  try {
    const res = await fetch(`http://localhost:8000/api/v1/category/${slug}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description }),
    });

    if (!res.ok) {
      const message = `An error has occured: ${res.status} - ${res.statusText}`;
      throw new Error(message);
    }

    const { data }: CategoryResource = await res.json();

    return redirect(`/admin/category/${data.attributes.slug}`);
  } catch (error) {
    console.log(error);
    return redirect(`/admin/category/${slug}`);
  }
};

export default function AdminCategoryEdit() {
  const { data } = useLoaderData<typeof loader>();

  return (
    <Form method="post">
      <Input type="hidden" name="slug" value={data.attributes.slug} />
      <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
        <h2 className="text-lg font-medium text-gray-900">Edit category</h2>

        <div className="mt-6 flow-root w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            defaultValue={data.attributes.name}
          />
        </div>

        <div className="mt-6 flow-root w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            defaultValue={data.attributes.description}
          />
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
    </Form>
  );
}
