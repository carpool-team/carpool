import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SignUp, SignIn} from '../../../screens/AuthStack';

const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="SignIn"
      component={SignIn}
      options={{
        headerTitle: 'Sign in',
      }}
    />
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
