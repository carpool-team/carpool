import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {colors, sheet} from '../../../styles';
import {UpView} from '../../common';
import Ionicon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {StandardButton} from '../../common/buttons';
import {parseDistance} from '../../../utils/parse';
import {parseCoords} from '../../../utils/coords';
import useRequest, {METHODS, ENDPOINTS} from '../../../hooks/useRequest';
import DriverInfo from '../DriverInfo';
import {useGetDirections} from '../../../hooks';
import {useDispatch} from 'react-redux';
import * as actions from '../../../store/actions';
import {styles} from './index.styles';
import Waypoints from '../Waypoints';

const dirConfig = {
  profile: 'walking',
  overview: 'full',
  geometries: 'geojson',
  alternatives: true,
};

const RideInfoSheet = ({visible, ride, userLocation, onShowWay, onClose}) => {
  const [distance, setDistance] = useState(null);
  const [extended, setExtended] = useState(false);
  const [success, setSuccess] = useState(false);

  // Store
  const dispatch = useDispatch();

  // Requests
  const participantId = '8151a9b2-52ee-4ce0-a2dd-08d7f7744d91';
  const [rideId, setRideId] = useState(null);
  const [response, loading, error, _addParticipant] = useRequest(
    METHODS.PUT,
    ENDPOINTS.ADD_PARTICIPANT(rideId),
    {
      participantId,
    },
  );

  // Directions
  const [results, ldng, err, _getDirections] = useGetDirections(dirConfig);

  useEffect(() => {
    if (!visible && extended) {
      setExtended(false);
    }
    if (!visible) {
      setRideId(null);
      setSuccess(false);
      dispatch(actions.getAllRides());
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

  useEffect(() => {
    if (results) {
      setDistance(parseDistance(results.body.routes[0].distance));
    }
  }, [results]);

  const onGetDistance = () => {
    _getDirections([
      userLocation,
      parseCoords(ride.startingLocation.coordinates),
    ]);
  };

  const onSelectRide = () => {
    setRideId(ride.id);
  };

  return visible ? (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {success ? (
          <Text style={styles.success}>You have signed up for this ride!</Text>
        ) : null}
        <DriverInfo ride={ride} distance={distance} />
        <Waypoints
          style={{marginTop: 27}}
          ride={ride}
          start={parseCoords(ride.startingLocation.coordinates)}
        />
        {extended ? (
          <>
            <View style={styles.detailsRow}>
              <UpView
                borderRadius={20}
                contentContainerStyle={sheet.center}
                style={{marginRight: 64}}>
                <View style={styles.leftCard}>
                  <MaterialIcon name="star" size={40} color={colors.yellow} />
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
                size={80}
                style={{marginRight: 16}}
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
            style={{marginTop: 27}}
            color={colors.blue}
            title="Go back"
            onPress={onClose}
          />
        ) : (
          <StandardButton
            width="65%"
            style={{marginTop: 27}}
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

export default RideInfoSheet;
