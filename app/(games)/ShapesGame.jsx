import React, { useState, useEffect, useRef } from 'react';
import { View, Button, Dimensions } from 'react-native';
import Svg from 'react-native-svg';
import {GetFormattedShape, GetRandomShapes} from '@/components/game_components/ShapeGame/Shape'
import GameHeader from "@/components/GameHeader"

const { width, height } = Dimensions.get('window');
const targetShapeIntialSize = 150;
const optionShapesIntialSize = 200;

// 3 shapes used in current game
const shapes = GetRandomShapes()

// shape that user is trying to match
const targetShape = shapes[Math.floor(Math.random() * shapes.length)];

export default function ShapeGame() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stopped, setStopped] = useState(false);
  const [sizes, setSizes] = useState([optionShapesIntialSize, optionShapesIntialSize, optionShapesIntialSize]);

  const intervalRef = useRef(null);
  const currentShape = GetFormattedShape({type: targetShape, x: width/2, y:height/3, size: targetShapeIntialSize, stroke: 'white', fill: 'white'})
  const shapeOptions  = [
      {type: shapes[0], x: width/5, y: 650, size: optionShapesIntialSize, fill: 'none', stroke: currentIndex === 0 ? 'red' : 'white', strokeWidth: 20},
      {type: shapes[1], x: width/2, y: 650, size: optionShapesIntialSize,  fill: 'none', stroke: currentIndex === 1 ? 'red' : 'white', strokeWidth: 20},
      {type: shapes[2], x: 4 * width/5, y: 650, size: optionShapesIntialSize,  fill: 'none', stroke: currentIndex === 2 ? 'red' : 'white', strokeWidth: 20}
    ].map((shape) => GetFormattedShape(shape));

  useEffect(() => {
    if (!stopped) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % 3);
      }, 2000);
    }

    return () => clearInterval(intervalRef.current);
  }, [stopped]);

  // const handleStop = () => {
  //   setStopped(true);
  //   // Enlarge the selected shape
  //   const newSizes = [...sizes];
  //   newSizes[currentIndex] = shapeSize * 2;
  //   setSizes(newSizes);
  // };

  const renderBottomBar = () => {
    return <View className="absolute bottom-0 left-0 right-0 flex-row h-20 
      items-center justify-center bg-gray-800 m-8 rounded-xl"></View>
  }

  return (
    <View className="flex-1 bg-black">
      {/* {renderBottomBar()} */}
      <Svg height={height} width={width} className="absolute top-0 left-0">
        {currentShape}
        {shapeOptions[0]}
        {shapeOptions[1]}
        {shapeOptions[2]}
      </Svg>
      <GameHeader className="absolute top-0 right-0"/>
      {/* <Button title="Stop and Grow" onPress={handleStop} disabled={stopped} /> */}
    </View>
  );
}

// TO DO: 
// 1. growing and shrinking shapes
//    - try to do in order 
// 2. add a timer