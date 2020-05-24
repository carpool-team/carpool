import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ChooseRoute from '../screens/HomeStack/AddRideStack/ChooseRoute';

const Stack = createStackNavigator();

export default AddRideStack = props => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ChooseRoute"
        component={ChooseRoute}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
