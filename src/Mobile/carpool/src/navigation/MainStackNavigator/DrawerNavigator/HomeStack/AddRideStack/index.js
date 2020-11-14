import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ChooseRoute from '../../../../../screens/HomeStack/AddRideStack/ChooseRoute';
import PickTime from '../../../../../screens/HomeStack/AddRideStack/PickTime';
import SetSeats from '../../../../../screens/HomeStack/AddRideStack/SetSeats';

const Stack = createStackNavigator();

const AddRideStack = props => (
  <Stack.Navigator>
    <Stack.Screen
      name="ChooseRoute"
      component={ChooseRoute}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="PickTime"
      component={PickTime}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="SetSeats"
      component={SetSeats}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

export default AddRideStack;
