import React from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import UpView from '../../../common/UpView';
import Status from './Status';
import {sheet} from '../../../../styles';
import moment from 'moment';
import {styles} from './index.styles';
import * as actions from '../../../../store/actions';
import {useDispatch} from 'react-redux';
import GroupWaypointsStop from '../../../Ride/GroupWaypointsStop';

const ListItem = ({item}) => {
  const dispatch = useDispatch();

  const onResign = () => {
    Alert.alert('Warning', 'Are you sure you want to resign?', [
      {
        text: 'Cancel',
        style: 'default',
      },
      {
        text: 'Resign',
        style: 'destructive',
        onPress: () =>
          dispatch(actions.deleteRideRequest(item.rideRequestId))
            .then(() => {
              console.log('success');
            })
            .catch(err =>
              Alert.alert(
                'Error',
                'An error ocurred when trying to resign. Please try again.',
                [
                  {
                    text: 'Ok',
                    style: 'default',
                  },
                ],
              ),
            ),
      },
    ]);
  };

  return (
    <UpView
      borderRadius={16}
      style={{...styles.upview, height: item.isPending ? 220 : 190}}
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
      <GroupWaypointsStop
        group={item.ride.group}
        location={{coordinates: item.ride.location}}
        swap={item.ride.rideDirection}
        stop={item.requestingUser}
      />
      {item.isPending && (
        <View style={sheet.center}>
          <TouchableOpacity onPress={onResign}>
            <Text style={styles.resign}>Resign</Text>
          </TouchableOpacity>
        </View>
      )}
    </UpView>
  );
};

export default ListItem;
