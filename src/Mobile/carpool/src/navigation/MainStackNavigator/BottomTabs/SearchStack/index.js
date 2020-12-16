import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Search} from '../../../../screens/BottomTabs';
import {Header} from '../../../../components/navigation';

const Stack = createStackNavigator();

const SearchStack = () => (
  <Stack.Navigator
    screenOptions={{
      title: 'Find a ride',
      header: props => <Header {...props} hideSwitch />,
      gestureEnabled: false,
    }}>
    <Stack.Screen name="Search" component={Search} />
  </Stack.Navigator>
);

export default SearchStack;
