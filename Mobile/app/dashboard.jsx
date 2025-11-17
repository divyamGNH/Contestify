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
import { router } from "expo-router";
import BottomNav from "../components/BottomNav.jsx";

import useUserStore from "../Store/useUserStore.js";
import Constants from "expo-constants";

const { IP } = Constants.expoConfig.extra;

const tabs = [
  { key: "live", label: "Live Now" },
  { key: "today", label: "Today" },
  { key: "tomorrow", label: "Tomorrow" },
  { key: "week", label: "This Week" },
];

const LandingPage = () => {
  const username = useUserStore((state) => state.user?.username);
  const authToken = useUserStore.getState().authToken;

  const [activeTab, setActiveTab] = useState("live");
  const [contests, setContests] = useState({
    live: [],
    today: [],
    tomorrow: [],
    week: [],
  });
  const [loading, setLoading] = useState(true);

  // CF API Data
  const [cfData, setCfData] = useState(null);
  const [cfLoading, setCfLoading] = useState(true);

  // Fetch contests
  useEffect(() => {
    const fetchContests = async () => {
      try {
        const { data } = await axios.get(`http://${IP}:3000/api/getContestData/`);
        setContests(data);
      } catch (err) {
        console.error("Error fetching contests:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContests();
  }, []);

  // Fetch Codeforces info
  useEffect(() => {
    const fetchCfData = async () => {
      try {
        const res = await axios.get(`http://${IP}:3000/api/getCfInfo/`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (res.data.success) {
          setCfData(res.data.data);
        }
      } catch (err) {
        console.log("CF Fetch Error:", err?.response?.data || err);
      } finally {
        setCfLoading(false);
      }
    };

    fetchCfData();
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

        {/* CODEFORCES CARD */}
        <TouchableOpacity
          onPress={() => router.push("/addHandle")}
          activeOpacity={0.85}
          style={styles.card}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardBrand}>🚀 CODEFORCES</Text>
          </View>

          <View style={styles.cardContent}>
            {cfLoading ? (
              <ActivityIndicator size="small" color="#000" />
            ) : cfData ? (
              <>
                <Text style={styles.cardTitle}>
                  {cfData.rank ? cfData.rank.toUpperCase() : "UNRATED"}
                </Text>

                <Text style={styles.cardSubtitle}>
                  Rating {cfData.rating}{" "}
                  {cfData.ratingChange >= 0
                    ? `+${cfData.ratingChange}`
                    : cfData.ratingChange}
                </Text>
              </>
            ) : (
              <>
                <Text style={styles.cardTitle}>NO RANK</Text>
                <Text style={styles.cardSubtitle}>Rating —</Text>
              </>
            )}
          </View>

          <View style={styles.cardFooter}>
            <Text style={styles.cardRank}>
              LASTRANK {cfData?.lastContestRank || "—"}
            </Text>

            <Text style={styles.cardUsername}>
              {cfData?.handle?.toUpperCase() || "NO HANDLE"}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Tabs */}
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

        {/* Contest List */}
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

      <BottomNav />
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

  /* CF CARD */
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

  /* Tabs */
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

  /* Contest Card */
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
});

export default LandingPage;
