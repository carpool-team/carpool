import React, {useEffect} from 'react';
import {View} from 'react-native';
import RidesList from '../RidesList';
import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../../../store/actions';
import {useNavigation} from '@react-navigation/native';
import {styles} from './index.styles';

const PastRides = () => {
  const navigation = useNavigation();

  const driversPastRides = useSelector(
    state => state.driverReducer.driversPastRides,
  );

  useEffect(() => {
    onRefreshPastRides();
  }, []);

  const dispatch = useDispatch();

  const onRefreshPastRides = () => dispatch(actions.getDriversPastRides());

  const onItemPress = ride => {
    navigation.navigate('DriversRideDetails', {ride});
  };

  return (
    <View style={styles.flatlistWrapper}>
      <RidesList
        data={driversPastRides.data}
        loading={driversPastRides.loading}
        onRefresh={onRefreshPastRides}
        onItemPress={onItemPress}
      />
    </View>
  );
};

export default PastRides;
