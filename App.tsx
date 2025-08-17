import { StatusBar } from 'expo-status-bar';
import ErrorBoundary from '@components/ErrorBoundary';
import RootNavigator from '@nav/RootNavigator';
import { View } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ErrorBoundary>
        <StatusBar style="dark" />
        <RootNavigator />
      </ErrorBoundary>
    </View>
  );
}
