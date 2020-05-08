import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colors from '../../styles/colors';
import {vw, vh} from '../../utils/constants';
import UpView from '../common/UpView';
import sheet from '../../styles/sheet';
import Ionicon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Waypoints from './Waypoints';
import {CircleButton, StandardButton} from '../common/buttons';
import {parseDistance} from '../../utils/parse';
import {directionsClient} from '../../maps/mapbox';

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

const RideInfoSheet = ({visible, point, userLocation, onShowWay}) => {
  const [distance, setDistance] = useState(null);
  const [extended, setExtended] = useState(false);

  useEffect(() => {
    if (!visible && extended) {
      setExtended(false);
    }
  }, [visible]);

  useEffect(() => {
    if (point && userLocation.length) {
      onGetDistance();
    }
  }, [point]);

  const onGetDistance = async () => {
    const response = await directionsClient
      .getDirections({
        profile: 'walking',
        waypoints: [
          {
            coordinates: userLocation,
          },
          {
            coordinates: point.coordinates,
          },
        ],
        overview: 'full',
        geometries: 'geojson',
        alternatives: true,
      })
      .send();

    setDistance(parseDistance(response.body.routes[0].distance));
  };

  return visible ? (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <UpView
          style={{
            width: '100%',
          }}
          borderRadius={4 * vw}>
          <View style={styles.upperContainer}>
            <CircleButton
              style={{marginRight: 3 * vw}}
              icon={
                <Ionicon
                  name="md-person"
                  color={colors.grayDark}
                  size={11 * vw}
                />
              }
            />
            <View style={styles.userInfoContainer}>
              <View
                style={{
                  ...sheet.rowCenterSplit,
                }}>
                <Text style={styles.username} numberOfLines={1}>
                  {`${point.ride.user.firstName} ${point.ride.user.lastName}`}
                </Text>
                <Text style={styles.distance}>{distance}</Text>
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
        {extended ? (
          <>
            <View style={styles.detailsRow}>
              <UpView
                borderRadius={20}
                contentContainerStyle={sheet.center}
                style={{marginRight: 8 * vw}}>
                <View style={styles.leftCard}>
                  <MaterialIcon
                    name="star"
                    size={10 * vw}
                    color={colors.yellow}
                  />
                  <Text style={styles.rating}>{point.ride.user.rating}</Text>
                </View>
              </UpView>
              <UpView borderRadius={20} contentContainerStyle={sheet.center}>
                <View style={styles.rightCard}>
                  {point.ride.price ? (
                    <Text style={styles.price}>
                      {`${point.ride.price} PLN`}
                    </Text>
                  ) : (
                    <Text style={styles.free}>Free</Text>
                  )}
                </View>
              </UpView>
            </View>
            <View style={styles.carWrapper}>
              <Ionicon
                name="ios-car"
                color={colors.grayVeryDark}
                size={20 * vw}
                style={{marginRight: 4 * vw}}
              />
              <Text style={styles.car}>{point.ride.user.car}</Text>
            </View>
          </>
        ) : null}
        <StandardButton
          width="65%"
          style={{marginTop: 3 * vh}}
          color={point.signedUp ? colors.blue : colors.green}
          title={point.signedUp ? 'Show way' : 'Select'}
          onPress={point.signedUp ? onShowWay : () => setExtended(true)}
        />
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
  detailsRow: {
    ...sheet.rowCenterSplit,
    marginTop: 3 * vh,
    marginBottom: 3 * vh,
  },
  leftCard: {
    paddingVertical: 3 * vh,
    paddingHorizontal: 4 * vw,
    width: 32 * vw,
    ...sheet.rowCenter,
    justifyContent: 'center',
  },
  rating: {
    ...sheet.textBold,
    fontSize: 6 * vw,
    color: colors.grayDark,
  },
  rightCard: {
    paddingVertical: 3 * vh,
    paddingHorizontal: 4 * vw,
    width: 32 * vw,
    alignItems: 'center',
    justifyContent: 'center',
  },
  price: {
    ...sheet.textBold,
    fontSize: 6 * vw,
    color: colors.green,
  },
  free: {
    ...sheet.textBold,
    fontSize: 6 * vw,
    color: colors.blue,
  },
  carWrapper: {
    ...sheet.rowCenter,
    marginBottom: 3 * vh,
  },
  car: {
    ...sheet.textBold,
    fontSize: 7 * vw,
    color: colors.grayDark,
  },
});

export default RideInfoSheet;
