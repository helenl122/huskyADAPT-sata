import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Dimensions,
  Animated,
  TouchableWithoutFeedback,
  Easing
} from 'react-native';
import Svg from 'react-native-svg';
import { GetFormattedShape, GetRandomShapes } from '@/components/game_components/ShapeGame/Shape';
import GameHeader from '@/components/GameHeader';

// Screen dimensions
const { width, height } = Dimensions.get('window');

// Initial sizes of the shapes
const targetShapeInitialSize = 180;
const optionShapesInitialSize = 200;

// Get random shapes
const shapes = GetRandomShapes();
const targetShapeType = shapes[Math.floor(Math.random() * shapes.length)];

export default function ShapeGame() {
  // State to keep track of the selected index of shape options
  const [currentIndex, setCurrentIndex] = useState(0);

  // State to track if the index should keep changing or stop
  const [stopped, setStopped] = useState(false);
  const [shapes, setShapes] = useState(GetRandomShapes()); // State for new shapes
  const [targetShapeType, setTargetShapeType] = useState(shapes[Math.floor(Math.random() * shapes.length)]);

  // Reference for the target shape's position for animation
  const position = useRef(new Animated.ValueXY({
    x: width / 2 - targetShapeInitialSize / 2, // Initially at the center
    y: height / 3 - targetShapeInitialSize / 2 // Initial vertical position
  })).current;

  // Reference for the interval to stop or start changing shapes
  const intervalRef = useRef(null);

  // Shape options (positions of shapes at the bottom of the screen)
  const shapeOptions = [
    { type: shapes[0], x: width / 5, y: 650 },
    { type: shapes[1], x: width / 2, y: 650 },
    { type: shapes[2], x: 4 * width / 5, y: 650 }
  ];

  // Format the options to render them as SVG shapes
  const formattedOptions = shapeOptions.map((shape, index) =>
    GetFormattedShape({
      ...shape,
      size: optionShapesInitialSize,
      fill: 'none',
      stroke: currentIndex === index ? 'red' : 'white',
      strokeWidth: 20
    })
  );

  // Automatically cycles through shape options every 2 seconds
  useEffect(() => {
    if (!stopped) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % 3);
      }, 1500);
    }
    // Cleanup interval when stopped or component unmounts
    return () => clearInterval(intervalRef.current);
  }, [stopped]);

  // Function to animate target shape to the selected option when the screen is clicked
  const animateToSelected = () => {
    // Get the selected shape option
    const selected = shapeOptions[currentIndex];

    // Calculate the new position for the target shape
    const newX = selected.x - targetShapeInitialSize / 2;
    const newY = selected.y - targetShapeInitialSize / 2;

    // Animate the target shape's position
    Animated.timing(position, {
      toValue: { x: newX, y: newY },
      easing: Easing.linear,
      useNativeDriver: false // We are animating position, not transforms
    }).start();

    // Stop the index changes after screen click
    setStopped(true);

    // After animation completes, check if target and selected shapes match
    Animated.timing(position, {
      toValue: { x: newX, y: newY },
      duration: 300, // Duration of the animation
      easing: Easing.linear,
      useNativeDriver: false
    }).start(() => {
      if (targetShapeType === selected.type) {
        // If they match, restart the game with new shapes
        setTimeout(() => {
          restartGame(true);
        }, 300); // Add a little delay for visual feedback
      } else {
        // If not a match, reset the target shape position
        setTimeout(() => {
          restartGame(false);
        }, 200); // Add a little delay for visual feedback
      }
    });
  };

  const restartGame = (shouldResetShapes = false) => {
    if (shouldResetShapes) {
      const newShapes = GetRandomShapes();
      setShapes(newShapes);
      setTargetShapeType(newShapes[Math.floor(Math.random() * newShapes.length)]);
      setCurrentIndex(0);
    }
    position.setValue({ 
      x: width / 2 - targetShapeInitialSize / 2, 
      y: height / 3 - targetShapeInitialSize / 2 
    });
    setStopped(false);
  };

  return (
    <TouchableWithoutFeedback onPress={animateToSelected}>
      <View className="flex-1 bg-black">
        {/* Animated target shape */}
        <Animated.View
          style={{
            position: 'absolute',
            transform: position.getTranslateTransform(),
          }}
        >
          <Svg height={targetShapeInitialSize} width={targetShapeInitialSize}>
            {GetFormattedShape({
              type: targetShapeType,
              x: targetShapeInitialSize / 2,
              y: targetShapeInitialSize / 2,
              size: targetShapeInitialSize,
              stroke: 'white',
              fill: 'white'
            })}
          </Svg>
        </Animated.View>

        {/* Render shape options */}
        <Svg height={height} width={width} className="absolute top-0 left-0">
          {formattedOptions}
        </Svg>

        {/* Game Header */}
        <GameHeader className="absolute top-0 right-0" />
      </View>
    </TouchableWithoutFeedback>
  );
}

