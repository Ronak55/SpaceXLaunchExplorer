import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function ErrorView({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>Something went wrong</Text>
      <Text style={styles.msg}>{message}</Text>
      {onRetry && (
        <Pressable onPress={onRetry} style={styles.btn}>
          <Text style={styles.btnText}>Try again</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { padding: 24, alignItems: 'center', justifyContent: 'center' },
  title: { fontWeight: '700', marginBottom: 6 },
  msg: { color: '#666', textAlign: 'center', marginBottom: 12 },
  btn: { backgroundColor: '#111', borderRadius: 10, paddingHorizontal: 16, paddingVertical: 12 },
  btnText: { color: 'white', fontWeight: '700' },
});
