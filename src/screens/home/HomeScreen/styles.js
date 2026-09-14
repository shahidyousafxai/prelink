import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, paddingTop: 60, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: '600' },
  subtitle: { fontSize: 14, color: '#666', marginTop: 4, marginBottom: 16 },
  list: { flex: 1 },
  item: { fontSize: 15, paddingVertical: 6 },
  error: { color: '#d33', marginBottom: 12 },
  button: {
    backgroundColor: '#111',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  link: { alignItems: 'center', marginTop: 20 },
  linkText: { color: '#2563eb', fontSize: 14, fontWeight: '500' },
});
