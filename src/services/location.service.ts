import * as Location from 'expo-location';

export type UserLocation =
  | { granted: true; coords: { latitude: number; longitude: number } }
  | { granted: false; canAskAgain: boolean };

export async function requestUserLocation(): Promise<UserLocation> {
  const { status, canAskAgain } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') return { granted: false, canAskAgain };
  const { coords } = await Location.getCurrentPositionAsync({});
  return { granted: true, coords: { latitude: coords.latitude, longitude: coords.longitude } };
}
