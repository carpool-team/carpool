import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Home} from '../../../../screens/BottomTabs/HomeStack';
import {sheet, colors} from '../../../../styles';
import {AccountSwitch} from '../../../../components/navigation';

const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerTitleStyle: {
        ...sheet.textMedium,
        color: colors.grayVeryDark,
      },
      headerStyle: {
        // height: 110,
      },
      headerRight: () => <AccountSwitch style={{marginRight: 16}} />,
    }}>
    <Stack.Screen name="Home" component={Home} />
  </Stack.Navigator>
);

export default HomeStack;
