import {View, Text} from "react-native";
import SinglePress from "@/components/game_components/SinglePress";
import GameHeader from "@/components/GameHeader"

const BlockGame = () => {
    const renderGame = () => {
      return (
        <View className="flex-1 bg-black justify-center items-center">
          <Text className="text-white">Block Game</Text>
        </View>
      );
    }
    return (
      <View className="flex-1">
        <GameHeader className="absolute top-0 right-0"/>
        <SinglePress
          accessibilityLabel="Press to Play"
          gameContent={renderGame()}
        />
      </View>
    );
}

export default BlockGame;