import { http } from '@api/http';
import type { Launch, Launchpad, PaginatedLaunchResponse } from '../types/spacex';

const BASE_V5 = 'https://api.spacexdata.com/v5';
const BASE_V4 = 'https://api.spacexdata.com/v4';

export async function getLaunchesPage(params: {
  page: number;       
  limit: number;
  search?: string;
  signal?: AbortSignal;
}): Promise<PaginatedLaunchResponse> {
  const url = `${BASE_V5}/launches/query`;
  const query: Record<string, unknown> = params.search
    ? { name: { $regex: params.search, $options: 'i' } }
    : {};
  return http<PaginatedLaunchResponse>(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      query,
      options: {
        limit: params.limit,
        page: params.page,
        sort: { date_utc: 'desc' },
        select: ['id', 'name', 'date_utc', 'success', 'upcoming', 'links', 'launchpad'],
      },
    }),
    signal: params.signal,
  });
}

export function getLaunchById(id: string, opts?: { signal?: AbortSignal }) {
  return http<Launch>(`${BASE_V5}/launches/${id}`, { signal: opts?.signal });
}

export function getLaunchpadById(id: string, opts?: { signal?: AbortSignal }) {
  return http<Launchpad>(`${BASE_V4}/launchpads/${id}`, { signal: opts?.signal });
}
