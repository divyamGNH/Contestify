import { router } from "expo-router";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import HomePageIcon from "../assets/images/HomePage.svg";

const Settings = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.subHeading}>Organize your contests,</Text>
          <Text style={styles.heading}>SETTINGS</Text>
        </View>
        {/* Empty space for alignment (instead of profile image) */}
        <View style={{ width: 45, height: 45 }} />
      </View>

      {/* Buttons Section */}
      <ScrollView contentContainerStyle={styles.buttonsContainer}>
        <View style={styles.row}>
          {/* ✅ Add Contest button navigates to /addContest */}
          <TouchableOpacity
            style={styles.buttonPrimary}
            onPress={() => router.push("/addContest")}
          >
            <Text style={styles.buttonTitle}>Add</Text>
            <Text style={styles.buttonSubtitle}>Contest.</Text>
          </TouchableOpacity>

          {/* ✅ View Contest button navigates to /yourContest */}
          <TouchableOpacity
            style={styles.buttonDark}
            onPress={() => router.push("/yourContest")}
          >
            <Text style={styles.buttonTitle}>View</Text>
            <Text style={styles.buttonSubtitle}>Contests.</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.buttonDark}>
            <Text style={styles.buttonTitle}>Edit</Text>
            <Text style={styles.buttonSubtitle}>Contest.</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonDark}>
            <Text style={styles.buttonTitle}>Delete</Text>
            <Text style={styles.buttonSubtitle}>Contest.</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.buttonDark}>
            <Text style={styles.buttonTitle}>Manage</Text>
            <Text style={styles.buttonSubtitle}>Participants.</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonDanger}>
            <Text style={styles.buttonTitle}>Request</Text>
            <Text style={styles.buttonSubtitle}>Contest Deletion.</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.replace("/dashboard")}
        >
          <HomePageIcon width={26} height={26} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItemActive}>
          <Ionicons name="settings-sharp" size={24} color="black" />
        </TouchableOpacity>
      </View>
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  buttonPrimary: {
    backgroundColor: "#f5a623",
    flex: 1,
    marginRight: 10,
    paddingVertical: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 16,
  },
  buttonDark: {
    backgroundColor: "#2a2a2a",
    flex: 1,
    marginRight: 10,
    paddingVertical: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 16,
  },
  buttonDanger: {
    backgroundColor: "#e74c3c",
    flex: 1,
    marginRight: 10,
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
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 70,
    backgroundColor: "#222",
    borderTopWidth: 1,
    borderTopColor: "#333",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  navItemActive: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    backgroundColor: "#f5a623",
    borderRadius: 20,
    marginVertical: 8,
    marginHorizontal: 8,
  },
});

export default Settings;
