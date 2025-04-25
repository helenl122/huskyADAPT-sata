import React, { useState } from "react";
import { Text, View, Image, Pressable } from "react-native";
import GameHeader from "@/components/GameHeader";

const BalloonGame = () => {
  const [popped, setPopped] = useState(false);

  const renderGame = () => {
    return (
      <Pressable
        onPress={() => setPopped(true)}
        className="flex-1 bg-pink-100 justify-center items-center"
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
