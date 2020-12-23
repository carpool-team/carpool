import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../../styles';
import {styles} from './index.styles';

const WeekPicker = ({onDecrement, onIncrement, dateRange, offset}) => (
  <View style={styles.container}>
    <View style={styles.flexLeft}>
      {offset > -1 && (
        <TouchableOpacity onPress={onDecrement}>
          <Icon
            name="angle-left"
            color={colors.blue}
            size={35}
            style={styles.icon}
          />
        </TouchableOpacity>
      )}
    </View>
    {offset > -1 ? (
      <Text style={styles.dateRange}>{dateRange}</Text>
    ) : (
      <Text style={styles.pastRides}>Past rides</Text>
    )}
    <View style={styles.flexRight}>
      <TouchableOpacity onPress={onIncrement}>
        <Icon
          name="angle-right"
          color={colors.blue}
          size={35}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  </View>
);

export default WeekPicker;
