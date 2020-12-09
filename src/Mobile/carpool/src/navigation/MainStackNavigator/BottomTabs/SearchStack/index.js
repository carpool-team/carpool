import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Search} from '../../../../screens/BottomTabs';

const Stack = createStackNavigator();

const SearchStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerTitle: 'Search for a ride',
      headerLeft: null,
    }}>
    <Stack.Screen name="Search" component={Search} />
  </Stack.Navigator>
);

export default SearchStack;
