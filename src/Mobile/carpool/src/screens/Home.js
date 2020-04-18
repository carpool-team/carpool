import React, {useState} from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {SafeAreaView, Text, View} from 'react-native';
import colors from '../constants/colors';

const Home = () => {
  const [coordinates, setCoordinates] = useState([
    [16.87939183014879, 52.445182084892735],
  ]);

  const _onLocateUser = e => {
    const {
      coords: {latitude, longitude},
    } = e;
    setCoordinates([[longitude, latitude]]);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
      <MapboxGL.MapView style={{flex: 1}} onPress={event => console.log(event)}>
        <MapboxGL.Camera
          zoomLevel={14}
          animationMode="flyTo"
          animationDuration={0}
          followUserLocation
          followUserMode={'normal'}
        />
        <MapboxGL.UserLocation visible onUpdate={_onLocateUser} />
      </MapboxGL.MapView>
    </SafeAreaView>
  );
};

export default Home;
