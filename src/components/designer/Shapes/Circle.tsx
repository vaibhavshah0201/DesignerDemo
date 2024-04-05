import {useState} from 'react';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {Circle, Svg} from 'react-native-svg';

export const CircleShape = (props: any) => {
  const offset = useSharedValue({
    x: 0,
    y: 0,
  });

  const position = useSharedValue({
    x: 0,
    y: 0,
  });
  const [center, setCenter] = useState({
    x: 0,
    y: 0,
  });

  const scaleXPosition = useSharedValue(0);
  const scaleYPosition = useSharedValue(0);
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const savedRotation = useSharedValue(0);
  // const globleScale = props.canvasSize && props.canvasSize.globleScale;
  const animatedStyles = useAnimatedStyle((): any => {
    return {
      height: 100,
      width: 100,

      transform: [
        {translateX: !isNaN(offset.value.x) ? offset.value.x : 0},
        {translateY: !isNaN(offset.value.y) ? offset.value.y : 0},
        {scale: scale.value},
        {rotateZ: `${rotation.value}rad`},
      ],
    };
  });

  const dragGesture = Gesture.Pan()
    .averageTouches(true)
    .onUpdate(e => {
      offset.value = {
        x: e.translationX + position.value.x,
        y: e.translationY + position.value.y,
      };
    })
    .onEnd(() => {
      position.value = {
        x: offset.value.x,
        y: offset.value.y,
      };
    });

  const zoomGesture = Gesture.Pinch()
    .onUpdate(event => {
      scale.value = savedScale.value * event.scale;
    })
    .onEnd(event => {
      savedScale.value = scale.value;

      scaleXPosition.value =
        event.focalX - (event.focalX - position.value.x) * (1 - event.scale);
      scaleYPosition.value =
        event.focalY - (event.focalY - position.value.y) * (1 - event.scale);
    });

  const rotateGesture = Gesture.Rotation()
    .onUpdate(event => {
      rotation.value = savedRotation.value + event.rotation;
    })
    .onEnd(() => {
      savedRotation.value = rotation.value;
    });

  const composed = Gesture.Simultaneous(
    dragGesture,
    Gesture.Simultaneous(zoomGesture, rotateGesture),
  );
  return (
    <GestureDetector gesture={composed}>
      <Animated.View style={animatedStyles}>
        <Svg width="200" height="200">
          <Circle
            cx="50%"
            cy="50%"
            r="40%"
            fill="white"
            stroke="black"
            strokeWidth="1"
          />
        </Svg>
      </Animated.View>
    </GestureDetector>
  );
};
