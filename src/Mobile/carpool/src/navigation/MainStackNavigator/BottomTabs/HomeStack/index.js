import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
// import Home from '../../../../screens/HomeStack/Home';
import {Home} from '../../../../screens/BottomTabs/HomeStack';

const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={Home} />
  </Stack.Navigator>
);

export default HomeStack;
