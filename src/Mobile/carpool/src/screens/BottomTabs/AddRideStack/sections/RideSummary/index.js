import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import RouteMinimap from '../../../../../components/Route/RouteMinimap';
import {sheet, colors} from '../../../../../styles';
import GroupWaypoints from '../../../../../components/Ride/GroupWaypoints';
import PickDays from '../../../../../components/Driver/AddRide/PickDays';
import moment from 'moment';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {StandardButton} from '../../../../../components/common/buttons';
import {useDispatch} from 'react-redux';
import * as actions from '../../../../../store/actions';
import {AddRideActions} from '../../reducer';

const RideSummary = ({state, rdispatch}) => {
  const [loading, setLoading] = useState(false);
  const {group, location, swap, regular, days, time, seats, date} = state;

  const dispatch = useDispatch();

  const convertDays = () => {
    let arr = days
      .toString(2)
      .split('')
      .reverse()
      .map(item => parseInt(item));

    const zeros = 7 - arr.length;
    for (let i = 0; i < zeros; i++) {
      arr = [...arr, 0];
    }

    return arr;
  };

  const onSubmit = () => {
    if (regular) {
      dispatch(
        actions.createRegularRide({
          groupId: group.groupId,
          location: location.coordinates,
          rideDirection: swap ? 1 : 0,
          weekDays: days,
          rideTime: moment(time).format('HH:mm'),
          seatsLimit: seats,
        }),
      )
        .then(() => {
          rdispatch({type: AddRideActions.SET_SUCCESS, payload: true});
        })
        .catch(err => {
          rdispatch({type: AddRideActions.SET_ERROR, payload: err});
        });
    } else {
      setLoading(true);
      dispatch(
        actions.createSingleRide({
          groupId: group.groupId,
          date: date,
          rideDirection: swap ? 1 : 0,
          location: location.coordinates,
          seatsLimit: seats,
        }),
      )
        .then(() => {
          rdispatch({type: AddRideActions.SET_SUCCESS, payload: true});
        })
        .catch(err => {
          rdispatch({type: AddRideActions.SET_ERROR, payload: err});
        });
    }
  };

  const onCancel = () => rdispatch({type: AddRideActions.CLEAN_STATE});

  return (
    !!group && (
      <View style={styles.container}>
        <View style={styles.mapWrapper}>
          <RouteMinimap
            hideDetails
            stops={
              swap
                ? [{coordinates: group.location}, location]
                : [location, {coordinates: group.location}]
            }
          />
        </View>
        <View style={styles.waypoints}>
          <GroupWaypoints group={group} location={location} swap={swap} />
        </View>
        {regular ? (
          <View style={styles.bottomWrapper}>
            <PickDays days={convertDays()} setDays={() => null} disabled />
            <View style={styles.detailsWrapper}>
              <Text style={styles.time}>{moment(time).format('HH:mm')}</Text>
              <View style={sheet.rowCenter}>
                <Ionicon name="ios-car" size={50} color={colors.grayVeryDark} />
                <Text style={styles.seats}>{seats}</Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={[styles.bottomWrapper, styles.detailsWrapper]}>
            <View>
              <Text style={styles.time}>{moment(date).format('HH:mm')}</Text>
              <Text style={styles.date}>
                {moment(date).format('Do MMMM YYYY')}
              </Text>
            </View>
            <View style={sheet.rowCenter}>
              <Ionicon name="ios-car" size={50} color={colors.grayVeryDark} />
              <Text style={styles.seats}>{seats}</Text>
            </View>
          </View>
        )}
        <View style={styles.buttonsWrapper}>
          {loading ? (
            <View style={styles.loadingWrapper}>
              <ActivityIndicator color={colors.blue} size="large" />
            </View>
          ) : (
            <View style={styles.buttonsContainer}>
              <StandardButton
                onPress={onCancel}
                color={colors.red}
                title="Cancel"
                width="45%"
              />
              <StandardButton
                onPress={onSubmit}
                color={colors.green}
                title="Submit"
                width="45%"
              />
            </View>
          )}
        </View>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  mapWrapper: {
    width: '100%',
    // height: 300,
    flex: 1,
  },
  waypoints: {
    width: '100%',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },
  bottomWrapper: {
    width: '100%',
    marginTop: 16,
    paddingHorizontal: 16,
  },
  detailsWrapper: {
    ...sheet.rowCenterSplit,
    marginTop: 16,
  },
  time: {
    ...sheet.textSemiBold,
    color: colors.green,
    fontSize: 22,
  },
  date: {
    ...sheet.textSemiBold,
    color: colors.grayDark,
    fontSize: 16,
    marginTop: 5,
  },
  seats: {
    ...sheet.textSemiBold,
    color: colors.grayDark,
    fontSize: 22,
    marginLeft: 12,
  },
  buttonsWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: '15%',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  buttonsContainer: {
    ...sheet.rowCenterSplit,
    width: '100%',
  },
  loadingWrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RideSummary;
