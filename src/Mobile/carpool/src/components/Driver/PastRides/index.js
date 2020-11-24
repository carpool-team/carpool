import React, {useEffect} from 'react';
import {View} from 'react-native';
import RidesList from '../RidesList';
import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../../../store/actions';
import {useNavigation} from '@react-navigation/native';
import {styles} from './index.styles';
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

  console.log(passengersPastRides);

  useEffect(() => {
    onRefreshPastRides();
  }, []);

  const dispatch = useDispatch();

  const onRefreshPastRides = () => {
    dispatch(actions.getDriversPastRides());
    dispatch(actions.getUsersPastRides());
  };

  const onItemPress = ride => {
    navigation.navigate('DriversRideDetails', {ride});
  };

  return (
    <View style={styles.flatlistWrapper}>
      <RidesList
        data={isPassenger ? passengersPastRides.data : driversPastRides.data}
        loading={
          isPassenger ? passengersPastRides.loading : driversPastRides.loading
        }
        onRefresh={onRefreshPastRides}
        onItemPress={onItemPress}
      />
    </View>
  );
};

export default PastRides;
