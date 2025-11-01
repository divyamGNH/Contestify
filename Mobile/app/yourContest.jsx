import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import useUserStore from "../Store/useUserStore";

const IP = "10.89.23.254";

const YourContest = () => {
  const { authToken } = useUserStore();

  const [personalPlatforms, setPersonalPlatforms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPlatformData = async () => {
      try {
        const res = await axios.get(
          `http://${IP}:3000/api/getPlatformData/getPersonalPlatforms`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        setPersonalPlatforms(res.data);
      } catch (error) {
        console.log("Error fetching platforms", error);
      } finally {
        setLoading(false);
      }
    };

    getPlatformData();
  }, []);

  const handleRemove = async (platformId) => {
    try {
      setPersonalPlatforms((prev) =>
        prev.filter((item) => item.id !== platformId)
      );

      await axios.post(
        `http://${IP}:3000/api/sendPlatforms/removePlatforms`,
        { platformId },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
    } catch (error) {
      console.log("Error removing the platform", error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.platformCard}>
      <Image
        source={{ uri: `http://${IP}:3000${item.icon}` }}
        style={styles.icon}
      />
      <View style={styles.textContainer}>
        <Text style={styles.platformName}>{item.name}</Text>
        <Text style={styles.platformShort}>{item.short}</Text>
      </View>

      {/* Remove Button */}
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => handleRemove(item.id)}
      >
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.subHeading}>Manage and explore,</Text>
          <Text style={styles.heading}>YOUR PLATFORMS</Text>
        </View>
        <View style={{ width: 45, height: 45 }} />
      </View>

      {/* Loading */}
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#f5a623" />
        </View>
      ) : personalPlatforms.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.noData}>No platforms found.</Text>
        </View>
      ) : (
        <FlatList
          data={personalPlatforms}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </SafeAreaView>
  );
};

export default YourContest;

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
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  platformCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2a2a2a",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  platformName: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
  platformShort: {
    fontSize: 14,
    color: "#aaa",
    marginTop: 4,
  },
  removeButton: {
    backgroundColor: "#f44336",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  removeButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noData: {
    color: "#aaa",
    fontSize: 16,
  },
});
