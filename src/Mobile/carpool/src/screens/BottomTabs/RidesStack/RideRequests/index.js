import React, {useEffect, useState} from 'react';
import {SafeAreaView, Alert} from 'react-native';
import {useActiveAccount} from '../../../../hooks';
import {GoBack} from '../../../../components/navigation';
import {useSelector, useDispatch} from 'react-redux';
import {
  PassengersRideRequests,
  DriversRideRequests,
} from '../../../../components/RideRequests';
import {styles} from './index.styles';
import * as actions from '../../../../store/actions';
import {byStatus, byDateOnCondition} from './utils';

const RideRequests = ({navigation}) => {
  const [passengersSorted, setPassengersSorted] = useState([]);

  const {activeAccount} = useActiveAccount();
  const isPassenger = activeAccount === 'passenger';

  const passengersRequests = useSelector(
    state => state.passengerReducer.rideRequests,
  );
  const driversRequests = useSelector(
    state => state.driverReducer.rideRequests,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <GoBack onPress={navigation.goBack} />,
    });
    onRefreshPassenger();
    onRefreshDriver();
  }, []);

  useEffect(() => {
    if (passengersRequests.data) {
      setPassengersSorted(
        [...passengersRequests.data].sort(byStatus).sort(byDateOnCondition),
      );
    }
    if (passengersRequests.error) {
      Alert.alert(
        'Error',
        'An error ocurred when trying to fetch ride requests from the server. Please try again.',
        [
          {
            text: 'Ok',
            style: 'default',
          },
        ],
      );
    }
  }, [passengersRequests]);

  useEffect(() => {
    if (driversRequests.error) {
      Alert.alert(
        'Error',
        'An error ocurred when trying to fetch ride requests from the server. Please try again.',
        [
          {
            text: 'Ok',
            style: 'default',
          },
        ],
      );
    }
  }, [driversRequests]);

  const onRefreshPassenger = () =>
    dispatch(actions.getPassengersRideRequests());

  const onRefreshDriver = () => dispatch(actions.getDriversRideRequests());

  return (
    <SafeAreaView style={styles.safeArea}>
      {isPassenger ? (
        <PassengersRideRequests
          data={passengersSorted}
          loading={passengersRequests.loading}
          onRefresh={onRefreshPassenger}
        />
      ) : (
        <DriversRideRequests
          data={driversRequests.data}
          loading={driversRequests.loading}
          onRefresh={onRefreshDriver}
        />
      )}
    </SafeAreaView>
  );
};

export default RideRequests;
