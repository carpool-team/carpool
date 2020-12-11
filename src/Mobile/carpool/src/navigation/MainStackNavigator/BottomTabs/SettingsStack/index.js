import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Settings} from '../../../../screens/BottomTabs';
import {Header} from '../../../../components/navigation';

const Stack = createStackNavigator();

const SettingsStack = () => (
  <Stack.Navigator
    screenOptions={{
      header: props => <Header {...props} />,
      title: 'Settings',
    }}>
    <Stack.Screen name="Settings" component={Settings} />
  </Stack.Navigator>
);

export default SettingsStack;
