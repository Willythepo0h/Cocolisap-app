import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import NonEmployeeScreen from ".";
import CocolisapInfoScreen from "./cocolisapInfo";
import NonEmployeeDashboardScreen from "./dashboard";
import CocolisapManageScreen from "./cocolisapManagement";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function NonEmployeeBottomNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "index") iconName = "home-outline";
          else if (route.name === "dashboard") iconName = "grid";
          return <Ionicons name={iconName as keyof typeof Ionicons.glyphMap} size={size} color={color} />;
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="index" component={NonEmployeeScreen} options={{ title: "Home" }} />
      <Tab.Screen name="dashboard" component={NonEmployeeDashboardScreen} options={{ title: "Dashboard" }} />
    </Tab.Navigator>
  );
}

export default function NonEmployeeLayout() {
  return (
    <Stack.Navigator>
      {/* Tabs as the main screen */}
      <Stack.Screen name="NonEmployeeMainTabs" component={NonEmployeeBottomNavigation} options={{ headerShown: false }} />

      {/* Individual Screens */}
      <Stack.Screen name="cocolisapInfo" component={CocolisapInfoScreen} options={{ headerShown: false }} />
      <Stack.Screen name="cocolisapManagement" component={CocolisapManageScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}