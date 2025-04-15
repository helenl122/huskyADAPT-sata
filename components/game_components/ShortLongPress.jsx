import React, { useState } from 'react';
import {View, TouchableOpacity} from 'react-native';

const SinglePress = ({label, gameContent}) => {
  const [startTime, setStartTime] = useState(null);
  const handlePressIn = () => {setStartTime(Date.now());};
  const handlePressOut = () => {
    if (startTime) {
      const duration = Date.now() - startTime;
      if (duration >= 600) {
        console.log("Long press");
      } else {
        console.log("Short press");
      }
    }
  };

  return (
    <View className="flex-1">
      <TouchableOpacity
        accessible={true} // marks element as accessible
        accessibilityLabel={label} // what screen reader/switch user hears
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0} // no opacity when pressed
        style={{zIndex:100, flex:1, justifyContent:"center", opacity: 0.2, backgroundColor: "blue"}}
      >
      </TouchableOpacity>
      <View className="absolute left-0 right-0 top-0 bottom-0">{gameContent}</View>
    </View>
  );
};

export default SinglePress;