import React from 'react';
import {View} from 'react-native';
import colors from '../../styles/colors';

const BlueMarker = ({size, style}) => {
  const bigCircleStyle = {
    width: size,
    height: size,
    borderRadius: size,
    borderWidth: 0.125 * size,
    borderColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
    ...style,
  };
  const smallCircleStyle = {
    width: size / 2,
    height: size / 2,
    borderRadius: size / 2,
    backgroundColor: colors.blue,
  };

  return (
    <View style={bigCircleStyle}>
      <View style={smallCircleStyle}></View>
    </View>
  );
};

export default BlueMarker;
