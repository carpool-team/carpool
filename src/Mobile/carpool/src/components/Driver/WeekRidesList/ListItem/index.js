import React from 'react';
import {View, Text} from 'react-native';
import {getWeekday, isToday} from '../utils';
import RideItem from './RideItem';
import {styles} from './index.styles';

const ListItem = ({day, rides, onItemPress}) => {
  const weekday = getWeekday(day);
  const today = isToday(day);

  if (rides) {
    return (
      <View style={styles.container}>
        <View style={styles.weekdayWrapper}>
          {today ? (
            <Text style={styles.today}>{weekday}</Text>
          ) : (
            <Text style={styles.weekday}>{weekday}</Text>
          )}
        </View>
        <View style={styles.ridesWrapper}>
          {rides.map((ride, index) => (
            <RideItem
              key={`${ride.id}${index}`}
              item={ride}
              onItemPress={() => onItemPress(ride)}
            />
          ))}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.weekdayWrapper}>
        {today ? (
          <Text style={styles.today}>{weekday}</Text>
        ) : (
          <Text style={styles.weekday}>{weekday}</Text>
        )}
      </View>
    </View>
  );
};

export default ListItem;
