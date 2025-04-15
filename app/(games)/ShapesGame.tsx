import {Text, View} from "react-native";
import GameHeader from "@/components/GameHeader"
import ShortLongPress from "@/components/game_components/ShortLongPress";

const ShapesGame = () => {
    const renderGame = () => {
        return (
          <View className="flex-1 bg-black justify-center items-center">
            <Text className="text-white">Shapes Game</Text>
          </View>
        );
    }
    return (
        <View className="flex-1">
            <GameHeader className="absolute top-0 right-0"/>
            <ShortLongPress
                accessibilityLabel="Press to Play"
                gameContent={renderGame()}
            />
        </View>
    );
}

export default ShapesGame;