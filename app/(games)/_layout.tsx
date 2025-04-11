import { Stack, useRouter } from 'expo-router';
import { Pressable } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";

const GamesLayout = () => {
    const router = useRouter();
    return (
        // Game screen back button (to home) in header      
        <Stack
            screenOptions={{
                headerShown: true,
                headerBackVisible: false,
                headerLeft: () => null, // hide left back button, since only want x on right
                headerRight: () => (
                    <Pressable className="mx-5" onPress={() => router.replace('/')}>
                        <MaterialCommunityIcons name={"close-circle"} size={40} color={"red"}/>
                    </Pressable>
                ),
            }}
        >
            {/* Hide game names & left back button in header screens*/}
            <Stack.Screen name="BalloonGame" options={{ headerTitle: ""}} />
            <Stack.Screen name="BlockGame" options={{ headerTitle: ""}} />
            <Stack.Screen name="ShapesGame" options={{ headerTitle: ""}} />
        </Stack>
    );
}

export default GamesLayout;