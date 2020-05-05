import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../screens/Home';
import Rides from '../screens/drawer/Rides';
import Preferences from '../screens/drawer/PreferencesStack/Preferences';
import Settings from '../screens/drawer/Settings';
import Help from '../screens/drawer/Help';
import CustomDrawer from '../components/navigation/CustomDrawer';
import {vh} from '../utils/constants';
import sheet from '../styles/sheet';
import colors from '../styles/colors';
import PreferencesStack from './PreferencesStack';
import HomeStack from './HomeStack';

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
      component={Rides}
      options={{
        drawerLabel: 'Your rides',
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
    <Drawer.Screen name="Help" component={Help} />
  </Drawer.Navigator>
);
