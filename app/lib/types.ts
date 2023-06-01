export type AllProps<Data> = {
  [K in keyof Data]: NonNullable<Data[K]>;
};

export type CategoryResource = {
  data: {
    id: string;
    type: string;
    attributes: CategoryAttributes;
  };
};

export type CategoryCollection = {
  data: Array<{
    id: number;
    type: string;
    attributes: CategoryAttributes;
  }>;
  links: laravelLinks;
  meta: laravelMeta;
};

type CategoryAttributes = {
  name: string;
  slug: string;
  description: string;
  blog_posts_count: number | null;
};

export type laravelLinks = {
  first: string;
  last: string;
  next: string | undefined;
  prev: string | undefined;
};

export type laravelMeta = {
  current_page: number;
  from: number;
  last_page: number;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
  path: string;
  per_page: number;
  to: number;
  total: number;
};
