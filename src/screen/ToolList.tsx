import {Image, Pressable, StyleSheet, View} from 'react-native';

export const ToolList = (props: any) => {
  const handleTextInput = () => {
    props.setShowTextTools(true);
    props.addTextInputToData();
  };

  return (
    <View
      style={[
        styles.toolBoxContainer,
        {
          display:
            !props.showModal && !props.showShapes && !props.showTextTools
              ? 'flex'
              : 'none',
        },
      ]}>
      <Pressable style={styles.toolContainer} onPress={handleTextInput}>
        <Image
          style={styles.toolImage}
          source={require('../../assets/icons/add_text.png')}
        />
      </Pressable>
      <Pressable style={styles.toolContainer} onPress={props.addImageToData}>
        <Image
          style={styles.toolImage}
          source={require('../../assets/icons/add_image.png')}
        />
      </Pressable>
      <Pressable
        style={[styles.toolContainer, {height: '70%'}]}
        onPress={() => props.setShowShapes(true)}>
        <Image
          style={[styles.toolImage, {width: '100%', resizeMode: 'stretch'}]}
          source={require('../../assets/icons/add_shapes.png')}
        />
      </Pressable>
      <Pressable
        style={styles.toolContainer}
        onPress={() => props.setShowModal(true)}>
        <Image
          style={styles.toolImage}
          source={require('../../assets/icons/add_background.png')}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  toolBoxContainer: {
    position: 'absolute',
    alignItems: 'center',
    marginBottom: '25%',
    bottom: 0,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    width: '100%',
    height: '8%',
  },
  toolContainer: {width: '20%', height: '80%'},
  toolImage: {width: '100%', height: '100%', resizeMode: 'contain'},
});
