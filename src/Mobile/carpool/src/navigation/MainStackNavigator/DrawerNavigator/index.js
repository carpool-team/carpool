import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {CustomDrawer} from '../../../components/navigation';
import {sheet, colors} from '../../../styles';
import HomeStack from './HomeStack';
import GroupsStack from './GroupsStack';
import RidesStack from './RidesStack';
import PreferencesStack from './PreferencesStack';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
  <Drawer.Navigator
    drawerContent={props => <CustomDrawer {...props} />}
    drawerContentOptions={{
      labelStyle: {
        fontSize: 18,
        ...sheet.textSemiBold,
      },
      activeBackgroundColor: colors.background,
    }}>
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
  </Drawer.Navigator>
);

export default DrawerNavigator;
