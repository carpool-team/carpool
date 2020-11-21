import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../../styles';
import {styles} from './index.styles';

const WeekPicker = ({onDecrement, onIncrement, dateRange, offset}) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onDecrement} disabled={offset === 0}>
      <Icon
        name="angle-left"
        color={offset === 0 ? colors.gray : colors.blue}
        size={35}
        style={styles.icon}
      />
    </TouchableOpacity>
    <Text style={styles.dateRange}>{dateRange}</Text>
    <TouchableOpacity onPress={onIncrement}>
      <Icon
        name="angle-right"
        color={colors.blue}
        size={35}
        style={styles.icon}
      />
    </TouchableOpacity>
  </View>
);

export default WeekPicker;
