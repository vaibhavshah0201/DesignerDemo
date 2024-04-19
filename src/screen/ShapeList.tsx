import {Button, Image, Pressable, Text, View} from 'react-native';

export const ShapeList = (props: any) => {
  return (
    <View
      style={{
        height: 100,
        width: '100%',
        display: props.showShapes ? 'flex' : 'none',
        position: 'absolute',
        bottom: 0,
        marginBottom: '25%',
      }}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}>
        <Button title="Close" onPress={() => props.setShowShapes(false)} />
        <Text style={{fontSize: 20, fontWeight: '600'}}>Shape</Text>
        <Button title="Apply" onPress={() => props.setShowShapes(false)} />
      </View>

      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          width: 300,
          height: 100,
        }}>
        <Pressable
          style={{width: 100, height: 100, marginLeft: 25}}
          onPress={props.addRectangleShapeToData}>
          <Image
            style={{resizeMode: 'contain', width: '75%', height: '75%'}}
            source={require('../../assets/icons/ic_rectangle.png')}
          />
        </Pressable>
        <Pressable
          style={{width: 100, height: 100}}
          onPress={props.addCricleShapeToData}>
          <Image
            style={{resizeMode: 'contain', width: '75%', height: '75%'}}
            source={require('../../assets/icons/ic_circle.png')}
          />
        </Pressable>
      </View>
    </View>
  );
};
