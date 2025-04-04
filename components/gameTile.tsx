import React, {useState} from 'react';
import { Text, View, Modal, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import InfoScreen from './InfoScreen';

interface GameTileProps {
    gameName: string;
    iconName: any;
    iconColor: string;
    tileColor: string;
    tileSize: number;
    favorite: boolean;
}

const GameTile = ({gameName, iconName, iconColor, tileColor, tileSize, favorite} : GameTileProps) => {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View className="mx-5 my-4">
            <InfoScreen modalVisible={modalVisible} setModalVisible={setModalVisible}/>
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