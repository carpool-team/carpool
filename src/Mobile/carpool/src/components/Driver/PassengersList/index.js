import React from 'react';
import {View, Text} from 'react-native';
import ListItem from './ListItem';
import {styles} from './index.styles';
import {ListEmptyComponent} from '../../common/lists';

const PassengersList = ({stops, onItemPress, past}) => (
  <View style={styles.container}>
    <Text style={styles.title}>Passengers</Text>
    {stops.length ? (
      stops.map(stop => (
        <ListItem
          key={stop.participant.participantId}
          stop={stop}
          onItemPress={onItemPress}
          past={past}
        />
      ))
    ) : (
      <View style={styles.empty}>
        <ListEmptyComponent title="No passengers yet" />
      </View>
    )}
  </View>
);

export default PassengersList;
