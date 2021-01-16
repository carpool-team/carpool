import React, {useState} from 'react';
import {View, Text, Alert, TouchableOpacity} from 'react-native';
import {UpView} from '../../../common';
import {colors, sheet} from '../../../../styles';
import GroupWaypoints from '../../../Ride/GroupWaypoints';
import moment from 'moment';
import {CircleButton, StandardButton} from '../../../common/buttons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {styles} from './index.styles';
import * as actions from '../../../../store/actions';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {getExtension} from '../../../../utils/rides';
import GroupWaypointsStop from '../../../Ride/GroupWaypointsStop';
import {getColor} from './utils';

const ListItem = ({item}) => {
  const [acceptLoading, setAcceptLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);

  const [extended, setExtended] = useState(false);

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const extension = getExtension(item.ride, {
    coordinates: item.requestingUser.location,
  });

  const onAccept = () => {
    setAcceptLoading(true);
    dispatch(actions.acceptRideRequest(item.rideRequestId))
      .then(() => {
        navigation.navigate('RidesStack');
      })
      .catch(err => {
        Alert.alert(
          'Error',
          'An error ocurred when trying to accept ride request. Please try again.',
          [
            {
              text: 'Ok',
              style: 'default',
            },
          ],
        );
        setAcceptLoading(false);
      });
  };

  const onReject = () => {
    setRejectLoading(true);
    dispatch(actions.rejectRideRequest(item.rideRequestId))
      .then(() => {
        navigation.navigate('RidesStack');
      })
      .catch(err => {
        Alert.alert(
          'Error',
          'An error ocurred when trying to reject ride request. Please try again.',
          [
            {
              text: 'Ok',
              style: 'default',
            },
          ],
        );
        setAcceptLoading(false);
      });
  };

  const onToggle = () => setExtended(!extended);

  const disabled = acceptLoading || rejectLoading;

  return (
    <UpView
      borderRadius={16}
      style={{...styles.upview, height: extended ? 300 : 210}}
      contentContainerStyle={styles.contentContainer}>
      <View style={sheet.rowCenterSplit}>
        <Text style={styles.name}>{`${item.requestingUser.firstName} ${
          item.requestingUser.lastName
        } wants to join`}</Text>
        {!extended && (
          <Text
            style={{
              ...styles.percentage,
              color: getColor(extension),
            }}>
            {!!extension && `${extension}%`}
          </Text>
        )}
      </View>
      <View style={sheet.rowCenterSplit}>
        <Text style={styles.time}>
          {moment(item.ride.date).format('HH:mm')}
        </Text>
        <Text style={styles.date}>
          {moment(item.ride.date).format('Do MMMM')}
        </Text>
      </View>
      {extended ? (
        <>
          <GroupWaypointsStop
            group={item.ride.group}
            location={{coordinates: item.ride.location}}
            swap={item.ride.rideDirection}
            stop={item.requestingUser}
          />
          {!!extension && (
            <Text style={styles.approx}>
              Approximately{'  '}
              <Text
                style={{
                  ...styles.percentage,
                  color: getColor(extension),
                }}>{`${extension}%`}</Text>
              {'  '}
              longer
            </Text>
          )}
          <View style={sheet.rowCenterSplit}>
            <TouchableOpacity onPress={onToggle}>
              <Text style={styles.close}>Close</Text>
            </TouchableOpacity>
            <View style={styles.bottomRow}>
              <CircleButton
                size={42}
                icon={
                  <MaterialIcon name="close" size={24} color={colors.red} />
                }
                style={styles.circleButton}
                onPress={onReject}
                loading={rejectLoading}
                disabled={disabled}
              />
              <CircleButton
                size={42}
                icon={
                  <MaterialIcon name="check" size={24} color={colors.green} />
                }
                onPress={onAccept}
                loading={acceptLoading}
                disabled={disabled}
              />
            </View>
          </View>
        </>
      ) : (
        <>
          <GroupWaypoints
            group={item.ride.group}
            location={{coordinates: item.ride.location}}
            swap={item.ride.rideDirection}
          />
          <View style={styles.moreButtonWrapper}>
            <StandardButton
              title="More"
              color={colors.orange}
              height={35}
              width={150}
              onPress={onToggle}
            />
          </View>
        </>
      )}
    </UpView>
  );
};

export default ListItem;
