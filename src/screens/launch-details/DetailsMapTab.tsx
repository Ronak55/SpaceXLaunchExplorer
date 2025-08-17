import { View, Text, StyleSheet, Pressable, Linking, Dimensions } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { useDetails } from './DetailsContext';
import { haversineKm } from '@utils/geo';
import { openNativeMaps } from '@utils/maps';

const { height } = Dimensions.get('window');

export default function DetailsMapTab() {
  const { launchpad, location } = useDetails();

  if (!launchpad) {
    return (
      <View style={styles.center}>
        <Text>Map unavailable</Text>
      </View>
    );
  }

  const initialRegion: Region = {
    latitude: launchpad.latitude,
    longitude: launchpad.longitude,
    latitudeDelta: 0.0922, // Adjust for desired zoom level
    longitudeDelta: 0.0421, // Adjust for desired zoom level
  };

  const distance =
    location?.granted
      ? haversineKm(
          { lat: location.coords.latitude, lon: location.coords.longitude },
          { lat: launchpad.latitude, lon: launchpad.longitude },
        )
      : null;

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map} 
          initialRegion={initialRegion}
          showsUserLocation={location?.granted === true}
          showsMyLocationButton
          key={launchpad.id} // Optional: Force MapView re-render if launchpad changes
        >
          <Marker
            coordinate={{ latitude: launchpad.latitude, longitude: launchpad.longitude }}
            title={launchpad.name}
            description={`${launchpad.locality}, ${launchpad.region}`}
          />
        </MapView>
      </View>

      <View style={styles.infoBar}>
        {distance != null ? (
          <Text style={styles.distance}>You are ~{distance.toFixed(1)} km away</Text>
        ) : (
          <Text style={styles.hint}>Enable location to see your distance</Text>
        )}
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {location?.granted === false && (
            <Pressable onPress={() => {
              Linking.openSettings();
            }} style={styles.secondary}>
              <Text style={styles.secondaryText}>Enable Location</Text>
            </Pressable>
          )}
          <Pressable
            onPress={() => {
              openNativeMaps(launchpad.latitude, launchpad.longitude, launchpad.name);
            }}
            style={styles.primary}
          >
            <Text style={styles.primaryText}>Open in Maps</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    flex:1,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#eee',
  },
  map: {
    ...StyleSheet.absoluteFillObject, 
  },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  infoBar: {
    padding: 12,
    gap: 8,
    backgroundColor: 'gray',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  distance: { fontWeight: '700', color: 'white' },
  hint: { color: '#666' },
  primary: { backgroundColor: '#111', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 10 },
  primaryText: { color: 'white', fontWeight: '700' },
  secondary: { backgroundColor: '#f2f2f2', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 10 },
  secondaryText: { color: '#111', fontWeight: '700' },
});
