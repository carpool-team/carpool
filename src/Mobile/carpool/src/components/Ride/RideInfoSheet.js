import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {colors, sheet} from '../../styles';
import {vw, vh} from '../../utils/constants';
import {UpView} from '../common';
import Ionicon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Waypoints from './Waypoints';
import {CircleButton, StandardButton} from '../common/buttons';
import {parseDistance} from '../../utils/parse';
import {directionsClient} from '../../maps/mapbox';
import {parseCoords} from '../../utils/coords';
import {getColor} from '../../utils/getColor';
import useRequest, {METHODS, ENDPOINTS} from '../../hooks/useRequest';

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

const RideInfoSheet = ({visible, ride, userLocation, onShowWay, onClose}) => {
  const [distance, setDistance] = useState(null);
  const [extended, setExtended] = useState(false);
  const [success, setSuccess] = useState(false);

  // Requests
  const participantId = '8151a9b2-52ee-4ce0-a2dd-08d7f7744d91';
  const [rideId, setRideId] = useState(null);
  const [response, loading, error, _addParticipant] = useRequest(
    METHODS.PUT,
    ENDPOINTS.ADD_PARTICIPANT,
    {
      participantId,
      rideId,
    },
  );

  useEffect(() => {
    if (!visible && extended) {
      setExtended(false);
    }
    if (!visible) {
      setRideId(null);
      setSuccess(false);
    }
  }, [visible]);

  useEffect(() => {
    if (ride && userLocation.length) {
      onGetDistance();
    }
  }, [ride]);

  useEffect(() => {
    if (rideId) {
      _addParticipant();
    }
  }, [rideId]);

  useEffect(() => {
    if (response === 'ok') {
      setSuccess(true);
      setExtended(false);
    }
  }, [response]);

  const onGetDistance = async () => {
    const response = await directionsClient
      .getDirections({
        profile: 'walking',
        waypoints: [
          {
            coordinates: userLocation,
          },
          {
            coordinates: parseCoords(ride.startingLocation.coordinates),
          },
        ],
        overview: 'full',
        geometries: 'geojson',
        alternatives: true,
      })
      .send();

    setDistance(parseDistance(response.body.routes[0].distance));
  };

  const onSelectRide = () => {
    setRideId(ride.id);
  };

  return visible ? (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {success ? (
          <Text
            style={{
              ...sheet.textSemiBold,
              color: colors.green,
              fontSize: 5 * vw,
              textAlign: 'center',
              marginBottom: 4 * vh,
            }}>
            You have signed up for this ride!
          </Text>
        ) : null}
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
        <Waypoints
          style={{marginTop: 3 * vh}}
          ride={ride}
          start={parseCoords(ride.startingLocation.coordinates)}
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
                  <Text style={styles.rating}>{4.7}</Text>
                </View>
              </UpView>
              <UpView borderRadius={20} contentContainerStyle={sheet.center}>
                <View style={styles.rightCard}>
                  {ride.price ? (
                    <Text style={styles.price}>{`${ride.price} PLN`}</Text>
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
              <Text style={styles.car}>{'Opel Astra'}</Text>
            </View>
          </>
        ) : null}
        {loading ? (
          <ActivityIndicator size="large" color={colors.green} />
        ) : success ? (
          <StandardButton
            width="65%"
            style={{marginTop: 3 * vh}}
            color={colors.blue}
            title="Go back"
            onPress={onClose}
          />
        ) : (
          <StandardButton
            width="65%"
            style={{marginTop: 3 * vh}}
            color={ride.isUserParticipant ? colors.blue : colors.green}
            title={ride.isUserParticipant ? 'Show way' : 'Select'}
            onPress={
              ride.isUserParticipant
                ? onShowWay
                : !extended
                ? () => setExtended(true)
                : onSelectRide
            }
          />
        )}
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
