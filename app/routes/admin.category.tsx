import type { ActionFunction, LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Form,
  Link,
  Outlet,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import { Button } from "~/components/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/table";
import type { AllProps, CategoryCollection } from "~/lib/types";
import { getFrom, getNumRow, getSearchParams } from "~/lib/utils";

export const handle = {
  breadcrumb: () => (
    <Link
      to="/admin/category"
      className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
    >
      Category
    </Link>
  ),
};

export async function loader({ request }: LoaderArgs) {
  const response = (await fetch(
    `http://localhost:8000/api/v1/category${getSearchParams(request.url)}`
  ).then((res) => res.json())) as AllProps<CategoryCollection>;
  return json({ response });
}

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  const slug = formData.get("slug");
  const response = await fetch(
    `http://localhost:8000/api/v1/category/` + slug,
    {
      method: "DELETE",
    }
  );

  if (response.status !== 204) {
    throw new Error("Something when wrong");
  }

  return redirect("/admin/category");
};

export default function AdminCategoryLayout() {
  const { response } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const isDeleting = navigation.state === "submitting";

  return (
    <>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
        <div className="flex items-center space-x-5">
          <h1 className="text-2xl font-bold text-gray-900">Category</h1>
        </div>

        <div className="justify-stretch mt-6 flex flex-col-reverse space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-y-0 sm:space-x-3 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
          <Button asChild>
            <Link to="create">Create</Link>
          </Button>
        </div>
      </div>

      <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2 lg:col-start-1">
          {/* Description list*/}
          <section aria-labelledby="applicant-information-title">
            <Table className="bg-white shadow sm:rounded-lg sm:rounded-bl-none sm:rounded-br-none">
              {/* <TableCaption>
                Listing, storing, showing, updating and deleting category resource.
              </TableCaption> */}
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">No</TableHead>
                  <TableHead className="w-[200px]">Name</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead className="text-right">Posts</TableHead>
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {response.data.map((item, key) => (
                  <TableRow key={item.id}>
                    <TableCell>{getNumRow(response.meta, key)}</TableCell>
                    <TableCell className="font-medium">
                      {item.attributes.name}
                    </TableCell>
                    <TableCell>{item.attributes.slug}</TableCell>
                    <TableCell className="text-right">
                      {item.attributes.blog_posts_count}
                    </TableCell>
                    <TableCell className="text-center">
                      <Link to={`/admin/category/${item.attributes.slug}`}>
                        Edit
                      </Link>
                      {item.attributes.blog_posts_count === 0 && (
                        <>
                          {" / "}
                          <Form method="post">
                            <input
                              type="hidden"
                              name="slug"
                              value={item.attributes.slug}
                            />
                            <button type="submit" disabled={isDeleting}>
                              {isDeleting ? "Deleting" : "Delete"}
                            </button>
                          </Form>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <nav
              className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:rounded-lg sm:rounded-tl-none sm:rounded-tr-none"
              aria-label="Pagination"
            >
              <div className="hidden sm:block">
                <p className="text-sm text-gray-700">
                  Showing{" "}
                  <span className="font-medium">{getFrom(response.meta)}</span>{" "}
                  to <span className="font-medium">{response.meta.to}</span> of{" "}
                  <span className="font-medium">{response.meta.total}</span>{" "}
                  results
                </p>
              </div>
              <div className="flex flex-1 justify-between sm:justify-end">
                {response.links.prev !== undefined && (
                  <Link
                    to={`/admin/category${getSearchParams(
                      response.links.prev
                    )}`}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Previous
                  </Link>
                )}
                {response.links.next !== undefined && (
                  <Link
                    to={`/admin/category${getSearchParams(
                      response.links.next
                    )}`}
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Next
                  </Link>
                )}
              </div>
            </nav>
          </section>
        </div>

        <section className="lg:col-span-1 lg:col-start-3">
          <Outlet />
        </section>
      </div>
    </>
  );
}
