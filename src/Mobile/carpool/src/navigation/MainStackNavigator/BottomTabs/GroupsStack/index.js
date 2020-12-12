import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  GroupDetails,
  Groups,
  Invitations,
} from '../../../../screens/drawer/Groups';
import {Header} from '../../../../components/navigation';
import {useIsFocused} from '@react-navigation/native';

const {useEffect} = React;
const Stack = createStackNavigator();

const GroupsStack = ({navigation}) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    // Reset stack navigator when it blurs
    if (!isFocused) {
      navigation.reset({
        index: 0,
        routes: [{name: 'Groups'}],
      });
    }
  }, [isFocused]);

  return (
    <Stack.Navigator
      screenOptions={{
        header: props => <Header {...props} />,
        title: 'Groups',
      }}>
      <Stack.Screen
        name="Groups"
        component={Groups}
        options={{
          headerTitle: 'Your groups',
        }}
      />
      <Stack.Screen
        name="Invitations"
        component={Invitations}
        options={{
          headerTitle: 'Group invitations',
        }}
      />
      <Stack.Screen
        name="GroupDetails"
        component={GroupDetails}
        options={{
          headerTitle: 'Group details',
        }}
      />
    </Stack.Navigator>
  );
};

export default GroupsStack;
