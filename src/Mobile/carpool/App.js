import React, {useEffect} from 'react';
import {BackHandler} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {LightTheme} from './src/styles';
import MainStackNavigator from './src/navigation/MainStackNavigator/index';
import {enableScreens} from 'react-native-screens';
import {AddRideStore} from './src/screens/BottomTabs/AddRideStack/context';

import {Provider} from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import {promiseMiddleware} from '@adobe/redux-saga-promise';
import {createStore, applyMiddleware} from 'redux';
import {rootReducer} from './src/store/reducers';
import rootSaga from './src/store/sagas';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import * as actions from './src/store/actions';

const sagaMiddleware = createSagaMiddleware();
const middleware = [promiseMiddleware, sagaMiddleware];
const store = createStore(rootReducer, {}, applyMiddleware(...middleware));

import {MAPBOX_KEY} from '@env';

sagaMiddleware.run(rootSaga);

MapboxGL.setAccessToken(MAPBOX_KEY);

enableScreens();

const App = () => {
  useEffect(() => {
    MapboxGL.setTelemetryEnabled(false);
    BackHandler.addEventListener('hardwareBackPress', () => true);

    store.dispatch(actions.watchInvitations());
    store.dispatch(actions.watchDriversRideRequests());
    store.dispatch(actions.watchPassengersRideRequests());

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
