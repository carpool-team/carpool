import React, {useState, useEffect, useRef} from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {SafeAreaView, View} from 'react-native';
import {colors} from '../../styles';
import {AccountSwitch, HamburgerMenu} from '../../components/navigation';
import {AccountContext} from '../../context/AccountContext';
import {useRoute, useNavigation} from '@react-navigation/core';
import PassengerMap from './PassengerMap';
import {
  PassengerContext,
  createGetAllRides,
} from '../../context/PassengerContext';
import config from '../../../config';

const Home = () => {
  const {
    accountState: {activeAccount},
  } = React.useContext(AccountContext);
  const {dispatch} = React.useContext(PassengerContext);

  const [coordinates, setCoordinates] = useState([]);

  const _driverMap = useRef(null);
  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    // Delete ride from params
    if (activeAccount === 'driver') {
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
            renderDriver()
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Home;
