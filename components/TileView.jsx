import {ScrollView, FlatList, useWindowDimensions } from "react-native"
import GameTile from "@/components/GameTile";
const gameData = require('../app/(games)/gamesData');

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
                data={gameData}
                keyExtractor = {(game) => game.gameName}
                renderItem = {({item}) => {
                    // condition to check if displaying on favorites screen
                    if (!favoriteScreen || (favoriteScreen && item.favorite)) {
                        return (
                            <GameTile
                                tileSize = {Math.floor((width*0.8)/numCols)}
                                gameName = {item.gameName}
                                tileColor = {item.tileColor}
                                iconName = {item.iconName}
                                iconColor = {item.iconColor}
                                favorite = {item.favorite}
                            />
                        );
                    }           
                }}
            />  
        </ScrollView>
    );
}

export default TileView;