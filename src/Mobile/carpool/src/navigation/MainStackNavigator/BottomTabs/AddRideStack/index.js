import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PickTime from '../../../../screens/HomeStack/AddRideStack/PickTime';
import SetSeats from '../../../../screens/HomeStack/AddRideStack/SetSeats';
import SelectGroup from '../../../../screens/HomeStack/AddRideStack/SelectGroup';
import SelectDirection from '../../../../screens/HomeStack/AddRideStack/SelectDirection';
import {useIsFocused} from '@react-navigation/native';
import {
  AddRideContext,
  AddRideContextActions,
} from '../../../../screens/HomeStack/AddRideStack/context';
import SelectLocation from '../../../../screens/HomeStack/AddRideStack/SelectLocation';
import RideSummary from '../../../../screens/HomeStack/AddRideStack/RideSummary';
import RideCreated from '../../../../screens/HomeStack/AddRideStack/RideCreated';
import RideError from '../../../../screens/HomeStack/AddRideStack/RideError';

const {useContext, useEffect} = React;

const Stack = createStackNavigator();

const AddRideStack = props => {
  const focused = useIsFocused();

  const {dispatch} = useContext(AddRideContext);

  // useEffect(() => {
  //   !focused && dispatch({type: AddRideContextActions.CLEAN_STATE});
  // }, [focused]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: 'Create a new ride',
        headerLeft: null,
      }}>
      <Stack.Screen name="SelectGroup" component={SelectGroup} />
      <Stack.Screen name="SelectDirection" component={SelectDirection} />
      <Stack.Screen name="SelectLocation" component={SelectLocation} />
      <Stack.Screen name="PickTime" component={PickTime} />
      <Stack.Screen name="SetSeats" component={SetSeats} />
      <Stack.Screen name="RideSummary" component={RideSummary} />
      <Stack.Screen name="RideCreated" component={RideCreated} />
      <Stack.Screen name="RideError" component={RideError} />
    </Stack.Navigator>
  );
};

export default AddRideStack;
