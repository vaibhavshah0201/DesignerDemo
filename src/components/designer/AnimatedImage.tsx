import {useEffect, useState} from 'react';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  runOnJS
} from 'react-native-reanimated';
import {Image} from 'react-native';

export const AnimatedImage = (props: any) => {  
  const offset = useSharedValue({
    x: props.config.translateX,
    y: props.config.translateY,
  });

  const position = useSharedValue({
    x: props.config.translateX,
    y: props.config.translateY,
  });
  
  const scale = useSharedValue(props.config.scale);
  const savedScale = useSharedValue(props.config.scale);
  const rotation = useSharedValue(props.config.rotation);
  const savedRotation = useSharedValue(props.config.rotation);

  const animatedStyles = useAnimatedStyle((): any => {    
    return {
      height: 100,
      width: 100,
      borderWidth: (props.isSelected) ? 1 : 0,
      borderColor: 'black',
      borderStyle: 'dashed',
      position:"absolute",
      transform: [
        {translateX: !isNaN(offset.value.x) ? offset.value.x : 0},
        {translateY: !isNaN(offset.value.y) ? offset.value.y : 0},
        {scale: scale.value},
        {scaleX: props.isFlipHorizontally ? -1 : 1 },
        {scaleY: props.isFlipVertically ? -1 : 1 },
        {rotateZ: `${rotation.value}rad`},
      ],
    };
  });

  const setConfigValue = (config: any,configKey:string) => {
    props.setConfigValue(config,configKey);
  };
  
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
      
      props.config.translateX = offset.value.x;
      props.config.translateY = offset.value.y;
      runOnJS(setConfigValue)(props.config,'drag');
    });
    

  const zoomGesture = Gesture.Pinch()
    .onUpdate(event => {
      scale.value = savedScale.value * event.scale;
    })
    .onEnd(event => {
      savedScale.value = scale.value;
      props.config.scale = scale.value;
      runOnJS(setConfigValue)(props.config,'zoom');
    });

  const rotateGesture = Gesture.Rotation()
    .onUpdate(event => {
      rotation.value = savedRotation.value + event.rotation;
    })
    .onEnd(() => {
      savedRotation.value = rotation.value;
      props.config.rotation = rotation.value;
      runOnJS(setConfigValue)(props.config,'rotate');
    });

  const tapStart = Gesture.Tap().onStart(() => {
    props.handleImagePress;
    // console.log('============props.config========================');
    // console.log(offset.value);
    // console.log('====================================');
  });

  const composed = Gesture.Simultaneous(
    Gesture.Simultaneous(zoomGesture, rotateGesture),
    dragGesture,
    tapStart,
  );
  const gestureComposed = (props.isSelected) ? composed : tapStart;
  
  // useEffect(()=>{
  //   // props.setConfig(props.config);
  //   console.log('============props.config========================');
  //   console.log(props.config);
  //   console.log('====================================');
  // },[offsetX.value])
  
  return (
    <GestureDetector gesture={gestureComposed}>
      <Animated.View
        style={[
          animatedStyles,
        ]}
        >
        <Image style={{width: "100%",height:"100%"}}
        source={{
          uri: props.path,
        }}/>
      </Animated.View>
    </GestureDetector>
  );
};
