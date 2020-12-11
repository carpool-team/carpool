import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DriversRides from '../../../../screens/drawer/RidesStack/DriversRides';
import DriversRideDetails from '../../../../screens/drawer/RidesStack/DriversRideDetails';
import PassengersRideDetails from '../../../../screens/drawer/RidesStack/PassengersRideDetails';
import {sheet, colors} from '../../../../styles';

const Stack = createStackNavigator();

const RidesStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerTitleStyle: {
        ...sheet.textMedium,
        color: colors.grayVeryDark,
      },
      headerStyle: {
        height: 110,
      },
    }}>
    <Stack.Screen
      name="DriversRides"
      component={DriversRides}
      options={{
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
    <Stack.Screen
      name="PassengersRideDetails"
      component={PassengersRideDetails}
      options={{
        headerTitle: 'Ride details',
      }}
    />
  </Stack.Navigator>
);

export default RidesStack;
