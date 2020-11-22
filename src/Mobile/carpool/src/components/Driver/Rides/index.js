import React, {useState, useEffect} from 'react';
import {ScrollView, RefreshControl} from 'react-native';
import WeekPicker from '../WeekPicker';
import {getDates} from '../../../utils/date';
import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../../../store/actions';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../../styles';
import WeekRidesList from '../WeekRidesList';
import {styles} from './index.styles';
import {useActiveAccount} from '../../../hooks';

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

  const onRefreshRides = () => {
    const {firstDay, lastDay, range, week} = getDates(offset);
    setDateRange(range);
    setWeekDays([...week]);
    dispatch(actions.getDriversRides());
    // dispatch(actions.getShifts({ firstDay, lastDay }));

    dispatch(actions.getUsersRides());
  };

  const onItemPress = ride => {
    navigation.navigate('DriversRideDetails', {ride});
  };

  const onIncrement = () => setOffset(offset => offset + 1);

  const onDecrement = () => setOffset(offset => offset - 1);

  return (
    <>
      <WeekPicker
        onDecrement={onDecrement}
        onIncrement={onIncrement}
        dateRange={dateRange}
        offset={offset}
      />
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
    </>
  );
};

export default Rides;
