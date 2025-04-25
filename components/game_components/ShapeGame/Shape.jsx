import { Circle, Rect, Polygon } from "react-native-svg"
import { Dimensions } from 'react-native';

// All possible shapes
const shapes = ['triangle', 'circle', "square"]

// Gets 3 random shapes
export const GetRandomShapes = () => {
  const numbers = new Set();

  while (numbers.size < 3) {
    const randomNum = Math.floor(Math.random() * (shapes.length));
    numbers.add(randomNum);
  }

  return Array.from(numbers).map((number) => shapes[number]);
};

// Formats shape specifications
export const GetFormattedShape = ({ type, x, y, size, fill, stroke, strokeWidth}) => {
  switch (type) {
    case "circle":
      return <Circle cx={x} cy={y} r={size / 2} fill={fill} stroke={stroke} strokeWidth={strokeWidth}/>
    case "square":
      return <Rect x={x - size / 2} y={y - size / 2} width={size} height={size} fill={fill} stroke={stroke} strokeWidth={strokeWidth}/>
    case "triangle":
      const half = size / 2;
      const points = `${x},${y - half} ${x - half},${y + half} ${x + half},${y + half}`;
      return <Polygon points={points} fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
    default:
      return null;
  }
}
