import {Text, View} from "react-native";
import GameHeader from "@/components/GameHeader"
import DownUpPress from "@/components/game_components/DownUpPress";
import SVG, {Circle} from 'react-native-svg';

const ShapesGame = () => {

    // const renderGame = () => {
    //     return (
    //       <View className="flex-1 bg-black justify-center items-center">
    //         {/* <Text className="text-white">Shapes Game</Text> */}
    //         <SVG height="100" width="100">
    //             {/* Outer Outline (bigger circle) */}
    //             <Circle
    //               cx="50"
    //               cy="50"
    //               r="30" // Slightly larger radius
    //               fill="none"
    //               stroke="gray"
    //               strokeWidth="10"
    //             />
    //             {/* Main Outline (normal circle) */}
    //             <Circle
    //               cx="50"
    //               cy="50"
    //               r="30" // Original radius
    //               fill="none"
    //               stroke="white"
    //               strokeWidth="6"
    //             />
    //           </SVG>
    //       </View>
    //     );
    // }
    const renderBottomBar = () => {
      return <View className="absolute bottom-0 left-0 right-0 flex-row h-20 items-center justify-center bg-gray-400 m-8 rounded-xl"></View>
    }
    return (
        <View className="flex-1">
            <GameHeader className="absolute top-0 right-0"/>
            {renderGame()}
            {/* <DownUpPress
                accessibilityLabel="Press to Play"
                gameContent={renderGame()}
            /> */}
            {renderBottomBar()}
        </View>
    );
}

export default ShapesGame;