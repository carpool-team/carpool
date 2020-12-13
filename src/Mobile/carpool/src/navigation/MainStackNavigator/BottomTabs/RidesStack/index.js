import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  DriversRideDetails,
  DriversRides,
  PassengersRideDetails,
} from '../../../../screens/BottomTabs/RidesStack';
import {Header} from '../../../../components/navigation';
import {useIsFocused} from '@react-navigation/native';

const {useEffect} = React;
const Stack = createStackNavigator();

const RidesStack = ({navigation}) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    // Reset stack navigator when it blurs
    if (!isFocused) {
      navigation.reset({
        index: 0,
        routes: [{name: 'DriversRides'}],
      });
    }
  }, [isFocused]);

  return (
    <Stack.Navigator
      initialRouteName="DriversRides"
      screenOptions={{
        header: props => <Header {...props} />,
        title: 'Rides',
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
};

export default RidesStack;
