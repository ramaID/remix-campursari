import { Form, NavLink, useLocation, useSubmit } from "@remix-run/react";
import type { BaseSyntheticEvent } from "react";
import { Input } from "~/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/select";
import type { laravelLinks, laravelMeta } from "~/lib/types";
import { getFrom, getSearchParamsPagination } from "~/lib/utils";

export default function TableNav({
  params,
  meta,
  links,
}: {
  params: URLSearchParams;
  meta: laravelMeta;
  links: laravelLinks;
}) {
  const location = useLocation();
  const submit = useSubmit();

  function handleChange(event: BaseSyntheticEvent) {
    submit(event.currentTarget, { replace: true });
  }

  return (
    <nav
      className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:rounded-lg sm:rounded-tl-none sm:rounded-tr-none"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{getFrom(meta)}</span> to{" "}
          <span className="font-medium">{meta.to}</span> of{" "}
          <span className="font-medium">{meta.total}</span> results
        </p>
      </div>
      <div className="flex flex-1 justify-between sm:justify-end">
        {links.prev !== undefined && (
          <NavLink
            to={{
              pathname: location.pathname,
              search: getSearchParamsPagination(links.prev, location.search),
            }}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Previous
          </NavLink>
        )}
        {links.next !== undefined && (
          <NavLink
            to={{
              pathname: location.pathname,
              search: getSearchParamsPagination(links.next, location.search),
            }}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </NavLink>
        )}
        <div className="relative ml-3 inline-flex items-center rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
          <Form method="get" action="/admin/category" onChange={handleChange}>
            {params.has("query") && (
              <Input
                name="query"
                value={params.get("query") ?? ""}
                type="hidden"
              />
            )}
            {params.has("page") && (
              <Input
                name="page"
                value={params.get("page") ?? ""}
                type="hidden"
              />
            )}
            <Input name="page" value={params.get("page") ?? ""} type="hidden" />
            <Select name="take" defaultValue={params.get("take") ?? "15"}>
              <SelectTrigger className="w-[60px]">
                <SelectValue placeholder="per page" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                {meta.total > 5 && <SelectItem value="10">10</SelectItem>}
                {meta.total > 10 && <SelectItem value="15">15</SelectItem>}
              </SelectContent>
            </Select>
          </Form>
        </div>
      </div>
    </nav>
  );
}
