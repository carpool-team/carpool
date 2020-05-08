import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/HomeStack/Home';
import AskForRide from '../screens/HomeStack/AskForRide';

const Stack = createStackNavigator();

export default HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AskForRide"
        component={AskForRide}
        options={{
          title: 'Ask for ride',
        }}
      />
    </Stack.Navigator>
  );
};
