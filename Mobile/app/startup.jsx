import { router } from 'expo-router';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { startupStyles } from '../styles/startupStyles';

export default function Startup() {
  const goToLogin = () => {
    router.push('/login');
  };

  return (
    <TouchableOpacity style={startupStyles.container} onPress={goToLogin} activeOpacity={1}>
      <SafeAreaView style={startupStyles.content}>
        <View style={startupStyles.logoContainer}>
          <Text style={startupStyles.logoText}>Contestify</Text>
          {/* <Text style={startupStyles.tagline}>Loading...</Text> */}
          <Text style={startupStyles.tagline}>Tap anywhere to continue</Text>
        </View>
      </SafeAreaView>
    </TouchableOpacity>
  );
}