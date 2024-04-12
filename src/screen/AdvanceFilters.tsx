import {Image, Pressable, Text, View} from 'react-native';

export const AdvanceFilters = (props: any) => {
  return (
    <View
      style={{
        height: '5%',
        width: '100%',
        marginTop: '80%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        // backgroundColor:'red',
        display: !props.showShapes && !props.showModal ? 'flex' : 'none',
      }}>
      <Pressable
        onPress={props.sendSelectedImageToFront}
        style={{width: 50, height: 50, alignItems: 'center'}}>
        <Image
          style={{resizeMode: 'contain', width: '60%', height: '60%'}}
          source={require('../../assets/icons/sendFront.png')}
        />
        <Text>Send Front</Text>
      </Pressable>

      <Pressable
        onPress={props.sendSelectedImageToBack}
        style={{width: 50, height: 50, alignItems: 'center'}}>
        <Image
          style={{resizeMode: 'contain', width: '60%', height: '60%'}}
          source={require('../../assets/icons/sendBack.png')}
        />
        <Text>Send Back</Text>
      </Pressable>

      <Pressable
        onPress={() => props.flipHorizontal()}
        style={{width: 50, height: 50, alignItems: 'center'}}>
        <Image
          style={{resizeMode: 'contain', width: '60%', height: '60%'}}
          source={require('../../assets/icons/flip.png')}
        />
        <Text>FlipX</Text>
      </Pressable>

      <Pressable
        onPress={() => props.flipVertically()}
        style={{width: 50, height: 50, alignItems: 'center'}}>
        <Image
          style={{resizeMode: 'contain', width: '60%', height: '60%'}}
          source={require('../../assets/icons/flip_vertical.jpg')}
        />
        <Text>FlipY</Text>
      </Pressable>

      <Pressable
        onPress={() => props.duplicateCurrentSelection()}
        style={{width: 60, height: 50, alignItems: 'center'}}>
        <Image
          style={{resizeMode: 'contain', width: '60%', height: '60%'}}
          source={require('../../assets/icons/duplicate.png')}
        />
        <Text>Duplicate</Text>
      </Pressable>

      <Pressable
        style={{width: 60, height: 50, alignItems: 'center'}}
        onPress={props.deleteCurrentSelection}>
        <Image
          style={{resizeMode: 'contain', width: '60%', height: '60%'}}
          source={require('../../assets/icons/delete.png')}
        />
        <Text>Delete</Text>
      </Pressable>
    </View>
  );
};
