import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Search,
  SearchResults,
  SelectedRideDetails,
} from '../../../../screens/BottomTabs';
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
    <Stack.Screen name="SearchResults" component={SearchResults} />
    <Stack.Screen
      name="SelectedRideDetails"
      component={SelectedRideDetails}
      options={{
        title: 'Ride details',
      }}
    />
  </Stack.Navigator>
);

export default SearchStack;
