import { StyleSheet } from 'react-native';

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    width: '100%',
    backgroundColor: '#222',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 16,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f5a623',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 28,
    color: '#1a1a1a',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f5a623',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#999',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    backgroundColor: '#333',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  passwordContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  eyeButton: {
    position: 'absolute',
    right: 12,
    padding: 4,
  },
  eye: {
    fontSize: 18,
    color: '#f5a623',
  },
  forgotContainer: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  forgotText: {
    color: '#f5a623',
    fontWeight: '500',
  },
  signInButton: {
    width: '100%',
    backgroundColor: '#f5a623',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  signInText: {
    color: '#1a1a1a',
    fontWeight: 'bold',
    fontSize: 16,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
    width: '100%',
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#444',
  },
  orText: {
    color: '#999',
    marginHorizontal: 8,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  socialImage: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  socialText: {
    color: '#fff',
    fontWeight: '500',
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  signupText: {
    color: '#999',
  },
  signupLink: {
    color: '#f5a623',
    fontWeight: '500',
  },
});
