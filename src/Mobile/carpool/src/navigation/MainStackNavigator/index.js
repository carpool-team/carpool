import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import OnBoarding from '../../screens/OnBoarding';
import DrawerNavigator from './DrawerNavigator';
import AuthStack from './AuthStack';
import {useDispatch, useSelector} from 'react-redux';
import {readData, STORAGE_KEYS} from '../../storage';
import * as actions from '../../store/actions/auth';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  const dispatch = useDispatch();
  const tokens = useSelector(state => state.authReducer.tokens);

  useEffect(() => {
    (async () => {
      try {
        const token = await readData(STORAGE_KEYS.token);
        const refreshToken = await readData(STORAGE_KEYS.refreshToken);

        if (token && refreshToken) {
          dispatch(actions.getTokenSuccess({token, refreshToken}));
        }
      } finally {
        setIsLoaded(true);
      }
    })();
  });

  if (!isLoaded) {
    return <OnBoarding />;
  }

  return (
    <Stack.Navigator>
      {isLoaded && !tokens.data && (
        <Stack.Screen
          name="AuthStack"
          component={AuthStack}
          options={{
            headerShown: false,
          }}
        />
      )}
      {isLoaded && tokens.data && (
        <Stack.Screen
          name="DrawerNavigator"
          component={DrawerNavigator}
          options={{
            headerShown: false,
          }}
        />
      )}
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
