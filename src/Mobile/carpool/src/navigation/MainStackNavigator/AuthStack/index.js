import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SignUp, SignIn, ForgotPassword} from '../../../screens/AuthStack';
import {Header} from '../../../components/navigation';

const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator
    screenOptions={{
      header: props => <Header {...props} />,
    }}>
    <Stack.Screen
      name="SignIn"
      component={SignIn}
      options={{
        title: 'Sign in',
      }}
    />
    <Stack.Screen
      name="SignUp"
      component={SignUp}
      options={{
        title: 'Sign up',
      }}
    />
    <Stack.Screen
      name="ForgotPassword"
      component={ForgotPassword}
      options={{
        title: 'Reset password',
      }}
    />
  </Stack.Navigator>
);

export default AuthStack;
