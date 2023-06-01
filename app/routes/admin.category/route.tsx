import type { AllProps, CategoryCollection } from "~/lib/types";
import type { ActionFunction, LoaderArgs } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useLocation } from "@remix-run/react";
import { Button } from "~/components/button";
import { getSearchParams } from "~/lib/utils";
import Content from "./Content";

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
    `http://localhost:8000/api/v1/category?${getSearchParams(request.url)}`
  ).then((res) => res.json())) as AllProps<CategoryCollection>;
  return json({ response });
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const slug = formData.get("slug");
  const res = await fetch(`http://localhost:8000/api/v1/category/${slug}`, {
    method: "DELETE",
  });

  if (res.status !== 204) {
    throw new Error("Something when wrong");
  }

  return redirect(`/admin/category${formData.get("search")}`);
};

export default function AdminCategoryLayout() {
  const { response } = useLoaderData<typeof loader>();
  const location = useLocation();

  return (
    <>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
        <div className="flex items-center space-x-5">
          <h1 className="text-2xl font-bold text-gray-900">Category</h1>
        </div>

        <div className="justify-stretch mt-6 flex flex-col-reverse space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-y-0 sm:space-x-3 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
          <Button asChild>
            <Link to={{ pathname: "create", search: location.search }}>
              Create
            </Link>
          </Button>
        </div>
      </div>

      <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
        <Content response={response as CategoryCollection} />

        <section className="lg:col-span-1 lg:col-start-3">
          <Outlet />
        </section>
      </div>
    </>
  );
}
