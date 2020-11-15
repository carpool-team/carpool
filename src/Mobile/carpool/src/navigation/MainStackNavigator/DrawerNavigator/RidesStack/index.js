import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DriversRides from '../../../../screens/drawer/RidesStack/DriversRides';
import DriversRideDetails from '../../../../screens/drawer/RidesStack/DriversRideDetails';
import {CloseButton} from '../../../../components/navigation';

const Stack = createStackNavigator();

export default (RidesStack = props => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DriversRides"
        component={DriversRides}
        options={{
          headerRight: () => <CloseButton {...props} />,
          headerTitle: 'Your rides',
        }}
      />
      <Stack.Screen
        name="DriversRideDetails"
        component={DriversRideDetails}
        options={{
          headerTitle: 'Ride details',
        }}
      />
    </Stack.Navigator>
  );
});
