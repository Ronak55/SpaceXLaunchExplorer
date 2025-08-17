import { View, Text, StyleSheet } from 'react-native';
import { useDetails } from './DetailsContext';
import { formatLaunchDate, missionStatus } from '@utils/formatting';

export default function DetailsInfoTab() {
  const { launch, launchpad, loadingPad } = useDetails();
  const status = missionStatus(launch.success, launch.upcoming);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.section}>
        <Text style={styles.title}>{launch.name}</Text>
        <Text style={styles.sub}>{formatLaunchDate(launch.date_utc)}</Text>
        <Text style={[styles.badge, badgeStyle(status)]}>{status}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.h2}>Launchpad</Text>
        {loadingPad ? (
          <Text>Loading launchpad…</Text>
        ) : launchpad ? (
          <>
            <Text style={styles.pad}>{launchpad.full_name}</Text>
            <Text style={styles.sub}>{launchpad.locality}, {launchpad.region}</Text>
            {!!launchpad.details && <Text style={[styles.sub, { marginTop: 8 }]}>{launchpad.details}</Text>}
          </>
        ) : (
          <Text style={styles.warn}>Launchpad unavailable</Text>
        )}
      </View>
    </View>
  );
}

function badgeStyle(status: string) {
  switch (status) {
    case 'Success': return { backgroundColor: '#e6f6ea', color: '#0a7d16' };
    case 'Failure': return { backgroundColor: '#fde7ea', color: '#b00020' };
    case 'Upcoming': return { backgroundColor: '#fff6db', color: '#8a6d1d' };
    default: return { backgroundColor: '#eee', color: '#444' };
  }
}

const styles = StyleSheet.create({
  section: { paddingHorizontal: 16, paddingVertical: 12, backgroundColor: 'white' },
  title: { fontSize: 22, fontWeight: '800', color: '#111' },
  h2: { fontSize: 16, fontWeight: '700', marginBottom: 4, color: '#111' },
  sub: { color: '#666', marginTop: 4,},
  badge: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, marginTop: 8 },
  pad: { fontSize: 15, fontWeight: '600', color: '#111' },
  warn: { color: '#b00020' },
});
