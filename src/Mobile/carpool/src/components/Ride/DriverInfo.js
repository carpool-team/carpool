import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {UpView} from '../common';
import {vh} from '../../utils/constants';
import {sheet, colors} from '../../styles';
import {CircleButton} from '../common/buttons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {getColor} from '../../utils/getColor';

const getLeavingIn = date => {
  const now = Date.now();
  const lv = new Date(date).getTime();
  const diff = lv - now;
  const minutes = parseInt(diff / (1000 * 60));
  const hours = parseInt(minutes / 60);
  const dt = new Date(date).toLocaleString();

  if (minutes < 60) {
    return `Leaving in ${minutes} minutes`;
  } else {
    if (hours < 12) {
      return `Leaving in ${hours} hours`;
    } else {
      return `${dt}`;
    }
  }
};

const DriverInfo = ({ride, distance, style, onPress}) => {
  return ride ? (
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
          <View
            style={{
              ...sheet.rowCenterSplit,
            }}>
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
};

const styles = StyleSheet.create({
  upperContainer: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 2 * vh,
    ...sheet.rowCenter,
  },
  userInfoContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 64,
    paddingVertical: 0.5 * vh,
  },
  username: {
    ...sheet.textBold,
    fontSize: 16,
    color: colors.grayDark,
    flex: 1,
    marginRight: 4,
  },
  distance: {
    ...sheet.textBold,
    fontSize: 16,
    color: colors.blue,
  },
  leavingIn: {
    ...sheet.textSemiBold,
    fontSize: 16,
  },
});

export default DriverInfo;
