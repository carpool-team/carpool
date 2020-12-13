import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  PickTime,
  SetSeats,
  SelectGroup,
  SelectDirection,
  SelectLocation,
  RideSummary,
  RideCreated,
  RideError,
} from '../../../../screens/BottomTabs';
import {useIsFocused} from '@react-navigation/native';
import {Header} from '../../../../components/navigation';
import {
  AddRideContext,
  AddRideContextActions,
} from '../../../../screens/BottomTabs/AddRideStack/context';

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
        title: 'New ride',
        header: props => <Header {...props} hideSwitch />,
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
