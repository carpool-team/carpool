import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Settings} from '../../../../screens/BottomTabs';
import {sheet, colors} from '../../../../styles';

const Stack = createStackNavigator();

const SettingsStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerTitle: 'Settings for a ride',
      headerLeft: null,
      headerTitleStyle: {
        ...sheet.textMedium,
        color: colors.grayVeryDark,
      },
      headerStyle: {
        height: 110,
      },
    }}>
    <Stack.Screen name="Settings" component={Settings} />
  </Stack.Navigator>
);

export default SettingsStack;
