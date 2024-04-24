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
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [showShapes, setShowShapes] = useState(false);
  const [showTextTools, setShowTextTools] = useState(false);
  const [selectedObject, setSelectedObject] = useState(1);
  const [historyNumberObject, setHistoryNumberObject] = useState(0);
  const [selectedHistoryObject, setSelectedHistoryObject] =
    useState(
      {[selectedObject]:0}
    );
  
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
        'file:///Users/ravi/Library/Developer/CoreSimulator/Devices/DCF0AE61-7B80-462B-942F-94AE1D54757F/data/Containers/Data/Application/2BEF479F-8D8C-4F78-BA0D-3BA2B9A41720/tmp/2E80BEBA-5FF6-41C9-AFD1-0605AC96D8CC.png',
      config: {
        translateX: 0,
        translateY: 0,
        scale: 1,
        scaleX: 1,
        scaleY: 1,
        rotation: 0,
      },
    },
  ]);

  const addImageToData = (imageUrl:any) => {
    const oldUpdatedData = resetSelectionFlag();
    const newDataItem = {
      id: data.length + 1,
      indexPosition: data.length + 1,
      tool: 'image',
      isSelected: true,
      isFlipHorizontally: false,
      isFlipVertically: false,
      source: imageUrl, // Replace with your new image URL
      config: {
        translateX: 0,
        translateY: 0,
        scale: 1,
        scaleX: 1,
        scaleY: 1,
        rotation: 0,
      },
    };
    setSelectedObject(data.length + 1);
    setData([...oldUpdatedData, newDataItem]);
    setHistoryNumberObject(historyNumberObject+1);
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
      config: {
        translateX: 0,
        translateY: 0,
        scale: 1,
        scaleX: 1,
        scaleY: 1,
        rotation: 0,
      },
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
      config: {
        translateX: 0,
        translateY: 0,
        scale: 1,
        scaleX: 1,
        scaleY: 1,
        rotation: 0,
      },
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
    console.log(sortedData);
    
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
      console.log(currentImage);
      console.log(previousImage);
      
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
    setHistoryNumberObject(historyNumberObject+1);
  };

  const flipVertically = () => {
    setData((prevData: any) =>
      prevData.map((item: any) =>
        item.id === selectedObject && item.tool == 'image'
          ? {...item, isFlipVertically: !item.isFlipVertically}
          : item,
      ),
    );
    setHistoryNumberObject(historyNumberObject+1);
  };

  const duplicateCurrentSelection = () => {
    const currentImage = findElementById(selectedObject);
    const oldUpdatedData = resetSelectionFlag();
    const newDataItem = {
      ...currentImage,
      id: data.length + 1,
      indexPosition: data.length + 1,
      config: {
        ...currentImage.config,
        translateX:
          currentImage.config.translateX > 0
            ? currentImage.config.translateX - 10
            : currentImage.config.translateX + 10,
        translateY:
          currentImage.config.translateY > 0
            ? currentImage.config.translateY - 10
            : currentImage.config.translateY + 10,
      },
    };
    setSelectedObject(data.length + 1);
    setData([...oldUpdatedData, newDataItem]);
    setHistoryNumberObject(historyNumberObject+1);
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

  const setConfigValue = (config: any, configKey: string) => {
    if (configKey == 'drag') {
      setData((prevData: any) =>
        prevData.map((item: any) =>
          item.id === selectedObject
            ? {
                ...item,
                config: {
                  ...item.config,
                  translateX: config.translateX,
                  translateY: config.translateY,
                },
              }
            : item,
        ),
      );
    } else if (configKey == 'zoom') {
      setData((prevData: any) =>
        prevData.map((item: any) =>
          item.id === selectedObject
            ? {...item, config: {...item.config, scale: config.scale}}
            : item,
        ),
      );
    } else if (configKey == 'rotate') {
      setData((prevData: any) =>
        prevData.map((item: any) =>
          item.id === selectedObject
            ? {...item, config: {...item.config, rotation: config.rotation}}
            : item,
        ),
      );
    } else if (configKey == 'history') {      
      setData((prevData: any) =>
        prevData.map((item: any) =>
          item.id === selectedObject
            ? 
            {
              ...config,
              id:item.id,
              indexPosition:item.indexPosition
            }
            : item,
        ),
      );
    }

    if(configKey != 'history'){
      setHistoryNumberObject(historyNumberObject+1);
    }
  };

  const findLatestHistoryItem = (imageId: number) => {
    // Filter historyData array to get items with the specified imageId
    const filteredItems = historyData.filter(
      (item: any) => item.imageId === imageId,
    );

    // If no matching items found, return null
    if (filteredItems.length === 0) {
      return null;
    }

    // Use reduce to find the item with the highest id (which is the latest)
    const latestItem = filteredItems.reduce((prev: any, current: any) => {
      return prev.id > current.id ? prev : current;
    });

    return latestItem;
  };

  const findPreviousHistoryItem = () => {
    // Filter historyData array to get items with the specified imageId
    const filteredItems = historyData.filter(
      (item: any) => item.imageId === selectedObject,
    );

    const currentSelectedHistoryObject = selectedHistoryObject[selectedObject];
    if(currentSelectedHistoryObject == undefined){
      return null;
    }

    const currentIndex = filteredItems.findIndex(
      (item:any) => item.id === currentSelectedHistoryObject,
    );    
    
    if (currentIndex > 0 && currentIndex < filteredItems.length) {
      return filteredItems[currentIndex - 1]; // Return the previous element
    } else {
      return null; // Return null if there is no previous element
    }
  };

  const findNextHistoryItem = () => {
      // Filter historyData array to get items with the specified imageId
      const filteredItems = historyData.filter(
          (item: any) => item.imageId === selectedObject,
      );

      const currentSelectedHistoryObject = selectedHistoryObject[selectedObject];
      if (currentSelectedHistoryObject === undefined) {
          return null;
      }

      const currentIndex = filteredItems.findIndex(
          (item: any) => item.id === currentSelectedHistoryObject,
      );

      if (currentIndex >= 0 && currentIndex < filteredItems.length - 1) {
          return filteredItems[currentIndex + 1]; // Return the next element
      } else {
          return null; // Return null if there is no next element
      }
  };

  const undoCurrentSelection = () => {
    const previousHistoryItem = findPreviousHistoryItem();
    const currentObj = findElementById(selectedObject);
    const historyItem = findLatestHistoryItem(currentObj.id);
    
    if(previousHistoryItem != null){
      updateHistoryState(currentObj.id,previousHistoryItem.id);
      const history = previousHistoryItem.history;
      setConfigValue(history,'history');
    }
  }

  const redoCurrentSelection = () => {
    const nextHistoryItem = findNextHistoryItem();
    const currentObj = findElementById(selectedObject);
    
    if(nextHistoryItem != null){
      updateHistoryState(currentObj.id,nextHistoryItem.id);
      const history = nextHistoryItem.history;
      setConfigValue(history,'history');
    }
  }

  const pushObjectToHistory = (obj: any) => {
    const newDataItem = {
      id: historyData.length + 1,
      imageId: obj.id,
      history: {
        ...obj,
      },
    };
    setHistoryData([...historyData, newDataItem]);
    return newDataItem;
  };

  const compareHistoryJSON = (obj1:any, obj2:any) => {
      // Check if both inputs are objects
      if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
          return false;
      }

      // Get the keys of both objects
      const keys1 = Object.keys(obj1);

      // Iterate through keys of the first object
      for (let key of keys1) {
          // If the second object doesn't have the key or their values are different
          if (!obj2.hasOwnProperty(key) || obj1[key] !== obj2[key]) {
              return true; // Objects are different
          }

          // If both values are objects, recursively compare them
          if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
              if (compareHistoryJSON(obj1[key], obj2[key])) {
                  return true; // Objects are different
              }
          }
      }

      // If no differences found, objects are the same
      return false;
  };

  const setHistoryItem = () => {
    const currentObj = findElementById(selectedObject);
    const historyItem = findLatestHistoryItem(currentObj.id);
    let latestHistoryItem = null;
    if (historyItem == null) {
      latestHistoryItem = pushObjectToHistory(currentObj);
    }else{
      const historyConfig = historyItem.history;
      const isAnyChange = compareHistoryJSON(currentObj,historyConfig);
      if(isAnyChange){
        latestHistoryItem = pushObjectToHistory(currentObj);
      }
    }   
    if(latestHistoryItem != null){
      updateHistoryState(currentObj.id,latestHistoryItem.id);
    }
  }

  const updateHistoryState = (key:any, value:any) => {
    setSelectedHistoryObject((prevState:any) => {
      // If key exists, update its value
      if (prevState.hasOwnProperty(key)) {
        return { ...prevState, [key]: value };
      } else {
        // If key doesn't exist, add new key value pair
        return { ...prevState, [key]: value };
      }
    });
  };

  const openImagePicker = async () => {
    const result = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
    if (result === RESULTS.GRANTED) {
      // Permission is granted, open the image library
      await launchImageLibrary({mediaType:'photo'}, (response:any) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('Image picker error: ', response.error);
        } else {
          let imageUri = response.uri || response.assets?.[0]?.uri;
          addImageToData(imageUri);
        }
      });
    } else {
      const requestResult = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
      if (requestResult === RESULTS.GRANTED) {
        await launchImageLibrary({mediaType:'photo'}, (response:any) => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('Image picker error: ', response.error);
          } else {
            let imageUri = response.uri || response.assets?.[0]?.uri;
            addImageToData(imageUri);
          }
        });
      } else if(requestResult === RESULTS.LIMITED){

      } else {
        console.log('Permission Denied');
        // Alert.alert('Permission Denied', 'You need to grant access to your photo library to continue.');
      }
    }
  };

  useEffect(() => {
    setHistoryItem();    
  },[historyNumberObject]);

  useEffect(() => {
    console.log('================History====================');
    console.log(selectedHistoryObject);
    console.log(historyData);
    console.log('====================================');
  },[historyData])

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
                      selectedHistoryObject={selectedHistoryObject}
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
                const indexToDisplay = text.findIndex((item:any) => item[object.id]);
                return (
                  <Pressable onPress={() => handleImagePress(object.id)} key={object.id} style={{zIndex: object.indexPosition, backgroundColor: 'red'}}>
                    <AnimatedTextInput
                      handleImagePress={handleImagePress}
                      text={text[indexToDisplay][object.id]}
                      setText={(newText: string) => {
                        const indexToUpdate = text.findIndex((item:any) => item[object.id]);
                        if (indexToUpdate !== -1) {
                          const updatedText = [...text];
                          updatedText[indexToUpdate][object.id] = newText;
                          setText(updatedText);
                        }
                      }}
                      isBold={object.addOns.bold}
                      isItalic={object.addOns.italic}
                      isUnderline={object.addOns.underline}
                      fontFamily={'arial'}
                      color={'red'}
                      imageId={object.id}
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
        addImageToData={openImagePicker}
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
        undoCurrentSelection={undoCurrentSelection}
        redoCurrentSelection={redoCurrentSelection}
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
