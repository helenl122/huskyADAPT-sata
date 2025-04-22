import {Text, View} from "react-native";
import GameHeader from "@/components/GameHeader"
import SinglePress from "@/components/game_components/SinglePress";

const ShapeGame = () => {      
    const renderGame = () => {
        return ( // TODO: render game components in return of this function
          <View className="flex-1 bg-black justify-center items-center">
            <Text className="text-white">Shape Game</Text>
          </View>
        );
    }
    return ( // game screen main structure: header & pressable area
        <View className="flex-1">
            <GameHeader className="absolute top-0 right-0"/>
            <SinglePress
                accessibilityLabel="Press to Play"
                gameContent={renderGame()}
            />
        </View>
    );
}

export default ShapeGame;