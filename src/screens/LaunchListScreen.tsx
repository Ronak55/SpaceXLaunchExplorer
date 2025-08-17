import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, TextInput, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@nav/types';
import { getLaunchesPage } from '@repos/spacex.repository';
import type { Launch } from '../types/spacex';
import LaunchListItem from '@components/LaunchListItem';
import EmptyState from '@components/EmptyState';
import ErrorView from '@components/ErrorView';

type Props = NativeStackScreenProps<RootStackParamList, 'LaunchList'>;

const PAGE = 20;

export default function LaunchListScreen({ navigation }: Props) {
  const [data, setData] = useState<Launch[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasNext, setHasNext] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const controllerRef = useRef<AbortController | null>(null);

  const load = useCallback(
    async (opts?: { reset?: boolean }) => {
      controllerRef.current?.abort();
      const controller = new AbortController();
      controllerRef.current = controller;

      try {
        if (opts?.reset) {
          setLoading(true);
          setPage(1);
        } else if (page === 1 && data.length === 0) {
          setLoading(true);
        } else {
          setLoadingMore(true);
        }

        const res = await getLaunchesPage({
          page: opts?.reset ? 1 : page,
          limit: PAGE,
          search: search.trim() || undefined,
          signal: controller.signal,
        });

        setHasNext(res.hasNextPage);
        setData((prev) => (opts?.reset ? res.docs : [...prev, ...res.docs]));
        setError(null);
      } catch (e: any) {
        if (e?.name !== 'AbortError') setError(e?.message || 'Failed to load launches');
      } finally {
        setLoading(false);
        setLoadingMore(false);
        setRefreshing(false);
      }
    },
    [page, search, data.length],
  );

  useEffect(() => {
    const id = setTimeout(() => load({ reset: true }), 250);
    return () => clearTimeout(id);
  }, [search]);

  useEffect(() => {
    if (page > 1) load();
  }, [page]);

  const onEndReached = useCallback(() => {
    if (!loading && !loadingMore && hasNext) setPage((p) => p + 1);
  }, [loading, loadingMore, hasNext]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    load({ reset: true });
  }, [load]);

  const keyExtractor = useCallback((item: Launch) => item.id, []);
  const ListFooter = useMemo(
    () =>
      loadingMore ? (
        <View style={{ paddingVertical: 16 }}>
          <ActivityIndicator />
        </View>
      ) : null,
    [loadingMore],
  );

  const goToDetails = useCallback(
    (id: string, name?: string) => {
      navigation.navigate('LaunchDetails', { id, name });
    },
    [navigation],
  );

  if (error && data.length === 0) {
    return <ErrorView message={error} onRetry={() => load({ reset: true })} />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 8 }}>
        <TextInput
          placeholder="Search mission name"
          value={search}
          onChangeText={setSearch}
          placeholderTextColor={'#999'}
          autoCapitalize="none"
          style={{
            backgroundColor: '#f2f2f2',
            borderRadius: 12,
            color: '#111',
            paddingHorizontal: 14,
            paddingVertical: 10,
            fontSize: 16,
          }}
          clearButtonMode="while-editing"
        />
      </View>

      {loading && data.length === 0 ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      ) : data.length === 0 ? (
        <EmptyState title="No launches found" subtitle="Try a different mission name." />
      ) : (
        <FlatList
          data={data}
          keyExtractor={keyExtractor}
          renderItem={({ item }) => <LaunchListItem item={item} onPress={goToDetails} />}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.4}
          ListFooterComponent={ListFooter}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          initialNumToRender={12}
          windowSize={10}
          removeClippedSubviews
        />
      )}
    </View>
  );
}
