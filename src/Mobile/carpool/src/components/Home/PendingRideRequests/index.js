import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {styles} from './index.styles';
import {colors} from '../../../styles';

const PendingRideRequest = ({count, onPress}) =>
  !!count && (
    <TouchableOpacity onPress={onPress} style={styles.topButton}>
      <Text style={styles.count}>{`${count} pending ride request${
        count > 1 ? 's' : ''
      }`}</Text>
      <MaterialIcon name="add-location" color={colors.green} size={32} />
    </TouchableOpacity>
  );

export default PendingRideRequest;
