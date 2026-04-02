import { StyleSheet } from 'react-native';

export const startupStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#17324d',
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
    color: '#fdf7ed',
    textAlign: 'center',
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 16,
    color: '#dbe6f0',
    textAlign: 'center',
    marginTop: 20,
    opacity: 0.9,
  },
});