import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {UpView} from '../common';
import {vw, vh} from '../../utils/constants';
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
      borderRadius={4 * vw}
      onPress={onPress}>
      <View style={styles.upperContainer}>
        <CircleButton
          style={{marginRight: 3 * vw}}
          icon={
            <Ionicon name="md-person" color={colors.grayDark} size={11 * vw} />
          }
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
    paddingHorizontal: 3 * vw,
    paddingVertical: 2 * vh,
    ...sheet.rowCenter,
  },
  userInfoContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 16 * vw,
    paddingVertical: 0.5 * vh,
  },
  username: {
    ...sheet.textBold,
    fontSize: 4 * vw,
    color: colors.grayDark,
    flex: 1,
    marginRight: 1 * vw,
  },
  distance: {
    ...sheet.textBold,
    fontSize: 4 * vw,
    color: colors.blue,
  },
  leavingIn: {
    ...sheet.textBold,
    fontSize: 4 * vw,
  },
});

export default DriverInfo;
