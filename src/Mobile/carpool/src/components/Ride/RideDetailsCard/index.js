import React from 'react';
import {View, Text} from 'react-native';
import {UpView} from '../../common';
import {sheet} from '../../../styles';
import moment from 'moment';
import GroupWaypoints from '../GroupWaypoints';
import {styles} from './index.styles';

const RideDetailsCard = ({ride, onItemPress}) => (
  <UpView
    onPress={() => onItemPress(ride)}
    borderRadius={12}
    style={styles.upview}
    contentContainerStyle={styles.contentContainer}>
    <View style={sheet.rowCenterSplit}>
      <Text style={styles.time}>{moment(ride.rideDate).format('HH:mm')}</Text>
      <Text style={styles.date}>
        {moment(ride.rideDate).format('Do MMMM YYYY')}
      </Text>
    </View>
    <GroupWaypoints
      group={ride.group}
      location={{coordinates: ride.location}}
      swap={ride.rideDirection}
    />
  </UpView>
);

export default RideDetailsCard;
