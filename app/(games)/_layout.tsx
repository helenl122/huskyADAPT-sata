import { Stack, useRouter } from 'expo-router';
import { Pressable } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

const GamesLayout = () => {
    const router = useRouter();
    return (
        // Game screen back button (to library) in header      
        <Stack
            screenOptions={{
                headerShown: true,
                headerLeft: () => (
                    <Pressable className="mx-5" onPress={() => router.replace('/')}>
                        <Ionicons name={"arrow-back"} size={40}/>
                    </Pressable>
                ),
            }}
        >
            {/* Hide game names in header screens*/}
            <Stack.Screen name="BalloonGame" options={{ headerTitle: ""}} />
            <Stack.Screen name="RoadGame" options={{ headerTitle: ""}} />
            <Stack.Screen name="ShapesGame" options={{ headerTitle: ""}} />
        </Stack>
    );
}

export default GamesLayout;