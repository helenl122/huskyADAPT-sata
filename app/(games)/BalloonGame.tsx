import {Text, View, Keyboard, TouchableOpacity, TextInput} from "react-native";
import GameHeader from "@/components/GameHeader"


const BalloonGame = () => {
    return (
        <View>
            <GameHeader/>
            <Text>Balloon Game</Text>
            {/* <TextInput
                style={{ height: 1, width: 1 }}
                placeholder = "placeholder"
                autoFocus
                onChangeText={(text) => {
                    keyPress(text);
                }}
            /> */}
            {/* <TouchableOpacity><Text>Something</Text></TouchableOpacity> */}
        </View>
    );
}

// const keyPress = (text: string) => {
//     const lastChar = text.slice(-1);
//     if (lastChar == " ") {
//         console.log("Space Pressed");
//     }
// }

export default BalloonGame;