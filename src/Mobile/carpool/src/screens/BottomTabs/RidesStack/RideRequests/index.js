import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import {useActiveAccount} from '../../../../hooks';
import {GoBack} from '../../../../components/navigation';
import {useSelector, useDispatch} from 'react-redux';
import {
  PassengersRideRequests,
  DriversRideRequests,
} from '../../../../components/RideRequests';
import {styles} from './index.styles';
import * as actions from '../../../../store/actions';

const RideRequests = ({navigation}) => {
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

  const onRefreshPassenger = () =>
    dispatch(actions.getPassengersRideRequests());

  const onRefreshDriver = () => dispatch(actions.getDriversRideRequests());

  return (
    <SafeAreaView style={styles.safeArea}>
      {isPassenger ? (
        <PassengersRideRequests
          data={passengersRequests.data}
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