// import React, { useState, useEffect, useRef } from 'react';
// import {
//   View,
//   Dimensions,
//   Animated,
//   TouchableWithoutFeedback,
//   Easing
// } from 'react-native';
// import Svg from 'react-native-svg';
// import { GetFormattedShape, GetRandomShapes } from '@/components/game_components/ShapeGame/Shape';
// import GameHeader from '@/components/GameHeader';

// const { width, height } = Dimensions.get('window');
// const targetShapeInitialSize = 150;
// const optionShapesInitialSize = 200;

// export default function ShapeGame() {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [stopped, setStopped] = useState(false);
//   const [shapes, setShapes] = useState(GetRandomShapes()); // State for new shapes
//   const [targetShapeType, setTargetShapeType] = useState(shapes[Math.floor(Math.random() * shapes.length)]);

//   const position = useRef(new Animated.ValueXY({
//     x: width / 2 - targetShapeInitialSize / 2,
//     y: height / 3 - targetShapeInitialSize / 2
//   })).current;

//   const intervalRef = useRef(null);

//   const shapeOptions = [
//     { type: shapes[0], x: width / 5, y: 650 },
//     { type: shapes[1], x: width / 2, y: 650 },
//     { type: shapes[2], x: 4 * width / 5, y: 650 }
//   ];

//   const formattedOptions = shapeOptions.map((shape, index) =>
//     GetFormattedShape({
//       ...shape,
//       size: optionShapesInitialSize,
//       fill: 'none',
//       stroke: currentIndex === index ? 'red' : 'white',
//       strokeWidth: 20
//     })
//   );

//   // Stop the index changing when the screen is clicked
//   useEffect(() => {
//     if (!stopped) {
//       intervalRef.current = setInterval(() => {
//         setCurrentIndex((prev) => (prev + 1) % 3);
//       }, 2000);
//     }

//     return () => clearInterval(intervalRef.current);
//   }, [stopped]);

//   const animateToSelected = () => {
//     // Stop the index change
//     setStopped(true);
//     clearInterval(intervalRef.current);

//     const selected = shapeOptions[currentIndex];
//     const newX = selected.x - targetShapeInitialSize / 2;
//     const newY = selected.y - targetShapeInitialSize / 2;

//     // Animate target shape to selected shape
//     Animated.timing(position, {
//       toValue: { x: newX, y: newY },
//       easing: Easing.linear,
//       duration: 500,
//       useNativeDriver: false
//     }).start(() => {
//       // Check if the shapes match
//       if (targetShapeType === selected.type) {
//         // If matched, reset with new shapes
//         setShapes(GetRandomShapes());
//         setTargetShapeType(shapes[Math.floor(Math.random() * shapes.length)]);
//         // Reset the position of the target shape to the top
//         position.setValue({ x: width / 2 - targetShapeInitialSize / 2, y: height / 3 - targetShapeInitialSize / 2 });
//         setStopped(false); // Restart shape index
//       } else {
//         // If not matched, reset position and try again
//         position.setValue({ x: width / 2 - targetShapeInitialSize / 2, y: height / 3 - targetShapeInitialSize / 2 });
//         setStopped(false); // Restart shape index
//       }
//     });
//   };

