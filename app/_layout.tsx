import {Tabs} from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const TabLayout = () => {
    return (
        <Tabs>
            <Tabs.Screen name="screens/LibraryScreen" options={{title: "Library", tabBarIcon: (() => <Ionicons name="library"/>), tabBarActiveTintColor: "blue", tabBarAccessibilityLabel:"Library"}}/>
            <Tabs.Screen name="screens/FavoritesScreen" options={{title: "Favorites", tabBarIcon: (() => <Ionicons name="star-outline"/>), tabBarActiveTintColor: "blue", tabBarAccessibilityLabel:"Favorites"}}/>
            <Tabs.Screen name="screens/SettingsScreen" options={{title: "Settings", tabBarIcon: (() => <Ionicons name="settings-outline"/>), tabBarActiveTintColor: "blue", tabBarAccessibilityLabel:"Settings"}}/>
            <Tabs.Screen name="screens/HelpScreen" options={{title: "Help", tabBarIcon: (() => <Ionicons name="help-circle-outline"/>), tabBarActiveTintColor: "blue", tabBarAccessibilityLabel:"Help"}}/>
        </Tabs> 
    );
}

export default TabLayout;