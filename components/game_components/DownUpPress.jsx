import {View, TouchableOpacity} from 'react-native';

const DownUpPress = ({label, gameContent}) => {
  const handlePressIn = () => {console.log("Press Down")};
  const handlePressOut = () => {console.log("Press Released")};

  return (
    <View className="flex-1">
      <TouchableOpacity
        accessible={true} // marks element as accessible
        accessibilityLabel={label} // what screen reader/switch user hears
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0} // no opacity when pressed
        style={{zIndex:100, flex:1, justifyContent:"center", opacity: 0}}
      >
      </TouchableOpacity>
      <View className="absolute left-0 right-0 top-0 bottom-0">{gameContent}</View>
    </View>
  );
};

export default DownUpPress;