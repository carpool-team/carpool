import React from 'react';
import {View, Text} from 'react-native';
import {UpView} from '../../common';
import {sheet} from '../../../styles';
import {getColor} from '../../../utils/getColor';
import {styles} from './index.style';
import {getLeavingIn} from './utils';

const DriverInfo = ({ride, distance, style, onPress}) =>
  ride ? (
    <UpView
      style={{
        ...styles.upview,
        ...style,
      }}
      borderRadius={16}
      onPress={onPress}
      contentContainerStyle={styles.contentContainer}>
      <View style={sheet.rowCenterSplit}>
        <Text style={styles.username} numberOfLines={1}>
          {`${ride.owner.firstName} ${ride.owner.lastName}`}
        </Text>
        <Text style={styles.distance}>{distance}</Text>
      </View>
      <Text style={[styles.leavingIn, {color: getColor(ride.date)}]}>
        {getLeavingIn(ride.date)}
      </Text>
    </UpView>
  ) : null;

export default DriverInfo;
