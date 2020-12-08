import React from 'react';
import {Text} from 'react-native';
import {UpView} from '../../../../common';
import moment from 'moment';
import {GroupWaypoints} from '../../../../Ride';
import {styles} from './index.styles';

const RideItem = ({item, onItemPress}) => (
  <UpView
    onPress={() => onItemPress(item)}
    borderRadius={16}
    style={styles.upview}
    contentContainerStyle={styles.container}>
    <Text style={styles.time}>{moment(item.rideDate).format('HH:mm')}</Text>
    <GroupWaypoints
      group={item.group}
      location={{coordinates: item.location}}
      swap={item.rideDirection}
    />
  </UpView>
);

export default RideItem;
