import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
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


class Contest {
  constructor(data) {
    this.id = data.id;
    this.event = data.event;
    this.platform = data.platform;
    this.start = data.start;
  }

  getPlatformName() {
    return this.platform?.name || this.platform;
  }

  getFormattedStartTime() {
    return new Date(this.start).toLocaleString();
  }
}


class ContestService {
  async fetchAllContests() {
    const { data } = await axios.get(`http://${IP}:3000/api/getContestData/`);

    return {
      live: data.live.map(c => new Contest(c)),
      today: data.today.map(c => new Contest(c)),
      tomorrow: data.tomorrow.map(c => new Contest(c)),
      week: data.week.map(c => new Contest(c)),
    };
  }
}

const contestService = new ContestService();


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
  const [refreshing, setRefreshing] = useState(false);

  const fetchContests = useCallback(async () => {
    const structuredData = await contestService.fetchAllContests();
    setContests(structuredData);
  }, []);

  const fetchCfData = useCallback(async () => {
    const res = await axios.get(`http://${IP}:3000/api/getCfInfo/`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (res.data.success) {
      setCfData(res.data.data);
    }
  }, [authToken]);

  // Fetch contests (now uses OOP service)
  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      setCfLoading(true);

      try {
        await Promise.all([fetchContests(), fetchCfData()]);
      } catch (err) {
        console.error("Dashboard fetch error:", err.message);
      } finally {
        setLoading(false);
        setCfLoading(false);
      }
    };

    loadDashboardData();
  }, [fetchContests, fetchCfData]);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.all([fetchContests(), fetchCfData()]);
    } catch (err) {
      console.log("Refresh error:", err?.response?.data || err);
    } finally {
      setRefreshing(false);
    }
  };

  // Using the Contest class methods
  const renderContest = ({ item }) => (
    <View style={styles.contestCard}>
      <View style={styles.contestMetaRow}>
        <View style={styles.platformPill}>
          <Text style={styles.contestPlatform}>{item.getPlatformName()}</Text>
        </View>
        <Text style={styles.contestTime}>{item.getFormattedStartTime()}</Text>
      </View>
      <Text style={styles.contestTitle}>{item.event}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.screenTitle}>Dashboard</Text>
          <View style={styles.headerBlock}>
            <View style={styles.heroBlobA} />
            <View style={styles.heroBlobB} />
            <Text style={styles.greeting}>Welcome back</Text>
            <Text style={styles.name}>{username?.toUpperCase() || "GUEST"}</Text>
            <Text style={styles.heroSubText}>Stay sharp, your next contest is waiting.</Text>

            <View style={styles.heroStatsRow}>
              <View style={styles.heroStatItem}>
                <Text style={styles.heroStatValue}>{contests.live.length}</Text>
                <Text style={styles.heroStatLabel}>Live</Text>
              </View>
              <View style={styles.heroDivider} />
              <View style={styles.heroStatItem}>
                <Text style={styles.heroStatValue}>{contests.today.length}</Text>
                <Text style={styles.heroStatLabel}>Today</Text>
              </View>
              <View style={styles.heroDivider} />
              <View style={styles.heroStatItem}>
                <Text style={styles.heroStatValue}>{contests.week.length}</Text>
                <Text style={styles.heroStatLabel}>Week</Text>
              </View>
            </View>
          </View>
        </View>

        {/* CODEFORCES CARD */}
        <TouchableOpacity
          onPress={() => router.push("/addHandle")}
          activeOpacity={0.85}
          style={styles.card}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardBrand}>Codeforces</Text>
            <Text style={styles.cardHint}>Profile Snapshot</Text>
          </View>

          <View style={styles.cardContent}>
            {cfLoading ? (
              <ActivityIndicator size="small" color="#1f2937" />
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
            <View>
              <Text style={styles.cardFooterLabel}>Last Rank</Text>
              <Text style={styles.cardRank}>{cfData?.lastContestRank || "—"}</Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.cardFooterLabel}>Handle</Text>
              <Text style={styles.cardUsername}>
                {cfData?.handle?.toUpperCase() || "NO HANDLE"}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.quickActionsRow}>
          {/* <TouchableOpacity
            activeOpacity={0.82}
            style={[styles.quickActionCard, styles.quickActionPrimary]}
            onPress={() => router.push("/contest-discovery")}
          >
            <Text style={styles.quickActionLabel}>Discover</Text>
            <Text style={styles.quickActionText}>Find more contests</Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            activeOpacity={0.82}
            style={[styles.quickActionCard, styles.quickActionSecondary]}
            onPress={() => router.push("/yourContest")}
          >
            <Text style={styles.quickActionLabel}>Saved</Text>
            <Text style={styles.quickActionText}>Open your contests</Text>
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <Text style={styles.sectionHeading}>Upcoming Contests</Text>
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
            color="#111827"
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
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No contests in this tab.</Text>
          </View>
        )}

        <View style={styles.spacing} />
      </ScrollView>

      <BottomNav />
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5efe3" },

  header: {
    marginTop: 14,
    marginBottom: 18,
    paddingHorizontal: 18,
  },
  screenTitle: {
    fontSize: 13,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: "#8b7355",
    fontWeight: "700",
    marginBottom: 8,
  },
  headerBlock: {
    backgroundColor: "#17324d",
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 18,
    overflow: "hidden",
    shadowColor: "#111827",
    shadowOpacity: 0.18,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  heroBlobA: {
    position: "absolute",
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: "rgba(255,255,255,0.07)",
    top: -42,
    right: -25,
  },
  heroBlobB: {
    position: "absolute",
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "rgba(255,120,73,0.18)",
    bottom: -28,
    left: -16,
  },
  greeting: { fontSize: 14, color: "#c9d7e5", fontWeight: "600" },
  name: { fontSize: 27, color: "#f8fafc", fontWeight: "800", marginTop: 2 },
  heroSubText: {
    fontSize: 13,
    color: "#dbe6f0",
    marginTop: 4,
    marginBottom: 12,
  },
  heroStatsRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 6,
  },
  heroStatItem: {
    flex: 1,
    alignItems: "center",
  },
  heroStatValue: {
    fontSize: 18,
    fontWeight: "800",
    color: "#ffffff",
  },
  heroStatLabel: {
    fontSize: 11,
    color: "#d5e0eb",
    marginTop: 2,
  },
  heroDivider: {
    width: 1,
    height: 28,
    backgroundColor: "rgba(255,255,255,0.2)",
  },

  /* CF CARD */
  card: {
    backgroundColor: "#fffdf8",
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    marginHorizontal: 18,
    borderWidth: 1,
    borderColor: "#eadfca",
    shadowColor: "#7c5f3b",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
  },
  cardHeader: {
    marginBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardBrand: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1b3a57",
  },
  cardHint: {
    fontSize: 12,
    color: "#7b6a53",
  },
  cardContent: {
    alignItems: "flex-start",
    marginBottom: 18,
    backgroundColor: "#f6efe1",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#eadfca",
  },
  cardTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#153047",
    letterSpacing: 0.4,
  },
  cardSubtitle: { fontSize: 14, color: "#60543f", marginTop: 6 },
  cardFooter: { flexDirection: "row", justifyContent: "space-between" },
  cardFooterLabel: { fontSize: 11, color: "#7b6a53", marginBottom: 2 },
  cardRank: { fontSize: 14, color: "#17324d", fontWeight: "800" },
  cardUsername: { fontSize: 14, color: "#17324d", fontWeight: "800" },

  quickActionsRow: {
    flexDirection: "row",
    paddingHorizontal: 18,
    gap: 10,
    marginBottom: 18,
  },
  quickActionCard: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  quickActionPrimary: {
    backgroundColor: "#0f766e",
  },
  quickActionSecondary: {
    backgroundColor: "#ff7849",
  },
  quickActionLabel: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "800",
  },
  quickActionText: {
    fontSize: 12,
    color: "rgba(255,255,255,0.9)",
    marginTop: 4,
  },

  sectionHeading: {
    fontSize: 18,
    color: "#2b3c4f",
    fontWeight: "800",
    marginBottom: 10,
    paddingHorizontal: 18,
  },

  /* Tabs */
  tabContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
    paddingHorizontal: 18,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#d2c3a9",
    backgroundColor: "#fffaf0",
    alignItems: "center",
  },
  tabActive: {
    backgroundColor: "#17324d",
    borderColor: "#17324d",
  },
  tabLabel: { color: "#5f4f3a", fontWeight: "700", fontSize: 13 },
  tabLabelActive: { color: "#f9fafb" },

  /* Contest Card */
  contestCard: {
    backgroundColor: "#fffdf8",
    padding: 16,
    marginBottom: 12,
    borderRadius: 14,
    marginHorizontal: 18,
    borderWidth: 1,
    borderColor: "#eadfca",
    shadowColor: "#7c5f3b",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  contestMetaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  platformPill: {
    backgroundColor: "#e8f4f1",
    borderWidth: 1,
    borderColor: "#bfe2db",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  contestTitle: { color: "#17324d", fontSize: 16, fontWeight: "800" },
  contestPlatform: { color: "#0f766e", fontSize: 12, fontWeight: "800" },
  contestTime: {
    color: "#7b6a53",
    fontSize: 12,
    marginLeft: 8,
    flexShrink: 1,
    textAlign: "right",
  },
  emptyState: {
    marginHorizontal: 18,
    marginTop: 4,
    backgroundColor: "#fffdf8",
    borderWidth: 1,
    borderColor: "#eadfca",
    borderRadius: 12,
    paddingVertical: 22,
  },
  emptyText: { color: "#7b6a53", textAlign: "center", fontWeight: "700" },
  spacing: { height: 32 },
});

export default LandingPage;
