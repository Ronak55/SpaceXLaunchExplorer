export type Launch = {
  id: string;
  name: string;
  date_utc: string;
  success: boolean | null;
  upcoming: boolean;
  links: {
    patch: { small: string | null; large: string | null };
    flickr?: { original?: string[] };
  };
  launchpad: string;
};

export type Launchpad = {
  id: string;
  name: string;
  full_name: string;
  locality: string;
  region: string;
  latitude: number;
  longitude: number;
  details?: string | null;
};

export type PaginatedLaunchResponse = {
  docs: Launch[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page?: number;
  nextPage?: number | null;
  hasNextPage: boolean;
};
