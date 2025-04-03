import "../global.css"
import { DynaPuff_400Regular, DynaPuff_600SemiBold, DynaPuff_700Bold } from "@expo-google-fonts/dynapuff";
import { useFonts } from "expo-font";
import ScreenHeader from "@/components/ScreenHeader";
import { ScrollView, useWindowDimensions, View, FlatList } from "react-native";
import GameTile from "@/components/GameTile";
const gameData = require('./(games)/gamesData');

const LibraryScreen = () => {
    const [fontsLoaded] = useFonts({DynaPuff_400Regular, DynaPuff_600SemiBold, DynaPuff_700Bold});
    const width = useWindowDimensions().width;
    const isLargeScreen = (width >= 768);
    return (
        <View>
            <ScreenHeader headerTitle="LIBRARY"/>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                directionalLockEnabled={true}
                alwaysBounceVertical={false}
            >
                <FlatList
                    numColumns={3}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        alignSelf: 'flex-start',
                        flexWrap: 'wrap',
                        justifyContent: "space-around"
                    }}
                    data={gameData}
                    keyExtractor = {(game) => game.gameName}
                    renderItem = {({item}) => (
                        <GameTile
                            tileSize = {Math.floor(width/4)}
                            gameName = {item.gameName}
                            tileColor = {item.tileColor}
                            iconName = {item.iconName}
                            iconColor = {item.iconColor}
                            favorite = {item.favorite}
                        />
                    )}
                />  
            </ScrollView>
        </View>
    );
}

export default LibraryScreen;