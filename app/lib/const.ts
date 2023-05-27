export const navigation: Array<{
  name: string;
  to: string;
  breadcrumbs: Array<string>;
}> = [
  { name: "Dashboard", to: "/admin", breadcrumbs: ["Admin"] },
  {
    name: "Categories",
    to: "/admin/category",
    breadcrumbs: ["Admin", "Category"],
  },
];
