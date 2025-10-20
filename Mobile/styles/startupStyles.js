import { StyleSheet } from 'react-native';

export const startupStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2721ecff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 16,
    color: '#ffffffff',
    textAlign: 'center',
    marginTop: 20,
    opacity: 0.8,
  },
});