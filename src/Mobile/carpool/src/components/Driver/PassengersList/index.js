import React from 'react';
import {View, Text} from 'react-native';
import ListItem from './ListItem';
import {styles} from './index.styles';

const PassengersList = ({ride}) => (
  <View style={styles.container}>
    <Text style={styles.title}>Passengers</Text>
    {ride.stops.map(stop => (
      <ListItem key={stop.user.id} stop={stop} />
    ))}
  </View>
);

export default PassengersList;
