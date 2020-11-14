import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SignUp} from '../../../screens/AuthStack';

const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="SignUp"
      component={SignUp}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

export default AuthStack;
