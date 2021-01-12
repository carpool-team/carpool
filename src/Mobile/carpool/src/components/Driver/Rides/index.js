import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  RefreshControl,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import WeekPicker from '../WeekPicker';
import {getDates} from '../../../utils/date';
import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../../../store/actions';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../../styles';
import WeekRidesList from '../WeekRidesList';
import {styles} from './index.styles';
import {useActiveAccount} from '../../../hooks';
import PastRides from '../PastRides';

const Rides = () => {
  const navigation = useNavigation();

  const {activeAccount} = useActiveAccount();
  const isPassenger = activeAccount === 'passenger';

  const [offset, setOffset] = useState(0);
  const [dateRange, setDateRange] = useState(getDates(offset).range);
  const [weekDays, setWeekDays] = useState(getDates(offset).week);

  const driversRides = useSelector(state => state.driverReducer.driversRides);
  const passengersRides = useSelector(
    state => state.passengerReducer.userRides,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    onRefreshRides();
  }, []);

  useEffect(() => {
    onRefreshRides();
  }, [offset]);

  useEffect(() => {
    if (driversRides.error) {
      Alert.alert(
        'Error',
        'An error ocurred when trying to fetch rides from the server. Please try again.',
        [
          {
            text: 'Ok',
            style: 'default',
          },
        ],
      );
    }
  }, [driversRides]);

  useEffect(() => {
    if (passengersRides.error) {
      Alert.alert(
        'Error',
        'An error ocurred when trying to fetch rides from the server. Please try again.',
        [
          {
            text: 'Ok',
            style: 'default',
          },
        ],
      );
    }
  }, [passengersRides]);

  const onRefreshRides = () => {
    const {firstDay, lastDay, range, week} = getDates(offset);
    setDateRange(range);
    setWeekDays([...week]);
    dispatch(actions.getDriversRides());
    // dispatch(actions.getShifts({ firstDay, lastDay }));

    dispatch(actions.getUsersRides());
  };

  const onItemPress = ride => {
    if (isPassenger) {
      navigation.push('PassengersRideDetails', {ride, past: false});
    } else {
      navigation.push('DriversRideDetails', {ride, past: false});
    }
  };

  const onIncrement = () => setOffset(offset => offset + 1);

  const onDecrement = () => setOffset(offset => offset - 1);

  const onRideRequestsPress = () => navigation.navigate('RideRequests');

  return (
    <>
      <View style={styles.topRow}>
        <TouchableOpacity onPress={onRideRequestsPress}>
          <Text style={styles.rideRequests}>Ride requests</Text>
        </TouchableOpacity>
      </View>
      <WeekPicker
        onDecrement={onDecrement}
        onIncrement={onIncrement}
        dateRange={dateRange}
        offset={offset}
      />
      {offset > -1 ? (
        <ScrollView
          style={styles.scrollView}
          refreshControl={
            <RefreshControl
              onRefresh={onRefreshRides}
              colors={[colors.blue]}
              refreshing={
                isPassenger ? passengersRides.loading : driversRides.loading
              }
              tintColor={colors.blue}
            />
          }>
          <WeekRidesList
            weekDays={weekDays}
            rides={isPassenger ? passengersRides.data : driversRides.data}
            onItemPress={onItemPress}
          />
        </ScrollView>
      ) : (
        <PastRides />
      )}
    </>
  );
};

export default Rides;
