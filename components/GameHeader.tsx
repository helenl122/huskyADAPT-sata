import {Pressable, View} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';

const GameHeader = () => {
    const router = useRouter();
    return (
        <View className="bg-white">
            <Pressable className="m-4 flex-row justify-end" onPress={() => router.replace('/')}>
                <MaterialCommunityIcons name={"close-circle"} size={40} color={"red"}/>
            </Pressable>
        </View>
    );
}

export default GameHeader;