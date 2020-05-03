import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colors from '../../styles/colors';
import {vw, vh} from '../../utils/constants';
import UpView from '../common/UpView';
import sheet from '../../styles/sheet';
import Ionicon from 'react-native-vector-icons/Ionicons';
import turfDistance from '@turf/distance';
import {point as turfPoint} from '@turf/helpers';
import Waypoints from './Waypoints';

const getColor = time => {
  if (time < 20) {
    return colors.red;
  } else {
    if (time < 45) {
      return colors.orange;
    } else {
      if (time < 90) {
        return colors.yellow;
      } else {
        return colors.green;
      }
    }
  }
};

const getDistance = dist => {
  if (dist < 1000) {
    return `${dist} m`;
  } else {
    return `${(dist / 1000).toFixed(1)} km`;
  }
};

const RideInfoSheet = ({visible, point, userLocation}) => {
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    if (userLocation.length && point) {
      const userPoint = turfPoint(userLocation);
      const locPoint = turfPoint(point.coordinates);
      const dist = turfDistance(userPoint, locPoint);

      setDistance((dist * 1000).toFixed(0));
    }
  }, [point]);

  return visible ? (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <UpView
          style={{
            width: '100%',
          }}
          borderRadius={4 * vw}>
          <View style={styles.upperContainer}>
            <UpView
              style={styles.avatarCircle}
              contentContainerStyle={sheet.center}
              borderRadius={9999}>
              <Ionicon
                name="md-person"
                color={colors.grayDark}
                size={11 * vw}
              />
            </UpView>
            <View style={styles.userInfoContainer}>
              <View
                style={{
                  ...sheet.rowCenterSplit,
                }}>
                <Text style={styles.username} numberOfLines={1}>
                  {`${point.ride.user.firstName} ${point.ride.user.lastName}`}
                </Text>
                <Text style={styles.distance}>{getDistance(distance)}</Text>
              </View>
              <Text
                style={[
                  styles.leavingIn,
                  {color: getColor(point.ride.timeLeft)},
                ]}>
                {`Leaving in ${point.ride.timeLeft} minutes`}
              </Text>
            </View>
          </View>
        </UpView>
        <Waypoints
          style={{marginTop: 3 * vh}}
          ride={point.ride}
          start={point.coordinates}
        />
        <UpView
          style={styles.button}
          borderRadius={100}
          contentContainerStyle={sheet.center}
          onPress={() => null}>
          {point.signedUp ? (
            <Text style={[styles.buttonText, {color: colors.blue}]}>
              Show way
            </Text>
          ) : (
            <Text style={styles.buttonText}>Select</Text>
          )}
        </UpView>
      </View>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  container: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: 4 * vw,
    paddingVertical: 4 * vh,
    borderTopRightRadius: 4 * vw,
    borderTopLeftRadius: 4 * vw,
  },
  upperContainer: {
    flex: 1,
    paddingHorizontal: 3 * vw,
    paddingVertical: 2 * vh,
    ...sheet.rowCenter,
  },
  avatarCircle: {
    width: 16 * vw,
    height: 16 * vw,
    marginRight: 3 * vw,
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
  button: {
    width: '65%',
    height: 6 * vh,
    marginTop: 3 * vh,
  },
  buttonText: {
    ...sheet.textBold,
    color: colors.green,
    fontSize: 4 * vw,
  },
});

export default RideInfoSheet;
