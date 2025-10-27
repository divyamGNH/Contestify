import axios from "axios";
import { router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert, Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { signupStyles } from '../styles/signupStyles';

const IP = '10.63.99.254';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    // Field validation
    if (!username.trim() || !email.trim() || !password || !confirmPassword) {
      Alert.alert("Missing Field", "Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `http://${IP}:3000/api/auth/register`,
        { username, email, password },
        { withCredentials: true }
      );

      console.log("Signed up successfully:", res.data);
      router.push("/login");
    } catch (error) {
      console.log("Error signing up from frontend:", error);

      if (error.response) {
        console.log("Response error:", error.response.data);
        Alert.alert("Signup Failed", error.response.data.message || "Please try again.");
      } else if (error.request) {
        console.log("Request error:", error.request);
        Alert.alert("Network Error", "Could not reach the server.");
      } else {
        console.log("General error:", error.message);
        Alert.alert("Error", "Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const goToLogin = () => {
    router.push('/login');
  };

  return (
    <SafeAreaView style={signupStyles.container}>
      <View style={signupStyles.card}> 
        <View style={signupStyles.iconContainer}>
          <View style={signupStyles.iconCircle}>
            <Text style={signupStyles.iconText}>{'<>'}</Text>
          </View>
        </View>

        <Text style={signupStyles.title}>Create Account</Text>
        <Text style={signupStyles.subtitle}>Sign up to start coding</Text>

        <TextInput
          style={signupStyles.input}
          placeholder="Username"
          placeholderTextColor="#888"
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          style={signupStyles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <View style={signupStyles.passwordContainer}>
          <TextInput
            style={[signupStyles.input, { flex: 1, marginBottom: 0, paddingRight: 45 }]}
            placeholder="Password"
            placeholderTextColor="#888"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity 
            style={signupStyles.eyeButton}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Text style={signupStyles.eye}>{showPassword ? '🙈' : '👁️'}</Text>
          </TouchableOpacity>
        </View>

        <View style={signupStyles.passwordContainer}>
          <TextInput
            style={[signupStyles.input, { flex: 1, marginBottom: 0, paddingRight: 45 }]}
            placeholder="Confirm Password"
            placeholderTextColor="#888"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
          />
          <TouchableOpacity 
            style={signupStyles.eyeButton}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <Text style={signupStyles.eye}>{showConfirmPassword ? '🙈' : '👁️'}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={signupStyles.signUpButton} 
          onPress={handleSignup}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#1a1a1a" />
          ) : (
            <Text style={signupStyles.signUpText}>Sign Up</Text>
          )}
        </TouchableOpacity>

        <View style={signupStyles.dividerContainer}>
          <View style={signupStyles.divider} />
          <Text style={signupStyles.orText}>Or continue with</Text>
          <View style={signupStyles.divider} />
        </View>

        <TouchableOpacity style={signupStyles.socialButton}>
          <Image style={signupStyles.socialImage} source={require('../assets/images/google.png')} />
          <Text style={signupStyles.socialText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={signupStyles.socialButton}>
          <Image style={signupStyles.socialImage} source={require('../assets/images/githubpng.png')} />
          <Text style={signupStyles.socialText}>Continue with GitHub</Text>
        </TouchableOpacity>

        <View style={signupStyles.signupContainer}>
          <Text style={signupStyles.signupText}>Already have an account? </Text>
          <TouchableOpacity onPress={goToLogin}>
            <Text style={signupStyles.signupLink}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
