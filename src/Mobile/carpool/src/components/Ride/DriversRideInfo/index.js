import React from 'react';
import {View, Text} from 'react-native';
import {UpView} from '../../common';
import {sheet, colors} from '../../../styles';
import {CircleButton} from '../../common/buttons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {getColor} from '../../../utils/getColor';
import {styles} from './index.styles';
import {getLeavingIn} from './utils';

const DriversRideInfo = ({ride, style, onPress}) =>
  ride ? (
    <UpView
      style={{
        width: '100%',
        ...style,
      }}
      borderRadius={16}
      onPress={onPress}>
      <View style={styles.upperContainer}>
        <CircleButton
          style={styles.circleButton}
          icon={<Ionicon name="ios-car" color={colors.grayDark} size={44} />}
        />
        <View style={styles.userInfoContainer}>
          <View style={sheet.rowCenterSplit}>
            <Text style={styles.regularRide} numberOfLines={1}>
              Regular ride
            </Text>
          </View>
          <Text style={[styles.leavingIn, {color: getColor(ride.date)}]}>
            {getLeavingIn(ride.date)}
          </Text>
        </View>
      </View>
    </UpView>
  ) : null;

export default DriversRideInfo;
