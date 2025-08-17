import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@nav/types';
import LaunchListScreen from '@screens/LaunchListScreen';
import LaunchDetailsScreen from '@screens/launch-details/LaunchDetailsScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator<RootStackParamList>();

const theme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: 'white' },
};

export default function RootNavigator() {
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={theme}>
        <Stack.Navigator
          screenOptions={{
            headerTitleStyle: { fontWeight: '700' },
            contentStyle: { backgroundColor: 'white' },
          }}
        >
          <Stack.Screen
            name="LaunchList"
            component={LaunchListScreen}
            options={{ title: 'SpaceX Launches' }}
          />
          <Stack.Screen
            name="LaunchDetails"
            component={LaunchDetailsScreen}
            options={({ route }) => ({ title: route.params?.name || 'Launch Details' })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
