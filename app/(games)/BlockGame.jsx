import {Text, View, useWindowDimensions} from "react-native";
import GameHeader from "@/components/GameHeader"
import SinglePress from "@/components/game_components/SinglePress";
import { GameEngine } from 'react-native-game-engine';
import Svg, { Circle } from 'react-native-svg';

const BlockGame = () => {
    const {width, height} = useWindowDimensions();
    // game entities, aka components
    const Ball = ({ position }) => {
        return (
            <Svg className="absolute top-0 left-0 z-0" style={{ height, width}}>
                <Circle cx={position[0]} cy={position[1]} r="25" fill="blue" />
            </Svg>
        );
    }
    // game physics, aka component movement
    const physics = (entities) => {
        const ball = entities.ball;
        if (ball.position[1] >= 325) {
            ball.position[1] = 0;
        }
        ball.position[1] += 1;
        return entities;
    };
    const renderGame = () => {
        return (
          <View className="flex-1 bg-black justify-center items-center bg-red-100">
                <GameEngine
                    systems={[physics]}
                    entities={{
                        ball: { position: [100, 50], renderer: Ball },
                    }}
                />
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