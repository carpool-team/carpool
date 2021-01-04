import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  DriversRideDetails,
  RidesList,
  PassengersRideDetails,
  RideRequests,
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
        routes: [{name: 'RidesList'}],
      });
    }
  }, [isFocused]);

  return (
    <Stack.Navigator
      initialRouteName="RidesList"
      screenOptions={{
        header: props => <Header {...props} />,
        title: 'Rides',
      }}
      headerMode="screen">
      <Stack.Screen
        name="RidesList"
        component={RidesList}
        options={{
          title: 'Your rides',
        }}
      />
      <Stack.Screen
        name="DriversRideDetails"
        component={DriversRideDetails}
        options={{
          title: 'Ride details',
        }}
      />
      <Stack.Screen
        name="PassengersRideDetails"
        component={PassengersRideDetails}
        options={{
          title: 'Ride details',
        }}
      />
      <Stack.Screen
        name="RideRequests"
        component={RideRequests}
        options={{
          title: 'Ride requests',
        }}
      />
    </Stack.Navigator>
  );
};

export default RidesStack;
