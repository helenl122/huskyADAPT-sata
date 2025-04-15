import {View, Text} from "react-native";
import SingleButtonpress from "@/components/game_components/SingleButtonPress";


const BlockGame = () => {
    const renderGame = () => {
      return <Text>Example Sample</Text>;
    }
    return (
      <SingleButtonpress
        accessibilityLabel="Press to Play"
        gameContent={renderGame()}
      />
    );
}

export default BlockGame;