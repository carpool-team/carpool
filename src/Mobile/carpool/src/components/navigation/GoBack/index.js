import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {styles} from './index.styles';

const GoBack = ({onPress, style}) => (
  <TouchableOpacity style={style} onPress={onPress}>
    <Text style={styles.text}>Go back</Text>
  </TouchableOpacity>
);

export default GoBack;
