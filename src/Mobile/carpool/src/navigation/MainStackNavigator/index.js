import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import OnBoarding from '../../screens/OnBoarding';
import DrawerNavigator from './DrawerNavigator';
import AuthStack from './AuthStack';

const Stack = createStackNavigator();

const MainStackNavigator = () => (
  <Stack.Navigator>
    {/* <Stack.Screen
      name="OnBoarding"
      component={OnBoarding}
      options={{
        header: () => null,
      }}
    /> */}
    {/* <Stack.Screen
      name="AuthStack"
      component={AuthStack}
      options={{
        headerShown: false,
      }}
    /> */}
    <Stack.Screen
      name="DrawerNavigator"
      component={DrawerNavigator}
      options={{
        header: () => null,
      }}
    />
  </Stack.Navigator>
);

export default MainStackNavigator;
