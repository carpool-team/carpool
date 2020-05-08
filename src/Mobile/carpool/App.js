import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {LightTheme} from './src/styles';
import MainStackNavigator from './src/navigation/MainStackNavigator';
import config from './config';
import {AccountStore} from './src/context/AccountContext';

MapboxGL.setAccessToken(config.mapboxKey);

const App = () => {
  useEffect(() => {
    MapboxGL.setTelemetryEnabled(false);
  }, []);

  return (
    <NavigationContainer theme={LightTheme}>
      <AccountStore>
        <MainStackNavigator />
      </AccountStore>
    </NavigationContainer>
  );
};

export default App;