//   return (
//     <TouchableWithoutFeedback onPress={animateToSelected}>
//       <View className="flex-1 bg-black">
//         <Animated.View
//           style={{
//             position: 'absolute',
//             transform: position.getTranslateTransform(),
//           }}
//         >
//           <Svg height={targetShapeInitialSize} width={targetShapeInitialSize}>
//             {GetFormattedShape({
//               type: targetShapeType,
//               x: targetShapeInitialSize / 2,
//               y: targetShapeInitialSize / 2,
//               size: targetShapeInitialSize,
//               stroke: 'white',
//               fill: 'white'
//             })}
//           </Svg>
//         </Animated.View>

//         <Svg height={height} width={width} className="absolute top-0 left-0">
//           {formattedOptions}
//         </Svg>

//         <GameHeader className="absolute top-0 right-0" />
//       </View>
//     </TouchableWithoutFeedback>
//   );
// }


// import React, { useState, useEffect, useRef } from 'react';
// import {
//   View,
//   Dimensions,
//   Animated,
//   TouchableWithoutFeedback, 
//   Easing
// } from 'react-native';
// import Svg from 'react-native-svg';
// import { GetFormattedShape, GetRandomShapes } from '@/components/game_components/ShapeGame/Shape';
// import GameHeader from '@/components/GameHeader';

// const { width, height } = Dimensions.get('window');
// const targetShapeInitialSize = 150;
// const optionShapesInitialSize = 200;

// const shapes = GetRandomShapes();
// const targetShapeType = shapes[Math.floor(Math.random() * shapes.length)];

// export default function ShapeGame() {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [stopped, setStopped] = useState(false);

//   const position = useRef(new Animated.ValueXY({
//     x: width / 2 - targetShapeInitialSize / 2,
//     y: height / 3 - targetShapeInitialSize / 2
//   })).current;

//   const intervalRef = useRef(null);

//   const shapeOptions = [
//     { type: shapes[0], x: width / 5, y: 650 },
//     { type: shapes[1], x: width / 2, y: 650 },
//     { type: shapes[2], x: 4 * width / 5, y: 650 }
//   ];

//   const formattedOptions = shapeOptions.map((shape, index) =>
//     GetFormattedShape({
//       ...shape,
//       size: optionShapesInitialSize,
//       fill: 'none',
//       stroke: currentIndex === index ? 'red' : 'white',
//       strokeWidth: 20
//     })
//   );

//   useEffect(() => {
//     if (!stopped) {
//       intervalRef.current = setInterval(() => {
//         setCurrentIndex((prev) => (prev + 1) % 3);
//       }, 2000);
//     }

//     return () => clearInterval(intervalRef.current);
//   }, [stopped]);

//   const animateToSelected = () => {
//     const selected = shapeOptions[currentIndex];
//     const newX = selected.x - targetShapeInitialSize / 2;
//     const newY = selected.y - targetShapeInitialSize / 2;

//     Animated.timing(position, {
//       toValue: { x: newX, y: newY },
//       easing: Easing.linear,
//       useNativeDriver: false
//     }).start();
//   };

//   return (
//     <TouchableWithoutFeedback onPress={animateToSelected}>
//       <View className="flex-1 bg-black">
//         <Animated.View
//           style={{
//             position: 'absolute',
//             transform: position.getTranslateTransform(),
//           }}
//         >
//           <Svg height={targetShapeInitialSize} width={targetShapeInitialSize}>
//             {GetFormattedShape({
//               type: targetShapeType,
//               x: targetShapeInitialSize / 2,
//               y: targetShapeInitialSize / 2,
//               size: targetShapeInitialSize,
//               stroke: 'white',
//               fill: 'white'
//             })}
//           </Svg>
//         </Animated.View>

