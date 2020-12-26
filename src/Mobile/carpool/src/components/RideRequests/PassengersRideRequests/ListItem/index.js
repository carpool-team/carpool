import React from 'react';
import {View, Text} from 'react-native';
import UpView from '../../../common/UpView';
import Status from './Status';
import {GroupWaypoints} from '../../../Ride';
import {sheet} from '../../../../styles';
import moment from 'moment';
import {styles} from './index.styles';

const ListItem = ({item}) => (
  <UpView
    borderRadius={16}
    style={styles.upview}
    contentContainerStyle={styles.contentContainer}>
    <View style={sheet.rowCenterSplit}>
      <View>
        <Text style={styles.time}>
          {moment(item.ride.date).format('HH:mm')}
        </Text>
        <Text style={styles.date}>
          {moment(item.ride.date).format('Do MMMM')}
        </Text>
      </View>
      <Status item={item} />
    </View>
    <GroupWaypoints
      group={item.ride.group}
      location={{coordinates: item.ride.location}}
      swap={item.ride.rideDirection}
    />
  </UpView>
);

export default ListItem;
