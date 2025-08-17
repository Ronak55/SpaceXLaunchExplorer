import { createContext, useContext } from 'react';
import type { Launch, Launchpad } from '../../types/spacex';
import type { UserLocation } from '@services/location.service';

export type DetailsContextValue = {
  launch: Launch;
  launchpad: Launchpad | null;
  location: UserLocation | null;
  loadingPad: boolean;
};

export const DetailsContext = createContext<DetailsContextValue | undefined>(undefined);

export function useDetails() {
  const ctx = useContext(DetailsContext);
  if (!ctx) throw new Error('useDetails must be used within DetailsContext provider');
  return ctx;
}