//         <Svg height={height} width={width} className="absolute top-0 left-0">
//           {formattedOptions}
//         </Svg>

//         <GameHeader className="absolute top-0 right-0" />
//       </View>
//     </TouchableWithoutFeedback>
//   );
// }


// import React, { useState, useEffect, useRef } from 'react';
// import {
//   View,
//   Dimensions,
//   Animated,
//   TouchableWithoutFeedback,
//   Easing
// } from 'react-native';
// import Svg from 'react-native-svg';
// import { GetFormattedShape, GetRandomShapes } from '@/components/game_components/ShapeGame/Shape';
// import GameHeader from '@/components/GameHeader';

// const { width, height } = Dimensions.get('window');
// const targetShapeInitialSize = 150;
// const optionShapesInitialSize = 200;

// const shapes = GetRandomShapes();
// const targetShapeType = shapes[Math.floor(Math.random() * shapes.length)];

// export default function ShapeGame() {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [stopped, setStopped] = useState(false);

//   const position = useRef(new Animated.ValueXY({
//     x: width / 2 - targetShapeInitialSize / 2,
//     y: height / 3 - targetShapeInitialSize / 2
//   })).current;

//   const intervalRef = useRef(null);

//   const shapeOptions = [
//     { type: shapes[0], x: width / 5, y: 650 },
//     { type: shapes[1], x: width / 2, y: 650 },
//     { type: shapes[2], x: 4 * width / 5, y: 650 }
//   ];

//   const formattedOptions = shapeOptions.map((shape, index) =>
//     GetFormattedShape({
//       ...shape,
//       size: optionShapesInitialSize,
//       fill: 'none',
//       stroke: currentIndex === index ? 'red' : 'white',
//       strokeWidth: 20
//     })
//   );

//   useEffect(() => {
//     if (!stopped) {
//       intervalRef.current = setInterval(() => {
//         setCurrentIndex((prev) => (prev + 1) % 3);
//       }, 2000);
//     }

//     return () => clearInterval(intervalRef.current);
//   }, [stopped]);

//   const animateToSelected = () => {
//     const selected = shapeOptions[currentIndex];
//     const newX = selected.x - targetShapeInitialSize / 2;
//     const newY = selected.y - targetShapeInitialSize / 2;

//     Animated.timing(position, {
//       toValue: { x: newX, y: newY },
//       useNativeDriver: false,
//       easing: Easing.linear, // optional, requires import
//     }).start();
//   };

//   return (
//     <TouchableWithoutFeedback onPress={animateToSelected}>
//       <View className="flex-1 bg-black">
//         <Animated.View
//           style={{
//             position: 'absolute',
//             transform: position.getTranslateTransform(),
//           }}
//         >
//           <Svg height={targetShapeInitialSize} width={targetShapeInitialSize}>
//             {GetFormattedShape({
//               type: targetShapeType,
//               x: targetShapeInitialSize / 2,
//               y: targetShapeInitialSize / 2,
//               size: targetShapeInitialSize,
//               stroke: 'white',
//               fill: 'white'
//             })}
//           </Svg>
//         </Animated.View>

//         <Svg height={height} width={width} className="absolute top-0 left-0">
//           {formattedOptions}
//         </Svg>

//         <GameHeader className="absolute top-0 right-0" />
//       </View>
//     </TouchableWithoutFeedback>
//   );
// }


// import React, { useState, useEffect, useRef } from 'react';
// import { View, Button, Dimensions } from 'react-native';
// import Svg from 'react-native-svg';
// import {GetFormattedShape, GetRandomShapes} from '@/components/game_components/ShapeGame/Shape'
// import GameHeader from "@/components/GameHeader"

// const { width, height } = Dimensions.get('window');
// const targetShapeIntialSize = 150;
// const optionShapesIntialSize = 200;

