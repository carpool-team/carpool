import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {styles} from './index.styles';

const StandardInput = ({placeholder, error, wrapperStyle, ...rest}) => (
  <View style={wrapperStyle}>
    <Text style={styles.placeholder}>{placeholder}</Text>
    <TextInput style={[styles.input, rest.style]} {...rest} />
    {error && <Text style={styles.error}>{error}</Text>}
  </View>
);

export default StandardInput;
