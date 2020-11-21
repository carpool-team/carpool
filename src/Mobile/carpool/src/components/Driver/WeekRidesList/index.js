import React from 'react';
import {View} from 'react-native';
import {matchRides} from './utils';
import ListItem from './ListItem';
import {styles} from './index.styles';

const WeekRidesList = ({weekDays, rides}) =>
  rides ? (
    <View style={styles.listWrapper}>
      {weekDays.map(day => (
        <ListItem key={day} day={day} rides={matchRides(rides, day)} />
      ))}
    </View>
  ) : null;

export default WeekRidesList;
