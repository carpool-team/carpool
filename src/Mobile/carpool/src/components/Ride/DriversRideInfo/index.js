import React from 'react';
import {View, Text} from 'react-native';
import {UpView} from '../../common';
import {sheet} from '../../../styles';
import {getColor} from '../../../utils/getColor';
import {styles} from './index.styles';
import {getLeavingIn} from './utils';

const DriversRideInfo = ({ride, style, onPress}) =>
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
        <Text style={styles.regularRide} numberOfLines={1}>
          Regular ride
        </Text>
      </View>
      <Text style={[styles.leavingIn, {color: getColor(ride.date)}]}>
        {getLeavingIn(ride.rideDate)}
      </Text>
    </UpView>
  ) : null;

export default DriversRideInfo;
