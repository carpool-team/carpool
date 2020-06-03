import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {UpView} from '../common';
import {vw, vh} from '../../utils/constants';
import {sheet, colors} from '../../styles';
import {CircleButton} from '../common/buttons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {parseCoords} from '../../utils/coords';
import Waypoints from '../Ride/Waypoints';

const getLeavingIn = date => {
  const now = Date.now();
  const lv = new Date(date).getTime();
  const diff = lv - now;
  const minutes = parseInt(diff / (1000 * 60));
  const hours = parseInt(minutes / 60);
  const dt = new Date(date).toLocaleString();

  if (lv < now) {
    return `${dt}`;
  }

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

const DriverRidesListItem = ({item, onItemPress}) => {
  return (
    <UpView
      onPress={() => onItemPress(item)}
      borderRadius={4 * vw}
      style={styles.upview}>
      <View style={styles.container}>
        <View style={styles.topRow}>
          <CircleButton
            style={styles.circleButton}
            icon={
              <Ionicon name="ios-car" color={colors.grayDark} size={8 * vw} />
            }
          />
          <View style={styles.column}>
            <Text style={styles.singleRide}>Single ride</Text>
            <Text style={styles.leavingIn}>{getLeavingIn(item.date)}</Text>
          </View>
        </View>
        <Waypoints
          ride={item}
          start={parseCoords(item.startingLocation.coordinates)}
        />
      </View>
    </UpView>
  );
};

const styles = StyleSheet.create({
  upview: {
    width: '100%',
    height: 26 * vh,
    marginBottom: 4 * vh,
  },
  container: {
    flex: 1,
    paddingTop: 2 * vh,
    paddingBottom: 3 * vh,
    paddingHorizontal: 5 * vw,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topRow: {
    width: '100%',
    ...sheet.rowCenter,
  },
  circleButton: {
    marginRight: 3 * vw,
  },
  column: {
    flexDirection: 'column',
    height: 14 * vw,
    justifyContent: 'space-between',
  },
  singleRide: {
    ...sheet.textBold,
    fontSize: 4 * vw,
    color: colors.grayDark,
  },
  leavingIn: {
    ...sheet.textSemiBold,
    color: colors.green,
    fontSize: 4 * vw,
  },
});

export default DriverRidesListItem;
