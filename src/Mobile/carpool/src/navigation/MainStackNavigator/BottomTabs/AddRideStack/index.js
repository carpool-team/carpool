import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AddRide} from '../../../../screens/BottomTabs';
import {Header} from '../../../../components/navigation';

const Stack = createStackNavigator();

const AddRideStack = () => (
  <Stack.Navigator
    initialRouteName="AddRide"
    screenOptions={{
      title: 'New ride',
      header: props => <Header {...props} />,
      gestureEnabled: false,
    }}>
    <Stack.Screen name="AddRide" component={AddRide} />
  </Stack.Navigator>
);

export default AddRideStack;
