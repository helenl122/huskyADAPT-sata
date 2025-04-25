import React, { useState } from "react";
import { Text, View, Image, Pressable, ImageBackground } from "react-native";
import GameHeader from "@/components/GameHeader";

const BalloonGame = () => {
  // Initialize the state to track the popped status of each balloon (8 balloons in total)
  const [popped, setPopped] = useState(Array(8).fill(false));

  // Function to handle the press anywhere on the screen
  const handlePressAnywhere = () => {
    // Generate a random index between 0 and 7 (since there are 8 balloons)
    const randomIndex = Math.floor(Math.random() * 8);

    // Mark that random balloon as popped
    const newPopped = [...popped];
    newPopped[randomIndex] = true;
    setPopped(newPopped);
  };

  // Function to render the game screen with 8 balloons
  const renderGame = () => {
    // Array to hold the 8 balloons with random positions and the popped status
    const balloonPositions = [
      { top: '10%', left: '10%' },
      { top: '20%', left: '50%' },
      { top: '30%', left: '30%' },
      { top: '40%', left: '60%' },
      { top: '50%', left: '20%' },
      { top: '60%', left: '70%' },
      { top: '70%', left: '40%' },
      { top: '80%', left: '80%' }
    ];

    return (
      <ImageBackground
        source={require('./Assets/backgroundimage.png')}
        resizeMode="cover"
        style={{ flex: 1 }}
        onStartShouldSetResponder={() => true} // Enable press anywhere on the screen
        onResponderRelease={handlePressAnywhere} // Handle the press event
      >
        {balloonPositions.map((position, index) => (
          <Pressable
            key={index}
            style={{
              position: 'absolute',
              top: position.top,
              left: position.left,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {popped[index] ? (
              <Text style={{ fontSize: 24, fontWeight: 'bold' }}>popped</Text>
            ) : (
              <Image
                source={require('./Assets/balloon.png')}
                style={{
                  width: 100,
                  height: 150, // Adjust the height based on the image's aspect ratio
                  borderRadius: 12,
                  resizeMode: 'contain' // Ensure the balloon doesn't get cropped
                }}
              />
            )}
          </Pressable>
        ))}
      </ImageBackground>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <GameHeader style={{ position: 'absolute', top: 0, right: 0 }} />
      {renderGame()}
    </View>
  );
};

export default BalloonGame;
