import React, {useEffect} from 'react';
import {BackHandler} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {LightTheme} from './src/styles';
import MainStackNavigator from './src/navigation/MainStackNavigator/index';
import {AddRideStore} from './src/screens/HomeStack/AddRideStack/context';

import {Provider, SafeAreaView} from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import {promiseMiddleware} from '@adobe/redux-saga-promise';
import {createStore, applyMiddleware} from 'redux';
import {rootReducer} from './src/store/reducers';
import rootSaga from './src/store/sagas';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const sagaMiddleware = createSagaMiddleware();
const middleware = [promiseMiddleware, sagaMiddleware];
const store = createStore(rootReducer, {}, applyMiddleware(...middleware));

import {MAPBOX_KEY} from '@env';

sagaMiddleware.run(rootSaga);

MapboxGL.setAccessToken(MAPBOX_KEY);

const App = () => {
  useEffect(() => {
    MapboxGL.setTelemetryEnabled(false);
    BackHandler.addEventListener('hardwareBackPress', () => true);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', () => true);
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={LightTheme}>
        <AddRideStore>
          <Provider store={store}>
            <MainStackNavigator />
          </Provider>
        </AddRideStore>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
