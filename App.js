// React hooks

// Routing
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
const Tabs = createMaterialBottomTabNavigator();
//Icons
import { Ionicons } from "@expo/vector-icons";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";

export default function Router() {
  return (
    <NavigationContainer>
      <Tabs.Navigator
        initialRouteName="Home"
        activeColor="blue"
        barStyle={{ backgroundColor: "#fff", height: 60 }}
      >
        <Tabs.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color }) => (
              <Ionicons name="home" color={color} size={26} />
            ),
          }}
        />
        <Tabs.Screen
          name="About"
          component={About}
          options={{
            tabBarLabel: "About",
            tabBarIcon: ({ color }) => (
              <Ionicons name="information-circle" color={color} size={26} />
            ),
          }}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
}
