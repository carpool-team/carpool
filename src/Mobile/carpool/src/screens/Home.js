import React, {useState} from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {SafeAreaView, View} from 'react-native';
import colors from '../styles/colors';
import HamburgerMenu from '../components/navigation/HamburgerMenu';

const Home = () => {
  const [coordinates, setCoordinates] = useState([
    [16.87939183014879, 52.445182084892735],
  ]);

  const _onLocateUser = e => {
    if (e) {
      const {
        coords: {latitude, longitude},
      } = e;
      setCoordinates([[longitude, latitude]]);
    }
  };

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
        <View style={{flex: 1}}>
          <HamburgerMenu />
          <MapboxGL.MapView
            style={{flex: 1}}
            onPress={event => console.log(event)}
            styleURL="mapbox://styles/jkobrynski/ck9632hsy2m4q1invvx1jjvo9/draft">
            <MapboxGL.Camera
              zoomLevel={16}
              animationMode="flyTo"
              animationDuration={0}
              followUserLocation
              followUserMode={'normal'}
            />
            <MapboxGL.UserLocation visible onUpdate={_onLocateUser} />
          </MapboxGL.MapView>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Home;
