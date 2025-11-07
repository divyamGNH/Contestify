import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";
import HomePageIcon from "../assets/images/HomePage.svg";

const tabs = [
  {
    name: "home",
    route: "/dashboard",
    icon: ({ color }) => (
      <HomePageIcon width={26} height={26} color={color} />
    ),
  },

  {
    name: "blogs",
    route: "/blog",
    icon: ({ color }) => (
      <Ionicons name="journal-outline" size={26} color={color} />
    ),
  },
  
  {
    name: "settings",
    route: "/settings",
    icon: ({ color }) => (
      <Ionicons name="settings" size={26} color={color} />
    ),
  },

  //add more tabs here if needed
];

const BottomNav = () => {
  const pathname = usePathname();

  return (
    <View style={styles.bottomNav}>
      {tabs.map((tab) => {
        const isActive =
          pathname === tab.route || (tab.route === "/" && pathname === "/");

        return (
          <TouchableOpacity
            key={tab.name}
            style={[styles.navItem, isActive && styles.navItemActive]}
            onPress={() => router.replace(tab.route)}
          >
            {tab.icon({ color: isActive ? "black" : "white" })}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: "#f5a623",
    borderRadius: 20,
    marginVertical: 8,
    marginHorizontal: 8,
  },
});

export default BottomNav;
