import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Preferences from '../screens/drawer/PreferencesStack/Preferences';
import SearchLocation from '../screens/drawer/PreferencesStack/SearchLocation';

const Stack = createStackNavigator();

export default PreferencesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Preferences"
        component={Preferences}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="SearchLocation"
        component={SearchLocation}
        options={{
          header: () => null,
        }}
      />
    </Stack.Navigator>
  );
};
