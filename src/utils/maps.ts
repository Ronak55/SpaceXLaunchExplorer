import { Linking, Platform } from 'react-native';

export async function openNativeMaps(lat: number, lon: number, label?: string) {
  const encodedLabel = label ? encodeURIComponent(label) : '';

  const googleMapsWebUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}${encodedLabel ? `&destination_place_id=${encodedLabel}` : ''}`;

  if (Platform.OS === 'ios') {
    const googleMapsIosUrl = `comgooglemaps://?daddr=${lat},${lon}${encodedLabel ? `&q=${encodedLabel}` : ''}`;
    const appleMapsUrl = `http://maps.apple.com/?daddr=${lat},${lon}${encodedLabel ? `&q=${encodedLabel}` : ''}`;
    try {
      const canOpenGoogleMaps = await Linking.canOpenURL('comgooglemaps://');
      if (canOpenGoogleMaps) {
        return await Linking.openURL(googleMapsIosUrl);
      } else {
        return await Linking.openURL(appleMapsUrl);
      }
    } catch (error) {
      console.error('Error opening maps on iOS:', error);
      return await Linking.openURL(googleMapsWebUrl);
    }
  } else {
    const geoUrl = `geo:${lat},${lon}?q=${lat},${lon}(${encodedLabel})`;
    
    try {
      const canOpenGeo = await Linking.canOpenURL(geoUrl);
      if (canOpenGeo) {
        return await Linking.openURL(geoUrl);
      } else {
        return await Linking.openURL(googleMapsWebUrl);
      }
    } catch (error) {
      console.error('Error opening maps on Android:', error);
      return await Linking.openURL(googleMapsWebUrl);
    }
  }
}
