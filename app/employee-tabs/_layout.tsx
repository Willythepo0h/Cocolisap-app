import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import EmployeeScreen from ".";
import CameraScreen from "./camera";
import EmployeeDashboardScreen from "./dashboard";
import UploadDisplayScreen from "./uploadDisplay";
import ResultScreen from "./resultDisplay";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function EmployeeBottomNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "help-circle-outline";
          if (route.name === "index") iconName = "home-outline";
          else if (route.name === "dashboard") iconName = "grid";
          else if (route.name === "camera") iconName = "camera";
          return <Ionicons name={iconName as keyof typeof Ionicons.glyphMap} size={size} color={color} />;
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="index" component={EmployeeScreen} options={{ title: "Home" }} />
      <Tab.Screen name="dashboard" component={EmployeeDashboardScreen} options={{ title: "Dashboard" }} />
      <Tab.Screen name="camera" component={CameraScreen} options={{ title: "Camera" }} />
    </Tab.Navigator>
  );
}

export default function EmployeeLayout () {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MainTabs" component={EmployeeBottomNavigation} options={{ headerShown: false }} />

      <Stack.Screen name="uploadDisplay" component={UploadDisplayScreen} options={{ headerShown: false }} />
      <Stack.Screen name="resultDisplay" component={ResultScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}
