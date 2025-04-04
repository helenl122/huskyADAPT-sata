import React, {useState} from 'react';
import { Text, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import InfoScreen from './InfoScreen';

interface GameTileProps {
    gamePath: string;
    gameName: string;
    iconName: any;
    iconColor: string;
    tileColor: string;
    tileSize: number;
    favorite: boolean;
    theme: string;
    description: string;
    switchType: string;
}

const GameTile = ({gamePath, gameName, iconName, iconColor, tileColor, tileSize,
                    favorite, theme, description, switchType} : GameTileProps) => {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View className="mx-5 my-4">
            {/* Pop Up Window: Game information */}
            <InfoScreen
                gamePath={gamePath}
                gameName={gameName}
                iconName={iconName}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                theme={theme}
                description={description}
                switchType={switchType}
            />
            {/* Tile design elements: icons & text */}
            <TouchableOpacity
                // style icon & game name in center of tile
                className="flex-row justify-center flex-wrap content-center"
                style={{
                    backgroundColor: tileColor,
                    width: tileSize,
                    height: tileSize,
                    borderRadius:10 
                }}
                onPress={()=>{setModalVisible(true)}} // open up game info
            >
                {/* display star if game is favorited*/}
                {(favorite) ? <MaterialCommunityIcons className="absolute top-2 left-2" name={"star"} color={"#F9D232"} size={Math.floor(tileSize/5)}/> : <View></View>}
                {(favorite) ? <MaterialCommunityIcons className="absolute top-2 left-2" name={"star-outline"} color={"#black"} size={Math.floor(tileSize/5)}/> : <View></View>}
                <MaterialCommunityIcons name={iconName} color={iconColor} size={Math.floor(tileSize/2)}/>
                <Text
                    className="p-3 font-dp_bold text-white"
                    style={{
                        fontSize: Math.floor(tileSize/10),
                        textShadowOffset: {width: -3, height: 3},
                        textShadowRadius: 3,
                        textShadowColor: "black"
                    }}
                >
                    {gameName.toUpperCase()}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export default GameTile;