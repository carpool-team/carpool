import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import {LightTheme} from './src/styles/themes';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoiamtvYnJ5bnNraSIsImEiOiJjazk1anJ4OHQwN2IzM3FyMWh5d2tldnRuIn0.bcgJvcllIlR3K_zUKUbWZw',
);

const App = () => {
  useEffect(() => {
    MapboxGL.setTelemetryEnabled(false);
  }, []);

  return (
    <NavigationContainer theme={LightTheme}>
      <DrawerNavigator />
    </NavigationContainer>
  );
};

export default App;
