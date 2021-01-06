import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import * as actions from '../../../../store/actions';
import {useActiveAccount} from '../../../../hooks';
import {DriversHome, PassengersHome} from '../../../../components/Home';
import {PermissionsAndroid, Platform, Alert} from 'react-native';

const Home = () => {
  const {activeAccount} = useActiveAccount();
  const isPassenger = activeAccount === 'passenger';

  const dispatch = useDispatch();

  const requestLocationPermission = async () => {
    try {
      const chckLocationPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (chckLocationPermission !== PermissionsAndroid.RESULTS.GRANTED) {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Carpool',
              message:
                'Carpool needs access to your location ' +
                'so you can use the app properly.',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            dispatch(actions.logoutUser());
          }
        } catch (err) {
          renderAlert();
        }
      }
    } catch (err) {
      renderAlert();
    }
  };

  const renderAlert = () =>
    Alert.alert(
      'Error',
      'An error ocurred when trying to request location permission. Please restart the app and try again.',
      [
        {
          text: 'OK',
          style: 'default',
          onPress: () => dispatch(actions.logoutUser()),
        },
      ],
    );

  useEffect(() => {
    dispatch(actions.getDriversRides());
    dispatch(actions.getUsersRides());
    dispatch(actions.getGroups());
    dispatch(actions.getInvitations());

    dispatch(actions.getUser());

    dispatch(actions.getDriversRideRequests());
    dispatch(actions.getPassengersRideRequests());

    if (Platform.OS === 'android') {
      requestLocationPermission();
    }
  }, []);

  return isPassenger ? <PassengersHome /> : <DriversHome />;
};

export default Home;
