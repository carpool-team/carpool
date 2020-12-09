import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Settings} from '../../../../screens/BottomTabs';

const Stack = createStackNavigator();

const SettingsStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerTitle: 'Settings for a ride',
      headerLeft: null,
    }}>
    <Stack.Screen name="Settings" component={Settings} />
  </Stack.Navigator>
);

export default SettingsStack;
