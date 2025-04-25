import {Text, View, useWindowDimensions} from "react-native";
import GameHeader from "@/components/GameHeader"
import SinglePress from "@/components/game_components/SinglePress";
import { GameEngine } from 'react-native-game-engine';
import Svg, { Rect } from 'react-native-svg';

const BlockGame = () => {
    const {width, height} = useWindowDimensions();
    // game entities, aka components
    const Block = ({ move }) => {
        return (
            <Svg className="absolute top-0 left-0 z-0" style={{ height, width}}>
                <Rect x={move[0]} y={move[1]} width={height/7} height={height/7} stroke="red" strokeWidth="3" fill="blue" />
            </Svg>
        );
    }
    // game physics, aka component movement
    const physics = (entities) => {
        const block = entities.block;
        if (block.move[0] >= 325) {
            block.move[2] *= -1
        }
        block.move[0] += 1*block.move[2];
        return entities;
    };
    const renderGame = () => {
        return (
          <View className="flex-1 bg-black justify-center items-center bg-red-100">
                <GameEngine
                    systems={[physics]}
                    entities={{
                        block: { move: [0, height, 1], renderer: Block },
                    }}
                />
          </View>
        );
    }
    return ( // screen structure: game header & pressable area
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