import React from 'react';
import {View, Text} from 'react-native';
import {UpView} from '../../../common';
import {colors, sheet} from '../../../../styles';
import GroupWaypoints from '../../../Ride/GroupWaypoints';
import moment from 'moment';
import {CircleButton} from '../../../common/buttons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {styles} from './index.styles';

const ListItem = ({item}) => (
  <UpView
    borderRadius={16}
    style={styles.upview}
    contentContainerStyle={styles.contentContainer}>
    <Text style={styles.name}>{`${item.requestingUser.firstName} ${
      item.requestingUser.lastName
    } wants to join`}</Text>
    <View style={sheet.rowCenterSplit}>
      <Text style={styles.time}>{moment(item.ride.date).format('HH:mm')}</Text>
      <Text style={styles.date}>
        {moment(item.ride.date).format('Do MMMM')}
      </Text>
    </View>
    <GroupWaypoints
      group={item.ride.group}
      location={{coordinates: item.ride.location}}
      swap={item.ride.rideDirection}
    />
    <View style={styles.bottomRow}>
      <CircleButton
        size={45}
        icon={<MaterialIcon name="close" size={25} color={colors.red} />}
        style={styles.circleButton}
        onPress={() => {}}
      />
      <CircleButton
        size={45}
        icon={<MaterialIcon name="check" size={25} color={colors.green} />}
        onPress={() => {}}
      />
    </View>
  </UpView>
);

export default ListItem;
