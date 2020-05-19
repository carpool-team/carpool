import React from 'react';
import {View} from 'react-native';
import {colors} from '../../styles';

const BlueMarker = ({size, style}) => {
  const bigCircleStyle = {
    width: size,
    height: size,
    borderRadius: size,
    backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
    ...style,
  };
  const smallCircleStyle = {
    width: size / 1.5,
    height: size / 1.5,
    borderRadius: size / 2,
    borderWidth: 0.1 * size,
    borderColor: '#fff',
  };

  return (
    <View style={bigCircleStyle}>
      <View style={smallCircleStyle}></View>
    </View>
  );
};

export default BlueMarker;