// // 3 shapes used in current game
// const shapes = GetRandomShapes()

// // shape that user is trying to match
// const targetShape = shapes[Math.floor(Math.random() * shapes.length)];

// export default function ShapeGame() {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [stopped, setStopped] = useState(false);
//   const [sizes, setSizes] = useState([optionShapesIntialSize, optionShapesIntialSize, optionShapesIntialSize]);

//   const intervalRef = useRef(null);
//   const currentShape = GetFormattedShape({type: targetShape, x: width/2, y:height/3, size: targetShapeIntialSize, stroke: 'white', fill: 'white'})
//   const shapeOptions  = [
//       {type: shapes[0], x: width/5, y: 650, size: optionShapesIntialSize, fill: 'none', stroke: currentIndex === 0 ? 'red' : 'white', strokeWidth: 20},
//       {type: shapes[1], x: width/2, y: 650, size: optionShapesIntialSize,  fill: 'none', stroke: currentIndex === 1 ? 'red' : 'white', strokeWidth: 20},
//       {type: shapes[2], x: 4 * width/5, y: 650, size: optionShapesIntialSize,  fill: 'none', stroke: currentIndex === 2 ? 'red' : 'white', strokeWidth: 20}
//     ].map((shape) => GetFormattedShape(shape));

//   useEffect(() => {
//     if (!stopped) {
//       intervalRef.current = setInterval(() => {
//         setCurrentIndex((prev) => (prev + 1) % 3);
//       }, 2000);
//     }

//     return () => clearInterval(intervalRef.current);
//   }, [stopped]);

//   // const handleStop = () => {
//   //   setStopped(true);
//   //   // Enlarge the selected shape
//   //   const newSizes = [...sizes];
//   //   newSizes[currentIndex] = shapeSize * 2;
//   //   setSizes(newSizes);
//   // };

//   const renderBottomBar = () => {
//     return <View className="absolute bottom-0 left-0 right-0 flex-row h-20 
//       items-center justify-center bg-gray-800 m-8 rounded-xl"></View>
//   }

//   return (
//     <View className="flex-1 bg-black">
//       {/* {renderBottomBar()} */}
//       <Svg height={height} width={width} className="absolute top-0 left-0">
//         {currentShape}
//         {shapeOptions[0]}
//         {shapeOptions[1]}
//         {shapeOptions[2]}
//       </Svg>
//       <GameHeader className="absolute top-0 right-0"/>
//       {/* <Button title="Stop and Grow" onPress={handleStop} disabled={stopped} /> */}
//     </View>
//   );
// }

// // import React, { useRef, useEffect } from 'react';
// // import { View, Animated, findNodeHandle, UIManager } from 'react-native';

// // export default function ShapeAnimation() {
// //   const position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
// //   const currentShapeRef = useRef();
// //   const targetShapeRef = useRef();

// //   const moveToTarget = () => {
// //     const handle = findNodeHandle(targetShapeRef.current);
// //     if (!handle) return;

// //     UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
// //       Animated.spring(position, {
// //         toValue: { x: pageX, y: pageY },
// //         useNativeDriver: false,
// //       }).start();
// //     });
// //   };

// //   useEffect(() => {
// //     setTimeout(moveToTarget, 500); // wait for layout to complete
// //   }, []);

// //   return (
// //     <>
// //       <Animated.View
// //         ref={currentShapeRef}
// //         style={[{ position: 'absolute', width: 50, height: 50, backgroundColor: 'red' }, position.getLayout()]}
// //       />
// //       <View
// //         ref={targetShapeRef}
// //         style={{ width: 50, height: 50, backgroundColor: 'blue', position: 'absolute', top: 200, left: 100 }}
// //       />
// //     </>
// //   );
// // }

// // // TO DO: 
// // // 1. growing and shrinking shapes
// // //    - try to do in order 
// // // 2. add a timer


