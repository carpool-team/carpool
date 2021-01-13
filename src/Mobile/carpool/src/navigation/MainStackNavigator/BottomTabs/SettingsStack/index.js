import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Settings, EditUser} from '../../../../screens/BottomTabs';
import {Header} from '../../../../components/navigation';

const Stack = createStackNavigator();

const SettingsStack = () => (
  <Stack.Navigator
    screenOptions={{
      header: props => <Header {...props} />,
      title: 'Settings',
    }}
    headerMode="screen">
    <Stack.Screen name="Settings" component={Settings} />
    <Stack.Screen
      name="EditUser"
      component={EditUser}
      options={{title: 'Edit'}}
    />
  </Stack.Navigator>
);

export default SettingsStack;
