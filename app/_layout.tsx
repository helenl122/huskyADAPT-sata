import {Tabs} from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useWindowDimensions } from "react-native";
import { DynaPuff_400Regular } from "@expo-google-fonts/dynapuff";


const TabLayout = () => {
  const width = useWindowDimensions().width;
  const isLargeScreen = (width >= 768);
  return (
      <Tabs screenOptions={{
          tabBarInactiveTintColor: '#000000',
          tabBarActiveTintColor: '#1D5AD0',
          tabBarActiveBackgroundColor: '#7090C133',
          tabBarStyle: {
              backgroundColor: '#DDEEFA',
          },
          tabBarLabelStyle: {
            fontFamily: "DynaPuff_400Regular",
            width: 50,
          },
          tabBarPosition: isLargeScreen ? 'left' : 'bottom',       
          tabBarVariant: isLargeScreen ? 'material' : 'uikit',
          tabBarLabelPosition: 'below-icon', 
      }}>
          {renderTab("index", "Library", "library-outline")}
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
      tabBarIcon: ({color, size}) => <Ionicons name={iconName} color={color} size={size}/>,
    }}
  />
);

export default TabLayout;