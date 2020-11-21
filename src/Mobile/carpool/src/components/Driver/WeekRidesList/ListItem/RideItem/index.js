import React from 'react';
import {Text} from 'react-native';
import {UpView} from '../../../../common';
import moment from 'moment';
import {Waypoints} from '../../../../Ride';
import {parseCoords} from '../../../../../utils/coords';
import {styles} from './index.styles';

const RideItem = ({item, onItemPress}) => (
  <UpView
    onPress={() => onItemPress(item)}
    borderRadius={16}
    style={styles.upview}
    contentContainerStyle={styles.container}>
    <Text style={styles.time}>{moment(item.date).format('HH:mm')}</Text>
    <Waypoints
      ride={item}
      start={parseCoords(item.startingLocation.coordinates)}
    />
  </UpView>
);

export default RideItem;
