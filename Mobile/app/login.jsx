import axios from 'axios';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useState } from 'react';

import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // Updated SafeAreaView
import { loginStyles } from '../styles/loginStyles';

const IP = "192.168.29.93";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim()) {
      Alert.alert('Missing Field', 'Please enter your email or username.');
      return;
    }
    if (!password.trim()) {
      Alert.alert('Missing Field', 'Please enter your password.');
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `http://${IP}:3000/api/auth/login`,
        { email, password }
        // { withCredentials: true } // Remove for testing if CORS issues arise
      );

      const token = response.data.token;
      await SecureStore.setItemAsync('authToken', token);

      console.log("Token stored securely : ", token);
      console.log('Login successful:', response.data);

      router.replace('/dashboard');
    } catch (error) {
      console.log('Error in logging in from the frontend');

      if (error.response) {
        console.log('Response error data:', error.response.data);
        console.log('Response status:', error.response.status);
        Alert.alert(
          'Login Failed',
          error.response.data.message || 'Invalid credentials.'
        );
      } else if (error.request) {
        console.log('Request error:', error.request);
        Alert.alert(
          'Network Error',
          'Could not reach the server. Make sure your device is on the same network.'
        );
      } else {
        console.log('General error:', error.message);
        Alert.alert('Error', 'Something went wrong. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const goToSignup = () => {
    router.push('/signup');
  };

  return (
    <SafeAreaView style={loginStyles.container}>
      <View style={loginStyles.card}>
        <View style={loginStyles.iconContainer}>
          <View style={loginStyles.iconCircle}>
            <Text style={loginStyles.iconText}>{'<>'}</Text>
          </View>
        </View>

        <Text style={loginStyles.title}>Welcome Back</Text>
        <Text style={loginStyles.subtitle}>Sign in to continue coding</Text>

        <TextInput
          style={loginStyles.input}
          placeholder="Email or Username"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <View style={loginStyles.passwordContainer}>
          <TextInput
            style={[loginStyles.input, { flex: 1, marginBottom: 0, paddingRight: 45 }]}
            placeholder="Password"
            placeholderTextColor="#888"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            style={loginStyles.eyeButton}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Text style={loginStyles.eye}>{showPassword ? '🙈' : '👁️'}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={loginStyles.forgotContainer}>
          <Text style={loginStyles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[loginStyles.signInButton, loading ? { backgroundColor: '#999' } : {}]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={loginStyles.signInText}>Log In</Text>}
        </TouchableOpacity>

        <View style={loginStyles.dividerContainer}>
          <View style={loginStyles.divider} />
          <Text style={loginStyles.orText}>Or continue with</Text>
          <View style={loginStyles.divider} />
        </View>

        <TouchableOpacity style={loginStyles.socialButton}>
          <Image
            style={loginStyles.socialImage}
            source={require('../assets/images/google.png')}
          />
          <Text style={loginStyles.socialText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={loginStyles.socialButton}>
          <Image
            style={loginStyles.socialImage}
            source={require('../assets/images/githubpng.png')}
          />
          <Text style={loginStyles.socialText}>Continue with GitHub</Text>
        </TouchableOpacity>

        <View style={loginStyles.signupContainer}>
          <Text style={loginStyles.signupText}>Don't have an account? </Text>
          <TouchableOpacity onPress={goToSignup}>
            <Text style={loginStyles.signupLink}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
