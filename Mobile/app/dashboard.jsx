import axios from "axios";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from 'expo-router';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import HomePageIcon from "../assets/images/HomePage.svg";

import useUserStore from "../Store/useUserStore.js";

const IP = "10.89.23.254";

const tabs = [
  { key: "live", label: "Live Now" },
  { key: "today", label: "Today" },
  { key: "tomorrow", label: "Tomorrow" },
  { key: "week", label: "This Week" },
];

const LandingPage = () => {
  // Get username from Zustand store
  const username = useUserStore((state) => state.user?.username);

  const [activeTab, setActiveTab] = useState("live");
  const [contests, setContests] = useState({
    live: [],
    today: [],
    tomorrow: [],
    week: [],
  });
  const [loading, setLoading] = useState(true);

  // Fetch contests once on mount
  useEffect(() => {
    const fetchContests = async () => {
      try {
        const { data } = await axios.get(
          `http://${IP}:3000/api/getContestData/`
        );
        setContests(data);
      } catch (err) {
        console.error("Error fetching contests:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContests();
  }, []);

  const renderContest = ({ item }) => (
    <View style={styles.contestCard}>
      <Text style={styles.contestTitle}>{item.event}</Text>
      <Text style={styles.contestPlatform}>
        {item.platform.name || item.platform}
      </Text>
      <Text style={styles.contestTime}>
        {new Date(item.start).toLocaleString()}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello,</Text>
            <Text style={styles.name}>
              {username?.toUpperCase() || "GUEST"}
            </Text>
          </View>
        </View>

        {/* CodeForces Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardBrand}>🚀 CODEFORCES</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>NEWBIE</Text>
            <Text style={styles.cardSubtitle}>
              with a current rating of 1026 [+120]
            </Text>
          </View>
          <View style={styles.cardFooter}>
            <Text style={styles.cardRank}>LASTRANK 10242</Text>
            <Text style={styles.cardUsername}>DIVYAMGNH</Text>
          </View>
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tab, activeTab === tab.key && styles.tabActive]}
              onPress={() => setActiveTab(tab.key)}
            >
              <Text
                style={[
                  styles.tabLabel,
                  activeTab === tab.key && styles.tabLabelActive,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Content Section */}
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#f5a623"
            style={{ marginVertical: 20 }}
          />
        ) : contests[activeTab]?.length > 0 ? (
          <FlatList
            data={contests[activeTab]}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderContest}
            scrollEnabled={false}
          />
        ) : (
          <Text style={styles.emptyText}>No contests in this tab.</Text>
        )}

        <View style={styles.spacing} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItemActive}
          onPress={() => {}}
        >
          <HomePageIcon
            width={26}
            height={26}
            color="black"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.replace("/settings")}
        >
          <Ionicons
            name="settings"
            size={24}
            color="white"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1a1a1a" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 20,
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  greeting: { fontSize: 18, color: "#999", fontWeight: "400" },
  name: { fontSize: 32, color: "#f5a623", fontWeight: "bold", marginTop: 4 },
  card: {
    backgroundColor: "#e8e8e8",
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    marginHorizontal: 16,
  },
  cardHeader: { marginBottom: 16 },
  cardBrand: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    letterSpacing: 1,
  },
  cardContent: { alignItems: "center", marginBottom: 20 },
  cardTitle: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#222",
    letterSpacing: 4,
  },
  cardSubtitle: { fontSize: 14, color: "#666", marginTop: 8 },
  cardFooter: { flexDirection: "row", justifyContent: "space-between" },
  cardRank: { fontSize: 12, color: "#333", fontWeight: "500" },
  cardUsername: { fontSize: 12, color: "#333", fontWeight: "500" },
  tabContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: "#333",
    alignItems: "center",
  },
  tabActive: { backgroundColor: "#f5a623" },
  tabLabel: { color: "#fff", fontWeight: "600" },
  tabLabelActive: { color: "#1a1a1a" },
  contestCard: {
    backgroundColor: "#222",
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    marginHorizontal: 16,
  },
  contestTitle: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  contestPlatform: { color: "#ccc", fontSize: 14 },
  contestTime: { color: "#f5a623", marginTop: 6 },
  emptyText: { color: "#777", textAlign: "center", marginVertical: 20 },
  spacing: { height: 40 },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 70,
    backgroundColor: "#222",
    borderTopWidth: 1,
    borderTopColor: "#333",
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

export default LandingPage;