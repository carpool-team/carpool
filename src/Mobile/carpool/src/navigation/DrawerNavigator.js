import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Rides from '../screens/drawer/Rides';
import Settings from '../screens/drawer/Settings';
import Help from '../screens/drawer/Help';
import {CustomDrawer} from '../components/navigation';
import {vh} from '../utils/constants';
import {sheet, colors} from '../styles';
import PreferencesStack from './PreferencesStack';
import HomeStack from './HomeStack';
import GroupsStack from './GroupsStack';
import RidesStack from './RidesStack';

const Drawer = createDrawerNavigator();

export default DrawerNavigator = () => (
  <Drawer.Navigator
    drawerContent={props => <CustomDrawer {...props} />}
    drawerContentOptions={{
      labelStyle: {
        fontSize: 2.25 * vh,
        ...sheet.textBold,
      },
      activeBackgroundColor: colors.background,
    }}>
    {/* <Drawer.Screen name="Home" component={Home} /> */}
    <Drawer.Screen
      name="HomeStack"
      component={HomeStack}
      options={{
        drawerLabel: 'Home',
      }}
    />
    <Drawer.Screen
      name="Rides"
      component={RidesStack}
      options={{
        drawerLabel: 'Your rides',
      }}
    />
    <Drawer.Screen
      name="GroupsStack"
      component={GroupsStack}
      options={{
        drawerLabel: 'Groups',
      }}
    />
    <Drawer.Screen
      name="PreferencesStack"
      component={PreferencesStack}
      options={{
        drawerLabel: 'Your preferences',
      }}
    />
    <Drawer.Screen name="Settings" component={Settings} />
  </Drawer.Navigator>
);
