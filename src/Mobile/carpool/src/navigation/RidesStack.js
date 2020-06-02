import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DriversRides from '../screens/drawer/RidesStack/DriversRides';
import CloseButton from '../components/navigation/CloseButton';

const Stack = createStackNavigator();

export default RidesStack = props => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DriversRides"
        component={DriversRides}
        options={{
          headerRight: () => <CloseButton {...props} />,
        }}
      />
    </Stack.Navigator>
  );
};
