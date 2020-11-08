import React from 'react';
import {View, Text} from 'react-native';
import {UpView} from '../../common';
import {sheet, colors} from '../../../styles';
import {CircleButton} from '../../common/buttons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {getColor} from '../../../utils/getColor';
import {styles} from './index.style';
import {getLeavingIn} from './utils';

const DriverInfo = ({ride, distance, style, onPress}) =>
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
          style={{marginRight: 12}}
          icon={<Ionicon name="md-person" color={colors.grayDark} size={44} />}
        />
        <View style={styles.userInfoContainer}>
          <View style={sheet.rowCenterSplit}>
            <Text style={styles.username} numberOfLines={1}>
              {`${ride.owner.firstName} ${ride.owner.lastName}`}
            </Text>
            <Text style={styles.distance}>{distance}</Text>
          </View>
          <Text style={[styles.leavingIn, {color: getColor(ride.date)}]}>
            {getLeavingIn(ride.date)}
          </Text>
        </View>
      </View>
    </UpView>
  ) : null;

export default DriverInfo;
