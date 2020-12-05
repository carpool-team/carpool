import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ChooseRoute from '../../../../../screens/HomeStack/AddRideStack/ChooseRoute';
import PickTime from '../../../../../screens/HomeStack/AddRideStack/PickTime';
import SetSeats from '../../../../../screens/HomeStack/AddRideStack/SetSeats';
import SelectGroup from '../../../../../screens/HomeStack/AddRideStack/SelectGroup';
import SelectDirection from '../../../../../screens/HomeStack/AddRideStack/SelectDirection';
import {useIsFocused} from '@react-navigation/native';
import {
  AddRideContext,
  AddRideContextActions,
} from '../../../../../screens/HomeStack/AddRideStack/context';

const {useContext, useEffect} = React;

const Stack = createStackNavigator();

const AddRideStack = props => {
  const focused = useIsFocused();

  const {dispatch} = useContext(AddRideContext);

  useEffect(() => {
    !focused && dispatch({type: AddRideContextActions.CLEAN_STATE});
  }, [focused]);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SelectGroup"
        component={SelectGroup}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SelectDirection"
        component={SelectDirection}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChooseRoute"
        component={ChooseRoute}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PickTime"
        component={PickTime}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SetSeats"
        component={SetSeats}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AddRideStack;
