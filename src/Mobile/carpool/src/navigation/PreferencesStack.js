import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Preferences from '../screens/drawer/PreferencesStack/Preferences';
import SearchLocation from '../screens/drawer/PreferencesStack/SearchLocation';
import ShowSelected from '../screens/drawer/PreferencesStack/ShowSelected';
import FindRoute from '../screens/drawer/PreferencesStack/FindRoute';
import ShowRoute from '../screens/drawer/PreferencesStack/ShowRoute';

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
      <Stack.Screen
        name="ShowSelected"
        component={ShowSelected}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="FindRoute"
        component={FindRoute}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="ShowRoute"
        component={ShowRoute}
        options={{
          header: () => null,
        }}
      />
    </Stack.Navigator>
  );
};
