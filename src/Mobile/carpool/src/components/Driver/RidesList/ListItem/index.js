import React from 'react';
import {Text, View} from 'react-native';
import {UpView} from '../../../common';
import {styles} from './index.styles';
import {GroupWaypoints} from '../../../Ride';
import moment from 'moment';
import {sheet} from '../../../../styles';
import RideMatching from '../../RideMatching';

const ListItem = ({item, onItemPress}) => {
  const hasExtension = item.extension !== undefined;

  return (
    <UpView
      onPress={() => onItemPress(item)}
      borderRadius={16}
      style={{...styles.upview, height: hasExtension ? 180 : 150}}
      contentContainerStyle={styles.container}>
      {hasExtension && <RideMatching matching={item.extension} />}
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
};

export default ListItem;
