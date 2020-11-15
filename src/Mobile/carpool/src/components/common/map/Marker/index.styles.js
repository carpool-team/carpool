import {StyleSheet} from 'react-native';

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

export default styles;
