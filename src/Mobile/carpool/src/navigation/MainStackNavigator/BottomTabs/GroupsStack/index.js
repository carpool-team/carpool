import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  GroupDetails,
  Groups,
  Invitations,
} from '../../../../screens/drawer/Groups';

const Stack = createStackNavigator();

const GroupsStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Groups"
      component={Groups}
      options={{
        headerTitle: 'Your groups',
      }}
    />
    <Stack.Screen
      name="Invitations"
      component={Invitations}
      options={{
        headerTitle: 'Group invitations',
      }}
    />
    <Stack.Screen
      name="GroupDetails"
      component={GroupDetails}
      options={{
        headerTitle: 'Group details',
      }}
    />
  </Stack.Navigator>
);

export default GroupsStack;
