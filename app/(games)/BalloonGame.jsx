import React, { useState } from "react";
import { Text, View, Image, Pressable, ImageBackground} from "react-native";
import GameHeader from "@/components/GameHeader";

const BalloonGame = () => {
  const [popped, setPopped] = useState(false);

  const renderGame = () => {
    return (
      <ImageBackground
        source={require('./Assets/backgroundimage.png')}
        resizeMode="cover"
        className="flex-1"
      >
        <Pressable
          onPress={() => setPopped(true)}
          className="flex-1 justify-center items-center"
        >
          {popped ? (
            <Text className="text-2xl font-bold">popped</Text>
          ) : (
            <Image
              source={require('./Assets/balloon.png')}
              className="w-40 h-40 rounded-xl"
            />
          )}
        </Pressable>
      </ImageBackground>
    );
  };
  

  return (
    <View className="flex-1">
      <GameHeader className="absolute top-0 right-0" />
       {renderGame()}
    </View>
  );
};

export default BalloonGame;
