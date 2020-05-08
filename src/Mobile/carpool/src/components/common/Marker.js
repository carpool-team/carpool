import React from 'react';
import {View, StyleSheet} from 'react-native';
import {colors} from '../../styles';

const Marker = ({size = 100, color = colors.grayDark, children, style}) => {
  const bigCircleStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: color,
  };
  const smallCircleStyle = {
    width: 0.8 * size,
    height: 0.8 * size,
    borderRadius: 0.5 * size,
  };
  const triangleStyle = {
    borderLeftWidth: 0.46 * size,
    borderRightWidth: 0.46 * size,
    borderTopWidth: size,
    borderTopColor: color,
    marginTop: -0.3 * size,
  };

  return (
    <View style={{alignItems: 'center', ...style}}>
      <View style={[styles.bigCircle, bigCircleStyle]}>
        <View style={[styles.smallCircle, smallCircleStyle]}>{children}</View>
      </View>
      <View style={[styles.triangle, triangleStyle]}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  bigCircle: {
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallCircle: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  triangle: {
    width: 0,
    height: 0,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
});

export default Marker;
