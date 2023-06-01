import { Form, useSearchParams } from "@remix-run/react";
import { Input } from "~/components/input";

export default function SearchBar() {
  const [params] = useSearchParams();

  return (
    <Form
      method="get"
      action="/admin/category"
      className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 sm:rounded-lg sm:rounded-bl-none sm:rounded-br-none"
    >
      {params.has("take") && (
        <Input name="take" value={params.get("take") ?? ""} type="hidden" />
      )}
      <Input name="page" value={1} type="hidden" />
      <Input
        type="text"
        name="query"
        placeholder="Searching"
        defaultValue={params.get("query") ?? ""}
      />
    </Form>
  );
}
