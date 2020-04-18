import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import Home from './src/screens/Home';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoiamtvYnJ5bnNraSIsImEiOiJjazk1anJ4OHQwN2IzM3FyMWh5d2tldnRuIn0.bcgJvcllIlR3K_zUKUbWZw',
);

const App = () => {
  useEffect(() => {
    MapboxGL.setTelemetryEnabled(false);
  }, []);

  return (
    <NavigationContainer>
      <Home />
    </NavigationContainer>
  );
};

export default App;
