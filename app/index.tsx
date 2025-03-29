import "../global.css"
import { DynaPuff_400Regular, DynaPuff_600SemiBold, DynaPuff_700Bold } from "@expo-google-fonts/dynapuff";
import { useFonts } from "expo-font";
import ScreenHeader from "@/components/screenHeader";
import { Text, View } from "react-native";

const LibraryScreen = () => {
    const [fontsLoaded] = useFonts({DynaPuff_400Regular, DynaPuff_600SemiBold, DynaPuff_700Bold});

    return (
        <View>
            <ScreenHeader headerTitle="LIBRARY"/>
        </View>
    );
}

export default LibraryScreen;