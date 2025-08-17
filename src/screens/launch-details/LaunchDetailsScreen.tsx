import { useEffect, useRef, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList, DetailsTopTabsParamList } from '@nav/types';
import { getLaunchById, getLaunchpadById } from '@repos/spacex.repository';
import type { Launch, Launchpad } from '../../types/spacex';
import { requestUserLocation, type UserLocation } from '@services/location.service';
import { DetailsContext } from './DetailsContext';
import DetailsInfoTab from './DetailsInfoTab';
import DetailsMapTab from './DetailsMapTab';

type Props = NativeStackScreenProps<RootStackParamList, 'LaunchDetails'>;

const Tabs = createMaterialTopTabNavigator<DetailsTopTabsParamList>();

export default function LaunchDetailsScreen({ route }: Props) {
  const { id } = route.params;
  const [launch, setLaunch] = useState<Launch | null>(null);
  const [launchpad, setLaunchpad] = useState<Launchpad | null>(null);
  const [loadingPad, setLoadingPad] = useState(true);
  const [location, setLocation] = useState<UserLocation | null>(null);

  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    abortRef.current = controller;
    (async () => {
      const l = await getLaunchById(id, { signal: controller.signal });
      setLaunch(l);
      setLoadingPad(true);
      try {
        const pad = await getLaunchpadById(l.launchpad, { signal: controller.signal });
        setLaunchpad(pad);
      } finally {
        setLoadingPad(false);
      }
      const loc = await requestUserLocation();
      setLocation(loc);
    })().catch((e) => console.warn(e));
    return () => abortRef.current?.abort();
  }, [id]);

  if (!launch) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  const value = { launch, launchpad, location, loadingPad };

  return (
    <DetailsContext.Provider value={value}>
      <Tabs.Navigator
        screenOptions={{
          tabBarIndicatorStyle: { backgroundColor: '#111' },
          tabBarLabelStyle: { fontWeight: '700' },
        }}
      >
        <Tabs.Screen name="Info" component={DetailsInfoTab} />
        <Tabs.Screen name="Map" component={DetailsMapTab} />
      </Tabs.Navigator>
    </DetailsContext.Provider>
  );
}
