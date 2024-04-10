import {useState} from 'react';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

// const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
export const AnimatedTextInput = (props: any) => {
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
      // height: 100,
      // width: 100,

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
      <Animated.View
        style={[
          animatedStyles,
          {
            flexDirection: 'row',
            borderStyle: 'dotted',
            borderWidth: 2,
            // backgroundColor: 'green',
            // height: 'auto',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            // width: '100%'
          },
        ]}>
        {/* <View style={{borderColor: 'black',  height: 'auto'}}> */}
        <TextInput
          style={[
            styles.textInput,
            {
              fontSize: props.fontSize,
              color: props.color,
              fontFamily: props.fontFamily,
              fontStyle: props.isItalic,
              fontWeight: props.isBold,
            },
          ]}
          value={props.text}
          onChangeText={props.setText}
          multiline={false} // Allow for multiple lines of text
        />
        {/* </View> */}
      </Animated.View>

      {/* <AnimatedTextInput style={animatedStyles}/> */}
      {/* <Animated.Text style={animatedStyles}>TEst</Animated.Text> */}
    </GestureDetector>
  );
};

export const TextInputToolBar = (props: any) => {
  return (
    <>
      <View
        style={{
          height: 100,
          width: '100%',
          display: props.showTextTools ? 'flex' : 'none',
          position: 'absolute',
          bottom: 0,
          marginBottom: '25%',
        }}>
        <Button title="Close" onPress={() => props.setShowTextTools(false)} />
        <View
          style={{
            flexDirection: 'row',
            height: 100,
            justifyContent: 'space-evenly',
          }}>
          <Pressable style={{height: '40%', width: '10%'}}>
            <Image
              style={{height: '100%', width: '100%'}}
              source={require('../../../assets/icons/format_bold.png')}
            />
          </Pressable>
          <Pressable style={{height: '40%', width: '10%'}}>
            <Image
              style={{height: '100%', width: '100%'}}
              source={require('../../../assets/icons/format_italic.png')}
            />
          </Pressable>
          <Pressable style={{height: '40%', width: '10%'}}>
            <Image
              style={{height: '100%', width: '100%'}}
              source={require('../../../assets/icons/format_underline.png')}
            />
          </Pressable>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute', // Allow absolute positioning for dragging
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  textInput: {
    flex: 1,
    paddingVertical: 5,
    fontSize: 16,
    color: 'black',
    fontFamily: 'sans-serif',
  },
  rotateHandle: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 20,
    height: 20,
    backgroundColor: 'lightblue',
    borderRadius: 10,
  },
});
