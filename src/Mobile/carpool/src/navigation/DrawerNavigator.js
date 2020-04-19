import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../screens/Home';
import Rides from '../screens/drawer/Rides';
import Preferences from '../screens/drawer/Preferences';
import Settings from '../screens/drawer/Settings';
import {Text} from 'react-native';

const Drawer = createDrawerNavigator();

export default DrawerNavigator = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="Home" component={Home} />
    <Drawer.Screen name="Rides" component={Rides} />
    <Drawer.Screen name="Preferences" component={Preferences} />
    <Drawer.Screen name="Settings" component={Settings} />
  </Drawer.Navigator>
);
