import {ScrollView, FlatList, useWindowDimensions } from "react-native"
import GameTile from "@/components/GameTile";
const gameData = require('../assets/gamesData');

const TileView = ({favoriteScreen}) => {    
    const width = useWindowDimensions().width;
    const isLargeScreen = (width >= 768);
    const numCols = (isLargeScreen) ? 3 : 1 // 3 col if tablet/desktop, 1 col if mobile
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            directionalLockEnabled={true}
            alwaysBounceVertical={false}
        >
            <FlatList
                key={numCols}
                numColumns={numCols}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                // Displaying each game data
                data={gameData}
                keyExtractor = {(game) => game.gamePath}
                renderItem = {({item}) => {
                    // condition to check if displaying on favorites screen
                    if (!favoriteScreen || (favoriteScreen && item.favorite)) {
                        return (
                            <GameTile
                                gamePath = {item.gamePath}
                                tileSize = {Math.floor((width*0.8)/numCols)}
                                gameName = {item.gameName}
                                tileColor = {item.tileColor}
                                iconName = {item.iconName}
                                iconColor = {item.iconColor}
                                favorite = {item.favorite}
                                theme = {item.theme}
                                description = {item.description}
                                switchType = {item.switchType}
                            />
                        );
                    }           
                }}
            />  
        </ScrollView>
    );
}

export default TileView;