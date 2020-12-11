import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Search} from '../../../../screens/BottomTabs';
import {sheet, colors} from '../../../../styles';

const Stack = createStackNavigator();

const SearchStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerTitle: 'Search for a ride',
      headerLeft: null,
      headerTitleStyle: {
        ...sheet.textMedium,
        color: colors.grayVeryDark,
      },
      headerStyle: {
        height: 110,
      },
    }}>
    <Stack.Screen name="Search" component={Search} />
  </Stack.Navigator>
);

export default SearchStack;
