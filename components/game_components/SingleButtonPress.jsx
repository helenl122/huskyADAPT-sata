import React, { useState } from 'react';
import { View, TouchableOpacity} from 'react-native';
import GameHeader from "@/components/GameHeader"

const SingleButtonPress = ({label, gameContent}) => {
  const [startTime, setStartTime] = useState(null);
  const handlePressIn = () => {setStartTime(Date.now());};
  const handlePressOut = () => {
    if (startTime) {
      const duration = Date.now() - startTime;
      if (duration >= 800) {
        console.log("Long press");
      } else {
        console.log("Short press");
      }
    }
  };

  return (
    <View className="flex-1">
      <GameHeader className="absolute top-0 right-0"/>
      <TouchableOpacity
        accessible={true} // marks element as accessible
        accessibilityLabel={label} // what screen reader/switch user hears
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1.0} // doesn't change opacity when pressed
        style={{flex:1, justifyContent:"center", backgroundColor: "blue"}}
      >
        {gameContent}
      </TouchableOpacity>
    </View>
  );
};

export default SingleButtonPress;