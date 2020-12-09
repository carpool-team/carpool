import React from 'react';
import {View, Text} from 'react-native';
import ListItem from './ListItem';
import {styles} from './index.styles';
import {ListEmptyComponent} from '../../common/lists';

const PassengersList = ({ride, onItemPress}) => (
  <View style={styles.container}>
    <Text style={styles.title}>Passengers</Text>
    {ride.stops.length ? (
      ride.stops.map(stop => (
        <ListItem key={stop.user.id} stop={stop} onItemPress={onItemPress} />
      ))
    ) : (
      <View style={styles.empty}>
        <ListEmptyComponent title="No passengers yet" />
      </View>
    )}
  </View>
);

export default PassengersList;
