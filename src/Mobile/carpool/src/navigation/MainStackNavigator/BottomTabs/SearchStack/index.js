import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Search,
  SearchResults,
  SelectedRideDetails,
} from '../../../../screens/BottomTabs';
import {Header} from '../../../../components/navigation';
import {useIsFocused} from '@react-navigation/native';

const Stack = createStackNavigator();

const SearchStack = ({navigation}) => {
  const isFocused = useIsFocused();

  React.useEffect(() => {
    // Reset stack navigator when it blurs
    if (!isFocused) {
      navigation.reset({
        index: 0,
        routes: [{name: 'Search'}],
      });
    }
  }, [isFocused]);

  return (
    <Stack.Navigator
      screenOptions={{
        title: 'Find a ride',
        header: props => <Header {...props} hideSwitch />,
        gestureEnabled: false,
      }}
      headerMode="screen">
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
};

export default SearchStack;
