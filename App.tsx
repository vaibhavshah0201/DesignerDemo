import {useEffect, useState} from 'react';
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
import {
  AnimatedTextInput,
  TextInputToolBar,
} from './src/components/designer/TextInput';
import {AdvanceFilters} from './src/screen/AdvanceFilters';
const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [showShapes, setShowShapes] = useState(false);
  const [showTextTools, setShowTextTools] = useState(false);
  const [selectedObject, setSelectedObject] = useState(1);
  const [selectedHistoryObject, setSelectedHistoryObject] = useState(selectedObject);
  const [bgColor, setBgColor] = useState('white');
  const [text, setText] = useState<any>([]);

  const [historyData, setHistoryData] = useState<any>([]);
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
      config:{
        translateX:0,
        translateY:0,
        scale:1,
        scaleX:1,
        scaleY:1,
        rotation:0,
      }
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
      config:{
        translateX:0,
        translateY:0,
        scale:1,
        scaleX:1,
        scaleY:1,
        rotation:0,
      }
    };
    setSelectedObject(data.length + 1);
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
      config:{
        translateX:0,
        translateY:0,
        scale:1,
        scaleX:1,
        scaleY:1,
        rotation:0,
      }
    };
    setSelectedObject(data.length + 1);
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
      config:{
        translateX:0,
        translateY:0,
        scale:1,
        scaleX:1,
        scaleY:1,
        rotation:0,
      }
    };
    setSelectedObject(data.length + 1);
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
      indexPosition: data.length + 1,
      addOns: {
        bold: false,
        italic: false,
        underline: false,
        fontSize: 16,
        fontStyle: 'arial',
      },
    };
    setText([...text, {[data.length + 1]: 'Type here'}]);
    setData([...data, newDataItem]);
  };

  const updateTextInputStyle = (type: string) => {
    if (data) {
      const newUpdatedData: any = [];
      data.forEach((row: any) => {
        if (type == 'bold') {
          const newDataItem = {
            ...row,
            addOns: {...row.addOns, bold: true},
          };
          newUpdatedData.push(newDataItem);
        }

        if (type == 'italic') {
          const newDataItem = {
            ...row,
            addOns: {...row.addOns, italic: true},
          };
          newUpdatedData.push(newDataItem);
        }

        if (type == 'underline') {
          const newDataItem = {
            ...row,
            addOns: {...row.addOns, underline: true},
          };
          newUpdatedData.push(newDataItem);
        }
      });
      setData(newUpdatedData);
    }
  };

  const handleImagePress = (imageId: any) => {
    setSelectedObject(imageId);
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
      const currentImage = findElementById(selectedObject);
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
      const currentImage = findElementById(selectedObject);
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
        item.id === selectedObject && item.tool == 'image'
          ? {...item, isFlipHorizontally: !item.isFlipHorizontally}
          : item,
      ),
    );
  };

  const flipVertically = () => {
    setData((prevData: any) =>
      prevData.map((item: any) =>
        item.id === selectedObject && item.tool == 'image'
          ? {...item, isFlipVertically: !item.isFlipVertically}
          : item,
      ),
    );
  };

  const duplicateCurrentSelection = () => {
    const currentImage = findElementById(selectedObject);
    const oldUpdatedData = resetSelectionFlag();
    const newDataItem = {
      ...currentImage,
      id: data.length + 1,
      indexPosition: data.length + 1,
      config:{
        ...currentImage.config,
        translateX:(currentImage.config.translateX > 0) ? currentImage.config.translateX - 10 : currentImage.config.translateX + 10,
        translateY:(currentImage.config.translateY > 0) ? currentImage.config.translateY - 10 : currentImage.config.translateY + 10,
      }
    };
    setSelectedObject(data.length + 1);
    setData([...oldUpdatedData, newDataItem]);
  };

  const deleteCurrentSelection = () => {
    setData((prevData: any) =>
      prevData.filter((item: any) => item.id !== selectedObject),
    );
    setSelectedObject(0);
    
  };

  const onSelectColor = ({hex}: any) => {
    setBgColor(hex);
  };

  const setConfigValue = (config: any,configKey:string) => {
    if(configKey=='drag'){
      setData((prevData: any) =>
        prevData.map((item: any) =>
          item.id === selectedObject ? {...item,config:{...item.config,translateX: config.translateX,translateY: config.translateY}} : item,
        ),
      );
    }else if(configKey=='zoom'){
      setData((prevData: any) =>
        prevData.map((item: any) =>
          item.id === selectedObject ? {...item,config:{...item.config,scale: config.scale}} : item,
        ),
      );
    }else if(configKey=='rotate'){
      setData((prevData: any) =>
        prevData.map((item: any) =>
          item.id === selectedObject ? {...item,config:{...item.config,rotation: config.rotation}} : item,
        ),
      );
    }
  };

  useEffect(() => {
    // const currentImage = findElementById(selectedObject);
    // console.log('==============currentImage====================');
    // console.log(currentImage);
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
            {data.map((object: any, index: any) => {
              if (object.tool == 'image')
                return (
                  <Pressable
                    onPress={() => handleImagePress(object.id)}
                    key={object.id}
                    style={{zIndex: object.indexPosition}}>
                    <AnimatedImage
                      imageId={object.id}
                      handleImagePress={handleImagePress}
                      path={object.source}
                      isSelected={object.id == selectedObject ? true : false}
                      isFlipHorizontally={object.isFlipHorizontally}
                      isFlipVertically={object.isFlipVertically}
                      config={object.config}
                      setConfigValue={setConfigValue}
                    />
                  </Pressable>
                );

              if (object.tool == 'shape') {
                if (object.type == 'circle') {
                  return (
                    <Pressable
                      onPress={() => handleImagePress(object.id)}
                      key={object.id}
                      style={{zIndex: object.indexPosition}}>
                      <CircleShape
                        imageId={object.id}
                        handleImagePress={handleImagePress}
                        path={object.source}
                        isSelected={object.id == selectedObject ? true : false}
                      />
                    </Pressable>
                  );
                }

                if (object.type == 'rectangle') {
                  return (
                    <Pressable
                      onPress={() => handleImagePress(object.id)}
                      key={object.id}
                      style={{zIndex: object.indexPosition}}>
                      <RectangleShape
                        imageId={object.id}
                        handleImagePress={handleImagePress}
                        path={object.source}
                        isSelected={object.id == selectedObject ? true : false}
                      />
                    </Pressable>
                  );
                }
              }

              if (object.tool == 'text') {
                return (
                  <Pressable key={object.id} style={{zIndex: object.indexPosition}}>
                    <AnimatedTextInput
                      text={text[object.id]}
                      setText={(newText: string) => {
                        // Define a function that updates the text for the specific id
                        const newTextArray = [...text];
                        newTextArray[object.id] = newText;
                        setText(newTextArray);
                      }}
                      isBold={object.addOns.bold}
                      isItalic={object.addOns.italic}
                      isUnderline={object.addOns.underline}
                      fontFamily={'arial'}
                      color={'red'}
                    />
                  </Pressable>
                );
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
        addTextInputToData={addTextInputToData}
      />
      <AdvanceFilters
        showShapes={showShapes}
        showModal={showModal}
        sendSelectedImageToFront={sendSelectedImageToFront}
        sendSelectedImageToBack={sendSelectedImageToBack}
        flipHorizontal={flipHorizontal}
        flipVertically={flipVertically}
        duplicateCurrentSelection={duplicateCurrentSelection}
        deleteCurrentSelection={deleteCurrentSelection}
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
        addTextInputToData={addTextInputToData}
        updateTextInputStyle={updateTextInputStyle}
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
    position: 'absolute',
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
