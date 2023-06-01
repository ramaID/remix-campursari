import {
  Form,
  NavLink,
  useLocation,
  useNavigation,
  useSearchParams,
} from "@remix-run/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/table";
import type { CategoryCollection } from "~/lib/types";
import { getNumRow } from "~/lib/utils";
import SearchBar from "./SearchBar";
import TableNav from "./TableNav";

export default function Content({
  response,
}: {
  response: CategoryCollection;
}) {
  const [params] = useSearchParams();
  const location = useLocation();
  const navigation = useNavigation();
  const isDeleting = navigation.state === "submitting";

  return (
    <div className="space-y-6 lg:col-span-2 lg:col-start-1">
      <section aria-labelledby="applicant-information-title">
        <SearchBar />

        <Table className="bg-white shadow">
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
                  <span className="line-clamp-1">{item.attributes.name}</span>
                </TableCell>
                <TableCell>
                  <span className="line-clamp-1">{item.attributes.slug}</span>
                </TableCell>
                <TableCell className="text-right">
                  {item.attributes.blog_posts_count}
                </TableCell>
                <TableCell className="text-center">
                  <NavLink
                    to={{
                      pathname: item.attributes.slug,
                      search: location.search,
                    }}
                  >
                    Edit
                  </NavLink>
                  {item.attributes.blog_posts_count === 0 && (
                    <>
                      {" / "}
                      <Form method="post" action="/admin/category">
                        <input
                          type="hidden"
                          name="search"
                          value={location.search}
                        />
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

        <TableNav params={params} meta={response.meta} links={response.links} />
      </section>
    </div>
  );
}
