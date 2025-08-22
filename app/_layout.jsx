import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // for icons

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // hide header if you want
        tabBarActiveTintColor: "tomato", // active tab color
        tabBarInactiveTintColor: "gray", // inactive tab color
      }}
    >
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cardWrapper"
        options={{
          title: "Card",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Index",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
