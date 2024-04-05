import {useState} from 'react';
import {
  PixelRatio,
  Pressable,
  View,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {AnimatedImage} from './src/components/designer/AnimatedImage';
import {Colorpicker} from './src/components/ColorPicker/ColorPicker';
import {ShapeList} from './src/screen/ShapeList';
import {ToolList} from './src/screen/ToolList';
import {CircleShape} from './src/components/designer/Shapes/Circle';
import {RectangleShape} from './src/components/designer/Shapes/Rectangle';
const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [showShapes, setShowShapes] = useState(false);
  const [selectedImage, setSelectedImage] = useState(1);
  const [bgColor, setBgColor] = useState('white');

  const [data, setData] = useState([
    {
      id: 1,
      tool: 'image',
      source:
        'https://images.pexels.com/photos/734353/pexels-photo-734353.jpeg',
    },
    // {
    //   id: 2,
    //   tool: 'image',
    //   source: 'https://source.unsplash.com/random/1024x768',
    // },
  ]);

  const addImageToData = () => {
    const newDataItem = {
      id: data.length + 1,
      tool: 'image',
      source: 'https://source.unsplash.com/random/1024x768', // Replace with your new image URL
    };
    setData([...data, newDataItem]);
  };

  const addCricleShapeToData = () => {
    const newDataItem = {
      id: data.length + 1,
      tool: 'shape',
      type: 'circle',
      source: '', // Replace with your new image URL
    };
    setData([...data, newDataItem]);
  };

  const addRectangleShapeToData = () => {
    const newDataItem = {
      id: data.length + 1,
      tool: 'shape',
      type: 'rectangle',
      source: '', // Replace with your new image URL
    };
    setData([...data, newDataItem]);
  };

  const handleImagePress = (imageId: any) => {
    setSelectedImage(imageId);
  };

  const onSelectColor = ({hex}: any) => {
    setBgColor(hex);
  };

  return (
    <View style={styles.container}>
      {/* Main canvas of designer screen */}
      <Pressable
        style={{
          overflow: 'hidden',
          justifyContent: 'center',
          marginTop: '25%',
          margin: 30 / PixelRatio.get(),
        }}>
        <ImageBackground
          source={{
            uri: 'https://m.gotprint.com/pogAppAdmin/files/view/businesscard_2x3_5in_editor.png?productId=1&sizeId=101',
          }}
          style={[styles.canvasStyle, {backgroundColor: bgColor}]}>
          <GestureHandlerRootView style={{width: '100%', height: '100%'}}>
            {data.map((image: any, index: any) => {
              if (image.tool == 'image')
                return (
                  <Pressable
                    onPress={() => handleImagePress(image.id)}
                    // pointerEvents={selectedImage == image.id ? 'auto' : 'box-only'}
                    // style={{zIndex: selectedImage == image.id ? 1 : 0}}
                    key={index}>
                    <AnimatedImage path={image.source} />
                  </Pressable>
                );

              if (image.tool == 'shape') {
                if (image.type == 'circle') {
                  return <CircleShape />;
                }

                if (image.type == 'rectangle') {
                  return <RectangleShape />;
                }
              }
            })}
          </GestureHandlerRootView>
        </ImageBackground>
      </Pressable>

      <ToolList
        setShowModal={setShowModal}
        showModal={showModal}
        showShapes={showShapes}
        setShowShapes={setShowShapes}
        addImageToData={addImageToData}
      />
      <View
        style={{
          height: '50%',
          marginTop: '20%',
          display: showModal ? 'flex' : 'none',
        }}>
        <Colorpicker
          onSelectColor={onSelectColor}
          setShowModal={setShowModal}
          showModal={showModal}
        />
      </View>
      <ShapeList
        showShapes={showShapes}
        setShowShapes={setShowShapes}
        addCricleShapeToData={addCricleShapeToData}
        addRectangleShapeToData={addRectangleShapeToData}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  canvasStyle: {
    overflow: 'hidden',
    padding: 0,
    position: 'relative',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: 652.7500162173914 / PixelRatio.get(),
    width: 1119 / PixelRatio.get(),
  },
});
