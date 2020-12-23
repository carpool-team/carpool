import React from 'react';
import {Text, View} from 'react-native';
import {UpView} from '../../../common';
import {styles} from './index.styles';
import {GroupWaypoints} from '../../../Ride';
import moment from 'moment';
import {sheet} from '../../../../styles';

const ListItem = ({item, onItemPress}) => (
  <UpView
    onPress={() => onItemPress(item)}
    borderRadius={16}
    style={styles.upview}
    contentContainerStyle={styles.container}>
    <View style={sheet.rowCenterSplit}>
      <Text style={styles.time}>{moment(item.rideDate).format('HH:mm')}</Text>
      <Text style={styles.date}>
        {moment(item.rideDate).format('Do MMMM YYYY')}
      </Text>
    </View>
    <GroupWaypoints
      group={item.group}
      location={{coordinates: item.location}}
      swap={item.rideDirection}
    />
  </UpView>
);

export default ListItem;
