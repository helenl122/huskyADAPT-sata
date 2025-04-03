import { Text, View, Modal, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface GameTileProps {
    gameName: string;
    iconName: any;
    iconColor: string;
    tileColor: string;
    tileSize: number;
    favorite: boolean;
}

const GameTile = ({gameName, iconName, iconColor, tileColor, tileSize, favorite} : GameTileProps) => {
    return (
        <View className="mx-5 my-3">
            <TouchableOpacity className="flex-col justify-center flex-wrap content-center" style={{backgroundColor: tileColor, width: tileSize, height: tileSize, borderRadius:10 }} onPress={()=>{}}>
                {/* on click, should open up game info */}
            {/* <TouchableOpacity style={{width: tileSize, height: tileSize, backgroundColor: tileColor}}> */}
                <MaterialCommunityIcons style={{display: "flex", flexDirection: "row", justifyContent: "center"}} name={iconName} color={iconColor} size={Math.floor(tileSize/2)}/>
                <Text className="p-0 m-0 font-dp_bold stroke-100 drop-shadow-sm" style={{flexDirection: "row", justifyContent: "center", fontSize: Math.floor(tileSize/10), textShadowRadius: 3, textShadowOffset: {width: -2, height: 2}, textShadowColor: "black", color: "white"}}>{gameName.toUpperCase()}</Text>
                {/* For favorites, have star that toggles on/off */}
            </TouchableOpacity>
        </View>
    );
}

export default GameTile;