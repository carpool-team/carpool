import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Groups, Invitations, GroupDetails} from '../screens/drawer/Groups';
import CloseButton from '../components/navigation/CloseButton';

const Stack = createStackNavigator();

export default GroupsStack = props => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Groups"
        component={Groups}
        options={{
          headerRight: () => <CloseButton {...props} />,
        }}
      />
      <Stack.Screen name="Invitations" component={Invitations} />
      <Stack.Screen
        name="GroupDetails"
        component={GroupDetails}
        options={{
          //headerTitle: null,
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
