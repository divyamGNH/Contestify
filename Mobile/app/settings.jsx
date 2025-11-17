import { router } from "expo-router";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"; // ✅ FIXED
import Constants from "expo-constants";
import BottomNav from "../components/BottomNav.jsx";
import useUserStore from "../Store/useUserStore.js";
import axios from "axios";

const { IP } = Constants.expoConfig.extra;

class SettingsButton {
  constructor(title, subtitle, variant, onPress) {
    this.title = title;
    this.subtitle = subtitle;
    this.variant = variant;
    this.onPress = onPress;
  }

  getBackgroundColor() {
    switch (this.variant) {
      case "primary":
        return "#f5a623";
      case "secondary":
        return "#3498db";
      case "danger":
        return "#e74c3c";
      default:
        return "#2a2a2a";
    }
  }

  render(key) {
    return (
      <TouchableOpacity
        key={key}
        style={[styles.button, { backgroundColor: this.getBackgroundColor() }]}
        onPress={this.onPress}
      >
        <Text style={styles.buttonTitle}>{this.title}</Text>
        <Text style={styles.buttonSubtitle}>{this.subtitle}</Text>
      </TouchableOpacity>
    );
  }
}

const Settings = () => {
  const authToken = useUserStore.getState().authToken;

  const handleTestMail = async () => {
    try {
      if (!authToken) {
        Alert.alert("Error", "You are not logged in.");
        return;
      }

      const res = await axios.post(
        `http://${IP}:3000/api/test/email`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (res.data.success) {
        Alert.alert("Success", "Test email sent!");
      } else {
        Alert.alert("Error", res.data.message || "Failed to send test email.");
      }
    } catch (err) {
      console.error("TEST MAIL ERROR:", err?.response?.data || err.message);
      Alert.alert("Error", "Network or server error.");
    }
  };

  const handleLogout = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log Out",
        style: "destructive",
        onPress: () => {
          useUserStore.getState().setAuthToken(null);
          router.replace("/login");
        },
      },
    ]);
  };

  // --------------------------
  // 🔥 Buttons List
  // --------------------------
  const buttons = [
    new SettingsButton("Add Platforms", "200+ Platforms", "primary", () =>
      router.push("/addContest")
    ),
    new SettingsButton("View Platforms", "Your platforms", "dark", () =>
      router.push("/yourContest")
    ),
    new SettingsButton("Add Handle", "Codeforces", "secondary", () =>
      router.push("/addHandle")
    ),

    // ⭐ Test Email Button
    new SettingsButton("Test Mail", "Send a test email", "secondary", handleTestMail),

    new SettingsButton("Log Out", "Good Bye", "danger", handleLogout),
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>SETTINGS</Text>
        <View style={{ width: 45, height: 45 }} />
      </View>

      <ScrollView contentContainerStyle={styles.buttonsContainer}>
        <View style={styles.buttonGrid}>
          {buttons.map((button, index) => button.render(index))}
        </View>
      </ScrollView>

      <BottomNav active="settings" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1a1a1a" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingBottom: 10,
  },
  heading: { fontSize: 28, fontWeight: "bold", color: "#f5a623" },
  buttonsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
    marginTop: 20,
  },
  buttonGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  button: {
    width: "48%",
    marginBottom: 16,
    paddingVertical: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 16,
  },
  buttonTitle: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
  buttonSubtitle: {
    fontSize: 14,
    color: "#fff",
    opacity: 0.8,
  },
});

export default Settings;
