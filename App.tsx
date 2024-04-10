import {useEffect, useState, useRef} from 'react';
import {
  PixelRatio,
  Pressable,
  View,
  ImageBackground,
  StyleSheet,
  Text,
  Image,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {AnimatedImage} from './src/components/designer/AnimatedImage';
import {Colorpicker} from './src/components/ColorPicker/ColorPicker';
import {ShapeList} from './src/screen/ShapeList';
import {ToolList} from './src/screen/ToolList';
import {CircleShape} from './src/components/designer/Shapes/Circle';
import {RectangleShape} from './src/components/designer/Shapes/Rectangle';
import {EditorView} from './src/components/designer/Editor';
import {
  AnimatedTextInput,
  TextInputToolBar,
} from './src/components/designer/TextInput';
import {AdvanceFilters} from './src/screen/AdvanceFilters';
const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [showShapes, setShowShapes] = useState(false);
  const [showTextTools, setShowTextTools] = useState(false);
  const [selectedImage, setSelectedImage] = useState(1);
  const [bgColor, setBgColor] = useState('white');
  const textInput = useRef();
  const [text, setText] = useState('Type here');

  const [data, setData] = useState<any>([
    {
      id: 1,
      tool: 'image',
      isSelected: true,
      indexPosition: 1,
      isFlipHorizontally: false,
      isFlipVertically: false,
      source:
        'https://images.pexels.com/photos/734353/pexels-photo-734353.jpeg',
    },
  ]);

  const addImageToData = () => {
    const oldUpdatedData = resetSelectionFlag();
    const newDataItem = {
      id: data.length + 1,
      indexPosition: data.length + 1,
      tool: 'image',
      isSelected: true,
      isFlipHorizontally: false,
      isFlipVertically: false,
      source: 'https://source.unsplash.com/random/1024x768', // Replace with your new image URL
    };
    setSelectedImage(data.length + 1);
    setData([...oldUpdatedData, newDataItem]);
  };

  const addCricleShapeToData = () => {
    const oldUpdatedData = resetSelectionFlag();
    const newDataItem = {
      id: data.length + 1,
      indexPosition: data.length + 1,
      tool: 'shape',
      type: 'circle',
      isSelected: true,
      source: '', // Replace with your new image URL
    };
    setSelectedImage(data.length + 1);
    setData([...oldUpdatedData, newDataItem]);
  };

  const addRectangleShapeToData = () => {
    const oldUpdatedData = resetSelectionFlag();
    const newDataItem = {
      id: data.length + 1,
      indexPosition: data.length + 1,
      tool: 'shape',
      type: 'rectangle',
      isSelected: true,
      source: '', // Replace with your new image URL
    };
    setSelectedImage(data.length + 1);
    setData([...oldUpdatedData, newDataItem]);
  };

  const resetSelectionFlag = () => {
    const newUpdatedData: any = [];
    if (data) {
      data.forEach((row: any) => {
        const newDataItem = {
          ...row,
          isSelected: false,
        };
        newUpdatedData.push(newDataItem);
      });
    }
    return newUpdatedData;
  };
  const addTextInputToData = () => {
    const newDataItem = {
      id: data.length + 1,
      tool: 'text',
      isSelected: true,
      addOns: {
        bold: false,
        italic: false,
        underline: false,
        fontSize: 16,
        fontStyle: 'arial',
      },
    };
    setData([...data, newDataItem]);
  };

  const handleImagePress = (imageId: any) => {
    setSelectedImage(imageId);
    if (data) {
      const newUpdatedData: any = [];
      data.forEach((row: any) => {
        const newDataItem = {
          ...row,
          isSelected: row.id == imageId ? true : false,
        };
        newUpdatedData.push(newDataItem);
      });
      setData(newUpdatedData);
    }
  };

  const updateIndexPosition = (id: any, newIndexPosition: any) => {
    setData((prevData: any) =>
      prevData.map((item: any) =>
        item.id === id ? {...item, indexPosition: newIndexPosition} : item,
      ),
    );
  };

  const findElementById = (id: any) => {
    return data.find((item: any) => item.id === id);
  };

  const findNextElementByIndexPosition = (position: any) => {
    // Sort the data array by indexPosition
    const newData = [...data];
    const sortedData = newData.sort(
      (a, b) => a.indexPosition - b.indexPosition,
    );
    const currentIndex = sortedData.findIndex(
      item => item.indexPosition === position,
    );
    if (currentIndex !== -1 && currentIndex < sortedData.length - 1) {
      return sortedData[currentIndex + 1]; // Return the next element
    } else {
      return null; // Return null if there is no next element
    }
  };

  const findPreviousElementByIndexPosition = (position: any) => {
    // Sort the data array by indexPosition
    const newData = [...data];
    const sortedData = newData.sort(
      (a, b) => a.indexPosition - b.indexPosition,
    );
    const currentIndex = sortedData.findIndex(
      item => item.indexPosition === position,
    );
    if (currentIndex > 0 && currentIndex < sortedData.length) {
      return sortedData[currentIndex - 1]; // Return the previous element
    } else {
      return null; // Return null if there is no previous element
    }
  };

  const sendSelectedImageToFront = () => {
    if (data.length > 1) {
      const currentImage = findElementById(selectedImage);
      const nextImage = findNextElementByIndexPosition(
        currentImage?.indexPosition,
      );
      if (nextImage != null) {
        updateIndexPosition(currentImage?.id, nextImage.indexPosition);
        updateIndexPosition(nextImage?.id, currentImage?.indexPosition);
      }
    }
  };

  const sendSelectedImageToBack = () => {
    if (data.length > 1) {
      const currentImage = findElementById(selectedImage);
      const previousImage = findPreviousElementByIndexPosition(
        currentImage?.indexPosition,
      );
      if (previousImage != null) {
        updateIndexPosition(currentImage?.id, previousImage.indexPosition);
        updateIndexPosition(previousImage?.id, currentImage?.indexPosition);
      }
    }
  };

  const flipHorizontal = () => {
    setData((prevData: any) =>
      prevData.map((item: any) =>
        item.id === selectedImage && item.tool == 'image'
          ? {...item, isFlipHorizontally: !item.isFlipHorizontally}
          : item,
      ),
    );
  };

  const flipVertically = () => {
    setData((prevData: any) =>
      prevData.map((item: any) =>
        item.id === selectedImage && item.tool == 'image'
          ? {...item, isFlipVertically: !item.isFlipVertically}
          : item,
      ),
    );
  };

  const duplicateCurrentSelection = () => {
    const currentImage = findElementById(selectedImage);
    const oldUpdatedData = resetSelectionFlag();
    const newDataItem = {
      ...currentImage,
      id: data.length + 1,
      indexPosition: data.length + 1,
    };
    setSelectedImage(data.length + 1);
    setData([...oldUpdatedData, newDataItem]);
  };

  const onSelectColor = ({hex}: any) => {
    setBgColor(hex);
  };

  useEffect(() => {
    // console.log('================data====================');
    // console.log(data);
    // console.log('====================================');
  }, [data]);

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
          resizeMode="contain"
          style={[styles.canvasStyle, {backgroundColor: bgColor}]}>
          <GestureHandlerRootView style={{width: '100%', height: '100%'}}>
            {data.map((image: any, index: any) => {
              if (image.tool == 'image')
                return (
                  <Pressable
                    onPress={() => handleImagePress(image.id)}
                    key={index}
                    style={{zIndex: image.indexPosition}}>
                    <AnimatedImage
                      imageId={image.id}
                      handleImagePress={handleImagePress}
                      path={image.source}
                      isSelected={image.id == selectedImage ? true : false}
                      isFlipHorizontally={image.isFlipHorizontally}
                      isFlipVertically={image.isFlipVertically}
                    />
                  </Pressable>
                );

              if (image.tool == 'shape') {
                if (image.type == 'circle') {
                  return (
                    <Pressable
                      onPress={() => handleImagePress(image.id)}
                      key={index}
                      style={{zIndex: image.indexPosition}}>
                      <CircleShape
                        imageId={image.id}
                        handleImagePress={handleImagePress}
                        path={image.source}
                        isSelected={image.id == selectedImage ? true : false}
                      />
                    </Pressable>
                  );
                }

                if (image.type == 'rectangle') {
                  return (
                    <Pressable
                      onPress={() => handleImagePress(image.id)}
                      key={index}
                      style={{zIndex: image.indexPosition}}>
                      <RectangleShape
                        imageId={image.id}
                        handleImagePress={handleImagePress}
                        path={image.source}
                        isSelected={image.id == selectedImage ? true : false}
                      />
                    </Pressable>
                  );
                }

                if (image.type == 'text') {
                  return (
                    <AnimatedTextInput
                      text={text}
                      setText={setText}
                      isBold={image.addOns.bold ? 'bolder' : '100'}
                      fontFamily={'arial'}
                      color={'red'}
                    />
                  );
                }
              }
            })}
            {/* <EditorView /> */}
          </GestureHandlerRootView>
        </ImageBackground>
      </Pressable>

      <ToolList
        setShowModal={setShowModal}
        showModal={showModal}
        showShapes={showShapes}
        setShowShapes={setShowShapes}
        addImageToData={addImageToData}
        showTextTools={showTextTools}
        setShowTextTools={setShowTextTools}
      />
      <AdvanceFilters
        showShapes={showShapes}
        showModal={showModal}
        sendSelectedImageToFront={sendSelectedImageToFront}
        sendSelectedImageToBack={sendSelectedImageToBack}
        flipHorizontal={flipHorizontal}
        flipVertically={flipVertically}
        duplicateCurrentSelection={duplicateCurrentSelection}
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
      <TextInputToolBar
        setShowTextTools={setShowTextTools}
        showTextTools={showTextTools}
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
    backgroundColor: 'red',
    padding: 0,
    position: 'relative',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: 652.7500162173914 / PixelRatio.get(),
    width: 1119 / PixelRatio.get(),
    resizeMode: 'contain',
  },
});
