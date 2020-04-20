import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../screens/Home';
import Rides from '../screens/drawer/Rides';
import Preferences from '../screens/drawer/Preferences';
import Settings from '../screens/drawer/Settings';
import Help from '../screens/drawer/Help';
import CustomDrawer from '../components/navigation/CustomDrawer';
import {vw} from '../utils/constants';
import sheet from '../styles/sheet';
import colors from '../styles/colors';

const Drawer = createDrawerNavigator();

export default DrawerNavigator = () => (
  <Drawer.Navigator
    drawerContent={props => <CustomDrawer {...props} />}
    drawerContentOptions={{
      labelStyle: {
        fontSize: 5 * vw,
        ...sheet.textBold,
      },
      activeBackgroundColor: colors.background,
    }}>
    <Drawer.Screen name="Home" component={Home} />
    <Drawer.Screen
      name="Rides"
      component={Rides}
      options={{
        drawerLabel: 'Your rides',
      }}
    />
    <Drawer.Screen
      name="Preferences"
      component={Preferences}
      options={{
        drawerLabel: 'Your preferences',
      }}
    />
    <Drawer.Screen name="Settings" component={Settings} />
    <Drawer.Screen name="Help" component={Help} />
  </Drawer.Navigator>
);
