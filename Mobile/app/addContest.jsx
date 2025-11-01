import { router } from "expo-router";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import HomePageIcon from "../assets/images/HomePage.svg";
import { useState, useEffect } from "react";
import useUserStore from "../Store/useUserStore";
import axios from "axios";

const IP = "10.89.23.254";

const AddContest = () => {
  const { authToken } = useUserStore();

  const [allPlatforms, setAllPlatforms] = useState([]);
  const [personalPlatforms, setPersonalPlatforms] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPlatformData = async () => {
      try {
        const platformsRes = await axios.get(`http://${IP}:3000/api/getPlatformData/`);
        const personalPlatformRes = await axios.get(
          `http://${IP}:3000/api/getPlatformData/getPersonalPlatforms`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        setAllPlatforms(platformsRes.data);
        setPersonalPlatforms(personalPlatformRes.data);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching platforms", error);
        setLoading(false);
      }
    };

    getPlatformData();
  }, []);

  useEffect(() => {
    if (!authToken || selectedPlatforms.length === 0) return;

    const sendPlatformtoDB = async () => {
      try {
        await axios.post(
          `http://${IP}:3000/api/sendPlatforms/storePlatforms`,
          { platforms: selectedPlatforms },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        console.log("Platforms sent successfully");
      } catch (error) {
        console.log("Error adding the platform", error);
      }
    };

    sendPlatformtoDB();
  }, [selectedPlatforms]);

  // Filter platforms based on search query
  const filteredPlatforms = allPlatforms.filter((platform) => {
    const query = searchQuery.toLowerCase();
    return platform.name.toLowerCase().includes(query);
  });

  const handleAdd = async (item) => {
    const alreadyAdded =
      selectedPlatforms.some((p) => p.id === item.id) ||
      personalPlatforms.some((p) => p.id === item.id);
    if (alreadyAdded) return;

    setSelectedPlatforms((prev) => [...prev, item]);
    setPersonalPlatforms((prev) => [...prev, item]);

    console.log("Added:", item.name);
  };

  const renderPlatform = ({ item }) => {
    const alreadyAdded =
      personalPlatforms.some((platform) => platform.id === item.id) ||
      selectedPlatforms.some((platform) => platform.id === item.id);

    return (
      <View style={styles.platformCard}>
        <Image source={{ uri: item.icon }} style={styles.platformIcon} />
        <Text style={styles.platformName}>{item.name}</Text>
        <TouchableOpacity
          style={[
            styles.addButton,
            alreadyAdded && { backgroundColor: "#555" },
          ]}
          onPress={() => handleAdd(item)}
          disabled={alreadyAdded}
        >
          <Text
            style={[
              styles.addButtonText,
              alreadyAdded && { color: "#ccc" },
            ]}
          >
            {alreadyAdded ? "Added" : "Add"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.heading}>Add Contest Platforms</Text>
        <Text style={styles.counterText}>
          {filteredPlatforms.length} platforms available
        </Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search platforms..."
          placeholderTextColor="#666"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Ionicons name="close-circle" size={20} color="#999" />
          </TouchableOpacity>
        )}
      </View>

      {/* Platform List */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading platforms...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredPlatforms}
          renderItem={renderPlatform}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                No platforms found matching "{searchQuery}"
              </Text>
            </View>
          }
        />
      )}

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.replace("/dashboard")}
        >
          <HomePageIcon width={26} height={26} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItemActive} onPress={() => {}}>
          <Ionicons name="add-circle" size={24} color="black" />
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
    padding: 20,
    paddingBottom: 10,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#f5a623",
    marginBottom: 4,
  },
  counterText: {
    fontSize: 14,
    color: "#999",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2a2a2a",
    marginHorizontal: 20,
    marginBottom: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#444",
  },
  searchInput: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    paddingVertical: 12,
    marginLeft: 8,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  platformCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2a2a2a",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#333",
  },
  platformIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    marginRight: 12,
  },
  platformName: {
    flex: 1,
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
  },
  addButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#f5a623",
    borderRadius: 8,
    marginLeft: 12,
  },
  addButtonText: {
    color: "#000",
    fontWeight: "600",
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#999",
    fontSize: 16,
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: "center",
  },
  emptyText: {
    color: "#999",
    fontSize: 16,
    textAlign: "center",
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

export default AddContest;
