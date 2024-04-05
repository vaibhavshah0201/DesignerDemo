import React, {useState} from 'react';
import {Button, Modal, StyleSheet, View} from 'react-native';

import ColorPicker, {
  Panel1,
  Swatches,
  Preview,
  OpacitySlider,
  HueSlider,
  Panel2,
  Panel3,
  Panel4,
  Panel5,
} from 'reanimated-color-picker';

export const Colorpicker = (props: any) => {
  return (
    <>
      <Button title="Close" onPress={() => props.setShowModal(false)} />
      <ColorPicker
        value="red"
        onComplete={props.onSelectColor}
        style={{width: '100%', height: '100%'}}>
        {/* <Preview /> */}
        <Panel2 />
        {/* <HueSlider /> */}
        <OpacitySlider />
        <Swatches />
      </ColorPicker>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
  },
});
