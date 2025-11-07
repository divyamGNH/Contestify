import { router } from "expo-router";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import Constants from "expo-constants";
import BottomNav from "../components/BottomNav.jsx";

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
  const buttons = [
    new SettingsButton("Add Platforms", "200+ Platforms", "primary", () => router.push("/addContest")),
    new SettingsButton("View Platforms", "Your platforms", "dark", () => router.push("/yourContest")),
    // new SettingsButton("Edit", "Contest.", "dark", () => {}),
    // new SettingsButton("Delete", "Contest.", "dark", () => {}),
    // new SettingsButton("Manage", "Participants.", "dark", () => {}),
    new SettingsButton("Log Out", "Good Bye", "danger", () => {}),
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.heading}>SETTINGS</Text>
          {/* <Text style={styles.subHeading}>Organize your contests</Text> */}
        </View>
        {/* Empty space for alignment */}
        <View style={{ width: 45, height: 45 }} />
      </View>

      {/* Buttons Grid */}
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
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingBottom: 10,
  },
  subHeading: {
    fontSize: 14,
    color: "#999",
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#f5a623",
  },
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
    width: "48%", // 2 buttons per row with gap
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