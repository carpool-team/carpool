import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Home} from '../../../../screens/BottomTabs/HomeStack';
import {Header} from '../../../../components/navigation';

const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator
    screenOptions={{
      header: props => <Header {...props} />,
      title: 'Home',
    }}>
    <Stack.Screen name="Home" component={Home} />
  </Stack.Navigator>
);

export default HomeStack;
