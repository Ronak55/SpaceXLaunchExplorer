import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import type { Launch } from '../types/spacex';
import { formatLaunchDate, missionStatus } from '@utils/formatting';

type Props = {
  item: Launch;
  onPress: (id: string, name?: string) => void;
};

function Item({ item, onPress }: Props) {
  const image =
    item.links.patch?.small ||
    item.links.patch?.large ||
    item.links.flickr?.original?.[0] ||
    undefined;
  const status = missionStatus(item.success, item.upcoming);
  return (
    <Pressable style={styles.row} onPress={() => onPress(item.id, item.name)}>
      {image ? <Image source={{ uri: image }} style={styles.image} /> : <View style={styles.ph} />}
      <View style={styles.meta}>
        <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.date}>{formatLaunchDate(item.date_utc)}</Text>
        <Text style={[styles.status, statusStyle(status)]}>{status}</Text>
      </View>
    </Pressable>
  );
}

function statusStyle(status: string) {
  switch (status) {
    case 'Success': return { color: '#0a7d16' };
    case 'Failure': return { color: '#b00020' };
    case 'Upcoming': return { color: '#8a6d1d' };
    default: return { color: '#666' };
  }
}

export default React.memo(Item);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    padding: 12,
    gap: 12,
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#e5e5e5',
    backgroundColor: 'white',
  },
  image: { width: 56, height: 56, borderRadius: 8, backgroundColor: '#f2f2f2' },
  ph: { width: 56, height: 56, borderRadius: 8, backgroundColor: '#f2f2f2' },
  meta: { flex: 1 },
  name: { fontSize: 16, fontWeight: '600', color: '#111' },
  date: { marginTop: 2, color: '#666' },
  status: { marginTop: 4, fontWeight: '700' },
});
