import {Tabs} from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useWindowDimensions, SafeAreaView } from "react-native";

// import app design colors
const tailwindConfig = require('@/tailwind.config.js'); 
const colors = tailwindConfig.theme.extend.colors;

const TabLayout = () => {
  // For tracking device size & layout orientation
  const width = useWindowDimensions().width;
  const isLargeScreen = (width >= 768);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tabs screenOptions={{
        // tab bar adjustments
        tabBarInactiveTintColor: colors.fontColor,
        tabBarActiveTintColor: colors.selectedTabFontColor,
        tabBarActiveBackgroundColor: colors.selectedTabBGColor,
        tabBarStyle: {
          paddingBottom: 0, // remove bottom space on mobile
          backgroundColor: colors.tabBGColor,
        },
        // tab bar label adjustments
        tabBarLabelStyle: {
          fontFamily: "DynaPuff_600SemiBold",
          width: 50,
        },
        // adjust tab bar position & layout
        tabBarPosition: isLargeScreen ? 'left' : 'bottom',       
        tabBarVariant: isLargeScreen ? 'material' : 'uikit',
        tabBarLabelPosition: 'below-icon', 
      }}>
        {/*Tab Bar Navigation Items*/}
        {renderTab("index", "Library", "library-outline")}
        {renderTab("FavoritesScreen", "Favorites", "star-outline")}
        {renderTab("SettingsScreen", "Settings", "settings-outline")}
        {renderTab("HelpScreen", "Help", "help-circle-outline")}
        {/* tab bar settings for games screens*/}
        <Tabs.Screen name="(games)" options={{ href: null, headerShown: false, tabBarStyle: {display: "none"}}}/>
      </Tabs>
    </SafeAreaView>
  );
}

// Function to render each tab in tab bar
const renderTab = (screenName: string, screenTitle: string, iconName: any) => (
  <Tabs.Screen 
    name={screenName} // screen file name
    options={{
      headerShown: false, // hide header bar
      tabBarLabel: screenTitle,
      tabBarAccessibilityLabel: screenTitle,
      tabBarIcon: ({color, size}) => <Ionicons name={iconName} color={color} size={size}/>,
    }}
  />
);

export default TabLayout;