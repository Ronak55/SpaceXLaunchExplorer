import { format, parseISO } from 'date-fns';

export function formatLaunchDate(iso: string) {
  try { return format(parseISO(iso), 'PPp'); } catch { return iso; }
}

export function missionStatus(success: boolean | null, upcoming: boolean) {
  if (upcoming) return 'Upcoming';
  if (success === true) return 'Success';
  if (success === false) return 'Failure';
  return 'Unknown';
}
