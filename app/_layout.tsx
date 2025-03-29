import {Tabs} from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useWindowDimensions } from "react-native";

const TabLayout = () => {
  const width = useWindowDimensions().width;
  const isLargeScreen = (width >= 768);
  return (
      <Tabs screenOptions={{
          tabBarInactiveTintColor: '#000000',
          tabBarActiveTintColor: '#1D5AD0',
          tabBarActiveBackgroundColor: '#7090C1',
          tabBarStyle: {
              backgroundColor: '#DDEEFA',
          },
          tabBarPosition: isLargeScreen ? 'left' : 'bottom',
          tabBarLabelPosition: 'beside-icon',            
      }}>
          {renderTab("index", "Library", "library")}
          {renderTab("FavoritesScreen", "Favorites", "star-outline")}
          {renderTab("SettingsScreen", "Settings", "settings-outline")}
          {renderTab("HelpScreen", "Help", "help-circle-outline")}
      </Tabs> 
  );
  }

// Function to render each tab in tab bar
const renderTab = (screenName: string, screenTitle: string, iconName: any) => (
  <Tabs.Screen 
    name={screenName}
    options={{
      headerShown: false,
      tabBarLabel: screenTitle,
      tabBarAccessibilityLabel: screenTitle,
      tabBarIcon: () => <Ionicons name={iconName}/>,
    }}
  />
);

export default TabLayout;