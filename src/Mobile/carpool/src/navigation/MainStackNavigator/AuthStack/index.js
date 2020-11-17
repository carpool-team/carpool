import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SignUp, SignIn, ForgotPassword} from '../../../screens/AuthStack';

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
        headerTitle: 'Sign up',
      }}
    />
    <Stack.Screen
      name="ForgotPassword"
      component={ForgotPassword}
      options={{
        headerTitle: 'Reset password',
      }}
    />
  </Stack.Navigator>
);

export default AuthStack;
