import React, {useState, useEffect, useRef} from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {SafeAreaView, View, PermissionsAndroid, Platform} from 'react-native';
import {colors} from '../../styles';
import {AccountSwitch, HamburgerMenu} from '../../components/navigation';
import {useRoute, useNavigation} from '@react-navigation/core';
import PassengerMap from './PassengerMap';
import {
  PassengerContext,
  createGetAllRides,
} from '../../context/PassengerContext';
import config from '../../../config';
import DriverMap from './DriverMap';
import {
  DriverContext,
  createGetDriversRides,
  createGetDriversPastRides,
} from '../../context/DriverContext';
import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../../store/actions';

const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Carpool',
        message:
          'Carpool needs access to your location ' +
          'so you can use the app properly.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the location');
    } else {
      console.log('Location permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

const Home = () => {
  const {dispatch} = React.useContext(PassengerContext);
  const {dispatch: driverDispatch} = React.useContext(DriverContext);

  const rdispatch = useDispatch();
  const activeAccount = useSelector(
    state => state.accountReducer.activeAccount,
  );

  const [coordinates, setCoordinates] = useState([]);

  const _driverMap = useRef(null);
  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    rdispatch(actions.getGroups());
    if (Platform.OS === 'android') {
      requestLocationPermission();
    }
  }, []);

  useEffect(() => {
    // Delete ride from params
    if (activeAccount === 'driver') {
      createGetDriversRides(driverDispatch);
      createGetDriversPastRides(driverDispatch);
      if (route.params) {
        let params = route.params;
        delete params.ride;
        navigation.setParams({...params});
      }
    }
    if (activeAccount === 'passenger') {
      createGetAllRides(dispatch);
    }
  }, [activeAccount]);

  const _onLocateUser = e => {
    if (e) {
      const {
        coords: {latitude, longitude},
      } = e;
      setCoordinates([longitude, latitude]);
    }
  };

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
        <View style={{flex: 1}}>
          <HamburgerMenu />
          <AccountSwitch />
          {activeAccount === 'passenger' ? (
            <PassengerMap
              coordinates={coordinates}
              _onLocateUser={_onLocateUser}
            />
          ) : (
            <DriverMap
              coordinates={coordinates}
              _onLocateUser={_onLocateUser}
            />
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Home;
