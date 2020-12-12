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
import {sheet, colors} from '../../../../styles';

const {useContext, useEffect} = React;

const Stack = createStackNavigator();

const AddRideStack = ({navigation}) => {
  const isFocused = useIsFocused();

  const {dispatch} = useContext(AddRideContext);

  useEffect(() => {
    if (!isFocused) {
      navigation.reset({
        index: 0,
        routes: [{name: 'SelectGroup'}],
      });
      dispatch({type: AddRideContextActions.CLEAN_STATE});
    }
  }, [isFocused]);

  return (
    <Stack.Navigator
      initialRouteName="SelectGroup"
      screenOptions={{
        title: 'Create a new ride',
        headerLeft: null,
        headerTitleStyle: {
          ...sheet.textMedium,
          color: colors.grayVeryDark,
        },
        headerStyle: {
          height: 110,
        },
        gestureEnabled: false,
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
