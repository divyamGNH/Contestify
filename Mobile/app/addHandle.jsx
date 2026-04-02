import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  SafeAreaView
} from 'react-native';
import { router } from 'expo-router';
import Constants from 'expo-constants';
import useUserStore from '../Store/useUserStore';
import axios from 'axios';

const { IP } = Constants.expoConfig.extra;

const CodeforcesUsernamePage = () => {
  const [cfHandle, setCfHandle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { authToken, user } = useUserStore();

  // 🔥 FETCH SAVED HANDLE ON PAGE LOAD
  useEffect(() => {
    const fetchHandle = async () => {
      if (!authToken) return;

      try {
        const res = await axios.get(
          `http://${IP}:3000/api/getCfInfo/getUserHandle`,
          {
            headers: { Authorization: `Bearer ${authToken}` }
          }
        );

        if (res.data.success && res.data.handle) {
          setCfHandle(res.data.handle); // autofill
        }
      } catch (error) {
        console.log("Fetch handle error:", error?.response?.data || error);
      }
    };

    fetchHandle();
  }, [authToken]);

  // 🔥 SUBMIT HANDLE
  const handleSubmit = async () => {
    if (!cfHandle.trim()) {
      setErrorMessage('Please enter a Codeforces handle');
      return;
    }

    if (!authToken) {
      Alert.alert('Error', 'You need to login first');
      router.push('/login');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await axios.put(
        `http://${IP}:3000/api/getCfInfo/updateCfHandle`,
        { handle: cfHandle.trim() },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.data.success) {
        Alert.alert('Success!', 'Handle saved successfully!', [
          { text: 'OK', onPress: () => router.back() }
        ]);
      } else {
        setErrorMessage(response.data.error || 'Failed to save handle');
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.error || 'Network error. Please try again.');
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <Text style={styles.headerSubtitle}>Change your</Text>
              <Text style={styles.headerTitle}>{user?.username || 'USERNAME'}</Text>
            </View>
            <View style={styles.iconContainer}>
              <Text style={styles.iconText}>👤</Text>
            </View>
          </View>

          {/* Input Section */}
          <View style={styles.inputSection}>
            <View style={styles.inputContainer}>
              <Image
                source={{ uri: 'https://sta.codeforces.com/s/95087/apple-icon-57x57.png' }}
                style={styles.platformIcon}
              />
              <TextInput
                style={styles.input}
                value={cfHandle}
                onChangeText={(text) => {
                  setCfHandle(text);
                  setErrorMessage('');
                }}
                placeholder="Enter your Codeforces handle"
                placeholderTextColor="#666"
                editable={!isSubmitting}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            
            {errorMessage && (
              <Text style={styles.errorText}>{errorMessage}</Text>
            )}
          </View>

          {/* Info Text */}
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              Enter your Codeforces handle to link it to your account.
            </Text>
          </View>
        </ScrollView>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={() => router.back()}
            disabled={isSubmitting}
          >
            <Text style={styles.cancelButtonText}>✕ Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              styles.submitButton,
              (isSubmitting || !cfHandle.trim()) && styles.buttonDisabled
            ]}
            onPress={handleSubmit}
            disabled={isSubmitting || !cfHandle.trim()}
          >
            {isSubmitting ? (
              <View style={styles.buttonContent}>
                <ActivityIndicator color="#ffffff" size="small" />
                <Text style={styles.submitButtonText}>Saving...</Text>
              </View>
            ) : (
              <Text style={styles.submitButtonText}>✓ Save</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5efe3',
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 40,
  },
  titleContainer: {
    flex: 1,
  },
  headerSubtitle: {
    color: '#7b6a53',
    fontSize: 14,
  },
  headerTitle: {
    color: '#17324d',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 4,
  },
  iconContainer: {
    width: 48,
    height: 48,
    backgroundColor: '#fffdf8',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eadfca',
  },
  iconText: {
    fontSize: 24,
  },
  inputSection: {
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fffdf8',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#eadfca',
  },
  platformIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: '#17324d',
    fontSize: 16,
    padding: 0,
  },
  errorText: {
    color: '#F44336',
    fontSize: 12,
    marginTop: 8,
    marginLeft: 4,
  },
  infoContainer: {
    marginBottom: 32,
  },
  infoText: {
    color: '#7b6a53',
    fontSize: 14,
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    padding: 20,
    backgroundColor: '#f5efe3',
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#ff7849',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#17324d',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  buttonDisabled: {
    backgroundColor: '#7b6a53',
    opacity: 0.6,
  },
});

export default CodeforcesUsernamePage;
