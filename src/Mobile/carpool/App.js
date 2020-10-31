import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {LightTheme} from './src/styles';
import MainStackNavigator from './src/navigation/MainStackNavigator';
import config from './config';
import {AccountStore} from './src/context/AccountContext';
import {PassengerStore} from './src/context/PassengerContext';
import {DriverStore} from './src/context/DriverContext';
import {AddRideStore} from './src/screens/HomeStack/AddRideStack/context';

import {Provider} from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import {promiseMiddleware} from '@adobe/redux-saga-promise';
import {createStore, applyMiddleware} from 'redux';
import {rootReducer} from './src/store/reducers';
import rootSaga from './src/store/sagas';

const sagaMiddleware = createSagaMiddleware();
const middleware = [promiseMiddleware, sagaMiddleware];
const store = createStore(rootReducer, {}, applyMiddleware(...middleware));

sagaMiddleware.run(rootSaga);

MapboxGL.setAccessToken(config.mapboxKey);

const App = () => {
  useEffect(() => {
    MapboxGL.setTelemetryEnabled(false);
  }, []);

  return (
    <NavigationContainer theme={LightTheme}>
      <AccountStore>
        <PassengerStore>
          <DriverStore>
            <AddRideStore>
              <Provider store={store}>
                <MainStackNavigator />
              </Provider>
            </AddRideStore>
          </DriverStore>
        </PassengerStore>
      </AccountStore>
    </NavigationContainer>
  );
};

export default App;
