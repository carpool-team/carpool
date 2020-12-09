import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import GroupsStack from './GroupsStack';
import HomeStack from './HomeStack';
import RidesStack from './RidesStack';
import AddRideStack from './AddRideStack';
import {colors} from '../../../styles';
import {useActiveAccount} from '../../../hooks';

const Tabs = createBottomTabNavigator();

const BottomTabs = () => {
  const {activeAccount} = useActiveAccount();
  const isPassenger = activeAccount === 'passenger';

  return (
    <Tabs.Navigator
      tabBarOptions={{
        activeTintColor: colors.blue,
        inactiveTintColor: colors.gray,
        style: {
          backgroundColor: '#fff',
        },
      }}>
      <Tabs.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="home" size={0.7 * size} color={color} />
          ),
          tabBarLabel: 'Home',
        }}
      />
      <Tabs.Screen
        name="GroupsStack"
        component={GroupsStack}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="group" size={0.7 * size} color={color} />
          ),
          tabBarLabel: 'Groups',
        }}
      />
      {isPassenger ? (
        <Tabs.Screen
          name="SearchStack"
          component={GroupsStack}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="search" size={0.7 * size} color={color} />
            ),
            tabBarLabel: 'Search',
          }}
        />
      ) : (
        <Tabs.Screen
          name="AddRide"
          component={AddRideStack}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="plus" size={0.7 * size} color={color} />
            ),
            tabBarLabel: 'Add ride',
          }}
        />
      )}
      <Tabs.Screen
        name="RidesStack"
        component={RidesStack}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="map-signs" size={0.7 * size} color={color} />
          ),
          tabBarLabel: 'Rides',
        }}
      />
      <Tabs.Screen
        name="SettingsStack"
        component={RidesStack}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="cog" size={0.7 * size} color={color} />
          ),
          tabBarLabel: 'Settings',
        }}
      />
    </Tabs.Navigator>
  );
};

export default BottomTabs;
