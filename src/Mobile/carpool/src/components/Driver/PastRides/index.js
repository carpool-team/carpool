import React, {useEffect} from 'react';
import RidesList from '../RidesList';
import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../../../store/actions';
import {useNavigation} from '@react-navigation/native';
import {useActiveAccount} from '../../../hooks';

const PastRides = () => {
  const navigation = useNavigation();

  const {activeAccount} = useActiveAccount();
  const isPassenger = activeAccount === 'passenger';

  const driversPastRides = useSelector(
    state => state.driverReducer.driversPastRides,
  );
  const passengersPastRides = useSelector(
    state => state.passengerReducer.userPastRides,
  );

  useEffect(() => {
    onRefreshPastRides();
  }, []);

  const dispatch = useDispatch();

  const onRefreshPastRides = () => {
    dispatch(actions.getDriversPastRides());
    dispatch(actions.getUsersPastRides());
  };

  const onItemPress = ride => {
    if (isPassenger) {
      navigation.push('PassengersRideDetails', {ride, past: true});
    } else {
      navigation.push('DriversRideDetails', {ride, past: true});
    }
  };

  return (
    <RidesList
      data={isPassenger ? passengersPastRides.data : driversPastRides.data}
      loading={
        isPassenger ? passengersPastRides.loading : driversPastRides.loading
      }
      onRefresh={onRefreshPastRides}
      onItemPress={onItemPress}
    />
  );
};

export default PastRides;
