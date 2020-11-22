import React from 'react';
import {Text, View} from 'react-native';
import {UpView} from '../../../common';
import {parseCoords} from '../../../../utils/coords';
import {styles} from './index.styles';
import {Waypoints} from '../../../Ride';
import moment from 'moment';
import {sheet} from '../../../../styles';

const ListItem = ({item, onItemPress}) => (
  <UpView
    onPress={() => onItemPress(item)}
    borderRadius={16}
    style={styles.upview}
    contentContainerStyle={styles.container}>
    <View style={sheet.rowCenterSplit}>
      <Text style={styles.time}>{moment(item.date).format('hh:mm')}</Text>
      <Text style={styles.date}>
        {moment(item.date).format('Do MMMM YYYY')}
      </Text>
    </View>
    <Waypoints
      ride={item}
      start={parseCoords(item.startingLocation.coordinates)}
    />
  </UpView>
);

export default ListItem;
