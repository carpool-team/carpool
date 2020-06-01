import React, {useState, useEffect, useRef} from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {SafeAreaView, View, PermissionsAndroid, Platform} from 'react-native';
import {colors} from '../../styles';
import {AccountSwitch, HamburgerMenu} from '../../components/navigation';
import {
  AccountContext,
  createGetUserGroups,
} from '../../context/AccountContext';
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
} from '../../context/DriverContext';

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
  const {accountState, dispatch: accountDispatch} = React.useContext(
    AccountContext,
  );
  const {dispatch} = React.useContext(PassengerContext);
  const {dispatch: driverDispatch} = React.useContext(DriverContext);
  const {activeAccount} = accountState;

  const [coordinates, setCoordinates] = useState([]);

  const _driverMap = useRef(null);
  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    createGetUserGroups(accountDispatch);
    if (Platform.OS === 'android') {
      requestLocationPermission();
    }
  }, []);

  useEffect(() => {
    // Delete ride from params
    if (activeAccount === 'driver') {
      createGetDriversRides(driverDispatch);
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

  const renderDriver = () => (
    <MapboxGL.MapView
      ref={_driverMap}
      style={{flex: 1}}
      styleURL={config.mapLight}
      contentInset={10}
      compassEnabled={false}>
      <MapboxGL.Camera
        zoomLevel={14}
        maxZoomLevel={19}
        animationMode="flyTo"
        animationDuration={500}
        centerCoordinate={[coordinates[0], coordinates[1] - 0.0015]}
      />
      <MapboxGL.UserLocation visible onUpdate={_onLocateUser} />
    </MapboxGL.MapView>
  );

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
